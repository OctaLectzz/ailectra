import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

type CreateMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
}

/**
 * Generate consistent SEO metadata for any page.
 * Includes canonical URL, locale alternates, OpenGraph, and Twitter cards.
 */
export function createMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
}: CreateMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/en${path}`,
        id: `${siteConfig.url}/id${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
