import React, {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';


import markerIcon from '../assets/marker.png';


const MapComponent = ({winery}) => {

    const [latCode, setLat] = useState(null)
    const [lngCode, setLng] = useState(null)  
    const [loading, setLoad] = useState(true)
    const [marker, setMarker] =useState({})

    useEffect(()=>{
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(winery)}&key=AIzaSyDVbkjcbnUkk4YkooYqYDGTPj_5QBiUhQ8`;

        fetch(geocodeUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "OK") {
                    const { lat, lng} = data.results[0].geometry.location;
                    setLat(lat)
                    setLng(lng)
                    setLoad(false)
                    setMarker({
                        latitude: lat,
                        longitude: lng
                    })

                } else {
                    console.error("Geocoding API request failed. Status", data.status);
                }
            })
            .catch((error) => {
                console.error("Error requesting Geocoding API:", error)
            })
    }, []);


    // console.log(marker.latitude, marker.longitude)

    return(
        <div className="maps-container">
            {loading===false ? <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBGBkQYs8OF7u21je5TNLAMuRic4CI7Ehk"}}
                defaultCenter={{ lat: latCode, lng: lngCode }}
                defaultZoom={12}
            >

            

            </GoogleMapReact>:null}
        </div>
    )
}




export default MapComponent;

