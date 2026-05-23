import { createMetadata } from "@/lib/seo"
import { AboutContent } from "./about-content"

export const metadata = createMetadata({
  title: "About — Ailectra",
  description:
    "The future of AI account management, built for professionals who demand more.",
  path: "/about",
})

export default function AboutPage() {
  return <AboutContent />
}
