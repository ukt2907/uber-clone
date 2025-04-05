import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { destinationSearchAtom, destinationSuggestionsAtom, pickupSearchAtom, pickupSuggestionsAtom } from "../atoms/store/locationAtoms";
import axios from "axios";

export const useFetchSuggestion = () => {

    const [pickupSearch, setpickupSearch] = useRecoilState( pickupSearchAtom );
    const [destinationSearch, setdestinationSearch] = useRecoilState( destinationSearchAtom );
    const setpickupSuggestions= useSetRecoilState(pickupSuggestionsAtom);
    const setdestinationSuggestions = useSetRecoilState(destinationSuggestionsAtom);
    type Suggestion = {
        description:string
    }
    type setSuggestions = (data: Suggestion[]) => void

    const fetchSuggestions = async(query:string, setSuggestions:setSuggestions)=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions?input=${query}`,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            setSuggestions(response.data);
          } catch (error) {
            console.log(error);
          };
      }

    useEffect(()=>{
        if(!pickupSearch.trim()) return;
    
        const timer = setTimeout(() => 
        fetchSuggestions(pickupSearch, setpickupSuggestions),500)
    
        return ()=>clearTimeout(timer);
    },[pickupSearch]);

    useEffect(()=>{
        if(!destinationSearch.trim()) return;
    
        const timer = setTimeout(() =>{ 
        fetchSuggestions(destinationSearch, setdestinationSuggestions)},500)
    
        return ()=>clearTimeout(timer);
    },[destinationSearch]);

    return {setpickupSearch, setdestinationSearch};
}