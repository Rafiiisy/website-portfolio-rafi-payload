import type { Field } from "payload";

export const sectionIdFields = (): Field[] => [
  {
    type: "row",
    fields: [
      {
        name: "sectionID",
        label: "Section ID",
        type: "text",
        admin: {
          description: "Optional anchor id used by in-page navigation.",
          width: "50%",
        },
      },
      {
        name: "hideSection",
        label: "Hide section",
        type: "checkbox",
        defaultValue: false,
        admin: {
          width: "50%",
        },
      },
    ],
  },
];
