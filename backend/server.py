from fastapi import FastAPI, APIRouter, HTTPException, Depends, Security
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from secrets import compare_digest
from typing import Optional, List, Annotated
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self):
        return self.model_dump(by_alias=True, exclude_none=True)

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc) if doc else None


class Inquiry(BaseDocument):
    name: str
    company: Optional[str] = None
    email: str
    phone: Optional[str] = None
    project_type: str
    timeline: Optional[str] = None
    description: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class InquiryCreate(BaseModel):
    name: str
    company: Optional[str] = None
    email: str
    phone: Optional[str] = None
    project_type: str
    timeline: Optional[str] = None
    description: str


# --- admin access gate (single shared code from backend .env) ---
admin_code_header = APIKeyHeader(name="X-Admin-Access-Code", auto_error=False)


async def require_admin(code: Optional[str] = Security(admin_code_header)) -> None:
    expected = os.environ.get('ADMIN_ACCESS_CODE', '')
    if not expected or not code or not compare_digest(code, expected):
        raise HTTPException(status_code=401, detail="Invalid access code")


@api_router.get("/")
async def root():
    return {"message": "FRAME PRODUCTION API running"}


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    await db.inquiries.insert_one(inquiry.to_mongo())
    return inquiry


@api_router.get("/inquiries", response_model=List[Inquiry], dependencies=[Depends(require_admin)])
async def list_inquiries():
    docs = await db.inquiries.find().sort("created_at", -1).to_list(200)
    return [Inquiry.from_mongo(d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
