import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';

interface Props {
  missionStatus: string;
}

const RealTimeDataTransmission: React.FC<Props> = ({ missionStatus }) => {
  const [dataTransmitted, setDataTransmitted] = useState(0);
  const [transmissionRate, setTransmissionRate] = useState(0);
  const [dataQueue, setDataQueue] = useState<string[]>([]);

  useEffect(() => {
    if (missionStatus === 'Active') {
      const dataInterval = setInterval(() => {
        setDataQueue(prev => [...prev, generateRandomData()]);
      }, 2000);

      const transmitInterval = setInterval(() => {
        setDataTransmitted((prev) => prev + transmissionRate);
        setDataQueue(prev => prev.slice(1));
      }, 1000);

      return () => {
        clearInterval(dataInterval);
        clearInterval(transmitInterval);
      };
    }
  }, [missionStatus, transmissionRate]);

  const generateRandomData = () => {
    const dataTypes = ['Telemetry', 'Image', 'Spectral', 'Atmospheric'];
    return dataTypes[Math.floor(Math.random() * dataTypes.length)];
  };

  const optimizeTransmission = () => {
    setTransmissionRate((prev) => Math.min(prev + 10, 100));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Radio className="mr-2" /> Real-Time Data Transmission
      </h2>
      <p className="mb-4">
        AI-optimized data compression and transmission prioritization.
      </p>
      <button
        onClick={optimizeTransmission}
        disabled={missionStatus !== 'Active'}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
      >
        Optimize Transmission
      </button>
      <p className="mt-4">Data Transmitted: {dataTransmitted.toFixed(2)} MB</p>
      <p>Transmission Rate: {transmissionRate.toFixed(2)} MB/s</p>
      <div className="mt-4">
        <h3 className="font-semibold">Data Queue:</h3>
        <ul className="list-disc pl-5">
          {dataQueue.slice(0, 5).map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealTimeDataTransmission;