import { Box, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "@reach/combobox/styles.css";

import styles from "../../styles/LocationPicker.module.css";
import { useFormContext } from "react-hook-form";
import { AppContext } from "@/context/state";

const center = {
  lat: 25.197379286074206,
  lng: 55.27433275999378,
};

const placeLib = ["places"];

const LocationPicker = ({ initialValue }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: placeLib,
  });
  const [selected, setSelected] = useState(center);

  useEffect(() => {
    if (initialValue.length > 0) {
      setSelected({
        lat: parseFloat(initialValue.latitude),
        lng: parseFloat(initialValue.longitude),
      });
    }
  }, []);

  if (!isLoaded)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  return (
    <>
      <div className={styles.input_container}>
        <PlacesAutoComplete
          setSelected={setSelected}
          initialValue={initialValue}
        />
      </div>
      <GoogleMap
        id="locationPicker"
        mapContainerClassName={styles.map}
        zoom={15}
        center={selected}
        options={{ streetViewControl: false }}
      >
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </>
  );
};

const PlacesAutoComplete = ({ setSelected, initialValue }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const { register, setValue: setFormValue } = useFormContext();
  const { setLocation } = useContext(AppContext);
  const [locationValue, setLocationValue] = useState();

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue.googleMap, false);
      setLocation({
        latitude: parseFloat(initialValue.latitude),
        longitude: parseFloat(initialValue.longitude),
      });
      clearSuggestions();
    }
  }, []);

  const handleSelect = (description) => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ lat, lng });
        setLocation({ latitude: lat, longitude: lng });
      })
      .catch((err) => {});
  };

  return (
    <Flex direction={"column"}>
      <Input
        id="googleMap"
        {...register("googleMap", {
          required: "Google map link is required",
        })}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className={styles.combobox_input}
        placeholder="Search store address"
        backgroundColor={"white"}
      />
      <Input
        id="location"
        {...register("location")}
        value={locationValue || ""}
        hidden
      />
      <Box>
        <Flex position={"absolute"} direction={"column"}>
          {status === "OK" &&
            data.map(
              ({
                place_id,
                description,
                structured_formatting: { main_text, secondary_text },
              }) => (
                <Text
                  key={place_id}
                  onClick={() => {
                    handleSelect(description);
                    setLocationValue(secondary_text);
                    setFormValue("location", secondary_text);
                  }}
                  backgroundColor={"white"}
                  cursor={"pointer"}
                  border={"1px solid gray"}
                  borderTop={0}
                  padding={1}
                  _hover={{ backgroundColor: "gray.50" }}
                >
                  {description}
                </Text>
              )
            )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default LocationPicker;
