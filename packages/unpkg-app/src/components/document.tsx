import { type VNode } from "preact";

import { useAsset } from "../hooks.ts";
import { type ImportMap } from "../import-map.ts";

export function Document({
  children,
  description = "The CDN for everything on npm",
  title = "UNPKG",
  subtitle,
  wwwOrigin = "https://unpkg.com",
}: {
  children?: VNode | VNode[];
  description?: string;
  title?: string;
  subtitle?: string;
  wwwOrigin?: string;
}): VNode {
  let importMap: ImportMap = {
    imports: {
      preact: new URL("/preact@10.25.4/dist/preact.module.js", wwwOrigin).href,
      "preact/hooks": new URL("/preact@10.25.4/hooks/dist/hooks.module.js", wwwOrigin).href,
      "preact/jsx-runtime": new URL("/preact@10.25.4/jsx-runtime/dist/jsxRuntime.module.js", wwwOrigin).href,
    },
  };

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />

        <link rel="icon" type="image/jpeg" href="/favicon.jpg" />
        <link rel="stylesheet" href={useAsset("assets/styles.css")} />
        <link rel="stylesheet" href={useAsset("assets/code-light.css")} />

        <script type="importmap" dangerouslySetInnerHTML={{ __html: JSON.stringify(importMap) }} />
        <script type="module" src={useAsset("assets/scripts.ts")} defer></script>

        <title>{subtitle == null ? title : `${title} • ${subtitle}`}</title>

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-140352188-1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-140352188-1');`,
          }}
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
