# MapRouter Component

## Overview

The `MapRouter` component is designed to render a map with directions functionality, allowing users to calculate routes between specified locations. It utilizes the Google Maps API to display maps, calculate routes, and provide essential details such as distance and duration.

### Key Features

- Displays a Google Map centered on the user's current location or a default location.
- Provides autocomplete fields for entering origin and destination addresses.
- Calculates and displays routes between specified origin and destination using the Google Maps Directions API.
- Shows the distance and duration of the calculated route.
- Includes a button to clear the route and input fields.

## Installation

1. Install necessary dependencies:

   ```bash
   npm install @react-google-maps
## Google Maps API

### GoogleMap Component

- **Purpose:** Renders a Google Map on a web page.
  
- **Key Properties:**
  - `center`: Specifies the initial center of the map as a latitude/longitude object.
  - `zoom`: Sets the initial zoom level of the map.
  - `mapContainerStyle`: Applies styles to the container of the map.
  - `options`: Configures various map options, such as disabling controls.
  - `onLoad`: Callback function invoked when the map is fully loaded.

- **Child Components:**
  - `Marker`: Places a marker on the map at a specific location.
  - `DirectionsRenderer`: Renders directions on the map from the Google Maps Directions API.

### Autocomplete Component

- **Purpose:** Provides an autocomplete search box for places powered by the Google Maps Places API.

- **Key Properties:**
  - `apiKey`: Your Google Maps API key.

### DirectionsRenderer Component

- **Purpose:** Renders directions on a Google Map based on a `DirectionsResult` object.

- **Key Properties:**
  - `directions`: The `DirectionsResult` object from the Google Maps Directions API.

## State
1. currentLocation: Stores the user's current location (if available).
2. directionsResponse: Stores the response from the Google Maps Directions API.
3. distance: Stores the distance of the calculated route.
4. duration: Stores the duration of the calculated route.
## Functions
1. calculateRoute: Calculates the route between specified origin and destination.
2. clearRoute: Clears the route and input fields.

## Issues
1. The location fetched using geolocation api is not accurate.Mostly comes based on IP address which is not accurate enough.

## Additional Docs
1. Google Maps Geolocation API  https://developers.google.com/maps/documentation/geolocation/overview#troubleshooting

2. https://developers.google.com/maps/documentation/javascript/examples/map-geolocation