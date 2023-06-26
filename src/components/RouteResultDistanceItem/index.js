import { createPSOTitle, extractDistance, googleDistance } from "@/util";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const RouteResultDistanceItem = ({ result, matrix, type }) => {
  let arr = [];
  if (result) {
    const routeResultDA = JSON.parse(
      localStorage.getItem("ROUTE_RESULT_DA")
    ).result;
    const daOrder = routeResultDA.split(" ");
    let alphaTitleArr = type == "pso" ? createPSOTitle(daOrder, result) : [];

    for (let i = 0; i <= result?.length; i++) {
      const isOrigin = i == 0 || i == result.length;
      let titleIdx = i;
      let titleIdx_2 = i == result.length ? 0 : i + 1;
      if (type == "pso") {
        titleIdx = isOrigin
          ? i == result.length
            ? alphaTitleArr[i - 1] + 1
            : 0
          : alphaTitleArr.length > 0
          ? alphaTitleArr[i - 1] + 1
          : i;

        titleIdx_2 = isOrigin
          ? i == result.length
            ? 0
            : i + 1
          : alphaTitleArr[i] + 1;
      }

      const title = String.fromCharCode(65 + titleIdx);
      const title_2 = String.fromCharCode(65 + titleIdx_2);
      if (isOrigin) {
        const idx_main = i == 0 ? 0 : parseInt(result[i - 1]) + 1;
        const idx_next = i == 0 ? parseInt(result[i]) + 1 : 0;
        const text = googleDistance(idx_main, idx_next, matrix);
        arr.push(
          <Flex
            boxShadow={"base"}
            p={3}
            m={1}
            rounded="md"
            key={i}
            flexDirection={"column"}
            w={{ base: "100%", sm: "75px", lg: "100px" }}
          >
            <Text as={"b"}>{`${title} - ${title_2}`}</Text>
            <Text>{text}</Text>
            {/* <Text>{`${idx_main} - ${idx_next}`}</Text> */}
          </Flex>
        );
      } else {
        const idx_main = parseInt(result[i - 1]) + 1;
        const idx_next = parseInt(result[i]) + 1;
        const text = googleDistance(idx_main, idx_next, matrix);
        arr.push(
          <Flex
            boxShadow={"base"}
            p={3}
            m={1}
            rounded="md"
            key={i}
            flexDirection={"column"}
            w={{ base: "100%", sm: "75px", lg: "100px" }}
          >
            <Text as={"b"}>{`${title} - ${title_2}`}</Text>
            <Text>{text}</Text>
            {/* <Text>{`${idx_main} - ${idx_next}`}</Text> */}
          </Flex>
        );
      }
    }
  }
  return arr;
};

export default RouteResultDistanceItem;
