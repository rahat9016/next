"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Schema from "./Schema";
import { useForm } from "react-hook-form";
import Input from "../ui/form/Input";
import SelectField from "../ui/form/SelectField";
import { useState } from "react";
import { toast,  } from "react-toastify";
import RadioField from "../ui/form/RadioField";

interface IAdd {
  setOpen: (open: boolean) => void;
  refetch: () => void ;
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

interface IEmployeeType {
  valueId: string;
  valueLabel: string;
}

const employeeTypes: IEmployeeType[] = [
  {
    valueId: "cashier",
    valueLabel: "Cashier",
  },
  {
    valueId: "employee",
    valueLabel: "Employee",
  },
  {
    valueId: "admin",
    valueLabel: "Admin",
  },
];

const AddUser: React.FC<IAdd> = ({ setOpen, refetch }) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const resolver = yupResolver(Schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    // watch,
    control,
  } = useForm<IFormInput>({ resolver });

  // const name = watch("name");
  // const gender = watch("gender");

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
    setOpen(false);
    setIsLoading(true);
    // fetch(
    //     `url`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   )
    //     .then((res) => {
    //       console.log("res", res);

    //       return res.json();
    //     })
    //     .then((data) => {
    //        console.log("data", data);
    //       if (data.success === true) {
    //         toast.success("Message sent successfully!", {
    //           position: "bottom-left",
    //           autoClose: 3001,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });

    //         reset();
    //         refetch();
    //         setOpen(false);
    //       } else {
    //         toast.error("Message not sent. Please try again!", {
    //           position: "bottom-left",
    //           autoClose: 3001,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });
    //       }
    //     })
    // .finally(() => setIsLoading(false));
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
            errors={errors}
            register={register}
          />
          <Input
            inputType="email"
            labelName="Email"
            placeholderText="Enter your email"
            name="email"
            errors={errors}
            register={register}
          />

          <SelectField
            control={control}
            name="gender"
            data={genderData}
            label="Gender"
            placeholder="-Select Gender-"
            error={errors.gender?.message}
            labelKey="label"
            valueKey="value"
            resetField={resetField}
            resetFieldName1=""
            resetFieldName2=""
            disabledValue="1"
            isLoading={false}
          />

          <RadioField
            labelName="Employee Type"
            inputName="employeeType"
            errorMessage={errors?.employeeType?.message}
            register={register}
            data={employeeTypes}
            gridCols={3}
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

export default AddUser;
