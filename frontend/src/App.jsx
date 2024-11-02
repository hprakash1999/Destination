import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Import components
import { Layout } from "./components/Components.js";
import { ErrorPage, Explore, Home, Login, Register } from "./pages/Pages.js";

// Create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="register" element={<Register />} />
        <Route path="in" element={<Login />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

// Render router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
