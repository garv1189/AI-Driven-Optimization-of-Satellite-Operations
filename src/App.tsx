import React, { useState } from 'react';
import { Satellite, Globe, Radio, Wrench } from 'lucide-react';
import AutonomousPathOptimization from './components/AutonomousPathOptimization';
import PlanetarySurfaceAnalysis from './components/PlanetarySurfaceAnalysis';
import RealTimeDataTransmission from './components/RealTimeDataTransmission';
import PredictiveMaintenance from './components/PredictiveMaintenance';

function App() {
  const [missionStatus, setMissionStatus] = useState('Idle');

  const startMission = () => {
    setMissionStatus('Active');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-4">AI-Driven Satellite Operations</h1>
      <div className="text-center mb-8">
        <button
          onClick={startMission}
          className="bg-red-500 text-white px-6 py-3 rounded-full text-xl font-semibold hover:bg-red-600 transition-colors"
        >
          {missionStatus === 'Idle' ? 'Start Mission' : 'Mission Active'}
        </button>
        <p className="mt-2 text-lg">Mission Status: {missionStatus}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AutonomousPathOptimization missionStatus={missionStatus} />
        <PlanetarySurfaceAnalysis missionStatus={missionStatus} />
        <RealTimeDataTransmission missionStatus={missionStatus} />
        <PredictiveMaintenance missionStatus={missionStatus} />
      </div>
    </div>
  );
}

export default App;