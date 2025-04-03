import clsx from "clsx"

type ButtonProps = {
    name: string,
    onclick?: () => void,
    classname?: string,
    type?: "button" | "submit" | "reset"
}

const Button = ({name, classname, onclick, type}:ButtonProps) => {
  return (
    <button
      onClick={onclick}
      type={type}
      className={clsx("bg-black  cursor-pointer   py-4 mt-4 rounded-md font-semibold text-neutral-300 w-full", classname)}>{name}</button>
  )
}

export default Button