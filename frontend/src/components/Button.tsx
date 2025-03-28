import clsx from "clsx"

type ButtonProps = {
    name: string,
    onclick?: () => void,
    classname?: string,
    type?: "button" | "submit" | "reset"
}

const Button = ({name, classname}:ButtonProps) => {
  return (
    <button  className={clsx("bg-black  cursor-pointer   py-4 my-8 rounded-md font-semibold text-neutral-300 w-full", classname)}>{name}</button>
  )
}

export default Button