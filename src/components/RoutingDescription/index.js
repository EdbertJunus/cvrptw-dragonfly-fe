import { createPSOTitle } from "@/util";
import RouteDescriptionItem from "../RouteDescriptionItem";

const RoutingDescription = ({ routeDetail, routeResult, type }) => {
  let arr = [];
  const routeResultDA = JSON.parse(
    localStorage.getItem("ROUTE_RESULT_DA")
  ).result;

  if (routeDetail && routeResult && routeDetail.length > 0) {
    const routeOrder = routeResult.result.split(" ");
    const daOrder = routeResultDA.split(" ");
    let alphaTitleArr =
      type == "pso" ? createPSOTitle(daOrder, routeOrder) : [];

    for (let i = 0; i <= routeDetail.length; i++) {
      let element = routeDetail[i];
      let isOrigin = i == 0 || i == routeDetail.length;
      let titleIdx = isOrigin
        ? 65 + 0
        : alphaTitleArr.length > 0
        ? 65 + alphaTitleArr[i - 1] + 1
        : 65 + i;
      const title = String.fromCharCode(titleIdx);
      if (isOrigin) {
        if (i == routeDetail.length) element = routeDetail[0];
        arr.push(<RouteDescriptionItem key={i} title={"A"} data={element} />);
      } else {
        let currIdx = parseInt(routeOrder[i - 1]) + 1;
        element = routeDetail[currIdx];
        arr.push(<RouteDescriptionItem key={i} title={title} data={element} />);
      }
    }
    return arr;
  }
};

export default RoutingDescription;
