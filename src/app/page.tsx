import { ToolBrowser } from "@/components/ToolBrowser";
import { getAllCategories, getAllTools } from "@/lib/tools";

export default function Home() {
  const tools = getAllTools();
  const categories = getAllCategories();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-16 sm:px-10">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            첫AI
          </h1>
          <p className="max-w-xl text-base text-zinc-600">
            AI를 처음 써보는 사람도 부담 없이 고를 수 있도록, 검증된 AI 도구를
            카드로 정리했어요. 카테고리로 훑어보거나 검색해서 찾아보세요.
          </p>
        </header>

        <ToolBrowser tools={tools} categories={categories} />
      </main>
    </div>
  );
}
