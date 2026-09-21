import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { vehicles } from "@/data/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" | "weekly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/vehicles", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/process", priority: 0.8, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/brand", priority: 0.4, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
  ];

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${site.url}/vehicles/${v.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...pages.map((page) => ({
      url: `${site.url}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...vehiclePages,
  ];
}
