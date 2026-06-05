import supabaseClient from "@/utils/supabase.ts";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  const { data: companyData, error: companyError} = await supabase.from("companies").select("*");

  if(companyError) {
    throw new Error("Error Fetching Companies", companyError);
  }

  return companyData;

}