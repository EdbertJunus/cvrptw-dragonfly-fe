import Gmap from "@/components/Gmap";
import RouteResult from "@/components/RouteResult";
import RoutingDescription from "@/components/RoutingDescription";
import { Box, Flex, Heading, Icon, Skeleton, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";

const Result = () => {
  const [routeResult, setRouteResult] = useState();
  const [routeDetail, setRouteDetail] = useState();
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    const routeResDataDragonfly = localStorage.getItem("ROUTE_RESULT_DA");
    const routeDetailData = localStorage.getItem("ROUTE_DETAIL");
    setRouteResult(JSON.parse(routeResDataDragonfly));
    setRouteDetail(JSON.parse(routeDetailData));
  }, []);

  return (
    <>
      <Head>
        <title>Result</title>
      </Head>
      <main>
        {routeDetail && routeResult ? (
          <Flex py={10} px={12} flexDirection="column">
            <Heading as="h3" size="lg" mb={8}>
              Routing Result Map
            </Heading>
            <RouteResult
              routeDetail={routeDetail}
              routeResult={routeResult}
              setMapLoading={setMapLoading}
              mapLoading={mapLoading}
            />
          </Flex>
        ) : (
          <Flex
            py={8}
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
      </main>
    </>
  );
};

export default Result;
