import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Logo from "@/components/Global/Logo/Logo";
import LoginButton from "@/components/LoginButton/LoginButton";
import Link from "next/link";

const Navbar: React.FunctionComponent = () => {
	const { theme, changeTheme } = useContext(ThemeContext);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Écoute du changement de taille de la fenêtre
		window.addEventListener("resize", handleResize);

		// Retirer l'écouteur d'événement lors du démontage du composant
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleToggle = () => {
		changeTheme(theme === "garden" ? "emerald" : "garden");
	};

	return (
		<>
			<header
				className={`navbar z-50 fixed bg-neutral text-neutral-content ${
					isMobile ? "fixed top-0 left-0 w-full z-50" : ""
				}`}
			>
				<div className="navbar h-5 bg-neutral">
					<div className="navbar-start">
						<div className="dropdown dropdown-hover">
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
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-neutral"
							>
								<li>
									<Link
										href="/#annonces"
										className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
									>
										Nos annonces
									</Link>
								</li>
								<li>
									<details>
										<summary className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer">
											Nos Services
										</summary>
										<ul className="p-2 bg-neutral">
											<li>
												<Link
													href="/#services"
													className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
												>
													Mécanique
												</Link>
											</li>
											<li>
												<Link
													href="/#services"
													className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
												>
													Expertises
												</Link>
											</li>
											<li>
												<Link
													href="/#services"
													className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
												>
													Financement
												</Link>
											</li>
											<li>
												<Link
													href="/#contact"
													className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
												>
													Contact
												</Link>
											</li>
										</ul>
									</details>
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
					<div className="navbar-end px-3 hidden lg:flex justify-around">
						<ul className="menu menu-horizontal px-1 text-lg">
							<li>
								<Link
									href="/#annonces"
									className="text-neutral-content hover:text-green-300"
								>
									Nos annonces
								</Link>
							</li>
							<li>
								<details>
									<summary className="text-neutral-content hover:text-green-400">
										Nos Services
									</summary>
									<ul className="p-2 bg-neutral text-neutral-content hover:text-green-400">
										<li>
											<Link
												href="/#services"
												className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
											>
												Mécanique
											</Link>
										</li>
										<li>
											<Link
												href="/#services"
												className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
											>
												Expertises
											</Link>
										</li>
										<li>
											<Link
												href="/#services"
												className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
											>
												Financement
											</Link>
										</li>
										<li>
											<Link
												href="/404.tsx"
												className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
											>
												404
											</Link>
										</li>
									</ul>
								</details>
							</li>
							<li>
								<Link
									href="/#contact"
									className="text-neutral-content hover:text-green-400 active:text-green-400 focus:text-green-400 cursor-pointer"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div className="navbar-end">
						<LoginButton />
						<label className="swap swap-rotate p-2 cursor-pointer">
							<input
								type="checkbox"
								onClick={handleToggle}
								className="theme-controller"
								value={theme === "emerald" ? "light" : "dark"}
								autoComplete="off"
							/>
							{/* sun icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="swap-on fill-current w-7 h-7"
								viewBox="0 0 24 24"
							>
								<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
							</svg>
							{/* moon icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="swap-off fill-current w-7 h-7"
								viewBox="0 0 24 24"
							>
								<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
							</svg>
						</label>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
