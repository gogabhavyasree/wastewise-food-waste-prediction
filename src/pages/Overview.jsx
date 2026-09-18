import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, LineChart, PieChart, Network, CheckCircle2 } from 'lucide-react';

export default function Overview() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        
        <div className="relative px-8 py-16 lg:px-12 lg:py-24 max-w-4xl">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Prototype Version
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            WasteWise <span className="gradient-text">AI</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-600 mb-8 font-light leading-relaxed">
            Food Waste Prediction & Pattern Discovery Using Data Mining.
          </p>
          
          <p className="text-lg text-slate-500 mb-10 max-w-2xl border-l-4 border-primary pl-4">
            An intelligent Data Mining prototype that transforms food-waste data into predictions, classifications and actionable patterns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dataset" className="btn-primary inline-flex items-center justify-center text-lg">
              Explore Analysis <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/dataset" className="btn-secondary inline-flex items-center justify-center text-lg">
              <Upload className="ml-2 mr-2 w-5 h-5" /> Upload Dataset
            </Link>
          </div>
        </div>

        {/* Abstract Visualization background element */}
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none hidden lg:block">
          <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <circle cx="450" cy="250" r="150" fill="#065f46" />
            <circle cx="300" cy="350" r="100" fill="#0f766e" />
            <path d="M100,400 L500,100 L600,400 Z" fill="#d1fae5" />
          </svg>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-8 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <LineChart className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Prediction</h3>
          <p className="text-slate-600">Predict food waste in kilograms using robust regression models based on operational features.</p>
        </div>

        <div className="glass-card p-8 hover:-translate-y-1 transition-transform delay-75">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
            <PieChart className="w-7 h-7 text-secondary" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Classification</h3>
          <p className="text-slate-600">Classify food waste into categorical levels (Low, Medium, High) to identify critical waste situations.</p>
        </div>

        <div className="glass-card p-8 hover:-translate-y-1 transition-transform delay-150">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
            <Network className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Pattern Discovery</h3>
          <p className="text-slate-600">Find similar waste patterns through clustering algorithms to optimize food preparation groups.</p>
        </div>
      </section>

      {/* Project Pipeline */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold mb-8 text-slate-800 text-center">PROJECT PIPELINE</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
          
          {[
            { name: 'Dataset', delay: 0 },
            { name: 'Preprocessing', delay: 100 },
            { name: 'Regression', delay: 200 },
            { name: 'Classification', delay: 300 },
            { name: 'Clustering', delay: 400 },
            { name: 'Evaluation', delay: 500 }
          ].map((step, idx) => (
            <div key={step.name} className="flex flex-col items-center mb-6 md:mb-0 relative group">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold z-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {idx + 1}
              </div>
              <span className="mt-3 text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">
                {step.name}
              </span>
              {idx !== 5 && <div className="md:hidden w-0.5 h-8 bg-slate-200 my-2"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* DMDW Concepts */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h4 className="text-sm font-bold tracking-wider text-slate-400 mb-4 uppercase">Data Preprocessing</h4>
          <ul className="space-y-3 text-sm text-slate-600">
            {['Missing Values', 'Normalization', 'Encoding', 'Statistics', 'Outliers'].map(item => (
              <li key={item} className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h4 className="text-sm font-bold tracking-wider text-slate-400 mb-4 uppercase">Data Mining</h4>
          <ul className="space-y-3 text-sm text-slate-600">
            {['Regression', 'Classification', 'Clustering'].map(item => (
              <li key={item} className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h4 className="text-sm font-bold tracking-wider text-slate-400 mb-4 uppercase">Model Evaluation</h4>
          <ul className="space-y-3 text-sm text-slate-600">
            {['Regression Metrics', 'Classification Metrics', 'Cluster Validation'].map(item => (
              <li key={item} className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
