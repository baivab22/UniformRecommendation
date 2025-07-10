import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   Input,
//   Button,
//   Badge,
// } from "@/components/ui";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Users,
  Shirt,
  ShoppingBag,
  Footprints,
  Download,
  Search,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCollege, setFilterCollege] = useState("all");
  const [filterBatch, setFilterBatch] = useState("all");
  const navigate = useNavigate();

  // ✅ Auth check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // ✅ Fetch students from Supabase
  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching students:", error.message);
      } else {
        setStudents(data);
      }
    };

    fetchStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin-login");
  };

  // ✅ Filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege =
      filterCollege === "all" || student.college === filterCollege;
    const matchesBatch = filterBatch === "all" || student.batch === filterBatch;

    return matchesSearch && matchesCollege && matchesBatch;
  });

  const stats = {
    totalStudents: students.length,
    maleStudents: students.filter((s) => s.gender === "male").length,
    femaleStudents: students.filter((s) => s.gender === "female").length,
    shirtOrders: students.filter((s) => s.clothing_type === "shirt").length,
    pantOrders: students.filter((s) => s.clothing_type === "pant").length,
    shoeOrders: students.filter((s) => s.clothing_type === "shoes").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Manage student measurements and orders
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                {stats.maleStudents} male, {stats.femaleStudents} female
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">Shirt Orders</CardTitle>
              <Shirt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.shirtOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">Pant Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pantOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm">Shoe Orders</CardTitle>
              <Footprints className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.shoeOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCollege} onValueChange={setFilterCollege}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by college" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  {[...new Set(students.map((s) => s.college))].map(
                    (college) => (
                      <SelectItem key={college} value={college}>
                        {college}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Select value={filterBatch} onValueChange={setFilterBatch}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  {[...new Set(students.map((s) => s.batch))].map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
            <CardDescription>
              Showing {filteredStudents.length} of {students.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Clothing Type</TableHead>
                    <TableHead>Measurements</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.college}</TableCell>
                      <TableCell>{student.batch}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.gender === "male" ? "default" : "secondary"
                          }
                        >
                          {student.gender}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.clothing_type}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {student.collar_size && (
                          <div>Collar: {student.collar_size}</div>
                        )}
                        {student.chest && <div>Chest: {student.chest}</div>}
                        {student.waist && <div>Waist: {student.waist}</div>}
                        {student.hip && <div>Hip: {student.hip}</div>}
                        {student.shoe_size && (
                          <div>Shoe: {student.shoe_size}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(student.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
