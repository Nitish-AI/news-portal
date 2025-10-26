import { notFound } from "next/navigation";
import { getArticleByUrl, Article } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

export default async function NewsDetailPage({ params: paramsPromise }: PageProps) {
  // Await the params promise
  const params = await paramsPromise;

  // Decode article URL from params
  const articleUrl = decodeURIComponent(params.id);

  // Fetch single article by URL
  const article: Article | null = await getArticleByUrl(articleUrl);

  if (!article) {
    notFound();
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <a href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </a>

      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      <p className="text-gray-600 mb-4">{article.description}</p>

      {article.content && (
        <div className="text-gray-700 whitespace-pre-line mb-4">
          {article.content.replace(/\[\+\d+ chars\]$/, "")}
        </div>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Read full article at {article.source.name} →
      </a>

      <p className="text-sm text-gray-400 mt-4">
        {article.source.name} | {publishedDate}
      </p>
    </div>
  );
}
