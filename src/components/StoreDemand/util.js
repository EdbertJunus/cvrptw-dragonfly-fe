export const generateOptions = (options, selectedId, selectedOptions) => {
  const result = [];

  const idSelected = selectedOptions[selectedId];

  for (let index = 0; index < options.length; index++) {
    if (selectedOptions.includes(index) && idSelected != index) {
      continue;
    }
    result.push(options[index]);
  }

  return result;
};

export const getCurrentDemand = (demand) => {
  let sum = 0;
  demand.data.forEach((item, key) => {
    const num = item.demand == "" ? 0 : item.demand;
    sum += parseInt(num);
  });
  return sum;
};

export const generateRouteDetailData = (val, store, routeId) => {
  let routeDetailArr = [];

  val["data"].forEach((itm, idx) => {
    let temp_object = {};
    if (itm.name != "") {
      const idx = parseInt(itm.name);
      temp_object["store_name"] = store[idx].name;
      temp_object["latitude"] = store[idx].latitude;
      temp_object["longitude"] = store[idx].longitude;
      temp_object["demand"] = parseInt(itm.demand);
      temp_object["tw_start"] = store[idx].tw_start;
      temp_object["tw_end"] = store[idx].tw_end;
      temp_object["route_id"] = routeId;
      temp_object["store_id"] = store[idx].id;

      routeDetailArr.push(temp_object);
    }
  });

  return routeDetailArr;
};

export const findWaypt = (routeDetailData, routeResultData) => {
  let data = [...routeDetailData];
  data.splice(0, 1);
  let dataLength = data.length;
  let tempWaypt = [];
  const routeOrder = routeResultData.result.split(" ");
  for (let index = 0; index < dataLength; index++) {
    const element = data[index];
    tempWaypt.push({
      location: {
        lat: parseFloat(element.latitude),
        lng: parseFloat(element.longitude),
      },
      stopover: true,
    });
  }

  let finalWpt = [];
  routeOrder.forEach((itm, idx) => {
    let orderIdx = itm;

    finalWpt.push(tempWaypt[orderIdx]);
  });
  return finalWpt;
};
