import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
                    <NavLink to="/home" activeStyle>
						Home
                    </NavLink>
					<NavLink to="/search" activeStyle>
						Search
					</NavLink>
					<NavLink to="/contact" activeStyle>
						Contact Us
					</NavLink>
					<NavLink to="/sign-in" activeStyle>
						Log In
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
