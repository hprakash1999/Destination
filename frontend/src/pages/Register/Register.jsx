import { useState } from "react";
import { Button } from "../../components/Components.js";
import { LoginForm, RegisterForm } from "../../forms/Forms.js";

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-200">
          Welcome to Our Community!
        </h1>

        <p className="text-lg text-zinc-300 mt-2">
          {isLogin
            ? "Login to continue your journey."
            : "Create an account to get started."}
        </p>
      </div>

      {/* Conditional rendering for register or login form */}
      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className="mt-4">
        <p className="text-zinc-300">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <Button
            text={isLogin ? "Register here" : "Login here"}
            className="text-rose-500 font-semibold ml-1 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          />
        </p>
      </div>
    </div>
  );
};

export default Register;
