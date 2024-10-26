import { LinkButton } from "../../components/Components.js";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-zinc-800 to-zinc-900 text-white text-center p-6">
      <h1 className="text-8xl font-extrabold mb-4">Oops!</h1>

      <h2 className="text-4xl mb-6">404 - Page Not Found</h2>

      <p className="text-lg mb-8">
        We couldn’t find the page you’re looking for.
        <br />
        Please check the link or return to explore our listings.
      </p>

      <LinkButton
        to="/explore"
        text="Go Back & Explore"
        className="text-rose-500 font-semibold ml-1 hover:underline"
      />
    </div>
  );
}

export default ErrorPage;
