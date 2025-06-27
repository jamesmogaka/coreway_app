import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "../../lib/supabase";

type Course = {
  id?: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course | null;
  onSave: () => void;
};

export function CourseFormDialog({ open, onOpenChange, course, onSave }: Props) {
  const [form, setForm] = useState<Course>({
    title: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    // Clear any existing errors when the dialog is opened or course changes
    setError(null);
    
    if (course) {
      setForm(course);
    } else {
      setForm({ title: "", description: "", date: "", start_time: "", end_time: "" });
    }
  }, [course, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Clear any existing errors when user starts typing
    if (error) {
      setError(null);
    }
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (form.id) {
        // Update
        const { error } = await supabase.from("courses").update({
          title: form.title,
          description: form.description,
          date: form.date,
          start_time: form.start_time,
          end_time: form.end_time,
        }).eq("id", form.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from("courses").insert([
          {
            title: form.title,
            description: form.description,
            date: form.date,
            start_time: form.start_time,
            end_time: form.end_time,
          },
        ]);
        if (error) throw error;
      }
      setSaving(false);
      onOpenChange(false);
      onSave();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to save course");
      } else {
        setError("Failed to save course");
      }
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#129990] border-0 text-[#F5F5F5]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#FFD59A]">
            {form.id ? "Edit Course" : "Add New Course"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="bg-white text-black"
            required
          />
          <Input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="bg-white text-black"
            required
          />
          {/* Date Picker from shadcn/ui */}
          <div>
            <label className="block mb-1 text-[#FFD59A] text-sm font-medium">Date</label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={
                    `w-full justify-start text-left font-normal bg-white text-black` +
                    (!form.date ? " text-muted-foreground" : "")
                  }
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.date ? format(new Date(form.date + 'T00:00:00'), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white text-black">
                <Calendar
                  mode="single"
                  selected={form.date ? new Date(form.date + 'T00:00:00') : undefined}
                  onSelect={(date: Date | undefined) => {
                    setForm(f => ({ ...f, date: date ? format(date, "yyyy-MM-dd") : "" }));
                    setDatePickerOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label htmlFor="start-time-picker" className="block mb-1 text-[#FFD59A] text-sm font-medium">Start Time</label>
              <Input
                type="time"
                id="start-time-picker"
                name="start_time"
                step="1"
                value={form.start_time}
                onChange={handleChange}
                className="bg-white text-black appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="end-time-picker" className="block mb-1 text-[#FFD59A] text-sm font-medium">End Time</label>
              <Input
                type="time"
                id="end-time-picker"
                name="end_time"
                step="1"
                value={form.end_time}
                onChange={handleChange}
                className="bg-white text-black appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
                required
              />
            </div>
          </div>
          {error && <div className="text-red-300 text-sm">{error}</div>}
          <DialogFooter>
            <Button type="submit" className="bg-[#FFD59A] text-[#129990] hover:bg-[#FFAD60]" disabled={saving}>
              {saving ? "Saving..." : form.id ? "Save Changes" : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
