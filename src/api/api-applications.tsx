import supabaseClient from "@/utils/supabase.ts";
import { supabaseUrl } from "@/utils/supabase.ts";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);
  if (storageError) throw new Error("Error Storing the resume: ", storageError);

  const resume = `${supabaseUrl}/storage/vi/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    throw new Error("Error Submitting the application ", error);
  }

  return data;
}

export async function updateApplication(token, { job_id }, status) {
  const supabase = await supabaseClient(token);

  const { error: updateError, data: updatedData } = await supabase
    .from("aaplications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (updateError || updatedData.length === 0) {
    console.log("Error updating the status of the application: ", updateError);
    return null;
  }
}
