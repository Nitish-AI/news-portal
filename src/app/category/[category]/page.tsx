"use client";
import { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard";
import { fetchNewsByCategory, Article } from "@/lib/api";
import { usePathname } from "next/navigation";

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure category is lowercase to match NewsAPI
  const category = params.categoryName?.toLowerCase() || "";

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNewsByCategory(category);
        if (!data || data.length === 0) {
          setError("No news found for this category.");
        } else {
          setArticles(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading news...</p>;

  if (error)
    return <p className="text-center mt-10 text-gray-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize text-center">
        {category} News
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <NewsCard
            key={idx}
            id={encodeURIComponent(article.url)}
            title={article.title}
            description={article.description || "No description available."}
            imageUrl={
              article.urlToImage ||
              "https://via.placeholder.com/400x200?text=No+Image"
            }
            category={article.source.name}
            date={new Date(article.publishedAt).toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
}
