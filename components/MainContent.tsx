import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination'; // 假设我们有一个 Pagination 组件

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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // 每页显示的文章数量

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  // 计算当前页面应该显示的文章
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 处理页面变化
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <div className="w-full lg:w-2/3 px-4">正在加载文章...</div>;
  }

  return (
    <div className="w-full lg:w-2/3 px-4">
      <nav className="flex flex-wrap gap-2 mb-6">
        {/* ... NavLinks ... */}
      </nav>

      <div className="space-y-6">
        {currentPosts.map((post) => (
          <ArticleCard
            key={post.slug}
            post={post}
          />
        ))}
      </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MainContent;