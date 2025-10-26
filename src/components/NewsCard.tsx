"use client";
import { useRouter } from "next/navigation";

type NewsCardProps = {
  id: string; // unique identifier for routing
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
};

export default function NewsCard({
  id,
  title,
  description,
  imageUrl,
  category,
  date,
}: NewsCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={imageUrl || "/images/no-image.png"}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-sm text-blue-600 font-semibold">{category}</span>
        <h2 className="text-black text-xl font-bold mt-2">{title}</h2>
        <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>
        <button
          className="text-blue-600 mt-2 font-semibold"
          onClick={() => router.push(`/news/${id}`)}
        >
          Read More
        </button>
        <p className="text-gray-400 text-sm mt-3">{date}</p>
      </div>
    </div>
  );
}
