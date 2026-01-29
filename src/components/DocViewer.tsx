import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { DocItem } from '../App';
import { Loader2 } from 'lucide-react';

interface DocViewerProps {
  catalog: DocItem[];
}

export default function DocViewer({ catalog }: DocViewerProps) {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [headings, setHeadings] = useState<{id: string, text: string, level: number}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const doc = catalog.find(d => d.id === id);
    if (!doc) {
      setError('Document not found');
      return;
    }

    setLoading(true);
    setError(null);
    setHeadings([]);

    fetch(doc.path)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.text();
      })
      .then(text => {
        setContent(text);
        
        const lines = text.split('\n');
        const heads = [];
        for (const line of lines) {
          const match = line.match(/^(#{1,3})\s+(.+)$/);
          if (match) {
            const level = match[1].length;
            const text = match[2];
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            heads.push({ id, text, level });
          }
        }
        setHeadings(heads);
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading document');
        setLoading(false);
      });
  }, [id, catalog]);

  const components = {
    h1: ({children, ...props}: any) => {
        const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return <h1 id={id} className="text-3xl font-bold mb-6 pb-2 border-b scroll-mt-24 text-gray-900" {...props}>{children}</h1>
    },
    h2: ({children, ...props}: any) => {
        const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return <h2 id={id} className="text-2xl font-bold mt-10 mb-4 scroll-mt-24 text-gray-800" {...props}>{children}</h2>
    },
    h3: ({children, ...props}: any) => {
        const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return <h3 id={id} className="text-xl font-bold mt-8 mb-3 scroll-mt-24 text-gray-800" {...props}>{children}</h3>
    },
    table: ({node, ...props}: any) => <div className="overflow-x-auto my-6 rounded-lg border border-gray-200"><table className="min-w-full divide-y divide-gray-200" {...props} /></div>,
    th: ({node, ...props}: any) => <th className="px-4 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider" {...props} />,
    td: ({node, ...props}: any) => <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 border-t border-gray-100" {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6 bg-blue-50 py-3 rounded-r" {...props} />,
    a: ({node, ...props}: any) => <a className="text-blue-600 hover:underline" {...props} />,
    img: ({node, ...props}: any) => <img className="rounded-lg shadow-md my-4 max-w-full" {...props} />,
    code: ({node, inline, className, children, ...props}: any) => {
      return inline ? 
        <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-pink-600" {...props}>{children}</code> :
        <code className={`${className} text-sm`} {...props}>{children}</code>
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-500">正在加载文档...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">加载失败</h3>
        <p className="text-gray-500">{error}</p>
    </div>
  );

  return (
    <div className="flex flex-col xl:flex-row gap-12">
      <div className="flex-1 min-w-0">
        <article className="prose prose-slate prose-lg max-w-none">
            <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeHighlight]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </article>
      </div>
      
      {/* TOC Sidebar */}
      {headings.length > 0 && (
        <div className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 pl-3 border-l-2 border-transparent">本页目录</h4>
                <nav className="flex flex-col space-y-1">
                    {headings.map((h, i) => (
                        <a 
                            key={i} 
                            href={`#${h.id}`}
                            className={`text-sm py-1 border-l-2 border-transparent hover:border-blue-500 hover:text-blue-600 text-gray-500 block truncate transition-colors
                            ${h.level === 1 ? 'pl-3 font-medium' : ''}
                            ${h.level === 2 ? 'pl-3' : ''}
                            ${h.level === 3 ? 'pl-6' : ''}
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {h.text}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
      )}
    </div>
  );
}
