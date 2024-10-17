import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';

interface Props {
  missionStatus: string;
}

const PredictiveMaintenance: React.FC<Props> = ({ missionStatus }) => {
  const [maintenanceStatus, setMaintenanceStatus] = useState('All systems operational');
  const [systemHealth, setSystemHealth] = useState({
    solarPanels: 100,
    battery: 100,
    communication: 100,
    propulsion: 100,
  });

  useEffect(() => {
    if (missionStatus === 'Active') {
      const interval = setInterval(() => {
        setSystemHealth(prev => ({
          solarPanels: Math.max(prev.solarPanels - Math.random() * 0.5, 0),
          battery: Math.max(prev.battery - Math.random() * 0.3, 0),
          communication: Math.max(prev.communication - Math.random() * 0.2, 0),
          propulsion: Math.max(prev.propulsion - Math.random() * 0.1, 0),
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [missionStatus]);

  const runDiagnostics = () => {
    setMaintenanceStatus('Running diagnostics...');
    setTimeout(() => {
      const lowestSystem = Object.entries(systemHealth).reduce((a, b) => a[1] < b[1] ? a : b);
      if (lowestSystem[1] < 70) {
        setMaintenanceStatus(`Warning: ${lowestSystem[0]} efficiency at ${lowestSystem[1].toFixed(2)}%. Maintenance recommended.`);
      } else {
        setMaintenanceStatus('All systems operational. Next maintenance check scheduled in 90 days.');
      }
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Wrench className="mr-2" /> Predictive Maintenance
      </h2>
      <p className="mb-4">
        AI-driven prediction of satellite component failure or degradation.
      </p>
      <div className="mb-4">
        <h3 className="font-semibold">System Health:</h3>
        <ul>
          {Object.entries(systemHealth).map(([key, value]) => (
            <li key={key} className="flex justify-between">
              <span>{key}:</span>
              <span className={`font-semibold ${value < 70 ? 'text-red-500' : 'text-green-500'}`}>
                {value.toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={runDiagnostics}
        disabled={missionStatus !== 'Active'}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
      >
        Run Diagnostics
      </button>
      <p className="mt-4">{maintenanceStatus}</p>
    </div>
  );
};

export default PredictiveMaintenance;