import {createContext} from "react";

export const DeleteProductContext = createContext({
    deleteProduct: '',
    setDeleteProduct: (s: string) => {
    },
});