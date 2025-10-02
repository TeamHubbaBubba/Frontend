import React, { useState } from "react";
import "./forms.css";

const SignInForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "E-post krävs";
    if (!emailRegex.test(email)) return "Ange en giltig e-postadress";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Lösenord krävs";
    if (password.length < 6) return "Lösenordet måste vara minst 6 tecken";
    return "";
  };

  // Handle input changes with live validation
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate on change if field has been touched
    if (touched[field]) {
      const newErrors = { ...errors };

      if (field === "email") {
        const emailError = validateEmail(value);
        if (emailError) {
          newErrors.email = emailError;
        } else {
          delete newErrors.email;
        }
      }

      if (field === "password") {
        const passwordError = validatePassword(value);
        if (passwordError) {
          newErrors.password = passwordError;
        } else {
          delete newErrors.password;
        }
      }

      setErrors(newErrors);
    }
  };

  // Handle field blur (mark as touched and validate)
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const newErrors = { ...errors };

    if (field === "email") {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
      } else {
        delete newErrors.email;
      }
    }

    if (field === "password") {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const validationErrors = {};
    if (emailError) validationErrors.email = emailError;
    if (passwordError) validationErrors.password = passwordError;

    setErrors(validationErrors);

    // If no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (onSubmit) {
          await onSubmit(formData);
        }
      } catch (error) {
        console.error("Sign in error:", error);
        setErrors({ submit: "Inloggning misslyckades. Försök igen." });
      }
    }

    setIsSubmitting(false);
  };

  const isFormValid =
    Object.keys(errors).length === 0 && formData.email && formData.password;

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Logga In</h2>

      <div className="form-group">
        <label htmlFor="email">E-post</label>
        <input
          id="email"
          type="email"
          className={`form-input ${errors.email ? "error-box" : ""}`}
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="Ange din e-post"
          disabled={isSubmitting}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          type="password"
          className={`form-input ${errors.password ? "error-box" : ""}`}
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          placeholder="Ange ditt lösenord"
          disabled={isSubmitting}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      {errors.submit && <p className="error-text">{errors.submit}</p>}

      <div className="form-actions">
        <button
          type="submit"
          className={`btn-submit ${
            !isFormValid || isSubmitting ? "disabled" : ""
          }`}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Loggar in..." : "Logga In"}
        </button>

        {onCancel && (
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Avbryt
          </button>
        )}
      </div>
    </form>
  );
};

export default SignInForm;
