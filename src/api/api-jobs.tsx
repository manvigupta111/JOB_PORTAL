import supabaseClient from "@/utils/supabase";

export default async function getJobs(token) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("*");

  const { data, error} = await query;

  if(error) {
    console.log("Error Fetching Data", error);
    return null;
  }

  return data;
}