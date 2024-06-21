import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Box as="nav" bg="brand.700" color="white" py={2}>
      <Flex justify="center" maxW="container.lg" mx="auto" px={4}>
        <ChakraLink as={Link} to="/" mx={2}>
          Home
        </ChakraLink>
        <ChakraLink as={Link} to="/about" mx={2}>
          About
        </ChakraLink>
        <ChakraLink as={Link} to="/contact" mx={2}>
          Contact
        </ChakraLink>
        <ChakraLink as={Link} to="/settings" mx={2}>
          Settings
        </ChakraLink>
      </Flex>
    </Box>
  );
};

export default Navigation;