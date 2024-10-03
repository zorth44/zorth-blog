import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Twitter } from 'lucide-react';

const AnimatedProfileCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="relative h-24 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="absolute -bottom-10 left-4">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden transition-all duration-300 ease-in-out hover:scale-105">
            <img src="/images/me-wr.png" alt="Zorth" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="pt-12 pb-4 px-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Zorth</h2>
            <p className="text-sm text-gray-600">爱与自由</p>
          </div>
          <div className="flex space-x-2">
            <a href="https://twitter.com/ZorthNicolas" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
              <Twitter size={20} />
            </a>
            <a href="https://github.com/zorth44" className="text-gray-600 hover:text-purple-600 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 bg-purple-600 text-white rounded-md flex items-center justify-center hover:bg-purple-700 transition-colors duration-200"
        >
          {isExpanded ? '隐藏详情' : '显示详情'}
          {isExpanded ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
        </button>
      </div>
      <div
        className={`px-4 bg-gray-50 transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-48 py-4' : 'max-h-0 py-0'
        } overflow-hidden`}
      >
        <p className="text-gray-700 text-sm mb-2">
          你好！我是Zorth，一个热爱自由和创新的开发者。我喜欢探索新技术，创造有趣的项目。
        </p>
        <p className="text-gray-700 text-sm">
          欢迎访问我的GitHub查看我的作品，或通过邮件联系我讨论合作机会。
        </p>
      </div>
    </div>
  );
};

export default AnimatedProfileCard;