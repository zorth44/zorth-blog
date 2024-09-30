import React from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '../../lib/posts';

export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);

    return (
      <article className="max-w-2xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="mb-4 text-sm text-gray-600">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span className="mx-2">|</span>
          <span>{post.category}</span>
        </div>
        <div className="mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-lg mb-4">{post.excerpt}</p>
        {post.content && (
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </article>
    );
  } catch (error) {
    notFound();
  }
}