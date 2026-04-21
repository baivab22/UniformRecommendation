import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { UserCircle } from "lucide-react";
import { apiCall } from "@/lib/supabase";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

type School = { id: string; name: string; created_at?: string };
type College = { id: string; name: string; created_at?: string };
type Batch = {
  id: string;
  name: string;
  college_id: string;
  created_at?: string;
};

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    student_id: "",
    college: "",
    batch: "",
    agreeToTerms: false,
  });
  const [measurementData, setMeasurementData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const [schools, setSchools] = useState<School[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>("");

  useEffect(() => {
    const storedData = localStorage.getItem("measurementData");
    if (storedData) {
      setMeasurementData(JSON.parse(storedData));
    } else {
      navigate("/student-form");
    }
  }, [navigate]);

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
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to fetch management data",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.student_id ||
      !formData.college ||
      !formData.batch
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!measurementData) {
      toast({
        title: "Missing Measurements",
        description: "Please complete the measurement process first.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const combinedData = {
        ...formData,
        ...measurementData,
        agreeToTerms: undefined,
      };

      // Map measurement_type to clothing_type if present
      if (combinedData.measurement_type) {
        combinedData.clothing_type = combinedData.measurement_type;
        delete combinedData.measurement_type;
      }

      // Clean up sizes based on what was actually measured
      // Only keep sizes that correspond to the submitted measurement type
      const measurementType = combinedData.clothing_type || 'all';
      
      if (measurementType === "shirt") {
        // Remove pant and shoe sizes
        combinedData.pantSize = undefined;
        combinedData.shoe_size = undefined;
      } else if (measurementType === "pant") {
        // Remove shirt and shoe sizes
        combinedData.shirtSize = undefined;
        combinedData.shoe_size = undefined;
      } else if (measurementType === "shoes") {
        // Remove shirt and pant sizes
        combinedData.shirtSize = undefined;
        combinedData.pantSize = undefined;
      }
      // If "all", keep all sizes

      const cleanedData = Object.fromEntries(
        Object.entries(combinedData).filter(
          ([_, value]) => value !== null && value !== "" && value !== undefined
        )
      );

      await apiCall("/students", {
        method: "POST",
        body: JSON.stringify(cleanedData),
      });

      localStorage.removeItem("measurementData");

      toast({
        title: "Success!",
        description: "Your information has been submitted. Thank you!",
      });

      navigate("/");
    } catch (error: any) {
      console.error("❌ Error submitting:", error);
      toast({
        title: "Submission Failed",
        description:
          error?.message || "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-grow p-3 sm:p-4 md:p-6">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-card">
            <CardHeader className="text-center px-4 sm:px-6">
              <div className="mx-auto mb-3 sm:mb-4 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary flex items-center justify-center">
                <UserCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Personal Information
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-600">
                Complete your profile to finalize your order
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.mobile}
                      onChange={(e) =>
                        handleInputChange("mobile", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student_id">Student ID *</Label>
                  <Input
                    id="student_id"
                    type="text"
                    placeholder="STU12345"
                    value={formData.student_id}
                    onChange={(e) => handleInputChange("student_id", e.target.value)}
                    required
                  />
                </div>

                {/* Academic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* College Select */}
                  <div className="space-y-2">
                    <Label htmlFor="college">College/Institution *</Label>
                    <Select
                      value={
                        colleges.find((c) => c.name === formData.college)?.id ||
                        ""
                      }
                      onValueChange={(collegeId) => {
                        const selectedCollege = colleges.find(
                          (c) => c.id === collegeId
                        );
                        handleInputChange("college", selectedCollege?.name || "");
                        setSelectedCollegeId(collegeId);
                        handleInputChange("batch", "");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {formData.college || "Select college"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.length > 0 ? (
                          colleges.map((college) => (
                            <SelectItem key={college.id} value={college.id}>
                              {college.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="no-college">
                            No colleges available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Batch Select */}
                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch/Year *</Label>
                    <Select
                      value={
                        batches.find((b) => b.name === formData.batch)?.id || ""
                      }
                      onValueChange={(batchId) => {
                        const selectedBatch = batches.find(
                          (b) => b.id === batchId
                        );
                        handleInputChange("batch", selectedBatch?.name || "");
                      }}
                      disabled={!selectedCollegeId}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {formData.batch || "Select batch"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {batches.filter(
                          (batch) => batch.college_id === selectedCollegeId
                        ).length > 0 ? (
                          batches
                            .filter(
                              (batch) => batch.college_id === selectedCollegeId
                            )
                            .map((batch) => (
                              <SelectItem key={batch.id} value={batch.id}>
                                {batch.name}
                              </SelectItem>
                            ))
                        ) : (
                          <SelectItem disabled value="no-batch">
                            No batches available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-4">
                  <div className="rounded-lg border p-3 sm:p-4 bg-muted/50">
                    <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                    <Textarea
                      readOnly
                      className="h-24 resize-none bg-background"
                      value="By submitting this form, you agree to provide accurate measurements and personal information. This data will be used solely for sizing purposes and will be handled according to our privacy policy. Your information will be securely stored and will not be shared with third parties without your consent."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeToTerms", !!checked)
                      }
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the terms and conditions *
                    </Label>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-elegant transition-all duration-300 px-8"
                  >
                    {isLoading ? "Submitting..." : "Submit Information"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PersonalInfo;
