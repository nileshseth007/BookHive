import { useOktaAuth } from "@okta/okta-react"
import { Link, NavLink } from "react-router"
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
    const { oktaAuth, authState } = useOktaAuth();
    if (!authState) return <SpinnerLoading />;

    const handleLogout = async () => oktaAuth.signOut();

    console.log(authState);

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>BookHive</span>
                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label='Toggle Navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink to='/home' className='nav-link'>Home</NavLink>
                            {/* <a className='nav-link' href='#'> Home</a> */}
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search' > Search Books</NavLink>
                            {/* <a className='nav-link' href='#'> Search Books</a> */}
                        </li>
                        {authState.isAuthenticated && 
                            <li className='nav-item'>
                            <NavLink className='nav-link' to='/shelf' > Shelf</NavLink>
                            {/* <a className='nav-link' href='#'> Search Books</a> */}
                        </li>
                        }

                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {!authState.isAuthenticated
                            ?
                            <li className='nav-item m-1'>
                                <Link type='button' className='btn btn-outline-light' to='/login'>
                                    Sign in
                                </Link>
                            </li>
                            :
                            <li className='nav-item m-1'>
                                <a type='button' className='btn btn-outline-light' onClick={handleLogout} href='#'>
                                    Logout
                                </a>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}