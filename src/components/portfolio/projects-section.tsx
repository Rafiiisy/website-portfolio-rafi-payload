"use client";

import { useState } from "react";

import {
  ComparisonCard,
  GradientText,
  Icon,
  TagRow,
  mapBullets,
  mapTags,
} from "@/components/portfolio/ui";

type ComparisonGroup = {
  label?: string | null;
  metric?: string | null;
  description?: string | null;
  bullets?: Array<{ text?: string | null } | null> | null;
};

type ProjectItem = {
  number?: string | null;
  category?: string | null;
  metrics?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: Array<{ label?: string | null } | null> | null;
  before?: ComparisonGroup | null;
  after?: ComparisonGroup | null;
};

export type ProjectsSectionData = {
  sectionID?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  titleAccent?: string | null;
  subtitle?: string | null;
  items?: ProjectItem[] | null;
};

export function PortfolioProjectsSection({ data }: { data: ProjectsSectionData }) {
  const items = data.items || [];
  const [openId, setOpenId] = useState(items[0]?.number || "01");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="projects" id={data.sectionID || "projects"}>
      <div className="container">
        <header className="projects__header">
          <p className="section-eyebrow">{data.eyebrow}</p>
          <h2 className="section-heading">
            {data.title}
            <br />
            that <GradientText>{data.titleAccent}</GradientText>
          </h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </header>

        {items.map((project) => {
          const id = String(project.number || "");
          const isOpen = openId === id;
          return (
            <article key={id} className="project-card">
              <button
                type="button"
                className="project-card__header"
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
              >
                <span className="project-card__number">{project.number}</span>
                <div className="project-card__info">
                  <div className="project-card__meta-row">
                    <span className="project-card__category">{project.category}</span>
                    <Icon name="arrowRight" size={12} />
                    <span className="project-card__metrics">{project.metrics}</span>
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                </div>
                <span className={`project-card__toggle${isOpen ? " project-card__toggle--open" : ""}`}>
                  <Icon name="chevron" size={20} />
                </span>
              </button>

              {isOpen && project.description && (
                <div className="project-card__body">
                  <p className="project-card__description">{project.description}</p>
                  <TagRow tags={mapTags(project.tags)} />
                  {project.before && project.after && (
                    <ComparisonCard
                      before={{
                        label: String(project.before.label || ""),
                        metric: String(project.before.metric || ""),
                        description: String(project.before.description || ""),
                        bullets: mapBullets(project.before.bullets),
                      }}
                      after={{
                        label: String(project.after.label || ""),
                        metric: String(project.after.metric || ""),
                        description: String(project.after.description || ""),
                        bullets: mapBullets(project.after.bullets),
                      }}
                    />
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
