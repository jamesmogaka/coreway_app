import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import type { BlogPost } from "../../types/blog";

type BlogFormDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	post: Partial<BlogPost> | null;
	onSubmit: () => void;
	onInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onPublishChange: (is_published: boolean) => void;
	isEditing: boolean;
};

export function BlogFormDialog({
	open,
	onOpenChange,
	post,
	onSubmit,
	onInputChange,
	onPublishChange,
	isEditing,
}: BlogFormDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-[#129990] border-0 text-[#F5F5F5] max-w-3xl">
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Edit Blog Post" : "Create New Blog Post"}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{isEditing ? "Update the details of your blog post." : "Fill in the details to create a new blog post."}
					</DialogDescription>
				</DialogHeader>
				<form className="text-sm">
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="title" className="text-[#FFFBDE]">
								Title
							</Label>
							<Input
								id="title"
								name="title"
								value={post?.title || ""}
								onChange={onInputChange}
								className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="summary" className="text-[#FFFBDE]">
								Summary
							</Label>
							<Textarea
								id="summary"
								name="summary"
								value={post?.summary || ""}
								onChange={onInputChange}
								className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="content" className="text-[#FFFBDE]">
								Content
							</Label>
							<Textarea
								id="content"
								name="content"
								value={post?.content || ""}
								onChange={onInputChange}
								className="bg-black/20 border-[#C2EAE7] text-[#F5F5F5] placeholder:text-gray-400 h-48"
							/>
						</div>
						<div className="flex items-center gap-4">
							<Label
								htmlFor="is_published"
								className="text-[#FFFBDE]">
								Publish
							</Label>
							<Switch
								id="is_published"
								checked={post?.is_published || false}
								onCheckedChange={onPublishChange}
								className="data-[state=checked]:bg-[#FFD59A] data-[state=unchecked]:bg-gray-200 "
							/>
						</div>
					</div>
					<div className="flex justify-end gap-2 mt-4">
						<Button
							type="button"
							variant="outline"
							className="border-[#FFD59A] text-[#FFD59A] hover:bg-[#FFD59A] hover:text-[#3A3A3A]"
							onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button
							type="button"
							className="bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60]"
							onClick={onSubmit}>
							{isEditing ? "Update Post" : "Create Post"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
