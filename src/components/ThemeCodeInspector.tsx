import React, { useState } from 'react';
import { SHOPIFY_THEME_FILES, ThemeFile } from '../data/themeFiles';
import { FileCode, Folder, Copy, Check, Download, ExternalLink } from 'lucide-react';
import JSZip from 'jszip';

export const ThemeCodeInspector: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ThemeFile>(SHOPIFY_THEME_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      const zip = new JSZip();

      // Add all theme files to zip folder
      SHOPIFY_THEME_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'smallfix-shopify-os2-theme.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate zip:', err);
    } finally {
      setDownloading(false);
    }
  };

  const categories = ['layout', 'templates', 'sections', 'snippets', 'config', 'locales', 'assets'] as const;

  return (
    <div className="py-10 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header with Download Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
              <FileCode className="w-3.5 h-3.5 text-stone-700" />
              <span>Native Shopify Online Store 2.0 Codebase</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900">
              Theme File Tree & Liquid Inspector
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Browse genuine Liquid layouts, Online Store 2.0 JSON templates, and configurable section schemas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-850 text-white rounded text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Packing Zip...' : 'Download Shopify Theme (.zip)'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Code Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-stone-200 rounded shadow-xs overflow-hidden">
          
          {/* File Sidebar */}
          <div className="lg:col-span-4 border-r border-stone-200 bg-stone-50/60 p-4 max-h-[640px] overflow-y-auto">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-3 font-semibold">
              Theme Directory
            </div>

            <div className="space-y-4">
              {categories.map((cat) => {
                const filesInCat = SHOPIFY_THEME_FILES.filter((f) => f.category === cat);
                if (filesInCat.length === 0) return null;

                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-stone-700 px-1 py-0.5">
                      <Folder className="w-3.5 h-3.5 text-amber-800" />
                      <span className="capitalize">{cat}/</span>
                    </div>

                    <div className="pl-4 space-y-0.5">
                      {filesInCat.map((file) => (
                        <button
                          key={file.path}
                          onClick={() => setSelectedFile(file)}
                          className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            selectedFile.path === file.path
                              ? 'bg-stone-900 text-white font-medium'
                              : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                          }`}
                        >
                          <span className="font-mono truncate">{file.name}</span>
                          <span className="text-[10px] uppercase opacity-75 font-sans">{file.type}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="lg:col-span-8 flex flex-col bg-stone-950 text-stone-200">
            {/* Viewer Top Bar */}
            <div className="px-5 py-3 border-b border-stone-800 bg-stone-900 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                <span>📁 theme/{selectedFile.path}</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs overflow-auto max-h-[580px] leading-relaxed">
              <pre className="whitespace-pre text-stone-300">
                <code>{selectedFile.content}</code>
              </pre>
            </div>

            {/* Installation Instructions Footnote */}
            <div className="p-3 bg-stone-900/80 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Ready for direct install: Shopify Admin &gt; Online Store &gt; Themes &gt; Upload zip file.</span>
              <span className="font-mono text-amber-400">OS 2.0 Compliant</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
