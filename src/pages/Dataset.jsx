import React, { useState, useCallback } from 'react';
import { Upload, Database, FileText, BarChart3, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import Papa from 'papaparse';
import { demoDataset } from '../data/demoDataset';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const REQUIRED_COLUMNS = [
  'Meals Served', 'Kitchen Staff', 'Temperature (°C)', 
  'Humidity (%)', 'Day', 'Special Event', 'Past Waste (kg)', 
  'Staff Experience', 'Food Waste (kg)'
];

export default function Dataset({ dataset, setDataset }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDemo, setIsDemo] = useState(!dataset);
  
  const currentData = dataset || demoDataset;
  
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processData = (csvData) => {
    if (csvData.length === 0) {
      setError("File is empty.");
      return;
    }
    
    const columns = Object.keys(csvData[0]);
    const missingCols = REQUIRED_COLUMNS.filter(col => !columns.includes(col));
    
    if (missingCols.length > 0) {
      setError(`Required columns are missing: ${missingCols.join(', ')}. Please upload the correct dataset.`);
      return;
    }
    
    // Validate some types briefly if needed
    const processed = csvData.map((row, index) => ({
      ...row,
      id: index + 1,
      'Meals Served': parseFloat(row['Meals Served']),
      'Kitchen Staff': parseFloat(row['Kitchen Staff']),
      'Temperature (°C)': parseFloat(row['Temperature (°C)']),
      'Humidity (%)': parseFloat(row['Humidity (%)']),
      'Past Waste (kg)': parseFloat(row['Past Waste (kg)']),
      'Food Waste (kg)': parseFloat(row['Food Waste (kg)'])
    })).filter(row => !isNaN(row['Food Waste (kg)']));

    setDataset(processed);
    setIsDemo(false);
    setError(null);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError("Only CSV files are supported.");
        return;
      }
      
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          processData(results.data);
        },
        error: (err) => {
          setError(`Error parsing CSV: ${err.message}`);
        }
      });
    }
  }, [setDataset]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          processData(results.data);
        },
        error: (err) => {
          setError(`Error parsing CSV: ${err.message}`);
        }
      });
    }
  };

  const loadDemoData = () => {
    setDataset(null);
    setIsDemo(true);
    setError(null);
  };

  // Metrics calculation
  const totalRecords = currentData.length;
  const features = REQUIRED_COLUMNS.length;
  
  // Calculate missing
  let missing = 0;
  currentData.forEach(row => {
    REQUIRED_COLUMNS.forEach(col => {
      if (row[col] === null || row[col] === undefined || row[col] === '' || Number.isNaN(row[col])) {
        missing++;
      }
    });
  });

  // Calculate duplicates (rough estimate based on id excluding)
  const uniqueRows = new Set(currentData.map(row => JSON.stringify({...row, id: undefined})));
  const duplicates = totalRecords - uniqueRows.size;

  // Chart data
  const dayDistribution = currentData.reduce((acc, row) => {
    const day = row['Day'];
    if (day) {
      acc[day] = (acc[day] || 0) + 1;
    }
    return acc;
  }, {});
  
  const barChartData = Object.keys(dayDistribution).map(key => ({
    name: key,
    count: dayDistribution[key]
  }));

  const scatterData = currentData.filter(d => !isNaN(d['Meals Served']) && !isNaN(d['Food Waste (kg)'])).map(d => ({
    x: d['Meals Served'],
    y: d['Food Waste (kg)'],
    z: 1
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dataset Analytics</h1>
        <p className="text-slate-500 mt-2">Explore and understand the food-waste dataset.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
          <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" />
          <p>Dataset uploaded successfully</p>
        </div>
      )}

      {/* Upload Section */}
      <div className="glass-card p-1">
        <div 
          className={cn(
            "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200",
            dragActive ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-primary">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-800">Upload Dataset</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            Drag & drop CSV here or click to browse.
          </p>
          
          <input 
            type="file" 
            accept=".csv"
            id="csv-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <label 
            htmlFor="csv-upload"
            className="btn-primary inline-flex items-center cursor-pointer"
          >
            Choose CSV File
          </label>
          <p className="text-xs text-slate-400 mt-4">Supported format: CSV</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={loadDemoData}
          className="text-primary hover:text-emerald-800 font-medium text-sm flex items-center"
        >
          <Database className="w-4 h-4 mr-1.5" />
          Use Demo Dataset
        </button>
      </div>

      {isDemo && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <Info className="w-3 h-3 mr-1.5" /> DEMO MODE
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL RECORDS', value: isDemo ? '1,000+' : totalRecords.toLocaleString() },
          { label: 'FEATURES', value: features },
          { label: 'MISSING VALUES', value: missing },
          { label: 'DUPLICATES', value: duplicates }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-xs font-bold text-slate-400 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Data Dictionary */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" /> Data Dictionary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Feature</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { f: 'Meals Served', t: 'Numeric', d: 'Number of meals prepared/served' },
                { f: 'Kitchen Staff', t: 'Numeric', d: 'Number of staff working in kitchen' },
                { f: 'Temperature', t: 'Numeric', d: 'Ambient temperature in Celsius' },
                { f: 'Humidity', t: 'Numeric', d: 'Relative humidity percentage' },
                { f: 'Day', t: 'Categorical', d: 'Day of the week' },
                { f: 'Special Event', t: 'Binary', d: 'Whether it is a special event day (Yes/No)' },
                { f: 'Past Waste', t: 'Numeric', d: 'Average waste from previous similar days (kg)' },
                { f: 'Staff Experience', t: 'Ordinal', d: 'Average experience level of staff' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="px-6 py-3 font-medium text-slate-800">{row.f}</td>
                  <td className="px-6 py-3 text-slate-600">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs">{row.t}</span>
                  </td>
                  <td className="px-6 py-3 text-slate-500">{row.d}</td>
                </tr>
              ))}
              <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                <td className="px-6 py-3 font-bold text-primary flex items-center">
                  Food Waste <span className="ml-2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">Target</span>
                </td>
                <td className="px-6 py-3 text-primary">
                  <span className="bg-primary/20 text-primary px-2.5 py-1 rounded-md text-xs font-medium">Numeric</span>
                </td>
                <td className="px-6 py-3 text-primary font-medium">Actual food waste generated (kg)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" /> Meals by Day
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="count" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-secondary" /> Meals Served vs Food Waste
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" dataKey="x" name="Meals Served" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis type="number" dataKey="y" name="Food Waste (kg)" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Scatter name="Data" data={scatterData.slice(0, 300)} fill="#065f46" opacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
