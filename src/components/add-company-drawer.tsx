import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.tsx";
import useFetch from "@/hooks/use-fetch.tsx";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { addNewCompany } from "@/api/api-companies.tsx";

const schema = z.object({
  name: z.string().min(1, { message: "Compnay name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file?.length > 0 && ["image/png", "image/jpeg"].includes(file[0].type),
      {
        message: "Only Images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const {
    loading: loadingAddCompany,
    fn: fnAddCompany,
    data: dataAddCompany,
    error: errorAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) fetchCompanies();
  }, [loadingAddCompany]);
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Button type="button" size="sm" variant="secondary">
            Add a company
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a New Company</DrawerTitle>
          </DrawerHeader>
          <form className="flex gap-2 p-4 pb-0">
            <Input placeholder="Company name..." {...register("name")} />
            <Input
              type="file"
              accept="image/*"
              className=" file:text-gray-500"
              {...register("logo")}
            />
            <Button
              type="button"
              variant="destructive"
              className="w-40"
              onClick={handleSubmit(onSubmit)}>
              Add
            </Button>
          </form>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {errors.logo && (
            <p className="text-red-500">{errors.logo.message?.toString()}</p>
          )}
          {errorAddCompany?.message && (
            <p className="text-red-500">{errorAddCompany.message}</p>
          )}
          {loadingAddCompany && (
            <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />
          )}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddCompanyDrawer;
