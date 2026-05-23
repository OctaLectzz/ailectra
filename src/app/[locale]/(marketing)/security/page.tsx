import { createMetadata } from "@/lib/seo"
import { SecurityContent } from "./security-content"

export const metadata = createMetadata({
  title: "Security — Ailectra",
  description:
    "Learn how Ailectra protects your AI account metadata and encrypted credentials.",
  path: "/security",
})

export default function SecurityPage() {
  return <SecurityContent />
}
