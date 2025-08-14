import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  School,
  GraduationCap,
  Calendar,
  Edit,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type School = { id: string; name: string; created_at?: string };
type College = { id: string; name: string; created_at?: string };
type Batch = {
  id: string;
  name: string;
  college_id: string;
  created_at?: string;
};

interface AdminManagementProps {
  onDataUpdate?: () => void;
}

export const AdminManagement = ({ onDataUpdate }: AdminManagementProps) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string>("");

  const [dialogState, setDialogState] = useState<{
    type: "school" | "college" | "batch" | "";
    mode: "add" | "edit";
    item?: School | College | Batch;
    name: string;
  }>({
    type: "",
    mode: "add",
    name: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [schoolsRes, collegesRes, batchesRes] = await Promise.all([
        supabase
          .from("schools")
          .select("*")
          .order("created_at", { ascending: true }),
        supabase
          .from("colleges")
          .select("*")
          .order("created_at", { ascending: true }),
        supabase
          .from("batches")
          .select("*")
          .order("created_at", { ascending: true }),
      ]);

      if (schoolsRes.error) throw schoolsRes.error;
      if (collegesRes.error) throw collegesRes.error;
      if (batchesRes.error) throw batchesRes.error;

      setSchools((schoolsRes.data as School[]) ?? []);
      setColleges((collegesRes.data as College[]) ?? []);
      setBatches((batchesRes.data as Batch[]) ?? []);
    } catch (error: any) {
      console.error("Error fetching data:", error);
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
    const table = isSchool ? "schools" : isCollege ? "colleges" : "batches";

    try {
      if (dialogState.mode === "edit" && dialogState.item) {
        const payload: any = { name: dialogState.name.trim() };
        if (isBatch && selectedCollege) payload.college_id = selectedCollege;

        const { error } = await supabase
          .from(table)
          .update(payload)
          .eq("id", (dialogState.item as any).id);
        if (error) throw error;

        toast({
          title: "Success",
          description: `${capitalize(dialogState.type)} updated successfully`,
        });
      } else {
        const payload: any = { name: dialogState.name.trim() };
        if (isBatch) {
          if (!selectedCollege) {
            toast({
              title: "Select college",
              description: "Please choose a college for this batch.",
              variant: "destructive",
            });
            return;
          }
          payload.college_id = selectedCollege;
        }

        const { error } = await supabase.from(table).insert([payload]);
        if (error) throw error;

        toast({
          title: "Success",
          description: `${capitalize(dialogState.type)} added successfully`,
        });
      }

      closeDialog();
      await fetchData();
      onDataUpdate?.();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error?.message ||
          `Failed to ${dialogState.mode === "edit" ? "update" : "add"} ${
            dialogState.type
          }`,
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (
    type: "school" | "college" | "batch",
    id: string
  ) => {
    const table =
      type === "school"
        ? "schools"
        : type === "college"
        ? "colleges"
        : "batches";
    try {
      // If you have FK ON DELETE CASCADE on batches.college_id → colleges.id you can remove the manual cascade below.
      if (type === "college") {
        await supabase.from("batches").delete().eq("college_id", id);
      }

      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Success",
        description: `${capitalize(type)} deleted successfully`,
      });

      await fetchData();
      onDataUpdate?.();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error?.message || `Failed to delete ${type}`,
        variant: "destructive",
      });
    }
  };

  const openDialog = (
    type: "school" | "college" | "batch",
    mode: "add" | "edit" = "add",
    item?: School | College | Batch
  ) => {
    setDialogState({
      type,
      mode,
      item,
      name: item?.name || "",
    });

    if (type === "batch") {
      // For edit, prefill the college select with the existing value
      if (mode === "edit" && item && (item as Batch).college_id) {
        setSelectedCollege((item as Batch).college_id);
      } else {
        setSelectedCollege("");
      }
    } else {
      setSelectedCollege("");
    }
  };

  const closeDialog = () => {
    setDialogState({
      type: "",
      mode: "add",
      name: "",
      item: undefined,
    });
    setSelectedCollege("");
  };

  const getCollegeBatches = (collegeId: string) => {
    return batches.filter((b) => b.college_id === collegeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Management</h2>
          <p className="text-muted-foreground">
            Manage schools, colleges, and batches
          </p>
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
            <Button
              size="sm"
              variant="outline"
              onClick={() => openDialog("batch")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            {colleges.map((college) => {
              const collegeBatches = getCollegeBatches(college.id);
              return (
                <div key={college.id} className="mb-4 last:mb-0">
                  <h4 className="font-medium text-sm mb-2 text-muted-foreground">
                    {college.name}
                  </h4>
                  <div className="space-y-2 ml-3">
                    {collegeBatches.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        No batches yet
                      </p>
                    ) : (
                      collegeBatches.map((batch) => (
                        <div
                          key={batch.id}
                          className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                        >
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

      <Dialog
        open={dialogState.type !== ""}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogState.mode === "edit" ? "Edit" : "Add New"}{" "}
              {dialogState.type}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {dialogState.type === "batch" && (
              <div className="space-y-2">
                <Label>College</Label>
                {/* This dropdown only shows colleges — not batches — fixing the “same options” issue */}
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full p-2 border rounded-md"
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
              <Label htmlFor="item-name">Name</Label>
              <Input
                id="item-name"
                value={dialogState.name}
                onChange={(e) =>
                  setDialogState((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={`Enter ${dialogState.type} name`}
                autoFocus
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={
                !dialogState.name.trim() ||
                (dialogState.type === "batch" && !selectedCollege)
              }
            >
              {dialogState.mode === "edit" ? "Update" : "Add"}{" "}
              {dialogState.type}
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
  renderExtraInfo,
}: {
  title: string;
  items: Array<School | College | Batch>;
  type: "school" | "college" | "batch";
  icon: any;
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  renderExtraInfo?: (item: any) => React.ReactNode;
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
          <p className="text-sm text-muted-foreground">
            No {title.toLowerCase()} added yet
          </p>
        ) : (
          items.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
            >
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

function capitalize<T extends string>(s: T): Capitalize<T> {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}
