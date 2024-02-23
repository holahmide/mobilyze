import { GlobalActions, GlobalContextState } from './interfaces';
import { LOCAL_STORAGE_NAME, LOCATION_LABEL_PREFIX } from './constants';

export const globalReducer = (
  state: GlobalContextState,
  action: GlobalActions
): GlobalContextState => {
  let newState: GlobalContextState = { ...state };

  switch (action.type) {
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