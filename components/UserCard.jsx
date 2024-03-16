import '../styles/UserCard.css'
import UserContext from './User'
import { useContext } from 'react'

export default function UserCard({user}){
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)

    return (
        <div className="user-card">
            <p> Username: <strong> {user.username} </strong> </p>
            <img src={user.avatar_url} alt={`Profile image for ${user.username}`}></img>
            <br></br>
            <button className='log-in' onClick={() => setLoggedInUser(user)}> Log In </button>
        </div>
    )
}