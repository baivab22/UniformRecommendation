import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { AdminManagement } from "@/components/AdminManagement";
import { useManagementData } from "@/hooks/useManagementData";

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
  Settings,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCollege, setFilterCollege] = useState("all");
  const [filterBatch, setFilterBatch] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { colleges, batches, getCollegeName, getBatchesByCollege } = useManagementData();

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

  // Size calculation functions
  const calculateShirtSize = (student: any) => {
    if (!student.chest) return 'Measurements needed';
    const chest = student.chest;
    if (chest <= 36) return 'S';
    if (chest <= 40) return 'M';
    if (chest <= 44) return 'L';
    if (chest <= 48) return 'XL';
    return 'XXL';
  };

  const calculatePantSize = (student: any) => {
    if (!student.waist) return 'Measurements needed';
    const waist = student.waist;
    if (waist <= 30) return '30';
    if (waist <= 32) return '32';
    if (waist <= 34) return '34';
    if (waist <= 36) return '36';
    if (waist <= 38) return '38';
    return '40+';
  };

  // ✅ Filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege =
      filterCollege === "all" || student.college === getCollegeName(filterCollege) || student.college === filterCollege;
    const matchesBatch = filterBatch === "all" || student.batch === filterBatch;

    return matchesSearch && matchesCollege && matchesBatch;
  });

  // Get available batches for selected college
  const availableBatches = filterCollege === "all" 
    ? batches 
    : getBatchesByCollege(filterCollege);

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

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">

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
              <Select value={filterCollege} onValueChange={(value) => {
                setFilterCollege(value);
                setFilterBatch("all"); // Reset batch filter when college changes
              }}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by college" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Colleges</SelectItem>
                  {colleges.map((college) => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterBatch} onValueChange={setFilterBatch}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Batches</SelectItem>
                  {availableBatches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.name}>
                      {batch.name}
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
                        <TableHead>Size Recommendations</TableHead>
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
                          <TableCell className="text-sm">
                            <div className="space-y-1">
                              {student.clothing_type === "shirt" && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Shirt:</span>
                                  <Badge variant="secondary">
                                    {calculateShirtSize(student)}
                                  </Badge>
                                </div>
                              )}
                              {student.clothing_type === "pant" && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Pant:</span>
                                  <Badge variant="secondary">
                                    {calculatePantSize(student)}
                                  </Badge>
                                </div>
                              )}
                              {student.clothing_type === "shoes" && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Shoe:</span>
                                  <Badge variant="secondary">
                                    {student.shoe_size || 'Not specified'}
                                  </Badge>
                                </div>
                              )}
                              {!student.clothing_type && (
                                <span className="text-xs text-muted-foreground">No type selected</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {student.collar_size && (
                              <div>Collar: {student.collar_size}</div>
                            )}
                            {student.chest && <div>Chest: {student.chest}</div>}
                            {student.waist && <div>Waist: {student.waist}</div>}
                            {student.hip && <div>Hip: {student.hip}</div>}
                            {student.foot_length && <div>Foot: {student.foot_length}</div>}
                          </TableCell>
                          <TableCell>
                            {new Date(student.created_at).toLocaleDateString()}
                          </TableCell>
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
          </TabsContent>

          <TabsContent value="management">
            <AdminManagement onDataUpdate={() => {
              // Refresh management data when changes are made
              window.location.reload();
            }} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
