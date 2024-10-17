import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface Props {
  missionStatus: string;
}

const PlanetarySurfaceAnalysis: React.FC<Props> = ({ missionStatus }) => {
  const [analysisResult, setAnalysisResult] = useState('');
  const [surfaceImage, setSurfaceImage] = useState('');

  useEffect(() => {
    if (missionStatus === 'Active') {
      setSurfaceImage('https://source.unsplash.com/400x300/?mars,surface');
    }
  }, [missionStatus]);

  const analyzeSurface = () => {
    setAnalysisResult('Analyzing...');
    setTimeout(() => {
      const features = ['crater', 'mountain', 'valley', 'plain'];
      const feature = features[Math.floor(Math.random() * features.length)];
      const lat = (Math.random() * 180 - 90).toFixed(2);
      const lon = (Math.random() * 360 - 180).toFixed(2);
      setAnalysisResult(`Analysis complete: ${feature} detected at coordinates ${lat}°N, ${lon}°E`);
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Globe className="mr-2" /> Planetary Surface Analysis
      </h2>
      <p className="mb-4">
        AI-powered image processing for terrain classification and anomaly detection.
      </p>
      {surfaceImage && (
        <img src={surfaceImage} alt="Planetary Surface" className="w-full h-48 object-cover mb-4 rounded" />
      )}
      <button
        onClick={analyzeSurface}
        disabled={missionStatus !== 'Active'}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        Analyze Surface
      </button>
      <p className="mt-4">{analysisResult}</p>
    </div>
  );
};

export default PlanetarySurfaceAnalysis;