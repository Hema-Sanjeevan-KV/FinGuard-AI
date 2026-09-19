import React from 'react';
import { RiskLevel } from '../types';

interface RiskMeterGaugeProps {
  score: number;
  level: RiskLevel;
  size?: number;
  showLabels?: boolean;
}

export const RiskMeterGauge: React.FC<RiskMeterGaugeProps> = ({
  score,
  level,
  size = 140,
  showLabels = true,
}) => {
  // SVG Arc calculation for semi-circular speedometer gauge
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half circle
  // Clamp score between 0 and 100
  const normalizedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getColor = () => {
    if (score < 30) return '#10b981'; // Emerald
    if (score < 60) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose / Crimson
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg
          width={size}
          height={size / 2 + 10}
          viewBox={`0 0 ${size} ${size / 2 + 10}`}
          className="overflow-visible"
        >
          {/* Background Track Arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Zones indicator line segments */}
          {/* Low zone: 0 - 29% */}
          {/* Medium zone: 30 - 59% */}
          {/* High zone: 60 - 100% */}

          {/* Active Score Arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <div className="text-2xl font-bold font-mono-code text-white tracking-tight">
            {score}
            <span className="text-xs font-normal text-slate-400">/100</span>
          </div>
          <div
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              color: getColor(),
              backgroundColor: `${getColor()}15`,
            }}
          >
            {level} RISK
          </div>
        </div>
      </div>

      {showLabels && (
        <div className="w-full flex justify-between text-[10px] text-slate-500 font-mono-code px-2 mt-2 border-t border-slate-800/80 pt-1.5">
          <span className="text-emerald-500/80">0-29 Low</span>
          <span className="text-amber-500/80">30-59 Med</span>
          <span className="text-rose-500/80">60-100 High</span>
        </div>
      )}
    </div>
  );
};
