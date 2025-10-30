import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/types/news";
import { formatDate, truncateText } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const placeholderUrl =
    "https://placehold.co/400x300/e5e7eb/6b7280?text=News+Image";

  return (
    <Link href={`/news/${article.id}`}>
      <article className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group hover:border-blue-300 dark:hover:border-blue-600">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={article.image || placeholderUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== placeholderUrl) {
                target.src = placeholderUrl;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-transparent from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
            {truncateText(article.title, 80)}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
            {truncateText(
              article.description || "No description available",
              120
            )}
          </p>

          {/* Source and Date */}
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
              {article.source.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
