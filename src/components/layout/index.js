import { Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const Navbar = ({ logout }) => {
  return (
    <Flex
      p={4}
      boxShadow={"xl"}
      bg="blue.400"
      color="white"
      justifyContent={"space-between"}
    >
      <Flex flexDirection={"row"}>
        <Heading as="h4" size="md" mx={4}>
          <Link as={NextLink} href="/">
            Home
          </Link>
        </Heading>
        <Heading as="h4" size="md" mx={4}>
          <Link as={NextLink} href="/route_calculation">
            Route Calculation
          </Link>
        </Heading>
        <Heading as="h4" size="md" mx={4}>
          <Link as={NextLink} href="/comparison">
            Comparison Result
          </Link>
        </Heading>
        <Heading as="h4" size="md" mx={4}>
          <Link as={NextLink} href="/help">
            Help
          </Link>
        </Heading>
      </Flex>
      <Heading as="h4" size="md" mx={4}>
        <Link
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>
      </Heading>
    </Flex>
  );
};

export default Navbar;
