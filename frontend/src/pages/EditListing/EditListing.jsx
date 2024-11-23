import { LinkButton } from "../../components/Components.js";
import { EditListingForm } from "../../forms/Forms.js";

function EditListing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-200">Edit Listing</h1>

        <p className="text-lg text-zinc-300 mt-2">
          Update the details of your listing below.
        </p>
      </div>

      <EditListingForm />

      <div className="mt-4">
        <p className="text-zinc-300">
          Want to explore other listings?{" "}
          <LinkButton
            text="Explore Listings"
            to="/explore"
            className="text-rose-500 font-semibold ml-1 hover:underline"
          />
        </p>
      </div>
    </div>
  );
}

export default EditListing;
