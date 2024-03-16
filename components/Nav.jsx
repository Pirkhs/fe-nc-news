import { Link } from 'react-router-dom'

export default function Nav () {
    return (
        <nav>
            <h2>
                <Link to="/" style={{color: "white", textDecoration:"none"}}>| Home </Link> 
                <Link to="/articles" style={{color: "white", textDecoration:"none"}}>| Articles |</Link>
                <Link to="/users" style={{color: "white", textDecoration:"none"}}> Users |</Link> 
            </h2>
        </nav>
    )
}