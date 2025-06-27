import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { supabase } from "../../lib/supabase";
import { Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { DeleteDialog } from "./DeleteDialog";

type Course = {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
};

interface CoursesTableProps {
  onEdit: (course: Course | null) => void;
  refreshTrigger?: number;
}

export function CoursesTable({ onEdit, refreshTrigger = 0 }: CoursesTableProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (course: Course) => {
    onEdit(course);
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseToDelete.id);

      if (error) throw error;
      
      // Optimistically update the UI by removing the deleted course
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseToDelete.id));
      toast.success('Course deleted successfully');
      
      // Close the dialog and reset state
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
      // Refresh the courses list to ensure it's in sync with the server
      const { data } = await supabase.from('courses').select('*');
      setCourses(data || []);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const { data } = await supabase.from("courses").select("*");
        setCourses(data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [refreshTrigger]); // Add refreshTrigger as a dependency

  return (
    <Card className="bg-[#129990] border-0 text-[#F5F5F5]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#FFD59A]">Courses</CardTitle>
        <Button className="bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60]" onClick={() => onEdit(null)}>
          Add New Course
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading courses...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No courses found.</TableCell>
                </TableRow>
              ) : (
                courses.map(course => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>{course.date}</TableCell>
                    <TableCell>{course.start_time}</TableCell>
                    <TableCell>{course.end_time}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(course)}
                        className="text-[#FFD59A] hover:bg-[#0d7a73] p-2 h-8 w-8"
                        title="Edit course"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(course)}
                        disabled={isDeleting}
                        className="text-red-400 hover:bg-red-900/20 p-2 h-8 w-8"
                        title="Delete course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          itemName={courseToDelete?.title || 'this course'}
          title="Delete Course"
          description={`Are you sure you want to delete "${courseToDelete?.title}"? This action cannot be undone.`}
          confirmText={isDeleting ? 'Deleting...' : 'Delete Course'}
        />
      </CardContent>
    </Card>
  );
}
