import { Location } from '../../../context/interfaces';
import { useGlobalContext } from '../../../context';
import Modal from '../../../utils/components/Modal';
import { ChangeEvent, useState } from 'react';
import Input from '../../../utils/components/Input';
import { toast } from 'react-toastify';

interface UpdateModalProps {
  isOpen: boolean;
  closeModal: () => void;
  location: Location | undefined;
}

const UpdateModal = ({ isOpen, closeModal, location }: UpdateModalProps) => {
  const [label, setLabel] = useState(location?.label);

  const { dispatch } = useGlobalContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const updateLocation = () => {
    if (!location) return null;
    dispatch({
      type: 'UPDATE_LOCATION',
      payload: {
        ...location,
        label
      }
    });
    closeModal();
    toast('location updated successfully', { type: 'success' });
  };

  if (!location) return null;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Update Location">
      <form onSubmit={updateLocation}>
        <div className="modal-body">
          <b>Coordinates</b>: {location.lat}, {location.lng} <br />
          <Input
            name="label"
            defaultValue={location.label}
            onChange={handleInputChange}
            placeholder="Enter a label..."
          />
        </div>

        <div className="modal-footer">
          <button
            type="submit"
            disabled={!label}
            style={{ backgroundColor: '#ef4444' }}
            onClick={updateLocation}
          >
            Update
          </button>
          <button onClick={closeModal}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateModal;
