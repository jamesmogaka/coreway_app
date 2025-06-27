import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { supabase } from "../../lib/supabase";

interface Enrollment {
  id: string;
  course_id: string;
  user_id?: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

interface Course {
  id: string;
  title: string;
}

export function EnrollmentsTable() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: enrollmentsData } = await supabase.from("enrollments").select("*")
        .order("created_at", { ascending: false });
      const { data: coursesData } = await supabase.from("courses").select("id, title");
      setEnrollments(enrollmentsData || []);
      setCourses(coursesData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const getCourseTitle = (course_id: string) =>
    courses.find(c => c.id === course_id)?.title || course_id;

  return (
    <Card className="bg-[#129990] border-0 text-[#F5F5F5]">
      <CardHeader>
        <CardTitle className="text-[#FFD59A]">Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading enrollments...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No enrollments found.</TableCell>
                </TableRow>
              ) : (
                enrollments.map(e => (
                  <TableRow key={e.id}>
                    <TableCell>{getCourseTitle(e.course_id)}</TableCell>
                    <TableCell>{e.first_name} {e.last_name}</TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>{new Date(e.created_at).toLocaleString()}</TableCell>
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
