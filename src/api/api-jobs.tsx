import supabaseClient from "@/utils/supabase";

export async function getJobs(token, {location, company_id, searchQuery}) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("* ,company: companies(name, logo_url),saved: saved_jobs(id)");

  if(location) {
    query = query.eq("location", location);
  }

  if(company_id) {
    query = query.eq("company_id", company_id);
  }

  if(searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error} = await query;

  if(error) {
    console.log("Error Fetching Data", error);
    return null;
  }

  return data;
}

export async function saveJob(token, options, { user_id, job_id, alreadySaved }) {
  console.log(token, { user_id, job_id, alreadySaved });
  const supabase = await supabaseClient(token);

   const { data: authData, error: authError } =
    await supabase.rpc("debug_auth");

  console.log("AUTH DATA:", authData);
  console.log("AUTH ERROR:", authError);

  if(alreadySaved) {
    console.log(3);
    const {data, error: deleteError } = await supabase.from("saved_jobs").delete().eq("job_id", job_id);

    if(deleteError) {
      console.log("Error deleting saved job", deleteError);
      return null;
    }

    return data;
  } else {
    console.log({user_id, job_id});
    const {data, error: insertError } = await supabase.from("saved_jobs").insert([{user_id, job_id}]).select();

    if(insertError) {
      console.log("Error inseting saved job", insertError);
      return null;
    }

    return data;
  }
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(`
      *,
      company:companies(
        name,
        logo_url
      ),
      applications(*)
    `)
    .eq("id", job_id)
    .single();

  if (error) throw new Error("Error fetching a single job", error);

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({isOpen})
    .eq("id", job_id)
    .select();

  if (error) throw new Error("Error updating hiring status", error);

  return data;
}