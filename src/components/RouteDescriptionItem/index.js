const { Box, Heading, Text, Badge, Flex } = require("@chakra-ui/react");

const RouteDescriptionItem = ({ title, data }) => {
  return (
    <Box
      boxShadow="md"
      padding={3}
      rounded="md"
      w={{ base: "100%", md: "150px", lg: "180px" }}
    >
      <Badge colorScheme="blue" mb={2}>
        {title}
      </Badge>
      <Flex flexDirection={"column"}>
        <Text fontSize="xs" as="ins">
          Name
        </Text>
        <Text fontSize="md" as="kbd">
          {data.store_name}
        </Text>
      </Flex>
      <Flex flexDirection={"column"}>
        <Text fontSize="xs" as="ins">
          Demand
        </Text>
        <Text fontSize="md" as="kbd">
          {data.demand}
        </Text>
      </Flex>
      <Flex flexDirection={"column"}>
        <Text fontSize="xs" as="ins">
          Open Time
        </Text>
        <Text fontSize="md" as="kbd">
          {data.tw_start}:00 - {data.tw_end}:00
        </Text>
      </Flex>
    </Box>
  );
};

export default RouteDescriptionItem;
