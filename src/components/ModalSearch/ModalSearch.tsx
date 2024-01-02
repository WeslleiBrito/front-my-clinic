
import React, {ReactNode} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children?: ReactNode;
}

export const CustomModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '300px',
          margin: 'auto',
        },
      }}
    >
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  );
};


