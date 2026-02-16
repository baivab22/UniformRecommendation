import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall, clearAuthToken } from "@/lib/supabase";
import { AdminManagement } from "@/components/AdminManagement";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

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
  Trash2,
  Package,
  CheckCircle2,
  Eye,
  Send,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AdminDashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCollege, setFilterCollege] = useState("all");
  const [filterCampus, setFilterCampus] = useState("all");
  const [filterBatch, setFilterBatch] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  // ✅ Fetch functions
  const fetchStudents = async () => {
    try {
      const data = await apiCall("/students");
      setStudents(data || []);
    } catch (error: any) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchColleges = async () => {
    try {
      const data = await apiCall("/colleges");
      setColleges(data || []);
    } catch (error: any) {
      console.error("Error fetching colleges:", error);
    }
  };

  const fetchBatches = async () => {
    try {
      const data = await apiCall("/batches");
      setBatches(data || []);
    } catch (error: any) {
      console.error("Error fetching batches:", error);
    }
  };

  const refreshAllData = async () => {
    await Promise.all([fetchStudents(), fetchColleges(), fetchBatches()]);
  };

  // ✅ Auth check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // ✅ Fetch students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Fetch colleges from backend
  useEffect(() => {
    fetchColleges();
  }, []);

  // ✅ Fetch batches from backend
  useEffect(() => {
    fetchBatches();
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin-login");
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      await apiCall(`/students/${studentId}`, { method: "DELETE" });
      setStudents(students.filter(s => s.id !== studentId));
      setDeleteConfirm(null);
      // Optional: Show toast notification
    } catch (error: any) {
      console.error("Error deleting student:", error);
    }
  };

  const handleToggleDispatch = async (studentId: string, currentStatus: boolean) => {
    try {
      const response = await apiCall(`/students/${studentId}/dispatch`, {
        method: "PATCH",
        body: JSON.stringify({ is_dispatched: !currentStatus })
      });
      // Update the student in the list
      setStudents(students.map(s => 
        s.id === studentId 
          ? { ...s, is_dispatched: response.is_dispatched, dispatched_at: response.dispatched_at }
          : s
      ));
    } catch (error: any) {
      console.error("Error updating dispatch status:", error);
    }
  };

  // Helper function to get college name by ID
  const getCollegeName = (collegeId: string) => {
    const college = colleges.find((c) => c.id === collegeId);
    return college ? college.name : collegeId;
  };

  // Helper function to get batches for a specific college
  const getBatchesByCollege = (collegeId: string) => {
    if (collegeId === "all") return batches;
    return batches.filter((batch) => batch.college_id === collegeId);
  };

  // Helper function to get campuses for a specific college
  const getCampusesByCollege = (collegeId: string) => {
    if (collegeId === "all") return [];
    const college = colleges.find((c) => c.id === collegeId);
    return college ? college.campuses || [] : [];
  };

  // Size calculation functions
  const calculateShirtSize = (student: any) => {
    if (!student.chest) return "Measurements needed";
    const chest = student.chest;
    if (chest <= 36) return "S";
    if (chest <= 40) return "M";
    if (chest <= 44) return "L";
    if (chest <= 48) return "XL";
    return "XXL";
  };

  const calculatePantSize = (student: any) => {
    if (!student.waist) return "Measurements needed";
    const waist = student.waist;
    if (waist <= 30) return "30";
    if (waist <= 32) return "32";
    if (waist <= 34) return "34";
    if (waist <= 36) return "36";
    if (waist <= 38) return "38";
    return "40+";
  };

  // ✅ Filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege =
      filterCollege === "all" ||
      student.college === getCollegeName(filterCollege) ||
      student.college === filterCollege ||
      student.college_id === filterCollege;
    const matchesCampus =
      filterCampus === "all" ||
      student.campus === filterCampus ||
      student.campus_id === filterCampus;
    const matchesBatch =
      filterBatch === "all" ||
      student.batch === filterBatch ||
      student.batch_id === filterBatch;

    return matchesSearch && matchesCollege && matchesCampus && matchesBatch;
  });

  // Get available campuses and batches for selected college
  const availableCampuses = getCampusesByCollege(filterCollege);
  const availableBatches =
    filterCollege === "all" ? batches : getBatchesByCollege(filterCollege);

  // Reset campus filter when college changes
  const handleCollegeChange = (value: string) => {
    setFilterCollege(value);
    setFilterCampus("all");
  };

  const stats = {
    totalStudents: students.length,
    maleStudents: students.filter((s) => s.gender === "male").length,
    femaleStudents: students.filter((s) => s.gender === "female").length,
    shirtOrders: students.filter((s) => s.chest).length, // Count students with chest measurements
    pantOrders: students.filter((s) => s.waist).length, // Count students with waist measurements
    shoeOrders: students.filter((s) => s.shoe_size !== null && s.shoe_size !== undefined && s.shoe_size !== '').length, // Count students with shoe size
  };

  // Sorting function
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const key = sortConfig.key as keyof typeof a;
    let aVal = a[key];
    let bVal = b[key];

    if (key === 'created_at') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    } else if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = sortedStudents.slice(startIdx, startIdx + itemsPerPage);

  // Sort handler
  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  // Export CSV
  const handleExport = () => {
    const headers = ['Name', 'Student ID', 'College', 'Batch', 'Gender', 'Shirt Size', 'Pant Size', 'Shoe Size', 'Chest', 'Waist', 'Hip', 'Submitted Date'];
    const rows = sortedStudents.map(student => [
      student.name,
      student.student_id,
      student.college,
      student.batch,
      student.gender,
      student.chest ? calculateShirtSize(student) : 'N/A',
      student.waist ? calculatePantSize(student) : 'N/A',
      student.shoe_size || 'N/A',
      student.chest || '',
      student.waist || '',
      student.hip || '',
      new Date(student.created_at).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_measurements_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  console.log(batches, colleges, "batched value data");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <div className="flex-grow p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 flex justify-end items-start">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg hover:bg-red-700 transition-all bg-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Navigation Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 border border-blue-200 rounded-lg p-1">
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="management"
                className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all"
              >
                <Settings className="h-4 w-4" />
                Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Students */}
                <div className="group relative bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 hover:shadow-xl cursor-default">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Total Students</p>
                      <div className="text-4xl font-bold text-blue-900 mt-3">
                        {stats.totalStudents}
                      </div>
                      <p className="text-blue-700 text-xs mt-2 font-medium">
                        {stats.maleStudents} male • {stats.femaleStudents} female
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Shirt Orders */}
                <div className="group relative bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300 hover:shadow-xl cursor-default">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Shirt Orders</p>
                      <div className="text-4xl font-bold text-purple-900 mt-3">
                        {stats.shirtOrders}
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Shirt className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Pant Orders */}
                <div className="group relative bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-300 hover:shadow-xl cursor-default">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                    <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Pant Orders</p>
                    <div className="text-4xl font-bold text-emerald-900 mt-3">
                      {stats.pantOrders}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <ShoppingBag className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Shoe Orders */}
              <div className="group relative bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 hover:border-orange-400 transition-all duration-300 hover:shadow-xl cursor-default">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-orange-600 text-sm font-semibold uppercase tracking-wide">Shoe Orders</p>
                    <div className="text-4xl font-bold text-orange-900 mt-3">
                      {stats.shoeOrders}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Footprints className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-500" />
                Search & Filter
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or student ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:border-blue-500"
                  />
                </div>
                <Select
                  value={filterCollege}
                  onValueChange={handleCollegeChange}
                >
                  <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 text-gray-900 rounded-lg">
                    <SelectValue placeholder="Filter by college" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="all">All Colleges</SelectItem>
                    {colleges.map((college) => (
                      <SelectItem key={college.id} value={college.id}>
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {filterCollege !== "all" && availableCampuses.length > 0 && (
                  <>
                    <Select value={filterCampus} onValueChange={setFilterCampus}>
                      <SelectTrigger className="w-full md:w-48 bg-white border-gray-300 text-gray-900 rounded-lg">
                        <SelectValue placeholder="Filter by campus" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="all">All Campuses</SelectItem>
                        {availableCampuses.map((campus) => (
                          <SelectItem key={campus.id} value={campus.name}>
                            {campus.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {filterCampus !== "all" && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          College: {colleges.find(c => c.id === filterCollege)?.name || "N/A"}
                        </span>
                      </div>
                    )}
                  </>
                )}

                <Select value={filterBatch} onValueChange={setFilterBatch}>
                  <SelectTrigger className="w-full md:w-40 bg-white border-gray-300 text-gray-900 rounded-lg">
                    <SelectValue placeholder="Batch" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="all">All Batches</SelectItem>
                    {availableBatches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Student Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Student Submissions</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Showing {Math.min(startIdx + itemsPerPage, sortedStudents.length)} of {sortedStudents.length} students
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <label className="text-xs text-gray-600">Items per page:</label>
                    <select 
                      value={itemsPerPage} 
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="text-sm bg-gray-50 border border-gray-300 rounded px-2 py-1"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                        <div className="flex items-center gap-1">
                          Name
                          {sortConfig.key === 'name' && (
                            <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleSort('college')}>
                        <div className="flex items-center gap-1">
                          College
                          {sortConfig.key === 'college' && (
                            <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleSort('batch')}>
                        <div className="flex items-center gap-1">
                          Batch
                          {sortConfig.key === 'batch' && (
                            <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleSort('gender')}>
                        <div className="flex items-center gap-1">
                          Gender
                          {sortConfig.key === 'gender' && (
                            <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Recommended Sizes</th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Measurements</th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold cursor-pointer hover:bg-gray-100" onClick={() => handleSort('created_at')}>
                        <div className="flex items-center gap-1">
                          Submitted
                          {sortConfig.key === 'created_at' && (
                            <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Dispatch Status
                      </th>
                      <th className="px-6 py-4 text-left text-gray-700 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedStudents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                          No students found
                        </td>
                      </tr>
                    ) : (
                      paginatedStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-gray-500 text-xs">{student.student_id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{student.college}</td>
                          <td className="px-6 py-4 text-gray-700">{student.batch}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              student.gender === "male" 
                                ? "bg-blue-100 text-blue-700" 
                                : "bg-pink-100 text-pink-700"
                            }`}>
                              {student.gender}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="space-y-1">
                              {student.chest && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 w-12">Shirt:</span>
                                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                    {calculateShirtSize(student)}
                                  </span>
                                </div>
                              )}
                              {student.waist && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 w-12">Pant:</span>
                                  <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                                    {calculatePantSize(student)}
                                  </span>
                                </div>
                              )}
                              {student.shoe_size && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 w-12">Shoe (UK):</span>
                                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                                    {student.shoe_size}
                                  </span>
                                </div>
                              )}
                              {!student.chest && !student.waist && !student.shoe_size && (
                                <span className="text-xs text-gray-500 italic">No sizes available</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-xs">
                            {student.collar_size && <div>Collar: {student.collar_size}"</div>}
                            {student.chest && <div>Chest: {student.chest}"</div>}
                            {student.waist && <div>Waist: {student.waist}"</div>}
                            {student.hip && <div>Hip: {student.hip}"</div>}
                            {student.foot_length && <div>Foot: {student.foot_length}"</div>}
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-xs">
                            {new Date(student.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleDispatch(student.id, student.is_dispatched || false)}
                              title={student.is_dispatched ? `Sent ${student.dispatched_at ? new Date(student.dispatched_at).toLocaleDateString() : ''}` : 'Mark as dispatched'}
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                student.is_dispatched
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {student.is_dispatched ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <Package className="h-5 w-5" />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setIsViewDialogOpen(true);
                                }}
                                title="View details"
                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Eye className="h-5 w-5" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setDeleteConfirm(student.id)}
                                title="Delete record"
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-6 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
                  <div className="text-sm text-gray-600 font-medium">
                    Showing <span className="font-semibold text-gray-900">{Math.min(startIdx + itemsPerPage, sortedStudents.length)}</span> of <span className="font-semibold text-gray-900">{sortedStudents.length}</span> students
                  </div>
                  
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="text-xs"
                    >
                      ← Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`text-xs w-8 h-8 p-0 ${currentPage === page ? 'bg-primary text-primary-foreground' : ''}`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="text-xs"
                    >
                      Next →
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600">
                    Page <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="management">
            <AdminManagement
              onDataUpdate={refreshAllData}
            />
          </TabsContent>
        </Tabs>

        {/* Student Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-white border-gray-300 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900 text-2xl">Student Details</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6 py-4">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500">Student ID</p>
                      <p className="font-medium text-gray-900 font-mono text-sm">{selectedStudent.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Mobile</p>
                      <p className="font-medium text-gray-900">{selectedStudent.mobile}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedStudent.gender}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">College</p>
                      <p className="font-medium text-gray-900">{selectedStudent.college}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Batch</p>
                      <p className="font-medium text-gray-900">{selectedStudent.batch}</p>
                    </div>
                    {selectedStudent.age && (
                      <div>
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="font-medium text-gray-900">{selectedStudent.age} years</p>
                      </div>
                    )}
                    {selectedStudent.height && (
                      <div>
                        <p className="text-xs text-gray-500">Height</p>
                        <p className="font-medium text-gray-900">{selectedStudent.height} cm</p>
                      </div>
                    )}
                    {selectedStudent.weight && (
                      <div>
                        <p className="text-xs text-gray-500">Weight</p>
                        <p className="font-medium text-gray-900">{selectedStudent.weight} kg</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recommended Sizes */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Sizes</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedStudent.chest && (
                      <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                        <Shirt className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-xs text-gray-600 mb-1">Shirt Size</p>
                        <p className="text-2xl font-bold text-purple-700">{calculateShirtSize(selectedStudent)}</p>
                      </div>
                    )}
                    {selectedStudent.waist && (
                      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center">
                        <ShoppingBag className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                        <p className="text-xs text-gray-600 mb-1">Pant Size</p>
                        <p className="text-2xl font-bold text-emerald-700">{calculatePantSize(selectedStudent)}</p>
                      </div>
                    )}
                    {selectedStudent.shoe_size && (
                      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                        <Footprints className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-xs text-gray-600 mb-1">Shoe Size (UK)</p>
                        <p className="text-2xl font-bold text-orange-700">{selectedStudent.shoe_size}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Measurements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Measurements</h3>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    {selectedStudent.collar_size && (
                      <div>
                        <p className="text-xs text-gray-500">Collar Size</p>
                        <p className="font-medium text-gray-900">{selectedStudent.collar_size}"</p>
                      </div>
                    )}
                    {selectedStudent.chest && (
                      <div>
                        <p className="text-xs text-gray-500">Chest</p>
                        <p className="font-medium text-gray-900">{selectedStudent.chest}"</p>
                      </div>
                    )}
                    {selectedStudent.waist && (
                      <div>
                        <p className="text-xs text-gray-500">Waist</p>
                        <p className="font-medium text-gray-900">{selectedStudent.waist}"</p>
                      </div>
                    )}
                    {selectedStudent.hip && (
                      <div>
                        <p className="text-xs text-gray-500">Hip</p>
                        <p className="font-medium text-gray-900">{selectedStudent.hip}"</p>
                      </div>
                    )}
                    {selectedStudent.shoulder && (
                      <div>
                        <p className="text-xs text-gray-500">Shoulder</p>
                        <p className="font-medium text-gray-900">{selectedStudent.shoulder}"</p>
                      </div>
                    )}
                    {selectedStudent.inseam && (
                      <div>
                        <p className="text-xs text-gray-500">Inseam</p>
                        <p className="font-medium text-gray-900">{selectedStudent.inseam}"</p>
                      </div>
                    )}
                    {selectedStudent.morphology && (
                      <div>
                        <p className="text-xs text-gray-500">Body Type</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedStudent.morphology}</p>
                      </div>
                    )}
                    {selectedStudent.fit_preference && (
                      <div>
                        <p className="text-xs text-gray-500">Fit Preference</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedStudent.fit_preference}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submission Date */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Submitted on {new Date(selectedStudent.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
          <DialogContent className="bg-white border-gray-300">
            <DialogHeader>
              <DialogTitle className="text-red-600">Delete Student Record</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this student record? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setDeleteConfirm(null)}
                  className="text-gray-700 border-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => deleteConfirm && handleDeleteStudent(deleteConfirm)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
