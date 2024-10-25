import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputBox } from "../../components/Components.js";
import { registerUser } from "../../features/features.js";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    role: "guest",
    password: "",
    avatar: null,
  });

  // Form change handler
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

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { avatar, ...dataToSend } = formData;
    const registerData = { ...dataToSend, avatar };

    try {
      await dispatch(registerUser(registerData)).unwrap();
      // Reset the form after successful registration
      setFormData({
        fullname: "",
        username: "",
        email: "",
        bio: "",
        role: "guest",
        password: "",
        avatar: null,
      });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      <InputBox
        label="Full Name"
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        placeholder="Enter full name"
        required
      />

      <InputBox
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter username"
        required
      />

      <InputBox
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
        required
      />

      <InputBox
        label="Bio"
        type="text"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Tell us something about yourself"
      />

      <div className="space-y-4">
        <label className="block text-zinc-200 text-sm font-medium">Role:</label>
        <div className="flex space-x-6">
          <label className="text-zinc-200 flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="guest"
              checked={formData.role === "guest"}
              onChange={handleChange}
              className="form-radio"
            />
            <span>Guest</span>
          </label>
          <label className="text-zinc-200 flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="host"
              checked={formData.role === "host"}
              onChange={handleChange}
              className="form-radio"
            />
            <span>Host</span>
          </label>
        </div>
      </div>

      <InputBox
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create password"
        required
      />

      <div>
        <label className="block text-zinc-200 text-sm font-medium mb-2">
          Avatar:
        </label>
        <input
          type="file"
          name="avatar"
          onChange={handleFileChange}
          accept="image/*"
          required
          className="block w-full text-zinc-100 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>

      <Button
        text={status === "loading" ? "Registering..." : "Register"}
        primary
        disabled={status === "loading"}
        className="w-full py-3"
      />
    </form>
  );
};

export default RegisterForm;
