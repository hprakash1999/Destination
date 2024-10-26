import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Import components
import { Layout } from "./components/Components.js";
import { ErrorPage, Explore, Home, Register } from "./pages/Pages.js";

// Create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<ErrorPage />} />
      <Route path="" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

// Render router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
