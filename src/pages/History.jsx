import { Container, Heading, Text, Box, Button } from "@chakra-ui/react";
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
    <Container maxW="container.md" py={8} role="main" px={4}>
      <Heading as="h2" size="xl" mb={4}>History</Heading>
      <Box>
        {history.length === 0 ? (
          <Text>No history available.</Text>
        ) : (
          history.map((entry, index) => (
            <Text key={index}>
              Container {entry.container} Count: {entry.count} at {new Date(entry.timestamp).toLocaleTimeString()}
            </Text>
          ))
        )}
      </Box>
      <Button mt={4} onClick={exportData}>Export Data</Button>
    </Container>
  );
};

export default History;