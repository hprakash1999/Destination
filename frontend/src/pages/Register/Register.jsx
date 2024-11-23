import { LinkButton } from "../../components/Components.js";
import { RegisterForm } from "../../forms/Forms.js";

function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-200">
          Welcome to Our Community!
        </h1>

        <p className="text-lg text-zinc-300 mt-2">
          Create an account to get started.
        </p>
      </div>

      <RegisterForm />

      <div className="mt-4">
        <p className="text-zinc-300">
          Already with us?
          <LinkButton
            text="Login here"
            to="/in"
            className="text-rose-500 font-semibold hover:underline px-0 ml-1"
          />
        </p>
      </div>
    </div>
  );
}

export default Register;
