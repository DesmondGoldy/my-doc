import { useState } from 'react';
import { DocItem } from '../App';
import Sidebar from './Sidebar';
import Search from './Search';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  catalog: DocItem[];
}

export default function Layout({ children, catalog }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        catalog={catalog} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 md:hidden">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="font-semibold text-gray-800">文档中心</div>
          <div className="w-8"></div> {/* Spacer */}
        </header>

        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center text-sm text-gray-500">
             <span className="hover:text-gray-900 cursor-pointer">首页</span>
             <span className="mx-2">/</span>
             <span className="text-gray-900 font-medium">文档阅读</span>
          </div>
          <div className="w-72">
            <Search catalog={catalog} />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 py-3 bg-white border-b border-gray-200">
             <Search catalog={catalog} />
        </div>

        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-8rem)] p-6 md:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
