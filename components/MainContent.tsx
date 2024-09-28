import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch('http://localhost:8492/api/posts');
    if (!response.ok) {
      throw new Error('获取文章失败');
    }
    return await response.json();
  } catch (error) {
    console.error('获取文章时出错:', error);
    return [];
  }
};

const MainContent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return <div className="w-full lg:w-2/3 px-4">正在加载文章...</div>;
  }

  return (
    <div className="w-full lg:w-2/3 px-4">
      <nav className="flex flex-wrap gap-2 mb-6">
        {/* ... NavLinks ... */}
      </nav>

      <div className="space-y-6">
        {posts.map((post) => (
          <ArticleCard
            key={post.slug}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;