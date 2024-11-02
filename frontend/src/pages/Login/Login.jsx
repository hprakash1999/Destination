import { LinkButton } from "../../components/Components.js";
import { LoginForm } from "../../forms/Forms.js";

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-200">Welcome back!</h1>

        <p className="text-lg text-zinc-300 mt-2">
          We’ve missed you! Let’s get you logged in.
        </p>
      </div>

      <LoginForm />

      <div className="mt-4">
        <p className="text-zinc-300">
          New here?
          <LinkButton
            text="Join us today"
            to="/register"
            className="text-rose-500 font-semibold ml-1 hover:underline"
          />
        </p>
      </div>
    </div>
  );
}

export default Login;
