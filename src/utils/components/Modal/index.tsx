import ReactModal from 'react-modal';
import { customStyles } from './constants';
import './styles.css';
import { FC, ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  label?: string;
  title?: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ closeModal, children, isOpen, label, title }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={label}
    >
      <h3 ref={(_subtitle) => _subtitle} className="modal-header">
        {title}
      </h3>

      {children}
    </ReactModal>
  );
};

export default Modal;
