"use client";

import { RootState } from "@/redux/Reducer/MainSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Schema from "./Schema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../ui/form/Input";
import EditSelectField from "../ui/form/EditSelectField";

interface IEditProps {
  setEditModalOpen: Function;
  refetch: any;
}

interface IFormInput {
  name: string;
  email: string;
  gender: string;
  employeeType: string;
}

const genderData = [
  {
    id: 1,
    label: "Male",
    value: "male",
  },
  {
    id: 2,
    label: "Female",
    value: "female",
  },
  {
    id: 3,
    label: "Third Gender",
    value: "third gender",
  },
];

const EditUser: FC<IEditProps> = ({ setEditModalOpen, refetch }) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const editData = useSelector((state: RootState) => state.Initial.val);

  const resolver = yupResolver(Schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    resetField,
    watch,
  } = useForm<IFormInput>({ resolver });

  const name = watch("name");
  const gender = watch("gender");


  console.log("name", name);
  console.log("gender", gender);
  

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
    setIsLoading(true);
    toast.success("Message sent successfully!", {
      position: "bottom-left",
      autoClose: 3001,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
    refetch();
    setEditModalOpen(false);
    setIsLoading(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid  grid-cols-2 gap-6">
          <Input
            inputType="text"
            labelName="Name"
            placeholderText="Enter your name"
            name="name"
            defaultValue={editData?.name}
            errors={errors}
            register={register}
          />
          <Input
            inputType="email"
            labelName="Email"
            placeholderText="Enter your email"
            name="email"
            defaultValue={editData?.email}
            errors={errors}
            register={register}
          />

          <EditSelectField
            control={control}
            name="gender"
            data={genderData}
            label="Gender"
            placeholder="-Select Gender-"
            error=""
            labelKey="label"
            valueKey="value"
            resetField={resetField}
            resetFieldName1=""
            resetFieldName2=""
            disabledValue="1"
            isLoading={false}
            defaultValue="male"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#388E3C] text-bgPrimary text-sm font-medium px-8 py-3 rounded-md mt-6"
        >
          {isLoading ? "Loading..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
