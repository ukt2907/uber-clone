import clsx from "clsx"

type InputProps = {
    type : string,
    placeholder : string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
    onClick?: () => void,
    onFocus?: () => void
}

const   Input = ({...props}:InputProps) => {
  return (
    <input 
    type={props.type}
    onFocus={props.onFocus}
    placeholder={props.placeholder}
    value={props.value}
    onClick={props.onClick}
    onChange={props.onChange}
    className={clsx("bg-neutral-200/60 border border-neutral-400 text-neutral-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5", props.className)} />
  )
}


export default Input