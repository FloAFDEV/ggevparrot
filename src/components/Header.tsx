import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";

const Header: React.FC = () => {
	return (
		<header className="navbar bg-neutral text-neutral-content">
			<div className="navbar">
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
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a>Item 1</a>
							</li>
							<li>
								<a>Parent</a>
								<ul className="p-2">
									<li>
										<a>Submenu 1</a>
									</li>
									<li>
										<a>Submenu 2</a>
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
							<Link href="annonces">Annonces</Link>
						</li>

						<li>
							<details>
								<summary>Nos Services</summary>
								<ul className="p-2 bg-neutral-500">
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
					<a className="btn px-3">Connexion</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
