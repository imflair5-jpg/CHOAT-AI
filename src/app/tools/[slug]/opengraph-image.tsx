import { ImageResponse } from "next/og";
import { getAllTools, getCategoryById, getToolById } from "@/lib/tools";

export const alt = "첫AI 도구 카드";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolById(slug);
  const category = tool ? getCategoryById(tool.categoryId) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ fontSize: 120, display: "flex" }}>
            {tool?.logoEmoji ?? "✨"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 56, fontWeight: 700, color: "#18181b" }}>
              {tool?.name ?? "첫AI"}
            </div>
            {category && (
              <div style={{ fontSize: 28, color: "#71717a", display: "flex" }}>
                {category.icon} {category.name}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            fontSize: 34,
            color: "#3f3f46",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          {tool?.oneLiner ?? "처음 써보기 좋은 AI 도구 모음"}
        </div>

        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#18181b",
            display: "flex",
          }}
        >
          첫AI
        </div>
      </div>
    ),
    { ...size }
  );
}
