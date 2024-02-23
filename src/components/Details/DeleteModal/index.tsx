import { Location } from '../../../context/interfaces';
import { useGlobalContext } from '../../../context';
import Modal from '../../../utils/components/Modal';

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  location: Location | undefined;
}

const DeleteModal = ({ isOpen, closeModal, location }: DeleteModalProps) => {
  const { dispatch } = useGlobalContext();

  const deleteLocation = (id: string) => {
    dispatch({ type: 'DELETE_LOCATION', payload: id });
    closeModal();
  };

  if (!location) return null;

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="Are you sure you want to delete this location?"
    >
      <div className="modal-body">
        <b>Coordinates</b>: {location.lat}, {location.lng} <br />
        <b>Label</b>: {location.label} <br />
      </div>

      <div className="modal-footer">
        <button
          style={{ backgroundColor: '#ef4444' }}
          onClick={() => deleteLocation(location.id || '')}
        >
          Delete
        </button>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
