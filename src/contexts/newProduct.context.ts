import {createContext} from "react";

export const NewProductContext = createContext({
    newProduct: '',
    setNewProduct: (s: string) => {
    },
});