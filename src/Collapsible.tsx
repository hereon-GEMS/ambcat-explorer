import React, { useState } from 'react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6">
      <button
        className="btn btn-sm btn-outline mb-4 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={`section-${title}`}
      >
        {isOpen ? "➖" : "➕"} {title}
      </button>

      {isOpen && (
        <div id={`section-${title}`} className="transition-all duration-300 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
