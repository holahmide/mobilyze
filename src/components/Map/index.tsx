import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_ZOOM, MAP_CONTAINER_STYLES } from './contants';
import './styles.css';
import { useGlobalContext } from '../../context';
import MapAutoCompleteInput from './AutoCompleteIput';
import SavedLocation from './SavedLocation';
import AddLocation from './AddLocation';

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY!,
    libraries: ['places', 'visualization', 'drawing', 'geometry']
  });

  const {
    state: { locations, mapCenter, temporaryUserSelection },
    dispatch
  } = useGlobalContext();

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const setMarkerFocus = (id: string) => {
    dispatch({ type: 'SET_MARKER_FOCUS', payload: id });
  };

  const handleMapClick = (e: any) => {
    const newLocation = e.latLng.toJSON();

    dispatch({ type: 'SET_TEMPORARY_USER_SELECTION', payload: newLocation });
  };

  useEffect(() => {
    map?.panTo(mapCenter);
  }, [map, mapCenter]);

  // Cluster markers when the locations list is changed
  useEffect(() => {
    if (map && locations.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      locations.map((location) => bounds.extend(location));
      map.fitBounds(bounds);
    }
  }, [locations, map]);

  return (
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLES}
          center={mapCenter}
          zoom={DEFAULT_ZOOM}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleMapClick}
        >
          <>
            {locations.map((location, index) => (
              <MarkerF
                key={index}
                position={location}
                icon=""
                onClick={() => setMarkerFocus(location.id)}
              />
            ))}

            {temporaryUserSelection && <AddLocation />}

            {locations.map((location, index) => (
              <SavedLocation location={location} key={index} />
            ))}

            <MapAutoCompleteInput />
          </>
        </GoogleMap>
      ) : (
        <>loading</>
      )}
    </div>
  );
};

export default Map;
