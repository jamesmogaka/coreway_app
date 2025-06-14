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
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Products</CardTitle>
				<Button onClick={onAddNew}>Add Product</Button>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Stock</TableHead>
								<TableHead className="text-right">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map(product => (
								<TableRow key={product.product}>
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
											onClick={() => onEdit(product)}
										>
											Edit
										</Button>
										<Button
											variant="ghost"
											size="sm"
											className="text-red-600 hover:text-red-800"
											onClick={() => onDelete(product.product, product.name)}
										>
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
