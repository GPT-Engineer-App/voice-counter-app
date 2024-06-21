import { useState, useEffect } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(storedHistory);
  }, []);

  const exportData = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "history.json";
    link.click();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <HistoryList history={history} />
      <ExportButton onClick={exportData} />
    </div>
  );
};

const HistoryList = ({ history }) => (
  <div>
    {history.length === 0 ? (
      <p>No history available.</p>
    ) : (
      history.map((entry, index) => (
        <p key={index}>
          Custom Container {entry.container} Custom Count: {entry.count} at {new Date(entry.timestamp).toLocaleTimeString()}
        </p>
      ))
    )}
  </div>
);

const ExportButton = ({ onClick }) => (
  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={onClick}>
    Export Data
  </button>
);

export default History;