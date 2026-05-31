import type { Field } from "payload";

export const comparisonSideFields = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [
    { name: "label", type: "text", required: true },
    { name: "metric", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "bullets",
      type: "array",
      required: true,
      fields: [{ name: "text", type: "text", required: true }],
    },
  ],
});

export const linkFields = (): Field[] => [
  { name: "label", type: "text", required: true },
  { name: "href", type: "text", required: true },
  {
    name: "icon",
    type: "select",
    required: true,
    options: [
      { label: "LinkedIn", value: "linkedin" },
      { label: "Twitter", value: "twitter" },
      { label: "Instagram", value: "instagram" },
      { label: "Mail", value: "mail" },
      { label: "GitHub", value: "github" },
    ],
  },
];

export const skillIconOptions = [
  { label: "AI / ML", value: "brain" },
  { label: "Development", value: "code" },
  { label: "Cloud & Infra", value: "cloud" },
  { label: "Data Engineering", value: "database" },
];
