import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import config from '~/config';

const Tab = ({ icon, title, description, buttonText, buttonLink }) => (
  <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-6">
    <img
      src={icon}
      alt={title}
      className="rounded-lg object-scale-down w-full h-auto max-w-[300px] max-h-[300px]"
    />
    <h1 className="text-4xl font-bold text-center">{title}</h1>
    <p className="text-center text-gray-600">{description}</p>
    <NavLink to={buttonLink}>
      <button 
        className="p-4 bg-custom-primary text-white rounded-full"
      >
        {buttonText}
      </button>
    </NavLink>
  </div>
);

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const touchStartX = useRef(null);

  const tabs = [
    {
      icon: "./doctor_ai.png",
      title: "Doctor AI Companion",
      description: "Meet your personal Medical AI Companion, delivering personalized care.",
      buttonText: "Talk to Doctor AI",
      buttonLink: config.routes.bodymap
    },
    {
      icon: "./symptom.png",
      title: "AI-Powered Symptom Checker",
      description: "Quickly assess your health with our AI-powered symptom checker.",
      buttonText: "Check my symptoms now!",
      buttonLink: config.routes.bodymap
    }
  ];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeTab < tabs.length - 1) {
        setActiveTab(activeTab + 1);
      } else if (diff < 0 && activeTab > 0) {
        setActiveTab(activeTab - 1);
      }
    }

    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-2 bg-gray-300 w-3/4 mx-auto rounded-full">
        <div 
          className="h-full bg-black transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${((activeTab + 1) / tabs.length) * 100}%` }}
        />
      </div>
      <div 
        className="flex-1 mt-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Tab {...tabs[activeTab]} />
      </div>
    </div>
  );
}