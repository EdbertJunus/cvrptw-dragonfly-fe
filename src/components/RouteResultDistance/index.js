import { GOOGLE_DISTANCE_MATRIX } from "@/constant";
import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RouteResultDistanceItem from "../RouteResultDistanceItem";
import { calculateSumDistance } from "@/util";

const RouteResultDistance = ({ routeResult, type }) => {
  const [result, setResult] = useState();
  const [matrix, setMatrix] = useState();
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setResult(routeResult.result.split(" "));
    const googleDistMatrix = localStorage.getItem(GOOGLE_DISTANCE_MATRIX);
    setMatrix(JSON.parse(googleDistMatrix).rows);
    setSum(
      calculateSumDistance(
        JSON.parse(googleDistMatrix).rows,
        routeResult.result.split(" ")
      )
    );
  }, []);

  return (
    <Flex flexDirection={"column"} my={4}>
      <Heading as="h3" size="md" mb={2}>
        {`Route Distance (Total km : ${sum.toFixed(3)}) `}
      </Heading>
      <Flex justifyContent={"space-evenly"} wrap={"wrap"}>
        <RouteResultDistanceItem result={result} matrix={matrix} type={type} />
      </Flex>
    </Flex>
  );
};

export default RouteResultDistance;
