"use client";

import { useMemo, useState } from "react";
import { searchTools } from "@/lib/tools";
import type { Category, Tool } from "@/types/tool";
import { ToolCard } from "./ToolCard";

export function ToolBrowser({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const categoryNameById = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  const filteredTools = useMemo(
    () => searchTools(tools, query, categoryId),
    [tools, query, categoryId]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="도구 이름이나 태그로 검색해보세요 (예: 무료, 검색)"
          aria-label="도구 검색"
          className="w-full rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoryId(undefined)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              categoryId === undefined
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            전체
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setCategoryId(category.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                categoryId === category.id
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {filteredTools.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-200 py-16 text-center text-sm text-zinc-500">
          조건에 맞는 도구를 찾지 못했어요. 검색어나 카테고리를 바꿔보세요.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              categoryName={categoryNameById.get(tool.categoryId) ?? ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}
