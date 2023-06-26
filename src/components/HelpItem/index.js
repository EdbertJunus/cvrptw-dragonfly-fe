import { Box, Highlight, ListItem, OrderedList, Text } from "@chakra-ui/react";
import Image from "next/image";
// import { Image } from "@chakra-ui/react";

const HelpItem = ({ data }) => {
  return (
    <Box>
      <OrderedList fontSize={"lg"}>
        {data.map((itm, idx) => {
          return (
            <ListItem key={idx} mb={5}>
              <Text mb={4}>
                <Highlight
                  query={itm.highlight}
                  styles={{ px: "1", py: "1", bg: "blue.100" }}
                >
                  {itm.text}
                </Highlight>
              </Text>
              {itm.image && (
                <Box boxShadow="base" w="fit-content" borderRadius={"8px"}>
                  <Image
                    key={itm.image}
                    src={itm.image}
                    width={1000}
                    height={500}
                    alt={itm.alt}
                    style={{ borderRadius: "8px" }}
                    priority={true}
                  />
                </Box>
              )}
            </ListItem>
          );
        })}
      </OrderedList>
    </Box>
  );
};

export default HelpItem;
