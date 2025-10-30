"use client";

import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Share:
      </span>

      <div className="flex space-x-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-800 hover:bg-blue-900 text-white rounded-full transition-colors duration-200"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors duration-200"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        <button
          onClick={copyToClipboard}
          className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors duration-200"
          aria-label="Copy link"
        >
          <Link2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
