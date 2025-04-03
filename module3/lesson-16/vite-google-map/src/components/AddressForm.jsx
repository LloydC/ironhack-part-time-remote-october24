import { useState, useEffect, useRef } from "react";

export default function AddressForm() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        { types: ["address"] }
      );
      autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
    }
  }, []);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.address_components) return;

    const addressData = {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    };

    place.address_components.forEach((component) => {
      const types = component.types;
      if (types.includes("street_number")) {
        addressData.street = `${component.long_name} ${addressData.street}`;
      } else if (types.includes("route")) {
        addressData.street += component.long_name;
      } else if (types.includes("locality")) {
        addressData.city = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        addressData.state = component.short_name;
      } else if (types.includes("postal_code")) {
        addressData.zip = component.long_name;
      } else if (types.includes("country")) {
        addressData.country = component.long_name;
      }
    });

    setAddress(addressData);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Address:", address);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <label className="block mb-2">
        Address:
        <input
          type="text"
          id="autocomplete"
          name="street"
          value={address.street}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Start typing your address..."
        />
      </label>
      <label className="block mb-2">
        City:
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        State:
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Zip Code:
        <input
          type="text"
          name="zip"
          value={address.zip}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Country:
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}