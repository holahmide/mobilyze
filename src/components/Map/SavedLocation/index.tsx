import { OverlayView, OverlayViewF } from '@react-google-maps/api';
import { MapLocation } from '../../../context/interfaces';

interface SavedLocationProps {
  location: MapLocation;
  key: number;
}

const SavedLocation = ({ location, key }: SavedLocationProps) => {
  return (
    <>
      <OverlayViewF
        key={key}
        position={{ lat: location.lat, lng: location.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            zIndex: 10,
            marginLeft: '-50%'
          }}
        >
          <div
            style={{
              backgroundColor: 'black',
              padding: '8px 8px',
              borderRadius: '5px',
              width: '100px'
            }}
          >
            <div
              style={{
                textOverflow: 'ellipsis',
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textAlign: 'center'
              }}
            >
              {location.label}
            </div>
          </div>
        </div>
      </OverlayViewF>
    </>
  );
};

export default SavedLocation;
