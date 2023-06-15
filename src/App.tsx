import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Commits from "./components/commits/commits.component";
import CommitDetails from "./components/commit-details/commit-details.component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Commits />,
  },
  {
    path: "/commits/:id",
    element: <CommitDetails />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
