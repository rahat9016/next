import { Controller } from "react-hook-form";
import { Skeleton } from "../skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

interface SelectFieldProps {
    control: any;
    resetField: any;
    name: string;
    data: any[];
    label: string;
    placeholder: string;
    error?: string;
    labelKey: string;
    valueKey: string;
    resetFieldName1: string;
    resetFieldName2: string;
    disabledValue?: string;
    makeDisable?: boolean;
    isLoading: boolean;
    onChange?: (value: any) => void;
    defaultValue?: any;
  }

  const SelectField: React.FC<SelectFieldProps> = ({
    control,
    resetField,
    resetFieldName1,
    resetFieldName2,
    name,
    data,
    label,
    placeholder,
    error,
    labelKey,
    valueKey,
    disabledValue,
    makeDisable,
    isLoading,
    onChange,
    defaultValue,
  }) => {
    return (
      <div className="lg:px-3 col-span-1">
        <label className="text-[#2D0C3E] text-basic pl-2 mb-1">{label}</label>
  
        {isLoading ? (
          <Skeleton className="w-full h-11 bg-gray-300" />
        ) : (
          <div>
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (onChange) onChange(value);
                    resetField(resetFieldName1);
                    resetField(resetFieldName2);
                  }}
                  disabled={makeDisable}
                  defaultValue={defaultValue}
                >
                  <SelectTrigger className="outline-none placeholder:text-[#afacac] text-base py-1.5 pl-6 border-2 border-[#D4D4D4] rounded-md w-full flex">
                    <SelectValue className="text-sm" placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.map((item: any) => (
                      <SelectItem
                        key={item[valueKey]}
                        className="border-b-2 border-brandLsPrimary text-sm text-brandPrimary"
                        value={item[valueKey]}
                      >
                        {item[labelKey]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        )}
      </div>
    );
  };
  
  export default SelectField;