import { useContext } from "react"
import UserContext from "./User"

export default function Header () {
    const {loggedInUser: {username}} = useContext(UserContext)
    return (
        <header>
            <h1> NC News </h1>
            <p> Logged in as: {username}</p>
        </header>
    )
}