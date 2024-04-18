import React from "react";
import Logo from "@/components/Global/Logo/Logo";
import Link from "next/link";

// récupérer le props "rôle"
interface AdmiNavbarProps {
	onFetchAnnonces: () => Promise<void>;
	onAddAnnonce: () => void;
	onDeleteAnnonce: () => void;
	onUpdateAnnonce: () => void;
	onShowAnnonces: () => void;
}

const AdminNavbar: React.FunctionComponent<AdmiNavbarProps> = ({
	onFetchAnnonces,
	onAddAnnonce,
	onDeleteAnnonce,
	onUpdateAnnonce,
	onShowAnnonces,
}) => {
	return (
		<div className="navbar bg-accent">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle"
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
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</div>

					{/* le passer en composant, adminMenu et employeeMenu et modifier en fonction du rôle*/}
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<button onClick={onShowAnnonces}>
								Voir les Annonces
							</button>
						</li>
						<li>
							<button onClick={onAddAnnonce}>
								Ajouter une Annonce
							</button>
						</li>
						<li>
							<button onClick={onDeleteAnnonce}>
								Supprimer une Annonce
							</button>
						</li>
						<li>
							<button onClick={onUpdateAnnonce}>
								Modifier une Annonce
							</button>
						</li>
					</ul>
				</div>
			</div>

			<div className="navbar-center">
				<Link href="/">
					<Logo
						src="/favicon.ico"
						className="p-2 rounded-full h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
					/>
				</Link>
				<a className="text-2xl font-extrabold">
					Bienvenue sur votre interface d'administration
				</a>{" "}
				<Link href="/">
					<Logo
						src="/favicon.ico"
						className="p-2 rounded-full h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
					/>
				</Link>
			</div>

			<div className="navbar-end">
				<button className="btn btn-ghost btn-circle">
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default AdminNavbar;
