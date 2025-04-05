import { FaLocationDot } from "react-icons/fa6"

type LocationSevicesProps = {
    activeField: "pickup" | "destination" | null;
    suggestions: {description:string}[];
    setpickupSearch: (value:string) => void;
    setdestinationSearch: (value:string) => void;
}  


const AddressBox = ({suggestions, activeField, setpickupSearch, setdestinationSearch}:LocationSevicesProps) => {

    const handleSuggestions = (suggestion:{description:string}) => {
        if(activeField === "pickup") {
          setpickupSearch(suggestion.description);
        } else if(activeField === "destination") {
          setdestinationSearch(suggestion.description);
        }
      };

  return (
    <>
    {suggestions.map((suggestion, index) => (
            <div key={index} onClick={()=>{handleSuggestions(suggestion)}}  className="p-5   active:border-black rounded-2xl border border-black/30  grid grid-cols-5 items-center ">
            <div className="size-10 col-span-1 rounded-full bg-neutral-300 text-black flex items-center justify-center">
              <FaLocationDot />
            </div>
            <div className="col-span-4">
            <h4>{suggestion.description}</h4>
            </div>
            
        </div>
    ))

    }
    </>
  )
}

export default AddressBox