import { useState } from "react";
import { registerNewUser } from "../../api/api.js";
import { Button, InputBox, TextareaBox } from "../../components/Components.js";
import useFormValidation from "../../hooks/useFormValidation";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    role: "guest",
    password: "",
    avatar: null,
  });

  const [touched, setTouched] = useState({
    fullname: false,
    username: false,
    email: false,
    bio: false,
    password: false,
    avatar: false,
  });

  const { isFormValid, errors } = useFormValidation(formData, touched);

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      avatar: e.target.files[0],
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { avatar, ...dataToSend } = formData;
    const registerData = { ...dataToSend, avatar };

    try {
      await registerNewUser(registerData);

      // Reset form fields after submission
      setFormData({
        fullname: "",
        username: "",
        email: "",
        bio: "",
        role: "guest",
        password: "",
        avatar: null,
      });

      setTouched({
        fullname: false,
        username: false,
        email: false,
        bio: false,
        password: false,
        avatar: false,
      });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-6 bg-zinc-800 p-8 rounded-lg shadow-lg"
    >
      {errors.global && <p className="text-red-500">{errors.global}</p>}

      <InputBox
        label="Full Name"
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        onBlur={() => handleBlur("fullname")}
        placeholder="Enter full name"
        required
      />
      {errors.fullname && touched.fullname && (
        <p className="text-red-500">{errors.fullname}</p>
      )}

      <InputBox
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        onBlur={() => handleBlur("username")}
        placeholder="Enter username"
        required
      />
      {errors.username && touched.username && (
        <p className="text-red-500">{errors.username}</p>
      )}

      <InputBox
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => handleBlur("email")}
        placeholder="Enter email"
        required
      />
      {errors.email && touched.email && (
        <p className="text-red-500">{errors.email}</p>
      )}

      <TextareaBox
        label="Bio"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        onBlur={() => handleBlur("bio")}
        placeholder="Tell us something about yourself"
      />
      {errors.bio && touched.bio && (
        <p className="text-red-500">{errors.bio}</p>
      )}

      <InputBox
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={() => handleBlur("password")}
        placeholder="Create password"
        required
      />
      {errors.password && touched.password && (
        <p className="text-red-500">{errors.password}</p>
      )}

      <div>
        <label className="block text-zinc-200 text-sm font-medium mb-2">
          Avatar:
        </label>
        <input
          type="file"
          name="avatar"
          onChange={handleFileChange}
          onBlur={() => handleBlur("avatar")}
          accept="image/*"
          required
          className="block w-full text-zinc-100 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        {errors.avatar && touched.avatar && (
          <p className="text-red-500">{errors.avatar}</p>
        )}
      </div>

      <Button
        text={"Register"}
        primary
        disabled={!isFormValid}
        className="w-full py-3"
      />
    </form>
  );
};

export default RegisterForm;
