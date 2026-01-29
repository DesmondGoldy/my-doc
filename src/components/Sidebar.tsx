import { NavLink } from 'react-router-dom';
import { DocItem } from '../App';
import { FileText, BookOpen } from 'lucide-react';

interface SidebarProps {
  catalog: DocItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ catalog, isOpen, onClose }: SidebarProps) {
  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
          <span className="text-lg font-bold text-gray-900">文档中心</span>
          <button className="md:hidden ml-auto text-gray-500" onClick={onClose}>×</button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">目录</div>
          <ul className="space-y-1">
            {catalog.map(doc => (
              <li key={doc.id}>
                <NavLink
                  to={doc.path}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-lg text-sm transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                  onClick={() => {
                    if (window.innerWidth < 768) onClose();
                  }}
                >
                  <FileText className={`w-4 h-4 mr-3 ${({ isActive }: any) => isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className="truncate">{doc.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-gray-100 text-xs text-gray-400 text-center">
            v1.0.0
        </div>
      </div>
    </aside>
  );
}
