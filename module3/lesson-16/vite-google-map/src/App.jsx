// import AddressForm from './components/AddressForm'
import PlacesAutocomplete from './components/PlacesAutocomplete'
import './App.css'

function App() {

  const handlePlaceSelect = (place) => {
    console.log("Selected place:", place);
  };

  return (
    <div className="App">
      <h1>React Autocomplete Demo Form</h1>
      <PlacesAutocomplete onPlaceSelected={handlePlaceSelect} />
      {/* <AddressForm /> */}
    </div>
  )
}

export default App
