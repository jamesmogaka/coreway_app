import type { CartItem as CartItemType } from "../contexts/cart-context.types";

interface CartItemProps {
	item: CartItemType;
	onRemoveItem: () => void;
	onQuantityChange: (newQuantity: number) => void;
}

export function CartItem({
	item,
	onRemoveItem,
	onQuantityChange,
}: CartItemProps) {
	return (
		<div className="py-4">
			<div className="flex items-center">
				<div className="flex-shrink-0">
					<img
						src={item.product.image_url}
						alt={item.product.name}
						className="w-16 h-16 object-cover rounded-md cursor-pointer"
					/>
				</div>
				<div className="ml-4 flex-1">
					<div className="flex justify-between">
												<h3 className="text-2xl font-semibold text-[#C2EAE7]">
							{item.product.name}
						</h3>
												<p className="text-base text-[#FFD59A]">
							KSh{(item.product.price * item.quantity).toFixed(2)}
						</p>
					</div>
					<div className="flex items-center mt-1">
						<button
							onClick={() => onQuantityChange(item.quantity - 1)}
							className="text-[#FFFBDE] hover:text-[#C2EAE7] w-6 h-6 flex items-center justify-center border border-[#90D1CA] rounded"
							disabled={item.quantity <= 1}>
							-
						</button>
												<span className="mx-2 text-base text-[#FFFBDE] w-6 text-center">
							{item.quantity}
						</span>
						<button
							onClick={() => onQuantityChange(item.quantity + 1)}
							className="text-[#FFFBDE] hover:text-[#C2EAE7] w-6 h-6 flex items-center justify-center border border-[#90D1CA] rounded"
							disabled={item.quantity >= item.product.stock}>
							+
						</button>
					</div>
				</div>
				<button
					onClick={onRemoveItem}
					className="ml-4 text-[#F5F5F5] hover:text-[#C2EAE7]"
					aria-label="Remove item">
					<svg
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
