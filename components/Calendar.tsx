
import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [nextHoliday, setNextHoliday] = useState({ name: '', date: new Date(), daysUntil: 0 });
  const [progress, setProgress] = useState({
    today: 0,
    week: 0,
    month: 0,
    year: 0
  });

  const chineseHolidays = [
    { name: '元旦', month: 1, day: 1 },
    { name: '春节', month: 1, day: 25 }, // 假设2025年春节日期
    { name: '清明节', month: 4, day: 5 },
    { name: '劳动节', month: 5, day: 1 },
    { name: '端午节', month: 6, day: 10 }, // 假设2024年端午节日期
    { name: '中秋节', month: 9, day: 17 }, // 假设2024年中秋节日期
    { name: '国庆节', month: 10, day: 1 },
  ];

  const calculateNextHoliday = () => {
    const today = new Date();
    let nextHoliday = null;
    let minDaysDiff = Infinity;

    chineseHolidays.forEach(holiday => {
      const holidayDate = new Date(today.getFullYear(), holiday.month - 1, holiday.day);
      if (holidayDate < today) {
        holidayDate.setFullYear(holidayDate.getFullYear() + 1);
      }
      const daysDiff = Math.ceil((holidayDate - today) / (1000 * 60 * 60 * 24));
      if (daysDiff < minDaysDiff) {
        minDaysDiff = daysDiff;
        nextHoliday = {
          name: holiday.name,
          date: holidayDate,
          daysUntil: daysDiff
        };
      }
    });

    setNextHoliday(nextHoliday);
  };

  const calculateProgress = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31);

    setProgress({
      today: ((now - startOfDay) / (endOfDay - startOfDay)) * 100,
      week: ((now - startOfWeek) / (endOfWeek - startOfWeek)) * 100,
      month: ((now - startOfMonth) / (endOfMonth - startOfMonth)) * 100,
      year: ((now - startOfYear) / (endOfYear - startOfYear)) * 100
    });
  };

  useEffect(() => {
    const updateAll = () => {
      calculateNextHoliday();
      calculateProgress();
    };

    updateAll();
    const timer = setInterval(updateAll, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const progressItems = [
    { key: 'today', label: '今日', icon: '日', remaining: `还剩 ${24 - new Date().getHours()} 小时` },
    { key: 'week', label: '本周', icon: '周', remaining: `还剩 ${7 - new Date().getDay()} 天` },
    { key: 'month', label: '本月', icon: '月', remaining: `还剩 ${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()} 天` },
    { key: 'year', label: '本年', icon: '年', remaining: `还剩 ${365 - Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24))} 天` }
  ];

  return (
    <div 
      className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-lg p-6 flex items-stretch w-full mx-auto font-sans"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="text-center mr-3 flex-none w-1/3 bg-white rounded-xl shadow-inner p-4 flex flex-col justify-center items-center transform transition-all duration-300 hover:scale-105">
        <span className="text-xs text-indigo-600 font-semibold mb-2">距离{nextHoliday.name}</span>
        <div className="text-5xl font-bold text-indigo-800 mb-2">{nextHoliday.daysUntil}</div>
        <div className="text-xs text-gray-500 flex items-center">
          {nextHoliday.date.toLocaleDateString()}
        </div>
      </div>
      <div className="w-px h-auto self-stretch bg-indigo-200 mx-4"></div>
      <div className="flex-grow space-y-3">
        {progressItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center space-x-3"
          >
            <span className="text-sm font-medium text-indigo-700 w-8 flex items-center justify-center">
              <span className="text-lg font-bold">{item.icon}</span>
            </span>
            <div className="relative flex-grow h-6 bg-indigo-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${progress[item.key]}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="relative h-full w-full">
                  <div className={`absolute inset-0 flex items-center justify-center text-xs font-semibold transition-all duration-300 ${progress[item.key] > 50 ? 'text-white' : 'text-indigo-800'} ${isHovering ? 'opacity-0 transform -translate-y-full' : 'opacity-100'}`}>
                    {progress[item.key].toFixed(0)}%
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center text-xs font-semibold transition-all duration-300 ${progress[item.key] > 50 ? 'text-white' : 'text-indigo-800'} ${isHovering ? 'opacity-100' : 'opacity-0 transform translate-y-full'}`}>
                    {item.remaining}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
