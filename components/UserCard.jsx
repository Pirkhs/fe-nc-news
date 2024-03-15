import '../styles/UserCard.css'
import UserContext from './User'
import { useContext } from 'react'

export default function UserCard({user}){
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)

    return (
        <div className="user-card">
            <p> {user.username} </p>
            <img src={user.avatar_url}></img>
            <br></br>
            <button className='log-in' onClick={() => setLoggedInUser(user)}> Log In </button>
        </div>
    )
}