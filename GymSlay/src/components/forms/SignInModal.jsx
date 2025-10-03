import React, { useState } from "react";
import Modal from "../modal/Modal";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";

const SignInModal = ({ isOpen, onClose, onSignIn, onRegister }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSignIn = async (formData) => {
    if (onSignIn) {
      await onSignIn(formData);
    }
    // Close modal on successful sign in
    onClose();
  };

  const handleRegister = async (formData) => {
    if (onRegister) {
      await onRegister(formData);
    }
    // Close modal on successful registration
    onClose();
  };

  const switchToRegister = () => {
    setIsRegisterMode(true);
  };

  const switchToSignIn = () => {
    setIsRegisterMode(false);
  };

  const handleClose = () => {
    setIsRegisterMode(false); // Reset to sign in mode when closing
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isRegisterMode ? "Välkommen" : "Välkommen Tillbaka"}
    >
      {isRegisterMode ? (
        <>
          <RegisterForm onSubmit={handleRegister} onCancel={handleClose} />
          <div className="form-switch">
            <p className="switch-text">
              Har du redan ett konto?
              <button
                type="button"
                className="switch-link"
                onClick={switchToSignIn}
              >
                Logga in här
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <SignInForm onSubmit={handleSignIn} onCancel={handleClose} />
          <div className="form-switch">
            <p className="switch-text">
              Har du inget konto?
              <button
                type="button"
                className="switch-link"
                onClick={switchToRegister}
              >
                Skapa Konto
              </button>
            </p>
            <p
              className="info-text"
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginTop: "0.5rem",
                fontStyle: "italic",
              }}
            >
              Obs: Registrering är inte tillgänglig ännu. Kontakta
              administratören för att skapa ett konto.
            </p>
          </div>
        </>
      )}
    </Modal>
  );
};

export default SignInModal;
