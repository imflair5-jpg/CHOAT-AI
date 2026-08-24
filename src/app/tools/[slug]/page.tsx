import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTools, getCategoryById, getToolById } from "@/lib/tools";

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolById(slug);
  if (!tool) return {};

  const title = `${tool.name} — 첫AI`;
  const description = tool.oneLiner;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/tools/${tool.id}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/tools/${tool.id}/opengraph-image`],
    },
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolById(slug);
  if (!tool) notFound();

  const category = getCategoryById(tool.categoryId);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16 sm:px-10">
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← 전체 도구로 돌아가기
        </Link>

        <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl" aria-hidden>
              {tool.logoEmoji}
            </span>
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">
                {tool.name}
              </h1>
              {category && (
                <p className="text-sm text-zinc-500">
                  {category.icon} {category.name}
                </p>
              )}
            </div>
          </div>

          <p className="text-base leading-7 text-zinc-700">{tool.oneLiner}</p>

          <div className="flex flex-wrap gap-2 text-sm text-zinc-600">
            <span className="rounded-full bg-zinc-100 px-3 py-1">
              난이도: {tool.difficulty}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1">
              가격: {tool.priceType}
              {tool.priceNote ? ` · ${tool.priceNote}` : ""}
            </span>
            {tool.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            {tool.name} 열어보기 ↗
          </a>
        </div>
      </main>
    </div>
  );
}
