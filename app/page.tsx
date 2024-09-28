'use client'

import React, { useState } from 'react';
import MainContent from '../components/MainContent';
import Calendar from '../components/Calendar';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">你好，欢迎来到無名小栈</h1>
      <p className="text-center text-gray-600 mb-8">这瓜多少钱一斤？</p>

      <div className="flex flex-wrap -mx-4">
        {/* 左侧主要内容区 */}
        <MainContent posts={[]} />

        {/* 右侧侧边栏 */}
        <div className="w-full lg:w-1/3 px-4 mt-8 lg:mt-0">
          <div className="bg-indigo-600 text-white p-6 rounded-lg mb-6">
            <div className="text-center mb-4">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-2"></div>
              <h2 className="text-xl font-bold">無名</h2>
              <p className="text-sm">分享技术与科技生活</p>
            </div>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-gray-200"><FaGithub size={24} /></a>
              <a href="#" className="hover:text-gray-200"><FaEnvelope size={24} /></a>
            </div>
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
