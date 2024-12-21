import React, { useState } from 'react';

const SimpleTimeCalculator = () => {
  const [dailyTime, setDailyTime] = useState(2); // Default 2 hours per day

  const calculateSavings = () => {
    const monthlyHours = dailyTime * 22; // Average working days per month
    const yearlyHours = monthlyHours * 12;
    
    return {
      daily: dailyTime * 0.9, // 90% of time saved
      monthly: monthlyHours * 0.9,
      yearly: yearlyHours * 0.9
    };
  };

  const savings = calculateSavings();

  return (
    <div className="container">
      <div className="card max-w-2xl mx-auto">
        <h2 className="heading-lg gradient-text-enhanced text-center mb-6">
          Time Savings Calculator
        </h2>
        
        <div className="mb-8">
          <label className="block text-xl text-center text-white mb-6">
            How many hours do you spend daily on repetitive tasks?
          </label>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => setDailyTime(Math.max(0.5, dailyTime - 0.5))}
              className="btn-secondary px-4 py-2"
            >
              -
            </button>
            <div className="text-3xl font-bold gradient-text min-w-[120px] text-center">
              {dailyTime} hrs
            </div>
            <button 
              onClick={() => setDailyTime(Math.min(12, dailyTime + 0.5))}
              className="btn-secondary px-4 py-2"
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-primary-800/50 backdrop-blur-sm p-6 rounded-lg border-2 border-white/10">
          <h3 className="heading-sm gradient-text text-center mb-6">Time You Could Save With Automation</h3>
          
          <div className="grid gap-6">
            <div className="card text-center">
              <p className="text-2xl gradient-text font-bold mb-2">
                {savings.daily.toFixed(1)} hours every day
              </p>
              <p className="text-white/60">More time for important decisions</p>
            </div>
            
            <div className="card text-center">
              <p className="text-2xl gradient-text font-bold mb-2">
                {savings.monthly.toFixed(0)} hours every month
              </p>
              <p className="text-white/60">More time for business growth</p>
            </div>
            
            <div className="card text-center">
              <p className="text-2xl gradient-text font-bold mb-2">
                {savings.yearly.toFixed(0)} hours every year
              </p>
              <p className="text-white/60">That's {Math.round(savings.yearly / 8)} full workdays saved!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTimeCalculator; 