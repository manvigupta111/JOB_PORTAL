import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import CreatedApplications from "@/components/created-applications.tsx";
import CreatedJobs from "@/components/created-jobs.tsx";

const MyJobs = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded)
    return <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />;
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl txt-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}

        {user?.unsafeMetadata?.role === "candidate" ? (
          <CreatedApplications />
        ) : (
          <CreatedJobs />
        )}
      </h1>
    </div>
  );
};

export default MyJobs;
