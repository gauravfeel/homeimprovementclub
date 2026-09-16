import { describe, expect, it } from "vitest";
import { parseBlogMarkdown } from "@/lib/blog";

const sample = `---
title: Test post
date: 2026-09-15
category: Permits
author: Home Improvement Club
excerpt: Short lede.
draft: true
---

Body paragraph.
`;

describe("blog markdown", () => {
  it("reads frontmatter and body", () => {
    const post = parseBlogMarkdown("test-post", sample);
    expect(post.title).toBe("Test post");
    expect(post.date).toBe("2026-09-15");
    expect(post.draft).toBe(true);
    expect(post.body).toBe("Body paragraph.");
  });
});
