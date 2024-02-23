import { Dispatch } from 'react';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Location extends LatLng {
  id: string;
  label?: string;
  address?: string;
}

export interface GlobalContextState {
  locations: Location[];
  mapCenter: LatLng;
  markerInputLocation?: Location | null;
  lastIdIndex: number;
  showMobileListContainer: boolean;
  temporaryUserSelection?: LatLng | null;
}

export interface GlobalContextProps {
  state: GlobalContextState;
  dispatch: Dispatch<GlobalActions>;
}

export type GlobalActions =
  | {
      type: 'ADD_LOCATION';
      payload: Location;
    }
  | {
      type: 'REVISIT_LOCATION';
      payload: string;
    }
  | {
      type: 'DELETE_LOCATION';
      payload: string;
    }
  | {
      type: 'UPDATE_LOCATION';
      payload: Location;
    }
  | {
      type: 'SET_MARKER_FOCUS';
      payload: string;
    }
  | {
      type: 'SET_LAST_ID_INDEX';
      payload: number;
    }
  | {
      type: 'TOGGLE_MOBILE_LIST';
    }
  | {
      type: 'SET_TEMPORARY_USER_SELECTION';
      payload: LatLng | null;
    };
