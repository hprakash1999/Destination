import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, InputBox } from "../../components/Components";
import { loginExistedUser } from "../../features/features.js";
import useFormValidation from "../../hooks/useFormValidation.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const { isFormValid, errors } = useFormValidation(formData, touched);
  const { isLoading, error } = useSelector((state) => state.auth);

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginExistedUser(formData));

      if (response.payload && response.payload.accessToken) {
        navigate("/in/:username");
      }
    } catch (err) {
      console.error(err.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 bg-zinc-800 p-8 rounded-lg shadow-lg"
    >
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Show error if exists */}
      <InputBox
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => handleBlur("email")}
        placeholder="Enter your email"
        required
      />
      {errors.email && touched.email && (
        <p className="text-red-500">{errors.email}</p>
      )}
      <InputBox
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={() => handleBlur("password")}
        placeholder="Enter your password"
        required
      />
      {errors.password && touched.password && (
        <p className="text-red-500">{errors.password}</p>
      )}
      <Button
        text={isLoading ? "Logging in..." : "Login"}
        primary
        disabled={!isFormValid || isLoading}
        className="w-full py-3"
      />
    </form>
  );
};

export default LoginForm;
