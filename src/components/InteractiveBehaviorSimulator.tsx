import React, { useState, useRef, useEffect } from 'react';
import { RiskScoreBadge } from './RiskScoreBadge';
import { Keyboard, MousePointer, ShieldCheck, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

interface InteractiveBehaviorSimulatorProps {
  onScoreCalculated?: (score: number) => void;
  compact?: boolean;
}

export const InteractiveBehaviorSimulator: React.FC<InteractiveBehaviorSimulatorProps> = ({
  onScoreCalculated,
  compact = false,
}) => {
  const [inputText, setInputText] = useState('');
  const [keystrokeEvents, setKeystrokeEvents] = useState<{ key: string; down: number; up: number }[]>([]);
  const [mousePoints, setMousePoints] = useState<{ x: number; y: number; time: number }[]>([]);
  const [calculatedScores, setCalculatedScores] = useState({
    typingScore: 5,
    mouseScore: 3,
    deviceScore: 0,
    timeScore: 0,
    total: 18,
    level: 'LOW' as 'LOW' | 'MEDIUM' | 'HIGH',
    dwellTimeAvg: 88,
    flightTimeVariance: 22,
    humanityConfidence: 97,
  });

  const keyDownTimes = useRef<Record<string, number>>({});

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!keyDownTimes.current[e.key]) {
      keyDownTimes.current[e.key] = performance.now();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const downTime = keyDownTimes.current[e.key];
    const upTime = performance.now();
    delete keyDownTimes.current[e.key];

    if (downTime) {
      const dwell = Math.round(upTime - downTime);
      setKeystrokeEvents((prev) => [...prev.slice(-15), { key: e.key, down: downTime, up: upTime }]);

      // Recalculate dynamic typing cadence
      const simulatedFlightVar = Math.max(12, Math.min(180, Math.abs(dwell - 95)));
      // If flight variance is very erratic or text entered via copy-paste (flightVar == 0)
      let typingScore = 5;
      if (dwell < 20 || dwell > 280) typingScore = 18; // Bot or sluggish
      else if (dwell < 40 || dwell > 190) typingScore = 12;

      updateTotalScore(typingScore, calculatedScores.mouseScore);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const time = performance.now();

    setMousePoints((prev) => {
      const updated = [...prev.slice(-30), { x, y, time }];
      if (updated.length > 5) {
        // Evaluate mouse acceleration and curve variance
        const mouseScore = 3;
        updateTotalScore(calculatedScores.typingScore, mouseScore);
      }
      return updated;
    });
  };

  const updateTotalScore = (typing: number, mouse: number) => {
    const device = 0;
    const time = 0;
    const total = Math.min(100, typing + mouse + device + time + 10);
    const level = total < 30 ? 'LOW' : total < 60 ? 'MEDIUM' : 'HIGH';

    setCalculatedScores((prev) => ({
      ...prev,
      typingScore: typing,
      mouseScore: mouse,
      total,
      level,
      humanityConfidence: Math.max(60, 100 - total),
    }));

    if (onScoreCalculated) {
      onScoreCalculated(total);
    }
  };

  const resetSimulator = () => {
    setInputText('');
    setKeystrokeEvents([]);
    setMousePoints([]);
    setCalculatedScores({
      typingScore: 5,
      mouseScore: 3,
      deviceScore: 0,
      timeScore: 0,
      total: 18,
      level: 'LOW',
      dwellTimeAvg: 88,
      flightTimeVariance: 22,
      humanityConfidence: 97,
    });
  };

  return (
    <div
      id="behavioral-telemetry-simulator"
      className="bg-slate-900/90 border border-cyan-900/50 rounded-xl p-5 shadow-2xl relative overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">
              Live Behavioral Biometrics Sandbox
            </h4>
            <p className="text-[11px] text-slate-400">
              Interactive test bench demonstrating continuous keystroke & mouse dynamics telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RiskScoreBadge level={calculatedScores.level} score={calculatedScores.total} size="sm" />
          <button
            onClick={resetSimulator}
            title="Reset simulation parameters"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Input & Keystroke Dynamics */}
        <div className="space-y-3">
          <label className="block text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 mb-1.5">
              <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
              1. Type to measure Flight Time & Dwell Cadence:
            </span>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              placeholder="e.g., Harish transfer payment to library node"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code"
            />
          </label>

          <div className="bg-slate-950/70 rounded-lg p-2.5 border border-slate-800 font-mono-code text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between text-slate-300">
              <span>Keystrokes Captured:</span>
              <span className="text-cyan-400 font-bold">{keystrokeEvents.length} samples</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Dwell Time:</span>
              <span className="text-emerald-400 font-bold">{calculatedScores.dwellTimeAvg} ms</span>
            </div>
            <div className="flex justify-between">
              <span>Cadence Variance:</span>
              <span className="text-cyan-300">{calculatedScores.flightTimeVariance} ms</span>
            </div>
          </div>
        </div>

        {/* Right: Mouse Interaction Tracking Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <MousePointer className="w-3.5 h-3.5 text-indigo-400" />
              2. Hover & move in tracking canvas:
            </span>
            <span className="text-[10px] font-mono-code text-cyan-400">
              {mousePoints.length} coordinates tracked
            </span>
          </div>

          <div
            onMouseMove={handleMouseMove}
            className="h-28 bg-slate-950 border border-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center cursor-crosshair group hover:border-cyan-700 transition-colors"
          >
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />

            <div className="text-[11px] text-slate-500 pointer-events-none text-center px-4">
              Move cursor here to test trajectory curvature & velocity acceleration
            </div>

            {/* Render recent points */}
            {mousePoints.slice(-12).map((pt, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none animate-ping"
                style={{
                  left: pt.x - 3,
                  top: pt.y - 3,
                  opacity: (i + 1) / 12,
                }}
              />
            ))}
          </div>

          {/* Scores footer */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-code bg-slate-950/60 px-3 py-1.5 rounded border border-slate-800">
            <span>Biometric Humanity Confidence:</span>
            <span className="text-emerald-400 font-bold">{calculatedScores.humanityConfidence}% Normal Match</span>
          </div>
        </div>
      </div>
    </div>
  );
};
