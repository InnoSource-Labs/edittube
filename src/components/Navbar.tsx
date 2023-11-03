import { ReactNode } from "react"
import { Link } from "react-router-dom"

const Navbar = (): ReactNode => {
    return (
        <section>
            This is Navbar
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
        </section>
    )
}

export default Navbar
