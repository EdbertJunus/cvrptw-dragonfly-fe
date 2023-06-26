import { Flex, Skeleton } from "@chakra-ui/react";
import Gmap from "../Gmap";
import RoutingDescription from "../RoutingDescription";
import RouteResultDistance from "../RouteResultDistance";

const RouteResult = ({
  mapLoading,
  setMapLoading,
  routeDetail,
  routeResult,
  type,
  polygon,
}) => {
  return (
    <Skeleton isLoaded={!mapLoading} mt={2}>
      <Gmap
        routeDetailData={routeDetail}
        routeResultData={routeResult}
        setMapLoading={setMapLoading}
        mapLoading={mapLoading}
        type={type}
        polygon={polygon}
      />
      <RouteResultDistance routeResult={routeResult} type={type} />
      <Flex
        w="100%"
        flexDirection="row"
        flexWrap={"wrap"}
        justifyContent="space-evenly"
        mt={5}
        gap={5}
      >
        <RoutingDescription
          routeDetail={routeDetail}
          routeResult={routeResult}
          type={type}
        />
      </Flex>
    </Skeleton>
  );
};

export default RouteResult;
