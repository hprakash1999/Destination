import { useSelector } from "react-redux";
import { LinkButton } from "../../components/Components";

function UserProfile() {
  const { user } = useSelector((state) => state.auth);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center py-12 px-6">
      <div className="max-w-4xl w-full bg-zinc-800 p-8 rounded-lg shadow-2xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            {/* Avatar */}
            <img
              src={user.avatar}
              alt={`${user.fullname}'s Avatar`}
              className="w-32 h-32 rounded-full object-cover border-4 border-rose-500"
            />
            <div className="ml-6">
              <h2 className="text-3xl font-bold text-zinc-200">
                {user.fullname}
              </h2>
              <p className="text-lg text-zinc-300">{user.username}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <LinkButton
            text="Edit Profile"
            to={`/in/${user.username}/edit`}
            primary
          />
        </div>

        {/* Profile Details Section */}
        <div className="space-y-6">
          <div className="flex justify-between border-b border-zinc-700 pb-4">
            <span className="text-zinc-300 text-lg">Email:</span>
            <span className="text-zinc-200 text-lg">{user.email}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-700 pb-4">
            <span className="text-zinc-300 text-lg">Role:</span>
            <span className="text-zinc-200 text-lg">{user.role}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-700 pb-4">
            <span className="text-zinc-300 text-lg">Bio:</span>
            <span className="text-zinc-200 text-lg">{user.bio}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-700 pb-4">
            <span className="text-zinc-300 text-lg">Account Created:</span>
            <span className="text-zinc-200 text-lg">
              {formatDate(user.createdAt)}
            </span>
          </div>

          <div className="flex justify-between pb-4">
            <span className="text-zinc-300 text-lg">Last Updated:</span>
            <span className="text-zinc-200 text-lg">
              {formatDate(user.updatedAt)}
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center">
          <p className="text-zinc-300">
            Want to explore other options?{" "}
            <LinkButton
              text="Explore Listings"
              to="/explore"
              className="text-rose-500 font-semibold hover:underline px-0 ml-1"
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
