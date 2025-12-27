import { useContext } from "react";
import { productContext } from "../context/productContext";

export const useProductContext = () => useContext(productContext);