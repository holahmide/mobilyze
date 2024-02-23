import { Dispatch } from 'react';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapLocation extends LatLng {
  id: string;
  label?: string;
  address?: string;
}

export interface GlobalContextState {
  locations: MapLocation[];
  mapCenter: LatLng;
  markerInputLocation?: MapLocation | null;
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
      payload: MapLocation;
    }
  | {
      type: 'IMPORT_DATA';
      payload: MapLocation[];
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
      payload: MapLocation;
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
