import React from 'react';

interface TimeAgoProps {
  date: string | number | Date;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  const parseDate = (input: string | number | Date): Date => {
    if (input instanceof Date) return input;
    return new Date(input); // Convert string/number to Date
  };

  const timeAgo = (inputDate: string | number | Date): string => {
    const date = parseDate(inputDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
      { label: 'năm', seconds: 31536000 },
      { label: 'tháng', seconds: 2592000 },
      { label: 'ngày', seconds: 86400 },
      { label: 'giờ', seconds: 3600 },
      { label: 'phút', seconds: 60 },
      { label: 'giây', seconds: 1 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label} trước`;
      }
    }

    return 'Vừa xong';
  };

  const isLessThanADay = (inputDate: string | number | Date): boolean => {
    const date = parseDate(inputDate);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    return diffInMs < 86400000; // 1 ngày = 86,400,000 ms
  };

  const isRecent = isLessThanADay(date);

  const className = isRecent ? 'text-green-700 font-semibold bg-green-100 px-2 py-1 rounded' : 'text-gray-700 ';

  return <span className={className}>{timeAgo(date)}</span>;
};
x
export default TimeAgo;
