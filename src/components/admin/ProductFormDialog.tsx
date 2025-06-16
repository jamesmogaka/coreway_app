import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { Product } from "@/types/product";

type ProductFormDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	product: Omit<Product, "id"> | null;
	onSubmit: (e: React.FormEvent) => void;
	onInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	isEditing: boolean;
};

export function ProductFormDialog({
	open,
	onOpenChange,
	product,
	onSubmit,
	onInputChange,
	isEditing,
}: ProductFormDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-[#129990] border-0 text-[#F5F5F5]">
				<DialogHeader>
					<DialogTitle className="text-[#FFD59A]">
						{isEditing ? "Edit Product" : "Add New Product"}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name" className="text-[#FFFBDE]">Product Name</Label>
							<Input
								id="name"
								name="name"
								value={product?.name || ""}
								onChange={onInputChange}
								placeholder="Enter product name"
								required
								className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#FFD59A]"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="description" className="text-[#FFFBDE]">Description</Label>
							<Textarea
								id="description"
								name="description"
								value={product?.description || ""}
								onChange={onInputChange}
								placeholder="Enter product description"
								rows={3}
								className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#FFD59A]"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="price" className="text-[#FFFBDE]">Price (KSh)</Label>
								<Input
									id="price"
									name="price"
									type="number"
									step="0.01"
									min="0"
									value={product?.price || ""}
									onChange={onInputChange}
									placeholder="0.00"
									required
									className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#FFD59A]"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="stock" className="text-[#FFFBDE]">Stock</Label>
								<Input
									id="stock"
									name="stock"
									type="number"
									min="0"
									value={product?.stock || ""}
									onChange={onInputChange}
									placeholder="0"
									required
									className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#FFD59A]"
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="image_url" className="text-[#FFFBDE]">Image URL</Label>
							<Input
								id="image_url"
								name="image_url"
								value={product?.image_url || ""}
								onChange={onInputChange}
								placeholder="Enter image URL"
								required
								className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#FFD59A]"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							className="border-[#FFD59A] text-[#FFD59A] hover:bg-[#FFD59A] hover:text-[#3A3A3A]"
							onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit" className="bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60]">
							{isEditing ? "Update" : "Add"} Product
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
