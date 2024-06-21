import { Container, Heading, Text, FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from "@chakra-ui/react";
import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes("@")) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError) {
      console.log("Email submitted:", email);
      setEmail("");
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
        <Button mt={4} type="submit" isDisabled={emailError}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;