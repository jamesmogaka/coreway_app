import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import type { Product } from "../../types/admin";

type ProductsTableProps = {
	products: Product[];
	onEdit: (product: Product) => void;
	onDelete: (productId: string, productName: string) => void;
	onAddNew: () => void;
};

export function ProductsTable({
	products,
	onEdit,
	onDelete,
	onAddNew,
}: ProductsTableProps) {
	return (
		<Card className="bg-[#129990] border-0 text-[#F5F5F5]">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-[#FFD59A]">Products</CardTitle>
				<Button
					onClick={onAddNew}
					className="bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60]">
					Add Product
				</Button>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border border-white/20">
					<Table>
						<TableHeader>
							<TableRow className="border-b border-white/20 hover:bg-transparent">
								<TableHead className="text-[#FFD59A]">Name</TableHead>
								<TableHead className="text-[#FFD59A]">Price</TableHead>
								<TableHead className="text-[#FFD59A]">Stock</TableHead>
								<TableHead className="text-right text-[#FFD59A]">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map(product => (
								<TableRow
									key={product.product_id}
									className="border-b-0 even:bg-white/5 hover:bg-white/10">
									<TableCell className="font-medium">
										{product.name}
									</TableCell>
									<TableCell>
										KSh {product.price.toFixed(2)}
									</TableCell>
									<TableCell>{product.stock}</TableCell>
									<TableCell className="text-right space-x-2">
										<Button
											variant="ghost"
											size="sm"
											className="text-[#FFFBDE] hover:bg-[#C2EAE7] hover:text-[#3A3A3A]"
											onClick={() => onEdit(product)}>
											Edit
										</Button>
										<Button
											variant="ghost"
											size="sm"
											className="text-red-400 hover:text-red-300"
											onClick={() =>
												onDelete(
													product.product_id,
													product.name
												)
											}>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
