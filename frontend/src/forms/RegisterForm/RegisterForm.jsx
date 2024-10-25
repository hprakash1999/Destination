import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputBox, TextareaBox } from "../../components/Components.js";
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

  const [isFormValid, setIsFormValid] = useState(false);

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

  // Validate form fields
  const validateForm = () => {
    const { fullname, username, email, bio, password, avatar } = formData;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const bioWordCount = bio
      .split(" ")
      .filter((word) => word.length > 0).length;

    // Check all validations
    return (
      fullname.trim() &&
      usernameRegex.test(username) &&
      email.trim() &&
      (bioWordCount <= 50 || bio === "") && // Bio not required
      password.length >= 8 &&
      avatar
    );
  };

  // Effect to check form validity
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-6 bg-zinc-800 p-8 rounded-lg shadow-lg"
    >
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

      <TextareaBox
        label="Bio"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Tell us something about yourself"
      />

      <div className="space-y-4">
        <label className="block text-zinc-200 text-sm font-medium">Role:</label>

        <div className="flex space-x-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="role"
              value="guest"
              checked={formData.role === "guest"}
              onChange={handleChange}
              className="hidden"
            />

            <span className="w-4 h-4 rounded-full border-2 border-zinc-600 flex items-center justify-center">
              {formData.role === "guest" && (
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </span>

            <span className="ml-2 text-zinc-200">Guest</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="role"
              value="host"
              checked={formData.role === "host"}
              onChange={handleChange}
              className="hidden"
            />

            <span className="w-4 h-4 rounded-full border-2 border-zinc-600 flex items-center justify-center">
              {formData.role === "host" && (
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </span>

            <span className="ml-2 text-zinc-200">Host</span>
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
        disabled={status === "loading" || !isFormValid}
        className="w-full py-3"
      />
    </form>
  );
};

export default RegisterForm;
