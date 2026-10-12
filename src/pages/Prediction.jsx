import React, { useState } from 'react';
import { LineChart as ChartIcon, Calculator, AlertCircle, Info, Gauge } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function Prediction() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState({
    value: '22.80',
    model: 'Linear Regression'
  });

  const [formData, setFormData] = useState({
    mealsServed: 500,
    kitchenStaff: 15,
    temperature: 32,
    humidity: 70,
    day: 'Monday',
    specialEvent: 'Yes',
    pastWaste: 15,
    staffExperience: 'Intermediate',
    model: 'Linear Regression'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = (e) => {
    e.preventDefault();
    setIsPredicting(true);
    setResult(null);
    
    setTimeout(() => {
      // Simulate prediction logic based on inputs to look realistic but it's a prototype
      let base = (formData.mealsServed * 0.045);
      if (formData.specialEvent === 'Yes') base *= 1.15;
      if (formData.temperature > 30) base *= 1.05;
      
      const noise = Math.random() * 2 - 1;
      
      setResult({
        value: (base + noise).toFixed(2),
        model: formData.model
      });
      setIsPredicting(false);
    }, 1200);
  };

  // Mock data for actual vs predicted
  const chartData = Array.from({length: 20}).map((_, i) => {
    const actual = 15 + Math.random() * 10;
    return {
      day: `Day ${i+1}`,
      Actual: parseFloat(actual.toFixed(2)),
      Predicted: parseFloat((actual + (Math.random() * 4 - 2)).toFixed(2))
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold text-slate-800">Food Waste Prediction</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Regression</span>
        </div>
        <p className="text-slate-500">Estimate the expected food waste based on operational conditions.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary" /> Input Parameters
          </h3>
          
          <form onSubmit={handlePredict} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Meals Served</label>
                <input type="number" name="mealsServed" value={formData.mealsServed} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kitchen Staff</label>
                <input type="number" name="kitchenStaff" value={formData.kitchenStaff} onChange={handleChange} className="input-field" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Temperature (°C)</label>
                <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Humidity (%)</label>
                <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} className="input-field" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Day</label>
                <select name="day" value={formData.day} onChange={handleChange} className="input-field">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Special Event</label>
                <select name="specialEvent" value={formData.specialEvent} onChange={handleChange} className="input-field">
                  <option>Yes</option><option>No</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Past Waste (kg)</label>
                <input type="number" name="pastWaste" value={formData.pastWaste} onChange={handleChange} className="input-field" step="0.1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Staff Experience</label>
                <select name="staffExperience" value={formData.staffExperience} onChange={handleChange} className="input-field">
                  <option>Beginner</option><option>Intermediate</option><option>Expert</option>
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-1">Model Selection</label>
              <select name="model" value={formData.model} onChange={handleChange} className="input-field bg-slate-100 border-slate-200 focus:bg-white">
                <option>Linear Regression</option>
                <option>KNN Regression</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full btn-primary py-3.5 text-lg flex items-center justify-center mt-6 disabled:opacity-70"
              disabled={isPredicting}
            >
              {isPredicting ? (
                <span className="flex items-center"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span> Processing...</span>
              ) : 'PREDICT FOOD WASTE'}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            {result ? (
              <div className="text-center animate-in zoom-in-95 duration-300 z-10">
                <p className="text-slate-500 font-medium uppercase tracking-wider mb-2">Predicted Food Waste</p>
                <div className="flex items-baseline justify-center text-primary mb-6">
                  <span className="text-6xl font-black">{result.value}</span>
                  <span className="text-2xl font-bold ml-2">kg</span>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-3 bg-slate-100 rounded-full overflow-hidden relative">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-red-500"
                      style={{ width: `${Math.min(100, (parseFloat(result.value) / 50) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="inline-flex flex-col items-center bg-slate-50 border border-slate-200 rounded-xl px-6 py-3">
                  <span className="text-xs text-slate-400 font-bold uppercase">Model</span>
                  <span className="text-sm font-semibold text-slate-700">{result.model}</span>
                </div>
                
                <div className="mt-4 inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Info className="w-3.5 h-3.5 mr-1.5" /> Prototype Prediction
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 flex flex-col items-center z-10">
                <Gauge className="w-16 h-16 mb-4 text-slate-200" />
                <p className="font-medium text-lg text-slate-500">Awaiting input parameters</p>
                <p className="text-sm mt-1">Fill the form and click predict to see results</p>
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-bold text-slate-400 mb-1">MAE</p>
              <p className="text-xl font-bold text-slate-800">2.45</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-bold text-slate-400 mb-1">RMSE</p>
              <p className="text-xl font-bold text-slate-800">3.12</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <p className="text-xs font-bold text-slate-400 mb-1">R² SCORE</p>
              <p className="text-xl font-bold text-slate-800">0.82</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
              <ChartIcon className="w-5 h-5 mr-2 text-primary" /> Actual vs Predicted
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                  <Line type="monotone" dataKey="Actual" stroke="#94a3b8" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="Predicted" stroke="#065f46" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
