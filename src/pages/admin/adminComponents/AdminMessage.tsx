import React, { useState, useEffect } from "react";
import { fetchAllMessages } from "@/components/utils/apiService";

interface ContactMessage {
	id: number;
	name: string;
	email: string;
	phone: string;
	message: string;
	created_at: string;
}

const AdminMessage: React.FunctionComponent = () => {
	const [messages, setMessages] = useState<ContactMessage[]>([]);

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		try {
			const messagesData = await fetchAllMessages();
			setMessages(messagesData);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des messages :",
				error
			);
		}
	};

	return (
		<div className="admin-page px-4 md:px-8">
			<h1 className="text-5xl font-bold m-10">Messages de Contact</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className="bg-neutral text-neutral-content rounded-lg shadow-md p-4 flex flex-col justify-between"
					>
						<div>
							<h2 className="text-xl font-semibold mb-2">
								{message.name}
							</h2>
							<p className="font-semibold">{message.message}</p>
							<p className="text-sm text-gray-500 mt-2">
								Envoyé le {message.created_at}
							</p>
						</div>
					</div>
				))}
			</div>
			<button
				onClick={() => {
					window.history.back();
				}}
				className="py-2 m-4 px-4 bg-secondary text-white font-bold text-xl rounded hover:bg-accent transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
			>
				Retour
			</button>
		</div>
	);
};

export default AdminMessage;
