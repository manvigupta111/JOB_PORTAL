import { useUser } from "@clerk/clerk-react";
import { getMyJobs } from "@/api/api-jobs.tsx";
import useFetch from "@/hooks/use-fetch.tsx";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card.tsx";

const CreatedJobs = () => {
  const { isLoaded, user } = useUser();
  const {
    loading: loadingMyJobs,
    fn: fnMyJobs,
    data: myJobs,
    error,
  } = useFetch(getMyJobs, { user_id: user.id });

  useEffect(() => {
    fnMyJobs();
  }, [isLoaded]);

  if (loadingMyJobs)
    return <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />;

  return (
    <div className="flex flex-col gap-2">
      {myJobs?.map((myJob) => {
        return (
          <JobCard
            key="myJob.id"
            job={myJob}
            isMyJob={true}
            onJobSaved={fnMyJobs}
          />
        );
      })}
    </div>
  );
};

export default CreatedJobs;
