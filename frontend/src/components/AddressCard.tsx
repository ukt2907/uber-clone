
type AddressCardProps = {
  icon: React.ReactNode
  name: string
}

const AddressCard = ({...props}:AddressCardProps) => {
  return (
     <div className="flex border-b border-neutral-500  py-5    items-center gap-2">
         <div className="size-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">{props.icon}</div>
         <div>
             <p className="text-xl text-neutral-600/90"> {props.name}</p>
         </div>
     </div>
  )
}

export default AddressCard