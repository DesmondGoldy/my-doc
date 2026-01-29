import { useState, useMemo } from 'react';
import { DocItem } from '../App';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  catalog: DocItem[];
}

export default function Search({ catalog }: SearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query) return [];
    return catalog.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) || 
      doc.content.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
  }, [query, catalog]);

  return (
    <div className="relative w-full">
      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-colors">
        <SearchIcon className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
        <input 
          type="text" 
          placeholder="搜索文档..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {query && (
          <button onClick={() => setQuery('')}>
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-lg border max-h-80 overflow-auto z-50">
            {results.length > 0 ? (
                results.map(doc => (
                    <div 
                    key={doc.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-none"
                    onMouseDown={() => {
                        navigate(doc.path);
                        setQuery('');
                    }}
                    >
                    <div className="font-medium text-gray-900 text-sm">{doc.title}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                        {doc.path}
                    </div>
                    </div>
                ))
            ) : (
                <div className="px-4 py-3 text-sm text-gray-500">未找到相关文档</div>
            )}
        </div>
      )}
    </div>
  );
}
