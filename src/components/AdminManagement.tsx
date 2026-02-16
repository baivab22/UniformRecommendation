import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, School, GraduationCap, Calendar, Edit, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { apiCall } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type School = { id: string; name: string; created_at?: string };
type Campus = { id: string; name: string; city: string; logo_url?: string; address?: string };
type College = { id: string; name: string; logo_url?: string; campuses?: Campus[]; created_at?: string };
type Batch = { id: string; name: string; college_id: string; created_at?: string };

interface AdminManagementProps {
  onDataUpdate?: () => void;
}

export const AdminManagement = ({ onDataUpdate }: AdminManagementProps) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [expandedColleges, setExpandedColleges] = useState<Set<string>>(new Set());

  const [dialogState, setDialogState] = useState<{
    type: "school" | "college" | "batch" | "campus" | "";
    mode: "add" | "edit";
    item?: any;
    name: string;
    city?: string;
    address?: string;
    collegeId?: string;
    logoUrl?: string;
  }>({ type: "", mode: "add", name: "", city: "", address: "", logoUrl: "" });

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [schoolsRes, collegesRes, batchesRes] = await Promise.all([
        apiCall("/schools"),
        apiCall("/colleges"),
        apiCall("/batches"),
      ]);
      setSchools(schoolsRes ?? []);
      setColleges(collegesRes ?? []);
      setBatches(batchesRes ?? []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to fetch management data",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!dialogState.name.trim()) return;

    const isSchool = dialogState.type === "school";
    const isCollege = dialogState.type === "college";
    const isBatch = dialogState.type === "batch";
    const isCampus = dialogState.type === "campus";

    try {
      if (isCampus) {
        const collegeId = dialogState.collegeId || selectedCollege;
        if (!collegeId) {
          toast({ title: "Error", description: "College not selected", variant: "destructive" });
          return;
        }
        if (!dialogState.city?.trim()) {
          toast({ title: "Error", description: "City is required", variant: "destructive" });
          return;
        }

        if (dialogState.mode === "edit" && dialogState.item) {
          await apiCall(`/colleges/${collegeId}/campuses/${dialogState.item.id}`, {
            method: "PUT",
            body: JSON.stringify({
              name: dialogState.name.trim(),
              city: dialogState.city.trim(),
              logo_url: dialogState.logoUrl?.trim() || "",
              address: dialogState.address?.trim() || "",
            }),
          });
          toast({ title: "Success", description: "Campus updated successfully" });
        } else {
          await apiCall(`/colleges/${collegeId}/campuses`, {
            method: "POST",
            body: JSON.stringify({
              name: dialogState.name.trim(),
              city: dialogState.city.trim(),
              logo_url: dialogState.logoUrl?.trim() || "",
              address: dialogState.address?.trim() || "",
            }),
          });
          toast({ title: "Success", description: "Campus added successfully" });
        }
      } else {
        const endpoint = isSchool ? "/schools" : isCollege ? "/colleges" : "/batches";

        if (dialogState.mode === "edit" && dialogState.item) {
          const payload: any = { name: dialogState.name.trim() };
          if (isCollege) payload.logo_url = dialogState.logoUrl?.trim() || "";
          if (isBatch && selectedCollege) payload.college_id = selectedCollege;

          await apiCall(`${endpoint}/${(dialogState.item as any).id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
          });

          toast({ title: "Success", description: `${capitalize(dialogState.type)} updated successfully` });
        } else {
          const payload: any = { name: dialogState.name.trim() };
          if (isCollege) payload.logo_url = dialogState.logoUrl?.trim() || "";
          if (isBatch) {
            if (!selectedCollege) {
              toast({ title: "Select college", description: "Please choose a college for this batch.", variant: "destructive" });
              return;
            }
            payload.college_id = selectedCollege;
          }

          await apiCall(endpoint, { method: "POST", body: JSON.stringify(payload) });
          toast({ title: "Success", description: `${capitalize(dialogState.type)} added successfully` });
        }
      }

      closeDialog();
      await fetchData();
      onDataUpdate?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || `Failed to ${dialogState.mode === "edit" ? "update" : "add"} ${dialogState.type}`,
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (type: "school" | "college" | "batch" | "campus", id: string, collegeId?: string) => {
    try {
      if (type === "campus" && collegeId) {
        await apiCall(`/colleges/${collegeId}/campuses/${id}`, { method: "DELETE" });
      } else {
        const endpoint = type === "school" ? "/schools" : type === "college" ? "/colleges" : "/batches";
        await apiCall(`${endpoint}/${id}`, { method: "DELETE" });
      }
      toast({ title: "Success", description: `${capitalize(type)} deleted successfully` });
      await fetchData();
      onDataUpdate?.();
    } catch (error: any) {
      toast({ title: "Error", description: error?.message || `Failed to delete ${type}`, variant: "destructive" });
    }
  };

  const openDialog = (type: "school" | "college" | "batch" | "campus", mode: "add" | "edit" = "add", item?: any, collegeId?: string) => {
    if (type === "campus") {
      setDialogState({ 
        type, 
        mode, 
        item, 
        name: item?.name || "", 
        city: item?.city || "",
        logoUrl: item?.logo_url || "",
        address: item?.address || "",
        collegeId: collegeId || ""
      });
    } else {
      setDialogState({ type, mode, item, name: item?.name || "", city: "", address: "", logoUrl: item?.logo_url || "" });
      if (type === "batch" && mode === "edit" && item && item.college_id) {
        setSelectedCollege(item.college_id);
      } else {
        setSelectedCollege("");
      }
    }
  };

  const closeDialog = () => {
    setDialogState({ type: "", mode: "add", name: "", city: "", address: "", logoUrl: "" });
    setSelectedCollege("");
  };

  const toggleCollege = (collegeId: string) => {
    const newSet = new Set(expandedColleges);
    if (newSet.has(collegeId)) {
      newSet.delete(collegeId);
    } else {
      newSet.add(collegeId);
    }
    setExpandedColleges(newSet);
  };

  const getCollegeBatches = (collegeId: string) => batches.filter((b) => b.college_id === collegeId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Management</h2>
          <p className="text-sm text-gray-500 mt-1">Schools, colleges, campuses, and batches</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ManagementCard
          title="Schools"
          items={schools}
          type="school"
          icon={School}
          onAdd={() => openDialog("school")}
          onEdit={(item) => openDialog("school", "edit", item)}
          onDelete={(id) => deleteItem("school", id)}
        />

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-200">
            <h3 className="text-base font-semibold flex items-center gap-2 text-gray-900">
              <GraduationCap className="h-4 w-4 text-cyan-600" />
              Colleges & Campuses
            </h3>
            <Button
              size="sm"
              onClick={() => openDialog("college")}
              className="h-8 rounded-md"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add College
            </Button>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-2">
            {colleges.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No colleges yet</p>
            ) : (
              colleges.map((college) => (
                <div key={college.id} className="border border-gray-200 rounded-md overflow-hidden">
                  <button
                    onClick={() => toggleCollege(college.id)}
                    className="w-full flex items-center justify-between gap-3 p-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {expandedColleges.has(college.id) ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                      <div className="h-9 w-9 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center overflow-hidden">
                        {college.logo_url ? (
                          <img src={college.logo_url} alt={`${college.name} logo`} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xs font-semibold">{getInitials(college.name)}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{college.name}</div>
                        <div className="mt-1">
                          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                            {(college.campuses || []).length} Campus{(college.campuses || []).length !== 1 ? "es" : ""}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDialog("college", "edit", college);
                        }}
                        className="h-7 w-7 p-0 text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem("college", college.id);
                        }}
                        className="h-7 w-7 p-0 text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </button>

                  {expandedColleges.has(college.id) && (
                    <div className="border-t border-gray-200 bg-white p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-gray-600 uppercase">Campuses</h4>
                        <Button
                          size="sm"
                          onClick={() => openDialog("campus", "add", undefined, college.id)}
                          className="h-7 px-2 text-xs rounded-md"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Campus
                        </Button>
                      </div>

                      {(!college.campuses || college.campuses.length === 0) ? (
                        <p className="text-xs text-gray-500 italic py-2">No campuses yet</p>
                      ) : (
                        <div className="space-y-2">
                          {college.campuses.map((campus) => (
                            <div key={campus.id} className="bg-white border border-gray-200 rounded-md p-2.5 hover:bg-gray-50 transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className="h-8 w-8 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center overflow-hidden">
                                    {campus.logo_url ? (
                                      <img src={campus.logo_url} alt={`${campus.name} logo`} className="h-full w-full object-cover" />
                                    ) : (
                                      <span className="text-[10px] font-semibold">{getInitials(campus.name)}</span>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">{campus.name}</div>
                                  <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    {campus.city}
                                  </div>
                                  {campus.address && (
                                    <div className="text-xs text-gray-500 mt-1">{campus.address}</div>
                                  )}
                                  </div>
                                </div>
                                <div className="flex gap-1 ml-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => openDialog("campus", "edit", campus, college.id)}
                                    className="h-6 w-6 p-0 text-gray-600 hover:text-gray-900"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteItem("campus", campus.id, college.id)}
                                    className="h-6 w-6 p-0 text-gray-600 hover:text-red-600"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-200">
            <h3 className="text-base font-semibold flex items-center gap-2 text-gray-900">
              <Calendar className="h-4 w-4 text-cyan-600" />
              Batches
            </h3>
            <Button
              size="sm"
              onClick={() => openDialog("batch")}
              className="h-8 rounded-md"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto space-y-3">
            {colleges.map((college) => {
              const collegeBatches = getCollegeBatches(college.id);
              return (
                <div key={college.id} className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-900">{college.name}</h4>
                  <div className="space-y-1 ml-3">
                    {collegeBatches.length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No batches yet</p>
                    ) : (
                      collegeBatches.map((batch) => (
                        <div key={batch.id} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                          <span className="text-sm text-gray-700">{batch.name}</span>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openDialog("batch", "edit", batch)}
                              className="h-7 w-7 p-0 text-gray-600 hover:text-gray-900"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteItem("batch", batch.id)}
                              className="h-7 w-7 p-0 text-gray-600 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                Total: {batches.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={dialogState.type !== ""} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="bg-white border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-xl">
              {dialogState.mode === "edit" ? "Edit" : "Add New"} {capitalize(dialogState.type || "")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {dialogState.type === "campus" && (
              <div className="space-y-2">
                <Label className="text-gray-700">College</Label>
                <select 
                  value={dialogState.collegeId || ""} 
                  onChange={(e) => setDialogState((prev) => ({ ...prev, collegeId: e.target.value }))}
                  disabled={dialogState.mode === "edit"}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                  required
                >
                  <option value="">Select College</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {dialogState.type === "batch" && (
              <div className="space-y-2">
                <Label className="text-gray-700">College</Label>
                <select 
                  value={selectedCollege} 
                  onChange={(e) => setSelectedCollege(e.target.value)} 
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="">Select College</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="item-name" className="text-gray-700">Name</Label>
              <Input
                id="item-name"
                value={dialogState.name}
                onChange={(e) => setDialogState((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={`Enter ${dialogState.type} name`}
                autoFocus
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:border-blue-500"
              />
            </div>

            {(dialogState.type === "college" || dialogState.type === "campus") && (
              <div className="space-y-2">
                <Label htmlFor="logo-url" className="text-gray-700">Logo URL (Optional)</Label>
                <Input
                  id="logo-url"
                  value={dialogState.logoUrl || ""}
                  onChange={(e) => setDialogState((prev) => ({ ...prev, logoUrl: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:border-blue-500"
                />
              </div>
            )}

            {dialogState.type === "campus" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="campus-city" className="text-gray-700">City *</Label>
                  <Input
                    id="campus-city"
                    value={dialogState.city || ""}
                    onChange={(e) => setDialogState((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter city"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campus-address" className="text-gray-700">Address (Optional)</Label>
                  <Input
                    id="campus-address"
                    value={dialogState.address || ""}
                    onChange={(e) => setDialogState((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter address"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg focus:border-blue-500"
                  />
                </div>
              </>
            )}

            <Button
              onClick={handleSubmit}
              className="w-full rounded-md"
              disabled={
                !dialogState.name.trim() ||
                (dialogState.type === "batch" && !selectedCollege) ||
                (dialogState.type === "campus" && !dialogState.city?.trim())
              }
            >
              {dialogState.mode === "edit" ? "Update" : "Add"} {capitalize(dialogState.type || "")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ManagementCardProps {
  title: string;
  items: any[];
  type: string;
  icon: any;
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  renderExtraInfo?: (item: any) => React.ReactNode;
}

const ManagementCard = ({ title, items, icon: Icon, onAdd, onEdit, onDelete, renderExtraInfo }: ManagementCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-200">
        <h3 className="text-base font-semibold flex items-center gap-2 text-gray-900">
          <Icon className="h-4 w-4 text-cyan-600" />
          {title}
        </h3>
        <Button size="sm" onClick={onAdd} className="h-8 rounded-md">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No items yet</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                {renderExtraInfo && <div>{renderExtraInfo(item)}</div>}
              </div>
              <div className="flex gap-1 ml-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(item)}
                  className="h-7 w-7 p-0 text-gray-600 hover:text-gray-900"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(item.id)}
                  className="h-7 w-7 p-0 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getInitials(name: string) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const second = parts.length > 1 ? parts[1]?.[0] : parts[0]?.[1] || "";
  return `${first}${second}`.toUpperCase();
}
