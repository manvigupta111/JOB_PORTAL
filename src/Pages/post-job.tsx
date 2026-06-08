import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";
import useFetch from "@/hooks/use-fetch.tsx";
import { getCompanies } from "@/api/api-companies.tsx";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button.tsx";
import { addNewJob } from "@/api/api-jobs.tsx";
import AddCompanyDrawer from "@/components/add-company-drawer.tsx";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is Required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or add a new company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  const {
    fn: fnCreateJob,
    error: errorCreateJob,
    data: createdJobData,
    loading: loadingCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({ ...data, recruiter_id: user.id, isOpen: true });
  };

  useEffect(() => {
    if (createdJobData?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  if (!isLoaded || loadingCompanies)
    return <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />;

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>
      <form
        className="flex flex-col gap-4 p-4 pb-0"
        onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Job Title..." {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea
          placeholder="Job description..."
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex gap-4 items-center">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter By Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => {
                      return (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter By company...">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => {
                      return (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>

        {errors.location && <p>{errors.location.message}</p>}
        {errors.company_id && <p>{errors.company_id.message}</p>}

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {errorCreateJob && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}
        {loadingCreateJob && (
          <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />
        )}
        <Button
          type="submit"
          variant="blue"
          size="lg"
          className="mt-2"></Button>
      </form>
    </div>
  );
};

export default PostJob;
