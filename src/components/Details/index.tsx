import { useState } from 'react';
import {
  DeteteOutlinedIcon,
  HourglassEmptyOutlinedIcon,
  PenIcon,
  VisibilityOutlinedIcon
} from '../../assets/icons';
import { useGlobalContext } from '../../context';
import './styles.css';
import { Location } from '../../context/interfaces';
import { CSVLink } from 'react-csv';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const Details = () => {
  const {
    state: { locations },
    dispatch
  } = useGlobalContext();

  const revisitLocation = (id: string) => {
    dispatch({ type: 'REVISIT_LOCATION', payload: id });
    dispatch({
      type: 'SET_MARKER_FOCUS',
      payload: id
    });
  };

  const [activeLocation, setActivelocation] = useState<Location>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openDeleteModal = (location: Location) => {
    setActivelocation(location);
    setIsDeleteModalOpen(true);
  };

  const openUpdateModal = (location: Location) => {
    setActivelocation(location);
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <DeleteModal
        location={activeLocation as Location}
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
      />

      <UpdateModal
        location={activeLocation as Location}
        isOpen={isUpdateModalOpen}
        closeModal={() => setIsUpdateModalOpen(false)}
      />

      <div className="details">
        <div className="header-container">
          <h3>Mobilyze Locations ({locations.length})</h3>

          <CSVLink id="header-export-btn" data={locations} filename="mobilyze-locations">
            Export
          </CSVLink>
        </div>

        <div className="locations-container">
          {locations.map((location, index) => (
            <div key={index} className="location-container">
              <div className="location-container__label">{location.label}</div>

              <div className="location-container__details">
                <div className="location-container__coordinates">
                  {location.lat?.toFixed(6)}, {location.lng?.toFixed(6)}
                </div>

                <div className="location-container__icons">
                  <VisibilityOutlinedIcon
                    aria-label="Revisit location"
                    className="icon"
                    onClick={() => revisitLocation(location.id)}
                  />

                  <PenIcon
                    aria-label="Update location"
                    className="icon"
                    onClick={() => openUpdateModal(location)}
                  />

                  <DeteteOutlinedIcon
                    aria-label="Delete location"
                    className="icon"
                    onClick={() => openDeleteModal(location)}
                  />
                </div>
              </div>
            </div>
          ))}

          {locations.length === 0 && (
            <div className="no-locations">
              <HourglassEmptyOutlinedIcon className="no-locations__icon" />
              <p>No locations saved</p>
              <i>
                Select any location on the map to add to your list. You can also use the search
                input on the map💛.
              </i>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
