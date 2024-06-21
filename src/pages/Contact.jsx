import { Container, Heading, Text, FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes("@")) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    if (e.target.value.length < 10) {
      setFeedbackError("Feedback must be at least 10 characters long.");
    } else {
      setFeedbackError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !feedbackError) {
      console.log("Email submitted:", email);
      console.log("Feedback submitted:", feedback);
      setEmail("");
      setFeedback("");
    }
  };

  return (
    <Container maxW="container.md" py={8} role="main" px={4}>
      <Heading as="h2" size="xl" mb={4}>Contact Us</Heading>
      <Text fontSize="lg">This is the contact page of the application.</Text>
      <Box as="form" onSubmit={handleSubmit} mt={4} width="100%" px={4}>
        <FormControl isInvalid={emailError}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" value={email} onChange={handleEmailChange} />
          {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={feedbackError} mt={4}>
          <FormLabel htmlFor="feedback">Feedback</FormLabel>
          <Textarea id="feedback" value={feedback} onChange={handleFeedbackChange} />
          {feedbackError && <FormErrorMessage>{feedbackError}</FormErrorMessage>}
        </FormControl>
        <Button mt={4} type="submit" isDisabled={emailError || feedbackError}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;