import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  latitude: number;
  longitude: number;
}

const Locations = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const locationState = useLocation().state as LocationState | null;
  const navigate = useNavigate();

  useEffect(() => {
    if (locationState && locationState.latitude && locationState.longitude) {
      setLocation({
        latitude: locationState.latitude,
        longitude: locationState.longitude,
      });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: GeolocationPosition) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      setLocation({
        latitude: 37.483034,
        longitude: 126.902435,
      });
    }
  }, [locationState, navigate]);

  return location;
};

export default Locations;
