import React, { useState, useEffect } from 'react';
import { Network, Search, Filter, Info, Users, Utensils } from 'lucide-react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function Clustering() {
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [result, setResult] = useState(true);
  
  const [config, setConfig] = useState({
    algorithm: 'K-Means',
    clusters: 3
  });

  const algorithms = ['K-Means', 'Hierarchical Agglomerative', 'EM / GMM'];

  const handleDiscover = () => {
    setIsDiscovering(true);
    setResult(false);
    setTimeout(() => {
      setIsDiscovering(false);
      setResult(true);
    }, 1500);
  };

  const generateClusterPoints = (numClusters) => {
    const data = [];
    const centers = Array.from({length: numClusters}).map((_, i) => ({
      x: 220 + (i * 200),
      y: 12 + (i * 11)
    }));

    for (let i = 0; i < 240; i++) {
      const clusterId = i % numClusters;
      const center = centers[clusterId];
      data.push({
        x: Math.max(50, Math.round(center.x + (Math.sin(i * 1.7) * 75) + (Math.random() * 30 - 15))),
        y: Math.max(2, parseFloat((center.y + (Math.cos(i * 1.1) * 5) + (Math.random() * 3 - 1.5)).toFixed(1))),
        cluster: clusterId,
        z: 1
      });
    }
    return data;
  };

  // Generate cluster data based on num clusters
  const [chartData, setChartData] = useState(() => generateClusterPoints(3));
  const colors = ['#0f766e', '#065f46', '#10b981', '#34d399', '#6ee7b7'];
  
  useEffect(() => {
    if (result) {
      setChartData(generateClusterPoints(config.clusters));
    }
  }, [result, config.clusters]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold text-slate-800">Food Waste Pattern Discovery</h1>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Clustering</span>
        </div>
        <p className="text-slate-500">Discover groups of records with similar consumption and waste characteristics.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-5 flex items-center">
              <Filter className="w-5 h-5 mr-2 text-primary" /> Parameters
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Algorithm</label>
                <select 
                  className="input-field" 
                  value={config.algorithm}
                  onChange={e => setConfig({...config, algorithm: e.target.value})}
                >
                  {algorithms.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex justify-between">
                  <span>Number of Clusters</span>
                  <span className="text-primary font-bold">{config.clusters}</span>
                </label>
                <input 
                  type="range" 
                  min="2" 
                  max="5" 
                  value={config.clusters}
                  onChange={e => setConfig({...config, clusters: parseInt(e.target.value)})}
                  className="w-full accent-primary" 
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>2</span>
                  <span>5</span>
                </div>
              </div>

              <button 
                onClick={handleDiscover}
                className="w-full btn-primary py-3 flex items-center justify-center"
                disabled={isDiscovering}
              >
                {isDiscovering ? (
                  <span className="flex items-center"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span> Mining...</span>
                ) : (
                  <span className="flex items-center"><Search className="w-4 h-4 mr-2" /> DISCOVER PATTERNS</span>
                )}
              </button>
            </div>
          </div>

          {result && (
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center animate-in slide-in-from-left duration-300">
              <p className="text-xs font-bold text-slate-400 mb-1 uppercase">Silhouette Score</p>
              <div className="flex items-end justify-center text-primary">
                <span className="text-3xl font-black">0.68</span>
                <span className="text-sm ml-1 text-slate-500 mb-1">/ 1.0</span>
              </div>
            </div>
          )}
        </div>

        {/* Visualization & Insights */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden min-h-[400px] flex flex-col">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
              <Network className="w-5 h-5 mr-2 text-primary" /> Cluster Visualization
            </h3>
            
            <div className="flex-1 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-center p-4">
              {result ? (
                <div className="w-full h-[320px] animate-in zoom-in-95 duration-500">
                  <ResponsiveContainer width="100%" height={320}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis type="number" dataKey="x" name="Meals Served" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                      <YAxis type="number" dataKey="y" name="Waste (kg)" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      <Tooltip 
                        cursor={{strokeDasharray: '3 3'}}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 shadow-lg rounded-xl border border-slate-100 text-sm">
                                <p className="font-bold mb-1" style={{color: colors[payload[0].payload.cluster]}}>
                                  Pattern Cluster {payload[0].payload.cluster + 1}
                                </p>
                                <p>Meals: {Math.round(payload[0].payload.x)}</p>
                                <p>Waste: {payload[0].payload.y.toFixed(2)} kg</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      {Array.from({ length: config.clusters }).map((_, cIdx) => (
                        <Scatter 
                          key={cIdx} 
                          name={`Cluster ${cIdx + 1}`} 
                          data={chartData.filter(d => d.cluster === cIdx)} 
                          fill={colors[cIdx % colors.length]} 
                          isAnimationActive={false}
                        />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <Network className="w-12 h-12 mb-3 text-slate-200 mx-auto" />
                  <p>Run algorithm to view pattern clusters</p>
                </div>
              )}
            </div>
          </div>

          {/* Insights */}
          {result && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-bottom duration-500">
              {Array.from({length: config.clusters}).map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{backgroundColor: colors[i]}}></div>
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center" style={{color: colors[i]}}>
                    <span className="w-6 h-6 rounded flex items-center justify-center text-white text-xs mr-2" style={{backgroundColor: colors[i]}}>{i+1}</span>
                    Similar Food-Waste Pattern
                  </h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <span className="text-slate-500 flex items-center"><Users className="w-3.5 h-3.5 mr-1.5" /> Records</span>
                      <span className="font-semibold text-slate-700">{Math.floor(300 / config.clusters) + Math.floor(Math.random()*10-5)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <span className="text-slate-500 flex items-center"><Utensils className="w-3.5 h-3.5 mr-1.5" /> Avg Meals</span>
                      <span className="font-semibold text-slate-700">{Math.floor(300 + Math.random()*500)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Avg Waste</span>
                      <span className="font-bold" style={{color: colors[i]}}>{(10 + Math.random()*20).toFixed(1)} kg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
