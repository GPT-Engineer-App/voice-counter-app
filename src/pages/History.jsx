import { Container, Heading, Text, Button, Box } from "@chakra-ui/react";
import { useState } from "react";

const History = () => {
  const [history, setHistory] = useState(loadFromLocalStorage("history", []));

  const exportData = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "history.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container maxW="container.md" py={8} role="main" px={4}>
      <Heading as="h2" size="xl" mb={4}>History</Heading>
      <Box aria-live="polite" width="100%" px={4}>
        <Text fontSize="xl">History</Text>
        {history.map((entry, index) => (
          <Text key={index}>
            Container {entry.container} Count: {entry.count} at {entry.timestamp.toLocaleTimeString()}
          </Text>
        ))}
      </Box>
      <Button mt={4} onClick={exportData}>
        Export Data
      </Button>
    </Container>
  );
};

export default History;