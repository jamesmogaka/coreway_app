import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemName: string;
  title?: string;
  description?: string;
  confirmText?: string;
};

export function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  title = "Are you sure?",
  description = `This action cannot be undone. This will permanently delete "${itemName}".`,
  confirmText = "Delete",
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#129990] border-0 text-[#F5F5F5]">
        <DialogHeader>
          <DialogTitle className="text-[#FFD59A]">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-[#F5F5F5]">{description}</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent border-[#FFD59A] text-[#FFD59A] hover:bg-[#FFD59A] hover:text-[#3A3A3A]">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="bg-red-600 text-white hover:bg-red-700">
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
