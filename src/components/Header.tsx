import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
	return (
		<header className="navbar">
			<div className="navbar-start px-3">
				<Link href="/">Logo</Link>
			</div>
			<div className="navbar-end">
				<div className="px-3">Blog</div>
				<Link href="annonces">Annonces</Link>
				<div className="px-3">Concept</div>
				<div className="px-3">Connexion</div>
			</div>
		</header>
	);
};

export default Header;
