import { MarkerF, OverlayView, OverlayViewF } from '@react-google-maps/api';
import { useGlobalContext } from '../../../context';
import { MouseEvent } from 'react';
import { generateLocationId } from '../../../context/functions';

const AddLocation = () => {
  const {
    state: { temporaryUserSelection },
    dispatch
  } = useGlobalContext();

  const addLocation = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!temporaryUserSelection) return;
    const id = generateLocationId();
    dispatch({ type: 'ADD_LOCATION', payload: { id, ...temporaryUserSelection } });
    dispatch({ type: 'SET_TEMPORARY_USER_SELECTION', payload: null });
  };

  const removeTemporarySelection = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch({ type: 'SET_TEMPORARY_USER_SELECTION', payload: null });
  };

  return (
    <>
      <MarkerF position={temporaryUserSelection!} icon="" />

      <OverlayViewF
        position={temporaryUserSelection!}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
            zIndex: 10,
            marginLeft: '-50%',
            backgroundColor: 'black',
            padding: '5px',
            width: '140px',
            borderRadius: '5px'
          }}
        >
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
            <button style={{ backgroundColor: 'var(--primary)' }} onClick={addLocation}>
              ADD
            </button>
            <button style={{ border: '1px solid white' }} onClick={removeTemporarySelection}>
              Cancel
            </button>
          </div>
        </div>
      </OverlayViewF>
    </>
  );
};

export default AddLocation;
