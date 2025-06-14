import { useState } from "react";

type ToastType = "default" | "success" | "error" | "warning" | "info";

type Toast = {
	id: string;
	title: string;
	description?: string;
	type: ToastType;
	duration?: number;
};

type ToastOptions = Omit<Toast, "id">;

const useToast = () => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const toast = (options: ToastOptions) => {
		const id = Math.random().toString(36).substr(2, 9);
		const toast = { id, ...options };

		setToasts(prevToasts => [...prevToasts, toast]);

		if (options.duration !== 0) {
			setTimeout(() => {
				dismiss(id);
			}, options.duration || 5000);
		}

		return id;
	};

	const dismiss = (id: string) => {
		setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
	};

	const success = (
		title: string,
		description?: string,
		options?: Omit<ToastOptions, "title" | "description" | "type">
	) => {
		return toast({ title, description, type: "success", ...options });
	};

	const error = (
		title: string,
		description?: string,
		options?: Omit<ToastOptions, "title" | "description" | "type">
	) => {
		return toast({ title, description, type: "error", ...options });
	};

	const warning = (
		title: string,
		description?: string,
		options?: Omit<ToastOptions, "title" | "description" | "type">
	) => {
		return toast({ title, description, type: "warning", ...options });
	};

	const info = (
		title: string,
		description?: string,
		options?: Omit<ToastOptions, "title" | "description" | "type">
	) => {
		return toast({ title, description, type: "info", ...options });
	};

	return {
		toasts,
		toast,
		dismiss,
		success,
		error,
		warning,
		info,
	};
};

export { useToast };
export type { Toast, ToastType };
