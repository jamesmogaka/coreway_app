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
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Edit Product" : "Add New Product"}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Product Name</Label>
							<Input
								id="name"
								name="name"
								value={product?.name || ""}
								onChange={onInputChange}
								placeholder="Enter product name"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								name="description"
								value={product?.description || ""}
								onChange={onInputChange}
								placeholder="Enter product description"
								rows={3}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="price">Price (KSh)</Label>
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
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="stock">Stock</Label>
								<Input
									id="stock"
									name="stock"
									type="number"
									min="0"
									value={product?.stock || ""}
									onChange={onInputChange}
									placeholder="0"
									required
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="image_url">Image URL</Label>
							<Input
								id="image_url"
								name="image_url"
								value={product?.image_url || ""}
								onChange={onInputChange}
								placeholder="Enter image URL"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button type="submit">
							{isEditing ? "Update" : "Add"} Product
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
