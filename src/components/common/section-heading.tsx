import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  subtitle?: string
  /** Optional pill badge displayed above the title */
  badge?: string
  className?: string
  /** Center or left-align the heading block */
  align?: "center" | "left"
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge ? (
        <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wide text-primary">
          {badge}
        </span>
      ) : null}

      <h2
        className={cn(
          "font-heading text-3xl font-semibold tracking-tight md:text-5xl",
          badge && "mt-4"
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-7 text-muted-foreground md:text-lg",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
