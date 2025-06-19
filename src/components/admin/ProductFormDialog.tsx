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
import type {
    Product,
    Category,
    Value,
    ProductContent,
    ProductFeature,
} from "@/types/product";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { XIcon } from "lucide-react";

type ProductFormDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Partial<Product> | null;
    onSubmit: (e: React.FormEvent) => void;
    onInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onCategoryChange: (categoryId: string) => void;
    onValuesChange: (valueIds: string[]) => void;
    onContentChange: (contents: ProductContent[]) => void;
    onFeatureChange: (features: ProductFeature[]) => void;
    isEditing: boolean;
    categories: Category[];
    values: Value[];
};

export function ProductFormDialog({
    open,
    onOpenChange,
    product,
    onSubmit,
    onInputChange,
    onCategoryChange,
    onValuesChange,
    onContentChange,
    onFeatureChange,
    isEditing,
    categories,
    values,
}: ProductFormDialogProps) {
    const handleAddContent = () => {
        const newContents = [...(product?.contents || []), { name: "", details: "" }];
        onContentChange(newContents);
    };

    const handleRemoveContent = (index: number) => {
        const newContents = [...(product?.contents || [])];
        newContents.splice(index, 1);
        onContentChange(newContents);
    };

    const handleContentChange = (
        index: number,
        field: keyof ProductContent,
        value: string
    ) => {
        const newContents = [...(product?.contents || [])];
        newContents[index] = { ...newContents[index], [field]: value };
        onContentChange(newContents);
    };

    const handleAddFeature = () => {
        const newFeatures = [...(product?.features || []), { feature: "" }];
        onFeatureChange(newFeatures);
    };

    const handleRemoveFeature = (index: number) => {
        const newFeatures = [...(product?.features || [])];
        newFeatures.splice(index, 1);
        onFeatureChange(newFeatures);
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...(product?.features || [])];
        newFeatures[index] = { ...newFeatures[index], feature: value };
        onFeatureChange(newFeatures);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#129990] border-0 text-[#F5F5F5] max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-[#FFD59A]">
                        {isEditing ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="text-sm">
                    <Tabs defaultValue="general" className="space-y-4">
                        <TabsList className="bg-transparent p-0 mb-4 border-b border-white/20 rounded-none">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="values">Values</TabsTrigger>
                        </TabsList>

                        <TabsContent value="general">
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-[#FFFBDE]">Product Name</Label>
                                    <Input id="name" name="name" value={product?.name || ""} onChange={onInputChange} placeholder="Enter product name" required className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description" className="text-[#FFFBDE]">Description</Label>
                                    <Textarea id="description" name="description" value={product?.description || ""} onChange={onInputChange} placeholder="Enter product description" rows={3} className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price" className="text-[#FFFBDE]">Price (KSh)</Label>
                                        <Input id="price" name="price" type="number" step="0.01" min="0" value={product?.price || ""} onChange={onInputChange} placeholder="0.00" required className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="stock" className="text-[#FFFBDE]">Stock</Label>
                                        <Input id="stock" name="stock" type="number" min="0" value={product?.stock || ""} onChange={onInputChange} placeholder="0" required className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="image_url" className="text-[#FFFBDE]">Image URL</Label>
                                    <Input id="image_url" name="image_url" value={product?.image_url || ""} onChange={onInputChange} placeholder="Enter image URL" required className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category" className="text-[#FFFBDE]">Category</Label>
                                    <select id="category" name="category_id" value={product?.category_id || ""} onChange={(e) => onCategoryChange(e.target.value)} className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400 rounded-md p-2">
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="content">
                            <div className="grid gap-4 py-4">
                                {product?.contents?.map((content, index) => (
                                    <div key={index} className="grid gap-4 p-4 border rounded-md border-white/20 relative">
                                        <button type="button" onClick={() => handleRemoveContent(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`content-name-${index}`} className="text-[#FFFBDE]">Content Name</Label>
                                            <Input id={`content-name-${index}`} value={content.name} onChange={(e) => handleContentChange(index, "name", e.target.value)} placeholder="Content name" className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`content-details-${index}`} className="text-[#FFFBDE]">Content Details</Label>
                                            <Textarea id={`content-details-${index}`} value={content.details} onChange={(e) => handleContentChange(index, "details", e.target.value)} placeholder="Content details" rows={3} className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400" />
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={handleAddContent} className="border-[#FFD59A] text-[#FFD59A] hover:bg-[#FFD59A] hover:text-[#3A3A3A]">Add Content</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="features">
                            <div className="grid gap-4 py-4">
                                {product?.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input value={feature.feature} onChange={(e) => handleFeatureChange(index, e.target.value)} placeholder="Feature" className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400" />
                                        <button type="button" onClick={() => handleRemoveFeature(index)} className="text-red-500 hover:text-red-700">
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={handleAddFeature} className="border-[#FFD59A] text-[#FFD59A] hover:bg-[#FFD59A] hover:text-[#3A3A3A]">Add Feature</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="values">
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-wrap gap-2">
                                    {values.map((value) => (
                                        <label key={value.id} className="flex items-center gap-2 p-2 rounded-md bg-black/20 border border-transparent has-[:checked]:border-[#FFD59A]">
                                            <input type="checkbox" value={value.id} checked={product?.values?.some(v => v.id === value.id)} onChange={(e) => {
                                                const selectedValues = [...(product?.values?.map(v => v.id) || [])];
                                                if (e.target.checked) {
                                                    selectedValues.push(value.id);
                                                } else {
                                                    const valueIndex = selectedValues.indexOf(value.id);
                                                    if (valueIndex > -1) {
                                                        selectedValues.splice(valueIndex, 1);
                                                    }
                                                }
                                                onValuesChange(selectedValues);
                                            }} className="accent-[#FFD59A]" />
                                            <span>{value.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
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
