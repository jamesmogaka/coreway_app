import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { supabase } from "../../lib/supabase";

type Course = {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
};

export function CoursesTable({ onEdit }: { onEdit: (course: Course) => void }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const { data } = await supabase.from("courses").select("*");
      setCourses(data || []);
      setLoading(false);
    }
    fetchCourses();
  }, []);

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
                <TableHead>Actions</TableHead>
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
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300" onClick={() => onEdit(course)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
