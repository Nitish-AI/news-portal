"use client";

interface Category {
  value: string;
  label: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${
                selectedCategory === category.value
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }
              hover:scale-105 active:scale-95
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Active filter indicator */}
      {selectedCategory && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
            <span>
              Showing:{" "}
              {categories.find((cat) => cat.value === selectedCategory)?.label}
            </span>
            <button
              onClick={() => onCategoryChange("")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Clear filter"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
