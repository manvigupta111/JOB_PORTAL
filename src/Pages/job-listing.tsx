import getJobs from "@/api/api-jobs.tsx";
import { useEffect } from "react";
import { useSession } from "@clerk/clerk-react";

const jobListing = () => {
  const { session } = useSession();

  const fetchJobs = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const data = await getJobs(supabaseAccessToken);
    console.log(data);
  }
  useEffect(() => {
    fetchJobs();
  }, []);
  return <div>JobListing</div>;
};

export default jobListing;  
