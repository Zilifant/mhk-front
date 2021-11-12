import Modal from './Modal';
import SVGButton from '../ui-elements/SVGButton';

const ErrorModal = ({ error, onClear }) => {
  return (
    <Modal
      onCancel={onClear}
      header="Operation Failed Successfully"
      show={!!error}
      footer={
        <SVGButton
          className='close-btn'
          onClick={onClear}
          icon='plus'
        />
      }
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;