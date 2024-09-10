import { useState, useRef } from 'react';

const Tab = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
    <img src={icon} alt={title} className="w-24 h-24 mb-4" />
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-sm text-gray-600 text-center">{description}</p>
    <div className="flex mt-4">
      <button className="mx-2 px-4 py-2 bg-gray-800 text-white rounded-md">←</button>
      <button className="mx-2 px-4 py-2 bg-gray-800 text-white rounded-md">→</button>
    </div>
  </div>
);

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const touchStartX = useRef(null);

  const tabs = [
    {
      icon: "https://placehold.co/100x100?text=👩‍⚕️",
      title: "Hassle-Free Virtual Doctor Consultation",
      description: "Connect hassle-free with virtual doctor consultations for personalized advice."
    },
    {
      icon: "https://placehold.co/100x100?text=🦠",
      title: "AI-Powered Symptom Checker",
      description: "Quickly assess your health with our AI-powered symptom checker."
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

  const handlePrevTab = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  const handleNextTab = () => {
    if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full ">
      <div 
        className="w-full max-w-md"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mb-4 bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((activeTab + 1) / tabs.length) * 100}%` }}
          ></div>
        </div>
        <Tab {...tabs[activeTab]} />
      </div>
      <div className="mt-4 flex justify-center">
        <button 
          onClick={handlePrevTab} 
          disabled={activeTab === 0}
          className="mx-2 px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          onClick={handleNextTab} 
          disabled={activeTab === tabs.length - 1}
          className="mx-2 px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}