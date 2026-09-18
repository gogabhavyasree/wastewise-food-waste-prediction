import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  Wrench, 
  LineChart, 
  PieChart, 
  Network, 
  BarChart4,
  Leaf,
  Menu,
  X,
  User,
  FlaskConical
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/dataset', label: 'Dataset', icon: Database },
  { path: '/preprocessing', label: 'Preprocessing', icon: Wrench },
  { path: '/prediction', label: 'Prediction', icon: LineChart },
  { path: '/classification', label: 'Classification', icon: PieChart },
  { path: '/clustering', label: 'Clustering', icon: Network },
  { path: '/evaluation', label: 'Evaluation', icon: BarChart4 },
];

export default function Layout({ children, dataset }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const getPageTitle = () => {
    const item = navItems.find(i => i.path === location.pathname);
    return item ? item.label : 'WasteWise AI';
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
          <Link to="/" className="flex items-center space-x-3 overflow-hidden">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <Leaf className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="text-xl font-bold text-slate-800">WasteWise<span className="text-primary">AI</span></span>}
          </Link>
          <button className="lg:hidden p-1 text-slate-400 hover:text-slate-600" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-xl transition-colors duration-200 group",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className={cn("w-5 h-5", sidebarOpen ? "mr-3" : "mx-auto")} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={cn("p-4 border-t border-slate-200", !sidebarOpen && "hidden lg:block lg:text-center")}>
          <div className="text-xs text-slate-400 font-medium">
            {sidebarOpen ? (
              <>
                <p>DMDW LAB</p>
                <p>B.Tech CSE</p>
                <p>2026–27</p>
              </>
            ) : (
              <p>DMDW</p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button 
              className="mr-4 p-2 rounded-lg text-slate-500 hover:bg-slate-50 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-sm">
              <div className={cn("w-2 h-2 rounded-full mr-2", dataset ? "bg-emerald-500" : "bg-amber-500")} />
              <span className="text-slate-600 font-medium">
                {dataset ? 'Dataset Loaded' : 'Demo Dataset'}
              </span>
            </div>
            
            <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <FlaskConical className="w-4 h-4 mr-1.5" />
              Prototype Mode
            </div>

            <button className="p-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
          <div className="max-w-7xl mx-auto pb-12">
            {children}
          </div>
          
          <footer className="mt-12 pt-6 border-t border-slate-200 text-center text-sm text-slate-500 pb-6">
            <p className="font-medium text-slate-600">WasteWise AI - Prototype Version</p>
            <p>Data Mining & Data Warehouse Lab • B.Tech CSE • Academic Year 2026–27</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
