import { cn } from "@/lib/utils"
import { Container } from "./container"

type SectionProps = {
  children: React.ReactNode
  className?: string
  /** Optional background effect layer (rendered behind content at -z-10) */
  background?: React.ReactNode
  /** HTML id for anchor linking */
  id?: string
}

export function Section({
  children,
  className,
  background,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden py-16 lg:py-24",
        className
      )}
    >
      {background ? (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {background}
        </div>
      ) : null}
      <Container className="relative z-10">{children}</Container>
    </section>
  )
}
