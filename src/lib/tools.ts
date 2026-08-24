import categoriesData from "../../data/categories.json";
import toolsData from "../../data/tools.json";
import type { Category, Tool } from "@/types/tool";

const categories = categoriesData as Category[];
const tools = toolsData as Tool[];

export function getAllCategories(): Category[] {
  return [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllTools(): Tool[] {
  return tools;
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function searchTools(
  allTools: Tool[],
  query: string,
  categoryId?: string
): Tool[] {
  const normalizedQuery = query.trim().toLowerCase();

  return allTools.filter((tool) => {
    if (categoryId && tool.categoryId !== categoryId) return false;
    if (!normalizedQuery) return true;

    const haystack = [tool.name, tool.oneLiner, ...tool.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}
