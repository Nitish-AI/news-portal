"use client";

export default function BackButton() {
  return (
    <button
      className="text-right mt-1 text-gray-600 bg-gray-300 cursor-pointer p-2.5 rounded"
      type="button"
      onClick={() => window.history.back()}
    >
      Back to previous
    </button>
  );
}
