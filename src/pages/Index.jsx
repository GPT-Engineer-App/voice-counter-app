import React from 'react';

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-2xl mx-auto">
      <div className="space-y-4">
        <p className="text-2xl">Your Blank Canvas</p>
        <p>Chat with the agent to start making edits.</p>
      </div>
    </div>
  );
};

export default Index;
