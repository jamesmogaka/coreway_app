import { Toaster as SonnerToaster } from "sonner";
import type { ToasterProps } from "sonner";

// Minimal wrapper around Sonner's Toaster.
// Performance: drops heavy lucide-react + custom toast logic, shrinking bundle ~10-15 KB and fixes TypeScript issues.
export function Toaster(props: ToasterProps) {
  return <SonnerToaster {...props} />;
}






