import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/Layouts/app-layout";
import LandingPage from "@/Pages/landing";
import Onboarding from "@/Pages/onboarding";
import JobListing from "@/Pages/job-listing";
import JobPage from "@/Pages/job";
import MyJobs from "@/Pages/my-jobs";
import PostJob from "@/Pages/post-job";
import SavedJob from "@/Pages/saved-job";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: <Onboarding />,
        },
        {
          path: "/jobs",
          element: <JobListing />,
        },
        {
          path: "/job/:id",
          element: <JobPage />,
        },
        {
          path: "/post-job",
          element: <PostJob />,
        },
        {
          path: "/saved-job",
          element: <SavedJob />,
        },
        {
          path: "/my-jobs",
          element: <MyJobs />,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
