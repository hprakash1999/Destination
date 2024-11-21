import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Import components
import { Layout } from "./components/Components.js";
import {
  AddNewListing,
  ErrorPage,
  Explore,
  Home,
  ListingDetails,
  Login,
  Register,
} from "./pages/Pages.js";

// Create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="explore/:listingId" element={<ListingDetails />} />
        <Route path="register" element={<Register />} />
        <Route path="in" element={<Login />} />
        <Route path="listing/new" element={<AddNewListing />} />
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
