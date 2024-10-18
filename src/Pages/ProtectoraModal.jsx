import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaFacebook, FaEnvelope, FaInstagram } from 'react-icons/fa';

const ProtectoraModal = ({ show, handleClose, protectora }) => {
  if (!protectora) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> {protectora.nombreProtectora}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5>{protectora.nombre}</h5>
        <p>{protectora.descripcion}</p>

        {protectora.email && (
          <p>
            <FaEnvelope /> {protectora.email}
          </p>
        )}

        {protectora.instagram && (
          <p>
            <FaInstagram /> {protectora.instagram}
          </p>
        )}

        {protectora.facebook && (
          <p>
            <FaFacebook /> {protectora.facebook}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProtectoraModal;
