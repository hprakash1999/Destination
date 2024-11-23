import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editListing, fetchListingById } from "../../api/listings.js";
import {
  Button,
  InputBox,
  Loading,
  TextareaBox,
} from "../../components/Components.js";
import useListingValidation from "../../hooks/useListingValidation";

const EditListingForm = () => {
  const { listingId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    pricePerNight: "",
    category: "",
    listingImage: null,
  });

  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { isFormValid, errors } = useListingValidation(formData, touched);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch the listing data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const listing = await fetchListingById(listingId);
        setFormData({
          title: listing.title || "",
          description: listing.description || "",
          location: listing.location || "",
          country: listing.country || "",
          pricePerNight: listing.pricePerNight || "",
          category: listing.category || "",
          listingImage: null,
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch listing details:", err);
        navigate("/explore");
      }
    };

    fetchData();
  }, [listingId, navigate]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      listingImage: e.target.files[0],
    }));
  };

  // Handle field blur for validation
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { listingImage, ...dataToSend } = formData;

    try {
      await editListing(listingId, dataToSend, listingImage);

      // Notify user and redirect
      alert("Listing updated successfully!");
      navigate("/explore");
    } catch (err) {
      console.error("Failed to update listing:", err);
      alert("Failed to update listing. Please try again.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-6 bg-zinc-800 p-8 rounded-lg shadow-lg"
    >
      {errors.global && <p className="text-red-500">{errors.global}</p>}

      <InputBox
        label="Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        onBlur={() => handleBlur("title")}
        placeholder="Enter listing title"
        required
      />
      {errors.title && touched.title && (
        <p className="text-red-500">{errors.title}</p>
      )}

      <TextareaBox
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        onBlur={() => handleBlur("description")}
        placeholder="Describe the property (max 200 words)"
      />
      {errors.description && touched.description && (
        <p className="text-red-500">{errors.description}</p>
      )}

      <InputBox
        label="Location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        onBlur={() => handleBlur("location")}
        placeholder="Enter property location"
        required
      />
      {errors.location && touched.location && (
        <p className="text-red-500">{errors.location}</p>
      )}

      <InputBox
        label="Country"
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        onBlur={() => handleBlur("country")}
        placeholder="Enter country"
        required
      />
      {errors.country && touched.country && (
        <p className="text-red-500">{errors.country}</p>
      )}

      <InputBox
        label="Price Per Night"
        type="number"
        name="pricePerNight"
        value={formData.pricePerNight}
        onChange={handleChange}
        onBlur={() => handleBlur("pricePerNight")}
        placeholder="Enter price per night in ₹"
        required
      />
      {errors.pricePerNight && touched.pricePerNight && (
        <p className="text-red-500">{errors.pricePerNight}</p>
      )}

      <div>
        <label className="block text-zinc-200 text-sm font-medium mb-2">
          Category:
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          onBlur={() => handleBlur("category")}
          required
          className="block w-full text-zinc-100 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="">Select category</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Cottage">Cottage</option>
          <option value="Luxury">Luxury</option>
          <option value="Island">Island</option>
          <option value="Castle">Castle</option>
          <option value="Treehouse">Treehouse</option>
          <option value="Cabin">Cabin</option>
          <option value="Tropical">Tropical</option>
          <option value="Lakeside">Lakeside</option>
          <option value="Mountain">Mountain</option>
          <option value="Safari">Safari</option>
        </select>
        {errors.category && touched.category && (
          <p className="text-red-500">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-zinc-200 text-sm font-medium mb-2">
          Listing Image:
        </label>
        <input
          type="file"
          name="listingImage"
          ref={fileInputRef}
          onChange={handleFileChange}
          onBlur={() => handleBlur("listingImage")}
          accept="image/*"
          className="block w-full text-zinc-100 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        {errors.listingImage && touched.listingImage && (
          <p className="text-red-500">{errors.listingImage}</p>
        )}
      </div>

      <Button
        text={"Update Listing"}
        primary
        disabled={!isFormValid}
        className="w-full py-3"
      />
    </form>
  );
};

export default EditListingForm;
