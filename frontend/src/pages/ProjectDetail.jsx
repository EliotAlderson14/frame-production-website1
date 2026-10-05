import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, nextProject } from "../data/projects";
import { Line, FadeUp, ImgReveal } from "../components/Reveal";
import VideoBlock from "../components/VideoBlock";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/work" replace />;

  const next = nextProject(slug);
  const metadata = [
    [project.clientLabel || "CLIENT", project.client],
    ["ROLE", project.role],
    ["TOOLS", project.tools?.join(" · ")],
    ["YEAR", project.year],
  ].filter(([, value]) => Boolean(value));

  return (
    <div className="pt-36 md:pt-44" data-testid="project-detail-page">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        {/* header */}
        <FadeUp>
          <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">
            WORK / {project.number} — {project.format}
          </p>
        </FadeUp>
        <h1 className="mt-6 font-display text-[clamp(2.7rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-ink" data-testid="project-detail-title">
          <Line delay={0.05}>{project.title}</Line>
        </h1>
        <FadeUp delay={0.2}>
          <p className="mt-6 font-mono text-[11px] tracking-[0.3em] text-faint">
            {project.category}{project.year ? ` · ${project.year}` : ""}
          </p>
        </FadeUp>

        {/* meta grid */}
        {metadata.length > 0 && <FadeUp delay={0.1}>
          <div className="mt-14 grid gap-8 border-y border-edge py-10 sm:grid-cols-2 lg:grid-cols-4" data-testid="project-detail-meta">
            {metadata.map(([label, value]) => (
              <div key={label}>
                <p className="font-mono text-[10px] tracking-[0.3em] text-faint">{label}</p>
                <p className="mt-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink sm:text-base">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>}

        {/* main video */}
        <div className="mt-16">
          <VideoBlock
            src={project.video}
            poster={project.poster}
            label={`${project.title} — ${project.format}`}
            orientation={project.orientation}
            testid="project-main-video"
          />
        </div>

        {/* description */}
        <div className="mt-24 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <FadeUp>
              <p className="font-mono text-[11px] tracking-[0.3em] text-faint">THE FILM</p>
            </FadeUp>
          </div>
          <div className="md:col-span-6">
            <FadeUp delay={0.1}>
              <p className="text-xl leading-relaxed text-ink sm:text-2xl" data-testid="project-detail-description">
                {project.description}
              </p>
              {project.synopsis && <p className="mt-8 text-base leading-relaxed text-mist">{project.synopsis}</p>}
            </FadeUp>
          </div>
        </div>

        {/* Additional stills are shown only when supplied for this project. */}
        {project.gallery.length > 0 && <div className="mt-24">
          <ImgReveal
            src={project.gallery[1] || project.gallery[0]}
            alt={`${project.title} full-width still`}
            className="aspect-[16/9] rounded-[4px] bg-lav"
            data-testid="project-full-still"
          />
          <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-faint">
            STILL — {project.title}{project.year ? `, ${project.year}` : ""}
          </p>
        </div>}

        {/* gallery */}
        {project.gallery.length > 1 && <div className="mt-24 grid gap-6 md:grid-cols-2" data-testid="project-gallery">
          {(project.gallery[2] ? [project.gallery[2], project.gallery[3] || project.gallery[0]] : [project.gallery[0]]).map(
            (src, i) => (
              <ImgReveal key={i} src={src} alt={`${project.title} gallery ${i + 1}`} className="aspect-[4/5] rounded-[4px] bg-lav" delay={i * 0.08} />
            )
          )}
        </div>}

        {project.additionalVideos?.map((film, i) => (
          <div className="mt-24" key={film.src}>
            <FadeUp><p className="mb-8 font-mono text-[11px] tracking-[0.3em] text-faint">FILM {String(i + 2).padStart(2, "0")}</p></FadeUp>
            <VideoBlock
              src={film.src}
              poster={film.poster || project.poster}
              label={film.label}
              orientation={project.orientation}
              testid={`project-additional-video-${i + 2}`}
            />
          </div>
        ))}

        {/* secondary video */}
        {project.behindTheScenes && <div className="mt-24">
          <VideoBlock
            src={project.behindTheScenes}
            poster={project.gallery[0] || project.poster}
            label={`${project.title} — BEHIND THE SCENES`}
            orientation={project.orientation}
            testid="project-secondary-video"
          />
        </div>}

        {/* production details */}
        {project.details.length > 0 && <div className="mt-24 grid gap-8 border-t border-edge py-12 sm:grid-cols-2 lg:grid-cols-4" data-testid="project-production-details">
          {project.details.map(([label, value]) => (
            <FadeUp key={label}>
              <p className="font-mono text-[10px] tracking-[0.3em] text-faint">{label}</p>
              <p className="mt-2.5 font-display text-sm font-bold uppercase tracking-wide text-ink">{value}</p>
            </FadeUp>
          ))}
        </div>}
      </div>

      {/* next project */}
      <Link
        to={`/work/${next.slug}`}
        data-testid="next-project-link"
        className="group mt-10 flex flex-col items-center gap-6 bg-cinema py-24 text-center text-paper transition-colors duration-500 md:py-32"
      >
        <p className="font-mono text-[11px] tracking-[0.3em] text-paper/50">NEXT PROJECT</p>
        <span className="flex items-center gap-4 px-6">
          <span className="font-display text-[clamp(2.2rem,6.2vw,5.75rem)] font-extrabold uppercase leading-none tracking-[-0.02em] transition-colors duration-300 group-hover:text-paper/80">
            {next.title}
          </span>
          <ArrowUpRight
            size={44}
            className="shrink-0 text-signal transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2"
          />
        </span>
        <span className="mt-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-paper/50">
          {next.category}{next.year ? ` · ${next.year}` : ""}
          <ArrowRight size={12} />
        </span>
      </Link>
    </div>
  );
};

export default ProjectDetail;
