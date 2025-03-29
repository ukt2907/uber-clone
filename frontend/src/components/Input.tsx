import clsx from "clsx"

type InputProps = {
    type : string,
    placeholder : string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
    onClick?: () => void
}

const   Input = ({type, placeholder, value, onChange, className, onClick}:InputProps) => {
  return (
    <input 
    type={type}
    placeholder={placeholder}
    value={value}
    onClick={onClick}
    onChange={onChange}
    className={clsx("bg-neutral-200/60 border border-neutral-400 text-neutral-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", className)} />
  )
}


export default Input