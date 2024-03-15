import { Link } from 'react-router-dom'

export default function Nav () {
    return (
        <nav>
            <h2>
               |<Link to="/">Home</Link> |
                <Link to="/articles">Articles</Link> |
                <Link to="/users">Users</Link> |
            </h2>
        </nav>
    )
}