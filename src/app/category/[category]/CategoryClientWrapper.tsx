"use client";

import { useRouter } from "next/navigation";
import { NewsArticle, PaginationInfo } from "@/types/news";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";

interface CategoryClientWrapperProps {
  articles: NewsArticle[];
  pagination: PaginationInfo;
  categoryName: string;
}

export default function CategoryClientWrapper({
  articles,
  pagination,
  categoryName,
}: CategoryClientWrapperProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    router.push(`/category/${categoryName}?${params.toString()}`, {
      scroll: false,
    });

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
}
