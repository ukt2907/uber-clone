import { atom } from "recoil";

export const pickupSearchAtom = atom({
  key: 'pickupSearchAtom',
  default: "",
});

export const destinationSearchAtom = atom({
  key: 'destinationSearchAtom',
  default: "",
});


export const pickupSuggestionsAtom = atom<{description:string}[]>({
  key: 'pickupSuggestionsAtom',
  default: [],
});

export const destinationSuggestionsAtom = atom<{description:string}[]>({
    key: 'destinationSuggestionsAtom',
    default: [],
});



