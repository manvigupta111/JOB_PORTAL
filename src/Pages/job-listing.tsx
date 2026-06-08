import { getJobs } from "@/api/api-jobs.tsx";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card.tsx";
import { getCompanies } from "@/api/api-companies.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

const jobListing = () => {
  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });
  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query") as string;
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setCompany_id("");
    return;
  };

  if (!isLoaded)
    return <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />;

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3">
        <Input
          type="text"
          placeholder="Search jobs by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button variant="blue" type="submit" className="h-full sm:w-28">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full max-w-48">
          <Select
            value={location}
            onValueChange={(value) => {
              setLocation(value);
            }}>
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
        </div>

        <div className="w-full max-w-48">
          <Select
            value={company_id}
            onValueChange={(value) => {
              setCompany_id(value);
            }}>
            <SelectTrigger>
              <SelectValue placeholder="Filter By company..." />
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
        </div>

        <Button
          onClick={clearFilters}
          variant="destructive"
          className="sm:w-1/2">
          Clear Filters
        </Button>
      </div>

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job, idx) => {
              return (
                <span>
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job?.saved?.length > 0}
                  />
                </span>
              );
            })
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default jobListing;
