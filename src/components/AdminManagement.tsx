import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, School, GraduationCap, Calendar, Edit } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { ManagementItem } from "@/hooks/useManagementData";

interface AdminManagementProps {
  onDataUpdate?: () => void;
}

export const AdminManagement = ({ onDataUpdate }: AdminManagementProps) => {
  const [schools, setSchools] = useState<ManagementItem[]>([]);
  const [colleges, setColleges] = useState<ManagementItem[]>([]);
  const [batches, setBatches] = useState<ManagementItem[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [dialogState, setDialogState] = useState<{
    type: "school" | "college" | "batch" | "";
    mode: "add" | "edit";
    item?: ManagementItem;
    name: string;
  }>({
    type: "",
    mode: "add",
    name: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // For now, use local state with sample data
      // In production, you'd create separate tables: schools, colleges, batches
      const sampleSchools = [
        { id: 'school-1', name: 'ABC High School', created_at: new Date().toISOString() },
        { id: 'school-2', name: 'XYZ Academy', created_at: new Date().toISOString() }
      ];
      
      const sampleColleges = [
        { id: 'college-1', name: 'State University', created_at: new Date().toISOString() },
        { id: 'college-2', name: 'City College', created_at: new Date().toISOString() },
        { id: 'college-3', name: 'Tech Institute', created_at: new Date().toISOString() }
      ];
      
      const sampleBatches = [
        { id: 'batch-1', name: '2024 Batch', created_at: new Date().toISOString(), parent_id: 'college-1' },
        { id: 'batch-2', name: '2025 Batch', created_at: new Date().toISOString(), parent_id: 'college-1' },
        { id: 'batch-3', name: '2024 Engineering', created_at: new Date().toISOString(), parent_id: 'college-2' },
        { id: 'batch-4', name: '2024 CS', created_at: new Date().toISOString(), parent_id: 'college-3' }
      ];

      setSchools(sampleSchools);
      setColleges(sampleColleges);
      setBatches(sampleBatches);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch management data",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    if (!dialogState.name.trim()) return;

    const newItem: ManagementItem = {
      id: `${dialogState.type}-${Date.now()}`,
      name: dialogState.name.trim(),
      created_at: new Date().toISOString(),
      ...(dialogState.type === "batch" && selectedCollege && { parent_id: selectedCollege })
    };

    if (dialogState.mode === "edit" && dialogState.item) {
      // Update existing item
      if (dialogState.type === "school") {
        setSchools(prev => prev.map(item => 
          item.id === dialogState.item!.id 
            ? { ...item, name: dialogState.name.trim() }
            : item
        ));
      } else if (dialogState.type === "college") {
        setColleges(prev => prev.map(item => 
          item.id === dialogState.item!.id 
            ? { ...item, name: dialogState.name.trim() }
            : item
        ));
      } else {
        setBatches(prev => prev.map(item => 
          item.id === dialogState.item!.id 
            ? { ...item, name: dialogState.name.trim(), parent_id: selectedCollege || item.parent_id }
            : item
        ));
      }
      
      toast({
        title: "Success",
        description: `${dialogState.type.charAt(0).toUpperCase() + dialogState.type.slice(1)} updated successfully`,
      });
    } else {
      // Add new item
      if (dialogState.type === "school") {
        setSchools(prev => [...prev, newItem]);
      } else if (dialogState.type === "college") {
        setColleges(prev => [...prev, newItem]);
      } else {
        setBatches(prev => [...prev, newItem]);
      }
      
      toast({
        title: "Success",
        description: `${dialogState.type.charAt(0).toUpperCase() + dialogState.type.slice(1)} added successfully`,
      });
    }

    closeDialog();
    onDataUpdate?.();
  };

  const deleteItem = async (type: "school" | "college" | "batch", id: string) => {
    if (type === "school") {
      setSchools(prev => prev.filter(item => item.id !== id));
    } else if (type === "college") {
      setColleges(prev => prev.filter(item => item.id !== id));
      // Also delete related batches
      setBatches(prev => prev.filter(item => item.parent_id !== id));
    } else {
      setBatches(prev => prev.filter(item => item.id !== id));
    }

    toast({
      title: "Success",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
    });
    
    onDataUpdate?.();
  };

  const openDialog = (type: "school" | "college" | "batch", mode: "add" | "edit" = "add", item?: ManagementItem) => {
    setDialogState({
      type,
      mode,
      item,
      name: item?.name || ""
    });
    if (item?.parent_id) {
      setSelectedCollege(item.parent_id);
    }
  };

  const closeDialog = () => {
    setDialogState({
      type: "",
      mode: "add",
      name: ""
    });
    setSelectedCollege("");
  };

  const getCollegeBatches = (collegeId: string) => {
    return batches.filter(batch => batch.parent_id === collegeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Management</h2>
          <p className="text-muted-foreground">Manage schools, colleges, and batches</p>
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
        
        <ManagementCard
          title="Colleges"
          items={colleges}
          type="college"
          icon={GraduationCap}
          onAdd={() => openDialog("college")}
          onEdit={(item) => openDialog("college", "edit", item)}
          onDelete={(id) => deleteItem("college", id)}
          renderExtraInfo={(college) => (
            <div className="text-xs text-muted-foreground">
              {getCollegeBatches(college.id).length} batches
            </div>
          )}
        />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Batches
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => openDialog("batch")}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            {colleges.map(college => {
              const collegeBatches = getCollegeBatches(college.id);
              return (
                <div key={college.id} className="mb-4 last:mb-0">
                  <h4 className="font-medium text-sm mb-2 text-muted-foreground">
                    {college.name}
                  </h4>
                  <div className="space-y-2 ml-3">
                    {collegeBatches.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No batches yet</p>
                    ) : (
                      collegeBatches.map(batch => (
                        <div key={batch.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                          <span className="text-sm">{batch.name}</span>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openDialog("batch", "edit", batch)}
                              className="h-7 w-7 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteItem("batch", batch.id)}
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
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
            <div className="mt-3 pt-3 border-t">
              <Badge variant="secondary" className="text-xs">
                Total: {batches.length}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogState.type !== ""} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogState.mode === "edit" ? "Edit" : "Add New"} {dialogState.type}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {dialogState.type === "batch" && (
              <div className="space-y-2">
                <Label>College</Label>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select College</option>
                  {colleges.map(college => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="item-name">Name</Label>
              <Input
                id="item-name"
                value={dialogState.name}
                onChange={(e) => setDialogState(prev => ({ ...prev, name: e.target.value }))}
                placeholder={`Enter ${dialogState.type} name`}
                autoFocus
              />
            </div>
            <Button 
              onClick={handleSubmit}
              className="w-full"
              disabled={!dialogState.name.trim() || (dialogState.type === "batch" && !selectedCollege)}
            >
              {dialogState.mode === "edit" ? "Update" : "Add"} {dialogState.type}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ManagementCard = ({ 
  title, 
  items, 
  type, 
  icon: Icon,
  onAdd,
  onEdit,
  onDelete,
  renderExtraInfo
}: { 
  title: string; 
  items: ManagementItem[]; 
  type: "school" | "college" | "batch";
  icon: any;
  onAdd: () => void;
  onEdit: (item: ManagementItem) => void;
  onDelete: (id: string) => void;
  renderExtraInfo?: (item: ManagementItem) => React.ReactNode;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
      <Button size="sm" variant="outline" onClick={onAdd}>
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </CardHeader>
    <CardContent>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No {title.toLowerCase()} added yet</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
              <div className="flex-1">
                <span className="text-sm font-medium">{item.name}</span>
                {renderExtraInfo?.(item)}
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(item)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(item.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 pt-3 border-t">
        <Badge variant="secondary" className="text-xs">
          Total: {items.length}
        </Badge>
      </div>
    </CardContent>
  </Card>
);