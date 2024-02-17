import React from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar: React.FunctionComponent = () => {
	return (
		<header className="navbar bg-primary text-primary-content">
			<div className="navbar h-5">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost lg:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-xs dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-neutral"
						>
							<li>
								<a>Accueil</a>
							</li>
							<li>
								<a>Parent</a>
								<ul className="p-2">
									<li>
										<a>Nos annonces</a>
									</li>
									<li>
										<a>Nos services</a>
									</li>
								</ul>
							</li>
							<li>
								<a>Item 3</a>
							</li>
						</ul>
					</div>
					<Link href="/">
						<Logo
							src="/favicon.ico"
							className="p-2 rounded-full h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
						/>
					</Link>
				</div>
				<div className="navbar-end px-3 hidden lg:flex">
					<ul className="menu menu-horizontal px-">
						<li>
							<Link href="annonces">Nos annonces</Link>
						</li>
						<li>
							<details>
								<summary>Nos Services</summary>
								<ul className="p-2 bg-neutral">
									<li>
										<a>Test</a>
									</li>
									<li>
										<a>Garanties</a>
									</li>
									<li>
										<a>Contact</a>
									</li>
									<li>
										<div className="px-3">Contact</div>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>
				<div className="navbar-end">
					<a className="btn px-3 m-5">Connexion</a>
					<ThemeSwitcher />{" "}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
