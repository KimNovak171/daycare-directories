import { MetadataRoute } from "next";
import { getStateSlugs, getCitiesForState } from "@/lib/data";
import { CANADA_PROVINCES, provinceToSlug } from "@/lib/canada";

const SITE_URL = "https://www.daycaredirectories.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/advertise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/canada`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // USA state and city pages (from data: all states/regions with facility files, including Washington D.C.)
  const stateSlugs = getStateSlugs();
  for (const stateSlug of stateSlugs) {
    entries.push({
      url: `${SITE_URL}/${stateSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
    const cities = getCitiesForState(stateSlug);
    for (const city of cities) {
      entries.push({
        url: `${SITE_URL}/${stateSlug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Canada province pages
  for (const provinceName of CANADA_PROVINCES) {
    const provinceSlug = provinceToSlug(provinceName);
    entries.push({
      url: `${SITE_URL}/canada/${provinceSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}
