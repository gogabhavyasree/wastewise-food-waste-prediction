import React, { useState } from 'react';
import { BarChart4, Trophy, Target, Target as TargetIcon, LayoutGrid, CheckCircle } from 'lucide-react';

export default function Evaluation() {
  const [activeTab, setActiveTab] = useState('REGRESSION');

  const tabs = ['REGRESSION', 'CLASSIFICATION', 'CLUSTERING'];

  const regressionData = [
    { model: 'Linear Regression', mae: '2.45', mse: '10.21', rmse: '3.19', r2: '0.82' },
    { model: 'KNN Regression', mae: '2.10', mse: '8.45', rmse: '2.90', r2: '0.85' }
  ];

  const classificationData = [
    { model: 'KNN', acc: '82.1%', pre: '0.81', rec: '0.82', f1: '0.81' },
    { model: 'Decision Tree', acc: '79.5%', pre: '0.78', rec: '0.79', f1: '0.78' },
    { model: 'Naive Bayes', acc: '75.2%', pre: '0.74', rec: '0.75', f1: '0.74' },
    { model: 'SVM', acc: '84.6%', pre: '0.83', rec: '0.84', f1: '0.83' },
    { model: 'Simple Perceptron', acc: '71.0%', pre: '0.70', rec: '0.71', f1: '0.70' },
    { model: 'Multi-Layer Perceptron', acc: '86.2%', pre: '0.85', rec: '0.86', f1: '0.85' },
    { model: 'Logistic Regression', acc: '78.3%', pre: '0.77', rec: '0.78', f1: '0.77' }
  ];

  const clusteringData = [
    { model: 'K-Means', clusters: '3', score: '0.68' },
    { model: 'Hierarchical Agglomerative', clusters: '3', score: '0.62' },
    { model: 'EM / GMM', clusters: '3', score: '0.65' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Model Evaluation & Insights</h1>
        <p className="text-slate-500 mt-2">Compare Data Mining models using appropriate objective metrics.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-slate-100/50 p-1 rounded-xl inline-flex">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {activeTab === 'REGRESSION' && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
              <TargetIcon className="w-5 h-5 mr-3 text-blue-600" />
              <h3 className="font-semibold text-slate-800">Regression Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Model</th>
                    <th className="px-6 py-4">MAE</th>
                    <th className="px-6 py-4">MSE</th>
                    <th className="px-6 py-4">RMSE</th>
                    <th className="px-6 py-4">R² Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {regressionData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">{row.model}</td>
                      <td className="px-6 py-4 text-slate-600">{row.mae}</td>
                      <td className="px-6 py-4 text-slate-600">{row.mse}</td>
                      <td className="px-6 py-4 text-slate-600">{row.rmse}</td>
                      <td className="px-6 py-4 font-medium text-blue-600 bg-blue-50/50">{row.r2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'CLASSIFICATION' && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
              <LayoutGrid className="w-5 h-5 mr-3 text-purple-600" />
              <h3 className="font-semibold text-slate-800">Classification Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Model</th>
                    <th className="px-6 py-4">Accuracy</th>
                    <th className="px-6 py-4">Precision</th>
                    <th className="px-6 py-4">Recall</th>
                    <th className="px-6 py-4">F1 Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classificationData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">{row.model}</td>
                      <td className="px-6 py-4 font-medium text-purple-600 bg-purple-50/50">{row.acc}</td>
                      <td className="px-6 py-4 text-slate-600">{row.pre}</td>
                      <td className="px-6 py-4 text-slate-600">{row.rec}</td>
                      <td className="px-6 py-4 text-slate-600">{row.f1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'CLUSTERING' && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
              <BarChart4 className="w-5 h-5 mr-3 text-emerald-600" />
              <h3 className="font-semibold text-slate-800">Clustering Validation</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Algorithm</th>
                    <th className="px-6 py-4">Optimal Clusters</th>
                    <th className="px-6 py-4">Silhouette Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clusteringData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">{row.model}</td>
                      <td className="px-6 py-4 text-slate-600">{row.clusters}</td>
                      <td className="px-6 py-4 font-medium text-emerald-600 bg-emerald-50/50">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Insights Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Data Mining Insights</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-3xl border border-primary/20">
            <h4 className="text-primary font-bold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" /> Expected Insights
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-white p-1 rounded shadow-sm mr-3 text-primary mt-0.5">01</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Food Waste Prediction</p>
                  <p className="text-slate-600 text-sm mt-1">Accurately estimates waste quantity (kg) based on daily operational factors.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-white p-1 rounded shadow-sm mr-3 text-primary mt-0.5">02</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Waste Classification</p>
                  <p className="text-slate-600 text-sm mt-1">Categorizes operations into Low, Medium, or High risk for actionable alerts.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-white p-1 rounded shadow-sm mr-3 text-primary mt-0.5">03</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Pattern Discovery</p>
                  <p className="text-slate-600 text-sm mt-1">Identifies hidden groups of similar consumption and waste behaviors.</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 text-xs text-primary/80 font-medium italic">
              * Prototype insights based on evaluated algorithms.
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Trophy className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">Objective Comparison</h3>
            <p className="text-slate-500 max-w-sm">
              All models are compared objectively using standard data mining metrics. No single algorithm is universally declared as the "Best Model" across all potential future real-world datasets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
