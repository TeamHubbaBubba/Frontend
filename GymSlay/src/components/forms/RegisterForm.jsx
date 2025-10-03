import React, { useState } from "react";
import "./forms.css";

const RegisterForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time validation functions
  const validateFirstName = (firstName) => {
    if (!firstName.trim()) return "Förnamn krävs";
    if (firstName.trim().length < 2) return "Förnamn måste vara minst 2 tecken";
    return "";
  };

  const validateLastName = (lastName) => {
    if (!lastName.trim()) return "Efternamn krävs";
    if (lastName.trim().length < 2)
      return "Efternamn måste vara minst 2 tecken";
    return "";
  };

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

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Bekräfta lösenord krävs";
    if (confirmPassword !== password) return "Lösenorden matchar inte";
    return "";
  };

  // Handle input changes with live validation
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate on change if field has been touched
    if (touched[field]) {
      const newErrors = { ...errors };

      if (field === "firstName") {
        const firstNameError = validateFirstName(value);
        if (firstNameError) {
          newErrors.firstName = firstNameError;
        } else {
          delete newErrors.firstName;
        }
      }

      if (field === "lastName") {
        const lastNameError = validateLastName(value);
        if (lastNameError) {
          newErrors.lastName = lastNameError;
        } else {
          delete newErrors.lastName;
        }
      }

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

        // Also revalidate confirm password if it's been touched
        if (touched.confirmPassword) {
          const confirmPasswordError = validateConfirmPassword(
            formData.confirmPassword,
            value
          );
          if (confirmPasswordError) {
            newErrors.confirmPassword = confirmPasswordError;
          } else {
            delete newErrors.confirmPassword;
          }
        }
      }

      if (field === "confirmPassword") {
        const confirmPasswordError = validateConfirmPassword(
          value,
          formData.password
        );
        if (confirmPasswordError) {
          newErrors.confirmPassword = confirmPasswordError;
        } else {
          delete newErrors.confirmPassword;
        }
      }

      setErrors(newErrors);
    }
  };

  // Handle field blur (mark as touched and validate)
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const newErrors = { ...errors };

    if (field === "firstName") {
      const firstNameError = validateFirstName(formData.firstName);
      if (firstNameError) {
        newErrors.firstName = firstNameError;
      } else {
        delete newErrors.firstName;
      }
    }

    if (field === "lastName") {
      const lastNameError = validateLastName(formData.lastName);
      if (lastNameError) {
        newErrors.lastName = lastNameError;
      } else {
        delete newErrors.lastName;
      }
    }

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

    if (field === "confirmPassword") {
      const confirmPasswordError = validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      );
      if (confirmPasswordError) {
        newErrors.confirmPassword = confirmPasswordError;
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Validate all fields
    const firstNameError = validateFirstName(formData.firstName);
    const lastNameError = validateLastName(formData.lastName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    const validationErrors = {};
    if (firstNameError) validationErrors.firstName = firstNameError;
    if (lastNameError) validationErrors.lastName = lastNameError;
    if (emailError) validationErrors.email = emailError;
    if (passwordError) validationErrors.password = passwordError;
    if (confirmPasswordError)
      validationErrors.confirmPassword = confirmPasswordError;

    setErrors(validationErrors);

    // If no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (onSubmit) {
          // Remove confirmPassword from the data sent to API
          const { confirmPassword: _, ...submitData } = formData;
          await onSubmit(submitData);
        }
      } catch (error) {
        console.error("Registration error:", error);
        setErrors({ submit: "Registrering misslyckades. Försök igen." });
      }
    }

    setIsSubmitting(false);
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword;

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Skapa Konto</h2>

      <div className="form-group">
        <label htmlFor="firstName">Förnamn</label>
        <input
          id="firstName"
          type="text"
          className={`form-input ${errors.firstName ? "error-box" : ""}`}
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          onBlur={() => handleBlur("firstName")}
          placeholder="Ange ditt förnamn"
          disabled={isSubmitting}
        />
        {errors.firstName && <p className="error-text">{errors.firstName}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Efternamn</label>
        <input
          id="lastName"
          type="text"
          className={`form-input ${errors.lastName ? "error-box" : ""}`}
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          onBlur={() => handleBlur("lastName")}
          placeholder="Ange ditt efternamn"
          disabled={isSubmitting}
        />
        {errors.lastName && <p className="error-text">{errors.lastName}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={`form-input ${errors.email ? "error-box" : ""}`}
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="Ange din email"
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

      <div className="form-group">
        <label htmlFor="confirmPassword">Bekräfta Lösenord</label>
        <input
          id="confirmPassword"
          type="password"
          className={`form-input ${errors.confirmPassword ? "error-box" : ""}`}
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          onBlur={() => handleBlur("confirmPassword")}
          placeholder="Bekräfta ditt lösenord"
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <p className="error-text">{errors.confirmPassword}</p>
        )}
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
          {isSubmitting ? "Skapar konto..." : "Skapa Konto"}
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

export default RegisterForm;
