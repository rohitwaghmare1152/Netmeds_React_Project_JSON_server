import { useContext } from "react"
import AuthContext from "../context/Context"

export const useAuth = () => {
    return useContext(AuthContext)
};