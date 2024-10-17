import React, { useState, useEffect } from 'react';
import { Satellite } from 'lucide-react';

interface Props {
  missionStatus: string;
}

const AutonomousPathOptimization: React.FC<Props> = ({ missionStatus }) => {
  const [optimizationStatus, setOptimizationStatus] = useState('Idle');
  const [orbitData, setOrbitData] = useState({ altitude: 400, inclination: 51.6 });

  useEffect(() => {
    if (missionStatus === 'Active') {
      const interval = setInterval(() => {
        setOrbitData(prev => ({
          altitude: prev.altitude + (Math.random() - 0.5) * 2,
          inclination: prev.inclination + (Math.random() - 0.5) * 0.1
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [missionStatus]);

  const startOptimization = () => {
    setOptimizationStatus('Optimizing...');
    setTimeout(() => {
      setOptimizationStatus('Optimization complete');
      setOrbitData({ altitude: 405, inclination: 51.5 });
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Satellite className="mr-2" /> Autonomous Path Optimization
      </h2>
      <p className="mb-4">
        AI-powered trajectory adjustments for optimal satellite positioning.
      </p>
      <div className="mb-4">
        <p>Current Altitude: {orbitData.altitude.toFixed(2)} km</p>
        <p>Current Inclination: {orbitData.inclination.toFixed(2)}°</p>
      </div>
      <button
        onClick={startOptimization}
        disabled={missionStatus !== 'Active'}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Start Optimization
      </button>
      <p className="mt-4">Status: {optimizationStatus}</p>
    </div>
  );
};

export default AutonomousPathOptimization;