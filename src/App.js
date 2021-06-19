import { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
// import SignUp from "./components/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";
import Map from "./components/Map/Map";
import Footer from "./components/Footer/Footer";
import Plots from "./components/Plots/Plots";
// import Analysis from "./components/Analysis/Analysis";

import Form from "./components/Form/Form";

import "leaflet/dist/leaflet.css";

function App() {
  const [states, setStates] = useState([]);
  const [info, setInfo] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 19.943922,
    lng: 77.568443,
  });
  const [mapZoom, setMapZoom] = useState(5);
  const [mapStates, setMapStates] = useState([]);
  // const [data, setData] = useState([]);
  const allapi = "https://disease.sh/v3/covid-19/all";
  const statesapi = "https://disease.sh/v3/covid-19/countries";
  // const endpoint = "https://data.cityofnewyork.us/resource/rc75-m7u3.json";

  useEffect(() => {
    fetch(allapi)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
      });
  }, [allapi]);

  useEffect(() => {
    const getStatesData = async () => {
      await fetch(statesapi)
        .then((res) => res.json())
        .then((data) => {
          const states = data.map((state) => ({
            key: state.country,
            name: state.country,
            value: state.countryInfo.iso2,
          }));
          setStates(states);
          setMapStates(data);
        });
    };

    // const getData = async () => {
    //   await fetch(endpoint)
    //     .then((res) => res.json())
    //     .then((data) => setData(data));
    // };

    getStatesData();
    // getData();
  }, [statesapi]);

  // return (
  //   <div>
  //     {/* <Form /> */}
  //     <Chart />
  //   </div>
  // );
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <header className="App-header">
            {/* Navabar */}
            <Navbar />
            <div className="front">
              <div className="mapbod">
                <div className="mapbod__left">
                  {/* Map */}
                  <Map states={mapStates} center={mapCenter} zoom={mapZoom} />
                </div>
                <div className="mapbod__right">
                  <div>
                    {/* Body */}
                    <Body states={states} info={info} />
                  </div>
                </div>
              </div>
              <div className="front__analysis">
                <Plots />
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </header>
        </Route>
        <Route path="/index">
          <Redirect to="/" />
        </Route>
        <Route path="/require">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
