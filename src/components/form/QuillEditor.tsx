'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// Define the ref type for the QuillEditor component
export type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (content: string) => void;
  isReady: () => boolean;
};

const QuillEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const pendingContentRef = useRef<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (!isClient) return;
    
    // Ensure we're on the client side and the DOM is ready
    if (editorRef.current && typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Enhanced toolbar configuration with more formatting options
      const toolbarOptions = [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ];

      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
          clipboard: {
            matchVisual: false,
          },
        },
        placeholder: 'আপনার জীবন বৃত্তান্ত লিখুন... (Write your biography here...)',
        formats: [
          'header', 'font', 'size',
          'bold', 'italic', 'underline', 'strike',
          'color', 'background',
          'script',
          'blockquote', 'code-block',
          'list',
          'indent',
          'direction', 'align',
          'link', 'image', 'video'
        ]
      });

      // Add custom styles for better Bengali text support
      const style = document.createElement('style');
      style.textContent = `
        .ql-editor {
          font-family: 'Noto Sans Bengali', 'Hind Siliguri', 'SolaimanLipi', Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          direction: ltr;
          text-align: left;
        }
        
        .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {
          font-family: 'Noto Sans Bengali', 'Hind Siliguri', 'SolaimanLipi', Arial, sans-serif;
          font-weight: 600;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        
        .ql-editor p {
          margin-bottom: 1em;
        }
        
        .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .ql-editor ul, .ql-editor ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        
        .ql-editor li {
          margin-bottom: 0.25em;
        }
        
        .ql-editor a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .ql-editor a:hover {
          color: #1d4ed8;
        }
        
        .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 8px;
        }
        
        .ql-editor video {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 8px;
        }
        
        .ql-editor code {
          background-color: #f3f4f6;
          padding: 0.125em 0.25em;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.875em;
        }
        
        .ql-editor pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1em 0;
        }
        
        .ql-editor pre code {
          background: none;
          padding: 0;
        }
        
        /* Custom toolbar styling */
        .ql-toolbar.ql-snow {
          border: 1px solid #d1d5db;
          border-radius: 8px 8px 0 0;
          background-color: #f9fafb;
          padding: 8px;
        }
        
        .ql-container.ql-snow {
          border: 1px solid #d1d5db;
          border-top: none;
          border-radius: 0 0 8px 8px;
          min-height: 300px;
        }
        
        .ql-toolbar.ql-snow .ql-formats {
          margin-right: 15px;
        }
        
        .ql-toolbar.ql-snow button {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .ql-toolbar.ql-snow button:hover {
          background-color: #e5e7eb;
        }
        
        .ql-toolbar.ql-snow .ql-active {
          background-color: #dbeafe;
          color: #2563eb;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .ql-toolbar.ql-snow {
            padding: 4px;
          }
          
          .ql-toolbar.ql-snow .ql-formats {
            margin-right: 8px;
          }
          
          .ql-toolbar.ql-snow button {
            width: 24px;
            height: 24px;
          }
        }
      `;
      document.head.appendChild(style);

      // Add custom font options for Bengali (with proper typing)
      try {
        const Font = Quill.import('formats/font') as any;
        if (Font && Font.whitelist) {
          Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida', 'noto-sans-bengali', 'hind-siliguri', 'solaiman-lipi'];
          Quill.register(Font, true);
        }
      } catch (error) {
        console.warn('Could not register custom fonts:', error);
      }

      // Add custom size options (with proper typing)
      try {
        const Size = Quill.import('attributors/style/size') as any;
        if (Size && Size.whitelist) {
          Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
          Quill.register(Size, true);
        }
      } catch (error) {
        console.warn('Could not register custom sizes:', error);
      }

              // Mark as initialized after a short delay to ensure Quill is fully ready
        setTimeout(() => {
          setIsInitialized(true);
          
          // Set any pending content
          if (pendingContentRef.current && quillRef.current) {
            quillRef.current.root.innerHTML = pendingContentRef.current;
            pendingContentRef.current = null;
          }
        }, 100);
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [isClient]);

  // Handle pending content when Quill becomes initialized
  useEffect(() => {
    if (isInitialized && pendingContentRef.current && quillRef.current) {
      quillRef.current.root.innerHTML = pendingContentRef.current;
      pendingContentRef.current = null;
    }
  }, [isInitialized]);

  // Expose the getContent and setContent functions to the parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML;
      }
      return '';
    },
    setContent: (content: string) => {
      if (content) {
        if (isInitialized && quillRef.current) {
          quillRef.current.root.innerHTML = content;
        } else {
          // Store content to be set when Quill is initialized
          pendingContentRef.current = content;
        }
      }
    },
    isReady: () => {
      return isInitialized && quillRef.current !== null;
    },
  }));

  // Don't render anything until we're on the client side
  if (!isClient) {
    return (
      <div className="w-full h-64 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 font-bengali-normal">লোড হচ্ছে...</div>
      </div>
    );
  }

  return <div ref={editorRef} />;
});

QuillEditor.displayName = 'QuillEditor';
export default QuillEditor;
