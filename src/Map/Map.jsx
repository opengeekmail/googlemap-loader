// const apiKey = 'AIzaSyDZuY0h7H4o7PLsngYEq8PSL8hh2i1gpGs';


import { Autocomplete, DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
// import { FaTimes, FaLocationArrow } from 'react-icons/fa';
const GOOGLE_MAPS_LIBRARIES = ['places'];


function MapRouter() {
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        // Get the user's current location using Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    setCurrentLocation({ lat: latitude, lng: longitude });

                },
                (error) => {
                    console.error('Error getting user location:', error);
                    // Handle errors if geolocation fails
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            // Handle if geolocation is not supported
        }
    }, []);
    console.log(currentLocation)




    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'YOUR API KEY HERE', //Replace with Google Maps API KEY
        libraries: GOOGLE_MAPS_LIBRARIES,
    })
    const center = { lat: 48.8584, lng: 2.2945 }

    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destiantionRef = useRef()

    if (!isLoaded) {
        return (<>Errorrrr</>)
    }

    async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destiantionRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
    }

    return (
        <div className="d-flex flex-column align-items-center" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <div className="position-absolute left-0 top-0 h-100 w-100" style={{}}>
                {/* Google Map Box */}
                {/* Your Google Map component will go here */}
                <GoogleMap
                    center={currentLocation || center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}

                </GoogleMap>
            </div>
            <div className="p-4 rounded-lg m-4 bg-white shadow container-md" style={{ zIndex: 1 ,borderRadius:'10px' }}>
                <div className="d-flex justify-content-center  align-items-center mb-2">
                    <div className="flex-grow-1">
                        <Autocomplete>
                            <input className="form-control" type="text" placeholder="Origin" ref={originRef} />

                        </Autocomplete>
                    </div>
                    <div className="flex-grow-1">
                        <Autocomplete>
                        <input className="form-control" type="text" placeholder="Destination" ref={destiantionRef} />

                        </Autocomplete>
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={calculateRoute}>
                            Calculate Route
                        </button>
                        <button className="btn btn-secondary" onClick={clearRoute}>
                            {/* <FaTimes /> */}
                            def
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <span>Distance: {distance}</span>
                    <span>Duration: {duration}</span>
                    <button className="btn btn-light" onClick={() => {
                        // Logic to pan and zoom the map
                    }}>
                        {/* <FaLocationArrow /> */} hi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MapRouter;
