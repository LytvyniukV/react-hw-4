import ReactModal from 'react-modal';
import css from './ImageModal.module.css';
ReactModal.setAppElement('body');

export const ImageModal = ({ showModal, handleCloseModal, imgUrl }) => {
  return (
    <>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        className={css.Modal}
        overlayClassName={css.Overlay}
      >
        <img src={imgUrl} alt="" />
      </ReactModal>
    </>
  );
};
