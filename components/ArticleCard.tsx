import React from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
}

const ArticleCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link href={`/post/${post.slug}`}>
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500">{post.date}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-blue-500">{post.category}</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 text-sm px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;