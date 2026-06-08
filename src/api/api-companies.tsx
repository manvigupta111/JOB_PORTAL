import supabaseClient from "@/utils/supabase.ts";
import supabaseUrl from "@/utils/supabase.ts";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  const { data: companyData, error: companyError } = await supabase
    .from("companies")
    .select("*");

  if (companyError) {
    throw new Error("Error Fetching Companies", companyError);
  }

  return companyData;
}

export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company_logo")
    .upload(fileName, companyData.logo);
  if (storageError) throw new Error("Error uploading the logo: ", storageError);

  const logo_url = `${supabaseUrl}/storage/vi/object/public/company_logo/${fileName}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url,
      },
    ])
    .select();

  if (error) {
    throw new Error("Error adding the company", error);
  }

  return data;
}
