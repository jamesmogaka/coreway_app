import type React from "react";
import * as react from "react";
import type { ValueModalProps } from "./components";

export const ValueModal: react.FC<ValueModalProps> = ({
	isOpen,
	onClose,
	data,
}) => {
	if (!isOpen || !data) return null;

	return (
		<div
			className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center fade-in"
			onClick={onClose}>
			<div
				className="relative mx-auto p-5 border w-11/12 md:max-w-xl shadow-lg rounded-md bg-white"
				onClick={e => e.stopPropagation()}>
				<div className="mt-3 text-center">
					<h3 className="text-2xl leading-6 font-bold text-gray-900">
						{data.name}
					</h3>
					<div className="mt-4 px-4 py-3 text-left space-y-3">
						<p className="text-gray-700">
							<strong>Description:</strong>{" "}
							{data.value.description}
						</p>
						<p className="text-gray-700">
							<strong>Importance:</strong> {data.value.importance}
						</p>
						<p className="text-gray-700">
							<strong>When Lacking:</strong> {data.value.lacking}
						</p>
					</div>
					<div className="items-center px-4 py-3">
						<button
							onClick={onClose}
							className="bg-gray-600 text-white hover:bg-gray-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1 w-full">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
