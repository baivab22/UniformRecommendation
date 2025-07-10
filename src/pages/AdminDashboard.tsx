import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Shirt, ShoppingBag, Footprints, Download, Search, Filter, LogOut } from "lucide-react";

// Mock data - in real app this would come from Supabase
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    college: "MIT College",
    batch: "2024",
    gender: "male",
    clothingType: "shirt",
    shirtSize: "L",
    pantSize: "32",
    shoeSize: "9",
    submittedAt: "2024-01-15",
    measurements: {
      height: 175,
      weight: 70,
      chest: 92,
      shoulder: 45,
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    college: "Stanford University",
    batch: "2025",
    gender: "female",
    clothingType: "pant",
    shirtSize: "M",
    pantSize: "28",
    shoeSize: "7",
    submittedAt: "2024-01-16",
    measurements: {
      height: 165,
      weight: 55,
      waist: 26,
      hip: 36,
    }
  },
];

const AdminDashboard = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCollege, setFilterCollege] = useState("all");
  const [filterBatch, setFilterBatch] = useState("all");
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin-login');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege = filterCollege === "all" || student.college === filterCollege;
    const matchesBatch = filterBatch === "all" || student.batch === filterBatch;
    
    return matchesSearch && matchesCollege && matchesBatch;
  });

  const stats = {
    totalStudents: students.length,
    maleStudents: students.filter(s => s.gender === "male").length,
    femaleStudents: students.filter(s => s.gender === "female").length,
    shirtOrders: students.filter(s => s.clothingType === "shirt").length,
    pantOrders: students.filter(s => s.clothingType === "pant").length,
    shoeOrders: students.filter(s => s.clothingType === "shoes").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground text-lg">Manage student measurements and orders</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shirt Orders</CardTitle>
              <Shirt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.shirtOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pant Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pantOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shoe Orders</CardTitle>
              <Footprints className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.shoeOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCollege} onValueChange={setFilterCollege}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by college" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  <SelectItem value="MIT College">MIT College</SelectItem>
                  <SelectItem value="Stanford University">Stanford University</SelectItem>
                  <SelectItem value="Harvard University">Harvard University</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterBatch} onValueChange={setFilterBatch}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
            <CardDescription>
              Showing {filteredStudents.length} of {students.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Clothing Type</TableHead>
                    <TableHead>Sizes</TableHead>
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
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{student.college}</TableCell>
                      <TableCell>{student.batch}</TableCell>
                      <TableCell>
                        <Badge variant={student.gender === 'male' ? 'default' : 'secondary'}>
                          {student.gender}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.clothingType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Shirt: {student.shirtSize}</div>
                          <div>Pant: {student.pantSize}</div>
                          <div>Shoe: {student.shoeSize}</div>
                        </div>
                      </TableCell>
                      <TableCell>{student.submittedAt}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
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