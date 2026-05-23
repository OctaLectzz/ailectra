import { createMetadata } from "@/lib/seo"
import { FeaturesContent } from "./features-content"

export const metadata = createMetadata({
  title: "Features — Ailectra",
  description:
    "Explore AI account management, secure vault, quick launch, and animated dashboard features.",
  path: "/features",
})

export default function FeaturesPage() {
  return <FeaturesContent />
}
