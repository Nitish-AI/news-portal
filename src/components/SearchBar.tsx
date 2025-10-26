"use client";
import React, { useState } from "react";

type SearchBarProps = {
    onSearch: (query: string) => void;
    onReset?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch ,onReset}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
    };
    
    const handleReset = () => {
        setQuery("");
        
        if (onReset) onReset();
        
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center mb-6"
    >
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-80 sm:w-96 p-2 border text-black border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
      >
        Search
          </button>
          {query&&(
          <button
        type="submit" onClick={handleReset}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-2"
      >
        Reset
      </button>)}
    </form>
  );
};

export default SearchBar;
