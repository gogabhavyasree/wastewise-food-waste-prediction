import React, { useState } from 'react';
import { demoDataset } from '../data/demoDataset';
import { Play, CheckCircle2, ArrowRight, Loader2, DatabaseZap } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const STEPS = [
  'Handling missing values...',
  'Removing duplicates...',
  'Encoding categories...',
  'Normalizing features...',
  'Detecting outliers...',
  'Preprocessing complete ✓'
];

export default function Preprocessing({ dataset }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleProcess = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setIsComplete(false);
    
    // Simulate steps
    STEPS.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        if (index === STEPS.length - 1) {
          setTimeout(() => {
            setIsProcessing(false);
            setIsComplete(true);
          }, 1000);
        }
      }, (index + 1) * 800);
    });
  };

  const stepsList = [
    { num: '01', title: 'Missing Values' },
    { num: '02', title: 'Duplicates' },
    { num: '03', title: 'Normalization' },
    { num: '04', title: 'Encoding' },
    { num: '05', title: 'Statistics' },
    { num: '06', title: 'Outliers' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Data Preprocessing</h1>
        <p className="text-slate-500 mt-2">Prepare raw data for Data Mining algorithms.</p>
      </div>

      {/* Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {stepsList.map((step, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <span className="text-2xl font-black text-slate-200 mb-2">{step.num}</span>
            <span className="text-sm font-medium text-slate-700">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Before / After */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 rounded-full bg-amber-400 mr-3"></div>
            <h3 className="text-xl font-bold text-slate-700 uppercase tracking-wide">Before Preprocessing</h3>
          </div>
          <ul className="space-y-4">
            {['Missing values present', 'Duplicate records exist', 'Inconsistent categorical data', 'Features on different scales', 'Outliers skewing distribution'].map((item, i) => (
              <li key={i} className="flex items-start text-slate-600">
                <span className="text-slate-400 mr-3 mt-1">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 relative">
          <div className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full items-center justify-center z-10">
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3"></div>
            <h3 className="text-xl font-bold text-primary uppercase tracking-wide">After Preprocessing</h3>
          </div>
          <ul className="space-y-4">
            {['Clean data (imputed)', 'Unique records only', 'Encoded variables (One-Hot/Label)', 'Normalized numerical values (Min-Max/Z-score)', 'Prepared robust dataset'].map((item, i) => (
              <li key={i} className="flex items-start text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex flex-col items-center justify-center py-8">
        {!isProcessing && !isComplete && (
          <button 
            onClick={handleProcess}
            className="btn-primary text-lg px-8 py-4 flex items-center shadow-lg shadow-primary/20"
          >
            <DatabaseZap className="w-6 h-6 mr-3" /> Run Preprocessing
          </button>
        )}

        {isProcessing && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg max-w-md w-full text-center space-y-6">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-800">Processing Dataset...</h3>
              <p className="text-primary font-medium animate-pulse">{STEPS[currentStep]}</p>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center w-full max-w-2xl animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-2">PREPROCESSING COMPLETE</h3>
            <p className="text-emerald-600 mb-8">Dataset is now ready for Data Mining tasks.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-1">Mean Waste</p>
                <p className="text-xl font-bold text-slate-800">18.42 kg</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-1">Median Waste</p>
                <p className="text-xl font-bold text-slate-800">17.80 kg</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-1">Std Deviation</p>
                <p className="text-xl font-bold text-slate-800">4.15 kg</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-1">Outliers Removed</p>
                <p className="text-xl font-bold text-slate-800">12</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
