import axios from "axios";

export const getAddressCoordinates = async (address: string) => {
    if(!address){
        throw new Error("Address is required");
    }
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            const location: { lat: number, lng: number } = response.data.results[0].geometry.location;
            
            return {
                ltd: location.lat,
                lng: location.lng
            }
        }else{
            throw new Error("Unable to fetch coordinates for the given address");
        }
    } catch (error) {
        console.error("Error fetching address coordinates:", error);
        throw error;
    }
}

export const getDistanceTimeService = async (origin: any, destination: any) => {
    if(!origin || !destination){
        throw new Error("Origin and destination are required");
    }
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log(response.data);
        if(response.data.status === "OK"){
            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[ 0 ].elements[ 0 ];
        }else{
            throw new Error("Unable to fetch distance and time");
        } 
    }catch(error){
        console.error("Error fetching distance and time:", error);
        throw error;
    }
}

export const getSuggestionsService = async (input: string) => {
    if(!input){
        throw new Error("Input is required");
    }
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === "OK"){
            return response.data.predictions;
        }else{
            throw new Error("Unable to fetch suggestions");
        }
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
}

