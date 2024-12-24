import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '../ui/form/Input';
import SelectField from '../ui/form/SelectField';
import { yupResolver } from '@hookform/resolvers/yup';
import Schema from './Schema';

export default function AddRole() {

    const resolver = yupResolver(Schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
    control,
  } = useForm({ resolver });
    const onSubmit = (data) => { }


    return (
        <div><form onSubmit={handleSubmit(onSubmit)}>
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
                    name="role"
                    data={[]}
                    label="Gender"
                    placeholder="-Select Role-"                    
                    labelKey="label"
                    valueKey="value"
                    resetField={resetField}
                    resetFieldName1=""
                    resetFieldName2=""
                    disabledValue="1"
                    isLoading={false}
                />

            </div>
            <button
                type="submit"
                // disabled={isLoading}
                className="bg-[#388E3C] text-bgPrimary text-sm font-medium px-8 py-3 rounded-md mt-6"
            >
                Add
            </button>
        </form></div>
    )
}
