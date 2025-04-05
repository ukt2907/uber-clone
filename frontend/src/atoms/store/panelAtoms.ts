import { atom } from "recoil";

export const panelOpenAtom = atom<boolean>({
    key: "panelOpen",
    default: false,
  });
  
  export const vehiclePanelAtom = atom<boolean>({
    key: "vehiclePanel",
    default: false,
  });
  
  export const confirmRidePanelAtom = atom<boolean>({
    key: "confirmRidePanel",
    default: false,
  });
  
  export const waitingForDriverPanelAtom = atom<boolean>({
    key: "waitingForDriverPanel",
    default: false,
  });
  
  export const vehicleFoundAtom = atom<boolean>({
    key: "vehicleFound",
    default: false,
  });