import { getAllUsers } from '../src/api'
import '../styles/UsersPage.css'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import UserCard from './UserCard'


export default function Users () {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getAllUsers().then(({data: {users}}) => {
            setUsers(users)
            setIsLoading(false)
        })
    }, [] )

    return isLoading? ( <Loading/> ) : (
        <div className="users-page">
            {users.map(user => {
                return <UserCard key={user.username} user={user}/>
            })}
        </div>
    )
}