import type { Field } from "payload";

type LinkOptions = {
  name?: string;
  label?: string;
  required?: boolean;
};

export const linkField = ({ name = "link", label = "Link", required = false }: LinkOptions = {}): Field => ({
  name,
  label,
  type: "group",
  fields: [
    {
      name: "label",
      type: "text",
      required,
    },
    {
      name: "url",
      type: "text",
      required,
    },
    {
      name: "newTab",
      label: "Open in new tab",
      type: "checkbox",
      defaultValue: false,
    },
  ],
});
