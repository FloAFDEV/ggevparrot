import React from "react";

interface CustomInputProps {
	label: string;
	name: string;
	type?: string;
	value: string | number;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	placeholder?: string;
	selectOptions?: string[];
	className?: string; // Ajout de la classe pour les styles si besoin
	textarea?: boolean;
}

const CustomInput: React.FunctionComponent<CustomInputProps> = ({
	label,
	name,
	type = "select",
	value,
	onChange,
	placeholder,
	textarea = false,
	selectOptions,
	className,
}) => {
	if (type === "select" && selectOptions) {
		// Si le type est "select" et si selectOptions est défini =>  menu déroulant apparait
		return (
			<div className="form-group mb-4">
				<label
					htmlFor={name}
					className="block mb-2 text-neutral-content"
				>
					{label}
				</label>
				<select
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					className="w-full px-3 py-2 pr-10 rounded border-gray-300 focus:border-primary focus:outline-none"
				>
					<option value="">{placeholder}</option>
					{selectOptions?.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		);
	} else {
		// Sinon, afficher un champ de texte par défaut
		return (
			<div className="form-group mb-4">
				<label
					htmlFor={name}
					className="block mb-2 text-neutral-content"
				>
					{label}
				</label>
				<input
					type={type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="w-full px-3 py-2 rounded border-gray-300 focus:border-primary focus:outline-none"
				/>
			</div>
		);
	}
};

export default CustomInput;
