"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";
import { fetchTopHeadlines, Article, stripHtml } from "@/lib/api";
import Link from "next/link";

export default function HomePage() {
  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getNews = async () => {
      try {
        const articles = await fetchTopHeadlines();
        setNews(articles);
        setFilteredNews(articles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) return setFilteredNews(news);
    const results = news.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(results);
  };

  const handleReset = () => setFilteredNews(news);

  const handleReadMore = (url: string) => {
    router.push(`/news/${encodeURIComponent(url)}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-black text-3xl font-bold mb-4 text-center">Latest News</h1>

      <SearchBar onSearch={handleSearch} onReset={handleReset} />

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading news...</p>
      ) : filteredNews.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No articles found. Try another keyword.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article, idx) => (
            <NewsCard
  key={idx}
  id={encodeURIComponent(article.url)} // use encoded URL as id
  title={article.title}
  description={article.description || "No description available."}
  imageUrl={article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image"}
  category={article.source.name}
  date={new Date(article.publishedAt).toLocaleDateString()}
/>

          ))}
        </div>
      )}
    </main>
  );
}
