import type { Plugin } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// V2 has its own unindexed shell. Production HTML and sitemap remain unchanged.
export function reviewHtml(html: string) {
  return html.replace(/<meta\s+name="robots"[^>]*>/g, '<meta name="robots" content="noindex, nofollow" />');
}
export default function reviewEnvironment(): Plugin {
  let outDir = 'dist';
  return {
    name: 'hic-v2-review-isolation',
    configResolved(config) { outDir = config.build.outDir; },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (/^\/v2(?:\/|\?|$)/.test(req.url || '')) res.setHeader('X-Robots-Tag', 'noindex, nofollow');
        next();
      });
    },
    transformIndexHtml(html, context) {
      return /^\/v2(?:\/|$)/.test(context.originalUrl || context.path) ? reviewHtml(html) : html;
    },
    async writeBundle() {
      const html = reviewHtml(await readFile(resolve(outDir, 'index.html'), 'utf8'));
      await mkdir(resolve(outDir, 'v2'), { recursive: true });
      await writeFile(resolve(outDir, 'v2/index.html'), html);
    },
  };
}
