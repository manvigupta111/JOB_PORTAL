import { getApplications } from "@/api/api-applications.tsx";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/use-fetch.tsx";
import { BarLoader } from "react-spinners";
import ApplicationCard from "@/components/application-card.tsx";

const CreatedApplications = () => {
  const { isLoaded, user } = useUser();
  const {
    loading: loadingApplications,
    fn: fnApplications,
    data: applications,
    error,
  } = useFetch(getApplications, { user_id: user.id });

  useEffect(() => {
    fnApplications();
  }, [isLoaded]);

  if (loadingApplications)
    return <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />;

  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key="application.id"
            application={application}
            isCandidate
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications;
