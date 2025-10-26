// app/news/[id]/NewsDetailContent.tsx
"use client";

import React from "react";
import Image from "next/image";

interface Props {
  article: {
    title: string;
    description: string | null;
    content?: string | null;
    url: string;
    urlToImage: string | null;
    source: { name: string };
    author?: string;
    publishedAt: string;
  };
}

export default function NewsDetailContent({ article }: Props) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      {article.urlToImage && (
        <div className="relative h-96 mb-6 rounded-lg overflow-hidden">
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/no-image.png";
            }}
          />
        </div>
      )}

      <p className="text-xl text-gray-700 mb-4">{article.description}</p>

      {article.content && (
        <div className="text-gray-700 whitespace-pre-line">
          {article.content.replace(/\[\+\d+ chars\]$/, "")}
        </div>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-4 block"
      >
        Read full article at {article.source.name} →
      </a>
    </article>
  );
}
