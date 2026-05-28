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
import ProtectedRoute from "@/components/protected-route.tsx";

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
          element: <ProtectedRoute>
                <Onboarding />
            </ProtectedRoute>,
        },
        {
          path: "/jobs",
          element: <ProtectedRoute><JobListing /></ProtectedRoute>,
        },
        {
          path: "/job/:id",
          element: <ProtectedRoute><JobPage /></ProtectedRoute>,
        },
        {
          path: "/post-job",
          element: <ProtectedRoute><PostJob /></ProtectedRoute>,
        },
        {
          path: "/saved-job",
          element: <ProtectedRoute><SavedJob /></ProtectedRoute>,
        },
        {
          path: "/my-jobs",
          element: <ProtectedRoute><MyJobs /></ProtectedRoute>,
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
