import React from "react";
import Modal from "../modal/Modal";
import RegisterForm from "./RegisterForm";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const handleRegister = async (formData) => {
    if (onRegister) {
      await onRegister(formData);
    }
    // Close modal on successful registration
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Välkommen">
      <RegisterForm onSubmit={handleRegister} onCancel={onClose} />
    </Modal>
  );
};

export default RegisterModal;
