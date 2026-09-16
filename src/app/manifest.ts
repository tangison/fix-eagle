import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.tradingName,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#CDA666",
    icons: [
      {
        src: "/images/logo-full.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
