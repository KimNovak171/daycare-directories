import { MetadataRoute } from "next";
import { getStateSlugs, getCitiesForState } from "@/lib/data";
import { US_STATES, stateToSlug } from "@/lib/states";
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

  // USA state pages
  for (const stateName of US_STATES) {
    const stateSlug = stateToSlug(stateName);
    entries.push({
      url: `${SITE_URL}/${stateSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // USA city pages
  for (const stateName of US_STATES) {
    const stateSlug = stateToSlug(stateName);
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
