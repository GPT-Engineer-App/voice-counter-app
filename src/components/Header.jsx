import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box as="header" bg="brand.800" color="white" py={4}>
      <Flex justify="space-between" align="center" maxW="container.lg" mx="auto" px={4}>
        <Heading as="h1" size="lg">
          <Link to="/">My Application</Link>
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;