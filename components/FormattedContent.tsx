
import React from 'react';

interface FormattedContentProps {
  content: string;
}

const FormattedContent: React.FC<FormattedContentProps> = ({ content }) => {
  const renderLine = (line: string, index: number) => {
    line = line.trim();

    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-3xl font-bold mt-6 mb-4 pb-2 border-b border-gray-600 text-blue-300">
          {line.substring(2)}
        </h1>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-blue-400">
          {line.substring(3)}
        </h2>
      );
    }
    if (line.startsWith('* ')) {
      return (
        <li key={index} className="ml-6 my-2 list-disc list-outside text-gray-300">
          {line.substring(2)}
        </li>
      );
    }
    if (line.length > 0) {
      // Handle bold text with **text**
      const parts = line.split('**');
      const formattedLine = parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-bold text-gray-100">{part}</strong> : part
      );
      return <p key={index} className="my-3 leading-relaxed text-gray-300">{formattedLine}</p>;
    }
    return null;
  };

  const lines = content.split('\n').filter(line => line.trim().length > 0);
  
  // Group list items together
  const elements = [];
  let currentList: string[] = [];

  lines.forEach((line, index) => {
    if (line.startsWith('* ')) {
      currentList.push(line);
    } else {
      if (currentList.length > 0) {
        elements.push(<ul key={`ul-${index-1}`} className="space-y-1">{currentList.map((item, i) => renderLine(item, i))}</ul>);
        currentList = [];
      }
      elements.push(renderLine(line, index));
    }
  });

  if (currentList.length > 0) {
     elements.push(<ul key={`ul-last`} className="space-y-1">{currentList.map((item, i) => renderLine(item, i))}</ul>);
  }

  return <div className="prose prose-invert max-w-none">{elements}</div>;
};

export default FormattedContent;
