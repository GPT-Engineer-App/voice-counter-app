import React, { useState, useEffect } from "react";

const defaultKeywords = {
  containerA: "CAN",
  containerB: "GLASS",
  containerC: "CART",
  containerD: "PET",
  containerE: "HDP",
};

const KeywordInput = ({ id, label, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

const Settings = () => {
  const [customKeywords, setCustomKeywords] = useState(() => {
    const storedKeywords = JSON.parse(localStorage.getItem("customKeywords"));
    return storedKeywords || defaultKeywords;
  });

  useEffect(() => {
    localStorage.setItem("customKeywords", JSON.stringify(customKeywords));
  }, [customKeywords]);

  const handleKeywordChange = (container, keyword) => {
    setCustomKeywords((prevKeywords) => ({
      ...prevKeywords,
      [container]: keyword,
    }));
  };

  const handleReset = () => {
    setCustomKeywords(defaultKeywords);
  };

  const handleSave = () => {
    localStorage.setItem("customKeywords", JSON.stringify(customKeywords));
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="space-y-6">
        <div>
          <KeywordInput
            id="keywordA"
            label="Keyword for CAN"
            value={customKeywords.containerA}
            onChange={(value) => handleKeywordChange("containerA", value)}
          />
          <KeywordInput
            id="keywordB"
            label="Keyword for GLASS"
            value={customKeywords.containerB}
            onChange={(value) => handleKeywordChange("containerB", value)}
          />
          <KeywordInput
            id="keywordC"
            label="Keyword for CART"
            value={customKeywords.containerC}
            onChange={(value) => handleKeywordChange("containerC", value)}
          />
          <KeywordInput
            id="keywordD"
            label="Keyword for PET"
            value={customKeywords.containerD}
            onChange={(value) => handleKeywordChange("containerD", value)}
          />
          <KeywordInput
            id="keywordE"
            label="Keyword for HDP"
            value={customKeywords.containerE}
            onChange={(value) => handleKeywordChange("containerE", value)}
          />
        </div>
        <button
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={handleReset}
        >
          Reset to Default
        </button>
        <button
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSave}
        >
          Save Keywords
        </button>
      </div>
    </div>
  );
};

export default Settings;