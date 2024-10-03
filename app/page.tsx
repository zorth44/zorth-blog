'use client'

import React, { useState } from 'react';
import MainContent from '../components/MainContent';
import Calendar from '../components/Calendar';
import AnimatedProfileCard from '../components/AnimatedProfileCard';
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">你好，欢迎来到Zorth的博客</h1>
      <div className="flex flex-wrap -mx-4">
        {/* 左侧主要内容区 */}
        <MainContent posts={[]} />

        {/* 右侧侧边栏 */}
        <div className="w-full lg:w-1/3 px-4 mt-8 lg:mt-0">
        <div className="mb-6">
            <AnimatedProfileCard />
          </div>

          <div className="mb-6">
            <Calendar />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold mb-4">热门标签</h3>
            <div className="flex flex-wrap gap-2">
              <Tag text="VitePress" count={3} />
              <Tag text="Vue" count={2} />
              <Tag text="主题" count={2} />
              {/* 添加更多标签 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Tag: React.FC<{ text: string; count: number }> = ({ text, count }) => (
  <span className="bg-gray-200 text-sm px-2 py-1 rounded">{text}<sup>{count}</sup></span>
);
