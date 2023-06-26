import Gmap from "@/components/Gmap";
import RouteResult from "@/components/RouteResult";
import RoutingDescription from "@/components/RoutingDescription";
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
const Comparison = () => {
  const [routeResultDA, setRouteResultDA] = useState();
  const [routeResultPSO, setRouteResultPSO] = useState();
  const [routeDetail, setRouteDetail] = useState();
  const [mapLoading, setMapLoading] = useState(true);
  const [checkPoly, setCheckPoly] = useState([false, false]);

  useEffect(() => {
    const routeResDataDragonfly = localStorage.getItem("ROUTE_RESULT_DA");
    const routeDetailData = localStorage.getItem("ROUTE_DETAIL");
    const routeResDataPSO = localStorage.getItem("ROUTE_RESULT_PSO");
    setRouteResultDA(JSON.parse(routeResDataDragonfly));
    setRouteDetail(JSON.parse(routeDetailData));
    setRouteResultPSO(JSON.parse(routeResDataPSO));
  }, []);

  return (
    <>
      <Head>
        <title>Comparison Result</title>
      </Head>
      <main>
        <Flex py={10} px={12} flexDirection="column">
          <Heading as="h3" size="lg" mb={8}>
            Model Result Comparison
          </Heading>
          {routeDetail && routeResultDA && routeResultPSO ? (
            <Flex gap={5}>
              <Box rounded={"sm"} boxShadow={"base"} p={4}>
                <Heading as="h3" size="md" mb={4}>
                  Dragonfly
                </Heading>
                <Flex justifyContent={"space-between"}>
                  <Text as="samp">
                    Total Cost :{" "}
                    {routeResultDA && routeResultDA.cost.toLocaleString()}
                  </Text>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    isChecked={checkPoly[0]}
                    onChange={(e) =>
                      setCheckPoly([e.target.checked, checkPoly[1]])
                    }
                  >
                    Show Polygon
                  </Checkbox>
                </Flex>
                <RouteResult
                  routeDetail={routeDetail}
                  routeResult={routeResultDA}
                  setMapLoading={setMapLoading}
                  mapLoading={mapLoading}
                  polygon={checkPoly[0]}
                />
              </Box>
              <Box rounded={"sm"} boxShadow={"base"} p={4}>
                <Heading as="h3" size="md" mb={4}>
                  Particle Swarm Optimization
                </Heading>
                <Flex justifyContent={"space-between"}>
                  <Text as="samp">
                    Total Cost :{" "}
                    {routeResultPSO && routeResultPSO.cost.toLocaleString()}
                  </Text>
                  <Checkbox
                    size="md"
                    colorScheme="blue"
                    isChecked={checkPoly[1]}
                    onChange={(e) =>
                      setCheckPoly([checkPoly[0], e.target.checked])
                    }
                  >
                    Show Polygon
                  </Checkbox>
                </Flex>
                <RouteResult
                  routeDetail={routeDetail}
                  routeResult={routeResultPSO}
                  setMapLoading={setMapLoading}
                  mapLoading={mapLoading}
                  type="pso"
                  polygon={checkPoly[1]}
                />
              </Box>
            </Flex>
          ) : (
            <Flex
              boxShadow="base"
              p={2}
              rounded="md"
              w="100%"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={AiFillQuestionCircle} w={20} h={20} />
              <Heading lineHeight="tall" as="h3" size="lg">
                There is no recent route calculation
              </Heading>
            </Flex>
          )}
        </Flex>
      </main>
    </>
  );
};

export default Comparison;
