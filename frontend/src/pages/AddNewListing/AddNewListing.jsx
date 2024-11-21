import { LinkButton } from "../../components/Components.js";
import { AddListingForm } from "../../forms/Forms.js";

function AddNewListing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-200">Add a New Listing</h1>

        <p className="text-lg text-zinc-300 mt-2">
          Provide details for your new listing to share it with the community.
        </p>
      </div>

      <AddListingForm />

      <div className="mt-4">
        <p className="text-zinc-300">
          Want to explore other listings?
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

export default AddNewListing;
