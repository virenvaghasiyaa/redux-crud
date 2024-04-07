// DeleteConfirmationModal.js
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const AlertModal = ({ show, handleClose, handleConfirmDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Yes, delete it
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;

AlertModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirmDelete: PropTypes.func,
};
