import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DocViewer from './components/DocViewer';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

// Type for catalog item
export interface DocItem {
  id: string;
  title: string;
  path: string;
  content: string;
}

function App() {
  const [catalog, setCatalog] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/catalog.json')
      .then(res => res.json())
      .then(data => {
        setCatalog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load catalog', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-500 font-medium">系统初始化中...</p>
            </div>
        </div>
    );
  }

  return (
    <Router>
      <Layout catalog={catalog}>
        <Routes>
          <Route path="/" element={<Navigate to={catalog.length > 0 ? catalog[0].path : '/'} replace />} />
          <Route path="/docs/:id" element={<DocViewer catalog={catalog} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
