import { notFound } from "next/navigation";
import Image from "next/image";
import { NewsApiService } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";

import BackButton from "@/app/news/[id]/BackButton";

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const article = await NewsApiService.getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Article Image */}
        <div className="relative h-96 w-full">
          <Image
            src={
              article.image ||
              "https://placehold.co/800x400/e5e7eb/6b7280?text=News+Article"
            }
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <span>
              <span className="font-medium">{article.source.name}</span>
              <span>•</span>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </span>
            {article.author && (
              <>
                <span>•</span>
                <span>By {article.author}</span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {article.description}
            </p>
          </div>

          {/* Content */}
          {article.content && (
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {article.content}
              </p>
            </div>
          )}

          {/* Share Buttons */}
          <ShareButtons
            title={article.title}
            url={typeof window !== "undefined" ? window.location.href : ""}
          />

          {/* Read More Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Read full article on {article.source.name}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            <BackButton />
          </div>
        </div>
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const article = await NewsApiService.getArticleById(id);

  if (!article) {
    return {
      title: "Article Not Found - NewsPortal",
    };
  }

  return {
    title: `${article.title} - NewsPortal`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image],
      type: "article",
    },
  };
}
