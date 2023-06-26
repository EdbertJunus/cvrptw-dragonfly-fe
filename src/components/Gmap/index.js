import { Box, Spinner } from "@chakra-ui/react";
import {
  DirectionsRenderer,
  GoogleMap,
  Polygon,
  Polyline,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import React from "react";
import { FaMapMarker } from "react-icons/fa";

import { useEffect, useState } from "react";
import { findWaypt } from "../StoreDemand/util";
import { createPSOTitle } from "@/util";

const center = {
  lat: 25.197379286074206,
  lng: 55.27433275999378,
};

const containerStyle = {
  width: "100%",
  height: "500px",
};
const options = {
  fillColor: "transparent",
  fillOpacity: 1,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};
const MapComponent = ({ routeResultData, routeDetailData, type, polygon }) => {
  const [direction, setDirection] = useState();
  const [data, setData] = useState({
    origin: null,
    waypt: null,
  });
  const [path, setPath] = useState([]);
  const routeResultDA = JSON.parse(
    localStorage.getItem("ROUTE_RESULT_DA")
  ).result;

  useEffect(() => {
    if (data.origin == null || data.waypt == null) {
      const tempData = {
        origin: {
          lat: parseFloat(routeDetailData[0].latitude),
          lng: parseFloat(routeDetailData[0].longitude),
        },
        waypt: findWaypt(routeDetailData, routeResultData),
      };
      setData(tempData);
      // Buat Polygon
      const tempArray = [];
      tempData.waypt.forEach((itm, idx) => {
        tempArray.push(itm.location);
      });

      tempArray.unshift(tempData.origin);

      // setPath([...path, tempData.origin]);
      setPath([...path, ...tempArray]);
    }
  }, [routeResultData, routeDetailData]);

  useEffect(() => {
    if (!window.google) {
      return;
    }

    if (data.origin != null && data.waypt != null) {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: data.origin,
          destination: {
            lng: data.origin.lng + 0.0002,
            lat: data.origin.lat,
          },
          waypoints: data.waypt,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirection(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [data]);

  return (
    <GoogleMap
      zoom={15}
      center={data.origin}
      mapContainerStyle={containerStyle}
      options={{ streetViewControl: false }}
    >
      {direction && (
        <>
          <DirectionsRenderer
            options={{ directions: direction, suppressMarkers: true }}
          />
          {data.origin !== null && (
            <Marker
              position={data.origin}
              icon={"images/pin.png"}
              label={{
                text: "A",
                color: "black",
              }}
            />
          )}
          {data.waypt !== null &&
            data.waypt.map((itm, idx) => {
              const routeOrder = routeResultData.result.split(" ");
              const daOrder = routeResultDA.split(" ");
              let alphaTitleArr =
                type == "pso" ? createPSOTitle(daOrder, routeOrder) : [];
              let label = type == "pso" ? 66 + alphaTitleArr[idx] : 66 + idx;
              return (
                <Marker
                  key={idx}
                  position={itm.location}
                  label={{
                    text: String.fromCharCode(label),
                    color: "white",
                  }}
                />
              );
            })}

          <Polygon paths={polygon ? path : []} options={options} />
        </>
      )}
    </GoogleMap>
  );
};

const Gmap = ({
  routeResultData,
  routeDetailData,
  setMapLoading,
  mapLoading,
  type,
  polygon,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded && mapLoading) {
      setMapLoading(false);
    }
  }, [isLoaded, mapLoading]);

  if (!isLoaded)
    return (
      <Box>
        <Spinner />
      </Box>
    );

  return (
    <MapComponent
      routeDetailData={routeDetailData}
      routeResultData={routeResultData}
      type={type}
      polygon={polygon}
    />
  );
};

export default Gmap;
