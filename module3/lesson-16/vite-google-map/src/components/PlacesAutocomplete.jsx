import React, { useState, useRef, useCallback } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];
const apiKey = "AIzaSyCXIrirNDS36I_RNDxtFKD13pcLrKwvYIY"; // Replace with your API key

const PlacesAutocomplete = ({ onPlaceSelected }) => {
  const [input, setInput] = useState("");
  const searchBoxRef = useRef(null);

  const onLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  const onPlacesChanged = useCallback(() => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setInput(place.formatted_address);
      onPlaceSelected(place);
    }
  }, [onPlaceSelected]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Search for a place"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default PlacesAutocomplete;
