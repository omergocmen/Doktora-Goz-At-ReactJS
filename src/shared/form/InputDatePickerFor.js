import moment from "moment";

export default function InputDatePickerFor({ type, register, errors,onChange, ...props }) {
  const additionalStyle = type === "line" ? "bg-transparent !rounded-none border-t-0 border-l-0 border-r-0 border-b-grey-7 !px-0 py-[6px]" : "";
  return (
      <input
        min={moment().format("YYYY-MM-DD")}
          {...props}
          {...register}
          id={register.name}
          onChange={onChange?onChange:null}
          type="date"
          className={`border-[1px] border-grey-light-3 rounded-[4px] py-[8px] px-[10px] placeholder-grey-dark-2 placeholder:text-[14px] outline-none ${props.className} ${errors[register.name] ? `!border-red !text-red !placeholder-red` : ``} ${additionalStyle}`}
          autoComplete="off"
      />
  )
}