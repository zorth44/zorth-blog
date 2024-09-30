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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-400">
      <Link href={`/post/${post.slug}`}>
        <div className="p-6 transition-colors duration-300 hover:bg-blue-50">
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500">{post.date}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-blue-500 font-medium">{post.category}</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-blue-600">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600">
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