import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Dataset from './pages/Dataset';
import Preprocessing from './pages/Preprocessing';
import Prediction from './pages/Prediction';
import Classification from './pages/Classification';
import Clustering from './pages/Clustering';
import Evaluation from './pages/Evaluation';

function App() {
  const [dataset, setDataset] = useState(null);
  
  return (
    <Router>
      <Layout dataset={dataset}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/dataset" element={<Dataset dataset={dataset} setDataset={setDataset} />} />
          <Route path="/preprocessing" element={<Preprocessing dataset={dataset} />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/classification" element={<Classification />} />
          <Route path="/clustering" element={<Clustering />} />
          <Route path="/evaluation" element={<Evaluation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
