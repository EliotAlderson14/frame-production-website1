import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard = ({ project, index }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
    className={index % 2 === 1 ? "lg:mt-20" : ""}
    data-testid={`project-card-${project.slug}`}
  >
    <Link
      to={`/work/${project.slug}`}
      data-cursor="view"
      className="group block"
      aria-label={`View project ${project.title}`}
    >
      <div className="media-surface relative aspect-[3/4] overflow-hidden rounded-[4px] bg-lav">
        <img
          src={project.poster}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-cinema/0 transition-colors duration-500 group-hover:bg-cinema/25" />

        <span className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em] text-paper/90">
          {project.number}
        </span>

        <div className="absolute right-4 top-4 flex h-9 w-9 -translate-x-2 items-center justify-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight size={15} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 scale-50 items-center justify-center rounded-full bg-paper/95 text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100">
            <Play size={17} className="ml-0.5" fill="currentColor" />
          </div>
        </div>

        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          VIEW PROJECT
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-ink sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-faint">
            {project.category}{project.year ? ` · ${project.year}` : ""}
          </p>
        </div>
        <ArrowUpRight
          size={17}
          className="mt-1 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
        />
      </div>
    </Link>
  </motion.article>
);

export default ProjectCard;
