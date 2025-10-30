import { notFound } from "next/navigation";
import { NewsApiService } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import CategoryClientWrapper from "./CategoryClientWrapper";

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
  searchParams: {
    page?: string;
  };
}

const validCategories = [
  "business",
  "technology",
  "sports",
  "health",
  "entertainment",
  "science",
];

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { categoryName } = params;
  const page = parseInt(searchParams.page || "1");

  if (!validCategories.includes(categoryName)) {
    notFound();
  }

  const result = await NewsApiService.getTopHeadlines("us", categoryName, page);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
          {categoryName} News
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Latest {categoryName} news and updates
        </p>

        <SearchBar />
      </div>

      {/* Articles Grid */}
      {result.articles.length > 0 ? (
        <CategoryClientWrapper
          articles={result.articles}
          pagination={result.pagination}
          categoryName={categoryName}
        />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Unable to load {categoryName} news at the moment
          </p>
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categoryName } = params;

  return {
    title: `${
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    } News - NewsPortal`,
    description: `Latest ${categoryName} news and updates from around the world`,
  };
}
