import { getSavedJobs } from "@/api/api-jobs.tsx";
import useFetch from "@/hooks/use-fetch.tsx";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card.tsx";
import { useEffect } from "react";

const SavedJob = () => {
  const { isLoaded } = useUser();
  const {
    loading: loadingSavedJobs,
    fn: fnGetSavedJobs,
    data: savedJobs,
    error: errorGettingSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    fnGetSavedJobs();
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs)
    return <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />;

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl txt-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs.map((savedJob, idx) => {
              return (
                <span>
                  <JobCard
                    key={savedJob?.id}
                    job={savedJob?.job}
                    savedInit={true}
                    onJobSaved={fnGetSavedJobs}
                  />
                </span>
              );
            })
          ) : (
            <div>No Saved Jobs Found</div>
          )}
        </div>
      )}
      {errorGettingSavedJobs && (
        <p className="text-red-500">{errorGettingSavedJobs?.message}</p>
      )}
    </div>
  );
};

export default SavedJob;
