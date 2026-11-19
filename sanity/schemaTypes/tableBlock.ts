import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Simple data table for blog posts. Each row is a list of cell strings;
 * the first row can be shown as a header. Rendered by BlogPortableText.
 */
export const tableBlock = defineType({
  name: "tableBlock",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
    }),
    defineField({
      name: "hasHeader",
      title: "First row is a header",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      description: "Every row should have the same number of cells.",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({
              title: Array.isArray(cells) && cells.length ? cells.join("  |  ") : "Empty row",
            }),
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { rows: "rows", caption: "caption" },
    prepare: ({ rows, caption }) => ({
      title: caption || "Table",
      subtitle: `${Array.isArray(rows) ? rows.length : 0} rows`,
    }),
  },
});
