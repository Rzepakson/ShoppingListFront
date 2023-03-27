import {createContext} from "react";

export const DeleteListContext = createContext({
    deleteList: '',
    setDeleteList: (s: string) => {
    },
});