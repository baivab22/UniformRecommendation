import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, School, GraduationCap, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ManagementItem {
  id: string;
  name: string;
  created_at: string;
}

export const AdminManagement = () => {
  const [schools, setSchools] = useState<ManagementItem[]>([]);
  const [colleges, setColleges] = useState<ManagementItem[]>([]);
  const [batches, setBatches] = useState<ManagementItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [dialogOpen, setDialogOpen] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Create sample data for now since the database structure needs to be updated
      setSchools([
        { id: 'school-1', name: 'ABC High School', created_at: new Date().toISOString() },
        { id: 'school-2', name: 'XYZ Academy', created_at: new Date().toISOString() }
      ]);
      setColleges([
        { id: 'college-1', name: 'State University', created_at: new Date().toISOString() },
        { id: 'college-2', name: 'City College', created_at: new Date().toISOString() }
      ]);
      setBatches([
        { id: 'batch-1', name: '2024 Batch', created_at: new Date().toISOString() },
        { id: 'batch-2', name: '2025 Batch', created_at: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch management data",
        variant: "destructive"
      });
    }
  };

  const addItem = async (type: "school" | "college" | "batch") => {
    if (!newItemName.trim()) return;

    // Since we don't have separate tables, we'll just add to our local state
    // In a real app, you'd want proper management tables
    const newItem: ManagementItem = {
      id: `${type}-${Date.now()}`,
      name: newItemName.trim(),
      created_at: new Date().toISOString()
    };

    if (type === "school") {
      setSchools(prev => [...prev, newItem]);
    } else if (type === "college") {
      setColleges(prev => [...prev, newItem]);
    } else {
      setBatches(prev => [...prev, newItem]);
    }

    setNewItemName("");
    setDialogOpen("");
    
    toast({
      title: "Success",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`,
    });
  };

  const deleteItem = async (type: "school" | "college" | "batch", id: string) => {
    if (type === "school") {
      setSchools(prev => prev.filter(item => item.id !== id));
    } else if (type === "college") {
      setColleges(prev => prev.filter(item => item.id !== id));
    } else {
      setBatches(prev => prev.filter(item => item.id !== id));
    }

    toast({
      title: "Success",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
    });
  };

  const ManagementCard = ({ 
    title, 
    items, 
    type, 
    icon: Icon 
  }: { 
    title: string; 
    items: ManagementItem[]; 
    type: "school" | "college" | "batch";
    icon: any;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <Dialog 
          open={dialogOpen === type} 
          onOpenChange={(open) => {
            setDialogOpen(open ? type : "");
            if (!open) setNewItemName(""); // Clear input when closing
          }}
        >
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New {title.slice(0, -1)}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor={`${type}-name`}>Name</Label>
                <Input
                  id={`${type}-name`}
                  value={dialogOpen === type ? newItemName : ""}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={`Enter ${type} name`}
                  autoFocus
                />
              </div>
              <Button 
                onClick={() => addItem(type)} 
                className="w-full"
                disabled={!newItemName.trim()}
              >
                Add {title.slice(0, -1)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No {title.toLowerCase()} added yet</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <span className="text-sm font-medium">{item.name}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteItem(type, item.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Management</h2>
          <p className="text-muted-foreground">Manage schools, colleges, and batches</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManagementCard
          title="Schools"
          items={schools}
          type="school"
          icon={School}
        />
        <ManagementCard
          title="Colleges"
          items={colleges}
          type="college"
          icon={GraduationCap}
        />
        <ManagementCard
          title="Batches"
          items={batches}
          type="batch"
          icon={Calendar}
        />
      </div>
    </div>
  );
};