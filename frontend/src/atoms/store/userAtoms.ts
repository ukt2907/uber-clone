import { atom } from "recoil";

interface User {
    fullName: {
        firstName: string;
        lastName: string;
    };
    email: string;
}

export const userAtom = atom<User>({
  key: 'userAtom',
  default: {
    fullName: {
        firstName: "",
        lastName: ""
    },
    email: "",
  }
});
