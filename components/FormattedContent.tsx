
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FormattedContentProps {
  content: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({ content }) => {
  return (
    <div className="prose prose-invert prose-blue max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-4 pb-2 border-b border-gray-600 text-blue-300">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-blue-400">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-100">{children}</h3>,
          p: ({ children }) => <p className="my-3 leading-relaxed text-gray-300">{children}</p>,
          ul: ({ children }) => <ul className="my-3 ml-6 space-y-2">{children}</ul>,
          li: ({ children }) => <li className="text-gray-300">{children}</li>,
          strong: ({ children }) => <strong className="font-bold text-gray-100">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedContent;
