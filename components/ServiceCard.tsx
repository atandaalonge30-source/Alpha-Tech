
import React from 'react';

interface ServiceCardProps {
  title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title }) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white border-l-4 border-[#FFCC00] rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="w-2 h-2 rounded-full bg-[#FFCC00]"></div>
      <span className="text-slate-700 font-medium text-sm">{title}</span>
    </div>
  );
};

export default ServiceCard;
