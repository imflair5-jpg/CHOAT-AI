import Link from "next/link";
import type { Tool } from "@/types/tool";

const PRICE_STYLES: Record<Tool["priceType"], string> = {
  무료: "bg-emerald-50 text-emerald-700",
  부분유료: "bg-amber-50 text-amber-700",
  유료: "bg-zinc-100 text-zinc-700",
};

export function ToolCard({
  tool,
  categoryName,
}: {
  tool: Tool;
  categoryName: string;
}) {
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl" aria-hidden>
          {tool.logoEmoji}
        </span>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${PRICE_STYLES[tool.priceType]}`}
        >
          {tool.priceType}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-zinc-900 group-hover:underline">
          {tool.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-600">
          {tool.oneLiner}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1 text-xs text-zinc-500">
        <span className="rounded-full bg-zinc-100 px-2 py-0.5">
          {categoryName}
        </span>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5">
          {tool.difficulty}
        </span>
        {tool.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full bg-zinc-100 px-2 py-0.5">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
