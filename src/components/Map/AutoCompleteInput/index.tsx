import { Autocomplete } from '@react-google-maps/api';
import { FC, useRef } from 'react';
import Input from '../../../utils/components/Input';
import { useGlobalContext } from '../../../context';
import './styles.css';

export interface MapAutoCompleteInputProps {
  latitudeName?: string;
  longitudeName?: string;
}

const MapAutoCompleteInput: FC<MapAutoCompleteInputProps> = () => {
  const autoComplete = useRef<any>(null);

  const { dispatch } = useGlobalContext();

  const onPlaceChanged = () => {
    if (autoComplete.current !== null) {
      const place = autoComplete.current.getPlace();

      const newLat = place?.geometry?.location?.lat() || 0;
      const newLng = place?.geometry?.location?.lng() || 0;

      dispatch({ type: 'SET_TEMPORARY_USER_SELECTION', payload: { lat: newLat, lng: newLng } });
    }
  };

  return (
    <div>
      <Autocomplete onLoad={(ref) => (autoComplete.current = ref)} onPlaceChanged={onPlaceChanged}>
        <div className="autocomplete-container">
          <div className="autocomplete-input-container">
            <Input
              className="autocomplete-input"
              name="address"
              placeholder="Enter location address..."
            />
          </div>
        </div>
      </Autocomplete>
    </div>
  );
};

export default MapAutoCompleteInput;
