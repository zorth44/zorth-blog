// lib/posts.ts

interface Post {
    id: number;
    slug: string;
    title: string;
    date: string;
    category: string;
    tags: string[];
    excerpt: string;
    content?: string; // 可选，因为列表接口可能不返回完整内容
  }
  
  export async function getAllPosts(): Promise<Post[]> {
    const response = await fetch('http://localhost:8492/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  }
  
  export async function getPostBySlug(slug: string): Promise<Post> {
    const response = await fetch(`http://localhost:8492/api/posts/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  }