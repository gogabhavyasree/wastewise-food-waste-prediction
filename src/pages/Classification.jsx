import React, { useState } from 'react';
import { PieChart, ListFilter, Play, Info, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Classification() {
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState('MEDIUM');
  const [model, setModel] = useState('KNN');

  const models = [
    'KNN',
    'Decision Tree',
    'Naive Bayes',
    'SVM',
    'Simple Perceptron',
    'Multi-Layer Perceptron',
    'Logistic Regression'
  ];

  const handleClassify = () => {
    setIsClassifying(true);
    setResult(null);
    
    setTimeout(() => {
      const rand = Math.random();
      let level = 'LOW';
      if (rand > 0.4) level = 'MEDIUM';
      if (rand > 0.8) level = 'HIGH';
      
      setResult(level);
      setIsClassifying(false);
    }, 1000);
  };

  const levels = {
    'LOW': { color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200', icon: ShieldCheck, desc: '< 10 kg expected waste' },
    'MEDIUM': { color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200', icon: Info, desc: '10 - 20 kg expected waste' },
    'HIGH': { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', icon: AlertTriangle, desc: '> 20 kg expected waste' }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold text-slate-800">Waste Classification</h1>
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Classification</span>
        </div>
        <p className="text-slate-500">Classify food waste into meaningful waste levels.</p>
      </div>

      {/* Category Info */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(levels).map(([key, val]) => {
          const Icon = val.icon;
          return (
            <div key={key} className={`bg-white p-6 rounded-2xl border ${val.border} shadow-sm flex items-center`}>
              <div className={`w-12 h-12 rounded-full ${val.bg} flex items-center justify-center mr-4 shrink-0`}>
                <Icon className={`w-6 h-6 ${val.color}`} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{key} WASTE</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{val.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
              <ListFilter className="w-5 h-5 mr-2 text-primary" /> Configuration
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Algorithm</label>
                <div className="space-y-2">
                  {models.map(m => (
                    <label key={m} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${model === m ? 'bg-primary/5 border-primary text-primary font-medium' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                      <input 
                        type="radio" 
                        name="model" 
                        value={m} 
                        checked={model === m} 
                        onChange={(e) => setModel(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary mr-3" 
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleClassify}
                className="w-full btn-primary py-3.5 text-lg flex items-center justify-center mt-4"
                disabled={isClassifying}
              >
                {isClassifying ? (
                  <span className="flex items-center"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span> Processing...</span>
                ) : 'CLASSIFY WASTE'}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[250px] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-50/50"></div>
            
            {result ? (
              <div className="text-center z-10 animate-in zoom-in-95 duration-300">
                <p className="text-slate-500 font-medium uppercase tracking-wider mb-4">Predicted Waste Level</p>
                
                <div className={`inline-flex items-center px-8 py-4 rounded-2xl ${levels[result].bg} border ${levels[result].border} mb-6`}>
                  {result === 'LOW' && <ShieldCheck className={`w-8 h-8 mr-3 ${levels[result].color}`} />}
                  {result === 'MEDIUM' && <Info className={`w-8 h-8 mr-3 ${levels[result].color}`} />}
                  {result === 'HIGH' && <AlertTriangle className={`w-8 h-8 mr-3 ${levels[result].color}`} />}
                  
                  <span className={`text-4xl font-black tracking-tight ${levels[result].color}`}>{result} WASTE</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
                    <Info className="w-3.5 h-3.5 mr-1.5" /> Prototype Classification
                  </div>
                  <p className="text-sm text-slate-500">Based on demo input parameters using {model}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 z-10">
                <PieChart className="w-16 h-16 mb-4 text-slate-200 mx-auto" />
                <p className="font-medium text-lg text-slate-500">Awaiting Classification</p>
                <p className="text-sm mt-1">Select an algorithm and click classify</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Confusion Matrix */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4 text-center text-sm uppercase tracking-wider">Confusion Matrix</h3>
              <div className="grid grid-cols-4 gap-1 text-center text-xs">
                <div></div>
                <div className="font-bold text-slate-500 pb-2">P: L</div>
                <div className="font-bold text-slate-500 pb-2">P: M</div>
                <div className="font-bold text-slate-500 pb-2">P: H</div>
                
                <div className="font-bold text-slate-500 flex items-center justify-end pr-2">A: L</div>
                <div className="bg-emerald-100 p-3 rounded text-emerald-800 font-bold">142</div>
                <div className="bg-slate-50 p-3 rounded text-slate-600">12</div>
                <div className="bg-slate-50 p-3 rounded text-slate-600">2</div>
                
                <div className="font-bold text-slate-500 flex items-center justify-end pr-2">A: M</div>
                <div className="bg-slate-50 p-3 rounded text-slate-600">15</div>
                <div className="bg-emerald-100 p-3 rounded text-emerald-800 font-bold">98</div>
                <div className="bg-slate-50 p-3 rounded text-slate-600">14</div>
                
                <div className="font-bold text-slate-500 flex items-center justify-end pr-2">A: H</div>
                <div className="bg-slate-50 p-3 rounded text-slate-600">1</div>
                <div className="bg-slate-50 p-3 rounded text-slate-600">18</div>
                <div className="bg-emerald-100 p-3 rounded text-emerald-800 font-bold">45</div>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 text-center">P: Predicted, A: Actual | L: Low, M: Medium, H: High</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: 'Accuracy', v: '82.1%' },
                { l: 'Precision', v: '0.81' },
                { l: 'Recall', v: '0.82' },
                { l: 'F1 Score', v: '0.81' }
              ].map(m => (
                <div key={m.l} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                  <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">{m.l}</p>
                  <p className="text-xl font-bold text-slate-800">{m.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
