import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Import components
import { Layout } from "./components/Components.js";
import { Home } from "./pages/Pages.js";

// Create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
    </Route>
  )
);

// Render router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
