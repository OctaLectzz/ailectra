import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

// Since we use the dynamic [locale] routing structure, the root layout
// simply acts as a pass-through wrapper for nested localized layouts.
export default function RootLayout({ children }: Props) {
  return children
}
