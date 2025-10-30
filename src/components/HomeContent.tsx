"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NewsArticle, PaginationInfo } from "@/types/news";
import { NewsApiService } from "@/lib/api";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";

const categories = [
  { value: "", label: "All News" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "sports", label: "Sports" },
  { value: "health", label: "Health" },
  { value: "entertainment", label: "Entertainment" },
  { value: "science", label: "Science" },
];

export default function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const pageParam = searchParams.get("page") || "1";

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const page = parseInt(pageParam) || 1;
        let result;

        if (searchQuery) {
          result = await NewsApiService.searchNews(searchQuery, page);
        } else if (categoryParam) {
          result = await NewsApiService.getTopHeadlines(
            "us",
            categoryParam,
            page
          );
        } else {
          result = await NewsApiService.getTopHeadlines("us", undefined, page);
        }

        setArticles(result.articles);
        setPagination(result.pagination);
      } catch (err) {
        setError("Failed to fetch news. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [searchQuery, categoryParam, pageParam]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    // Reset to page 1 when changing category or clearing filters
    params.set("page", "1");

    // Clear search when changing category
    params.delete("search");

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`, { scroll: false });

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("search", query.trim());
    }

    // Reset to page 1 when searching
    params.set("page", "1");

    // Clear category when searching
    params.delete("category");

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    if (categoryParam) {
      const category = categories.find((cat) => cat.value === categoryParam);
      return `${category?.label} News`;
    }
    return "Latest News";
  };

  const getPageDescription = () => {
    if (searchQuery) {
      return `Found ${pagination.totalResults} articles matching your search`;
    }
    if (categoryParam) {
      return `Latest ${categoryParam} news and updates from around the world`;
    }
    return "Stay updated with the latest headlines from around the world";
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <h1 className="text-5xl font-extrabold  bg-clip-text mb-2 text-white">
              Latest News
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {getPageDescription()}
          </p>

          <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <CategoryFilter
            categories={categories}
            selectedCategory={categoryParam}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="transform hover:scale-[1.02] transition-transform duration-200"
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-gray-400">📰</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No articles found
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {searchQuery
                ? "Try adjusting your search terms or browse different categories"
                : "Unable to load news at the moment. Please try again later."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
