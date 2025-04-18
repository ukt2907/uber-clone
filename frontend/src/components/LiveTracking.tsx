import { LoadScript, Marker, GoogleMap } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

interface LiveTrackingProps {
  rideId: string;
}

interface Location {
  lat: number;
  lng: number;
}

const LiveTracking = ({ rideId }: LiveTrackingProps) => {
  const [driverLocation, setDriverLocation] = useState<Location>({ lat: 23.2599, lng: 77.4126 });
  const [userLocation, setUserLocation] = useState<Location>({ lat: 23.2599, lng: 77.4126 });
  
  const context = useContext(SocketContext);
  if (!context) throw new Error("Socket context not available");
  const { socket } = context;

  useEffect(() => {
    // Listen for driver location updates
    socket.on("driver-location-update", (location: Location) => {
      setDriverLocation(location);
    });

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error(error)
    );

    return () => {
      socket.off("driver-location-update");
    };
  }, [socket]);

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  return (
    <div className="h-full w-full">
      <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY|| ""}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={driverLocation}
          zoom={14}
        >
          {/* Driver Marker */}
          <Marker
            position={driverLocation}
            icon={{
              url: '/car-icon.png',
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
          {/* User Marker */}
          <Marker
            position={userLocation}
            icon={{
              url: '/user-location.png',
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LiveTracking;