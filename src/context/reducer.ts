import { GlobalActions, GlobalContextState } from './interfaces';
import { LOCAL_STORAGE_NAME, LOCATION_LABEL_PREFIX } from './constants';

export const globalReducer = (
  state: GlobalContextState,
  action: GlobalActions
): GlobalContextState => {
  let newState: GlobalContextState = { ...state };

  switch (action.type) {
    case 'IMPORT_DATA':
      newState = {
        ...state,
        locations: [
          ...action.payload
            .filter(
              (location) =>
                // Validates presence of lat & lng, and the presence of the data in the locations array
                Number(location.lat) &&
                Number(location.lng) &&
                !state.locations.find(
                  (loc) => loc.lat === Number(location.lat) && loc.lng === Number(location.lng)
                )
            )
            .map((location) => ({
              ...location,
              lat: Number(location.lat),
              lng: Number(location.lng)
            })),
          ...state.locations
        ],
        lastIdIndex: state.lastIdIndex + 1
      };
      break;
    case 'ADD_LOCATION':
      newState = {
        ...state,
        locations: [
          {
            ...action.payload,
            label: `${LOCATION_LABEL_PREFIX} ${state.lastIdIndex}`
          },
          ...state.locations
        ],
        lastIdIndex: state.lastIdIndex + 1
      };
      break;
    case 'REVISIT_LOCATION':
      newState = {
        ...state,
        mapCenter:
          state.locations.find((location) => location.id === action.payload) || state.mapCenter
      };
      break;
    case 'UPDATE_LOCATION': {
      const findLocationIndex = newState.locations.findIndex(
        (location) => location.id === action.payload.id
      );
      if (findLocationIndex > -1) {
        newState.locations[findLocationIndex] = action.payload;
      }
      newState = {
        ...state,
        locations: [...newState.locations]
      };
      break;
    }
    case 'SET_MARKER_FOCUS':
      newState = {
        ...state,
        markerInputLocation: state.locations.find((location) => location.id === action.payload)
      };
      break;
    case 'DELETE_LOCATION':
      newState = {
        ...state,
        locations: state.locations.filter((location) => location.id !== action.payload)
      };
      break;
    case 'TOGGLE_MOBILE_LIST':
      newState = {
        ...state,
        showMobileListContainer: !state.showMobileListContainer
      };
      break;
    case 'SET_TEMPORARY_USER_SELECTION':
      newState = {
        ...state,
        temporaryUserSelection: action.payload || null
      };
      break;
    default:
      throw new Error(`No such type ${action.type}`);
  }

  localStorage.setItem(
    LOCAL_STORAGE_NAME,
    JSON.stringify({
      ...newState,
      user: newState
    })
  );
  return newState;
};
