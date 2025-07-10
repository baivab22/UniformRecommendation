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
import { supabase } from "@/lib/supabase";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    college: "",
    batch: "",
    agreeToTerms: false,
  });
  const [measurementData, setMeasurementData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("measurementData");
    if (storedData) {
      setMeasurementData(JSON.parse(storedData));
    } else {
      navigate("/student-form");
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
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
      // Merge form data and measurement data
      const combinedData = {
        ...formData,
        ...measurementData,
        agreeToTerms: undefined, // don't send this to DB
      };

      // Remove any undefined/null/empty values
      const cleanedData = Object.fromEntries(
        Object.entries(combinedData).filter(
          ([_, value]) => value !== null && value !== "" && value !== undefined
        )
      );

      // Send to Supabase
      const { data, error } = await supabase
        .from("students")
        .insert([cleanedData]);

      if (error) throw error;

      // Clean up
      localStorage.removeItem("measurementData");

      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });

      navigate("/");
    } catch (error) {
      console.error("❌ Error submitting to Supabase:", error);
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <UserCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-semibold">
              Personal Information
            </CardTitle>
            <CardDescription className="text-lg">
              Please provide your personal details to complete the registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              {/* Academic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="college">College/Institution *</Label>
                  <Select
                    value={formData.college}
                    onValueChange={(value) =>
                      handleInputChange("college", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mit">MIT College</SelectItem>
                      <SelectItem value="stanford">
                        Stanford University
                      </SelectItem>
                      <SelectItem value="harvard">
                        Harvard University
                      </SelectItem>
                      <SelectItem value="oxford">Oxford University</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch/Year *</Label>
                  <Select
                    value={formData.batch}
                    onValueChange={(value) => handleInputChange("batch", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/50">
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
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions *
                  </Label>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-gradient-primary hover:shadow-elegant transition-all duration-300 px-8"
                >
                  {isLoading ? "Submitting..." : "Submit Information"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalInfo;
