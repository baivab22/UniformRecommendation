import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Ruler, ArrowLeft, User } from "lucide-react";

type Props = {
  clothingType: "shirt" | "pant" | "shoes";
  gender: "male" | "female";
  onSubmit: (data: any) => void;
};

type MeasurementStep = "age" | "morphology" | "fit" | "measurements" | "collar";

const MeasurementForm = ({ clothingType, gender, onSubmit }: Props) => {
  const [currentStep, setCurrentStep] = useState<MeasurementStep>("age");
  const [formData, setFormData] = useState({
    age: "",
    morphology: "",
    fitPreference: "",
    collarSize: "",
    height: "",
    weight: "",
    chest: "",
    shoulder: "",
    waist: "",
    hip: "",
    inseam: "",
    shoeSize: "",
  });

  const steps: MeasurementStep[] =
    clothingType === "shirt"
      ? ["age", "morphology", "fit", "collar", "measurements"]
      : ["age", "morphology", "fit", "measurements"];

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const morphologyOptions = [
    { id: "slim", label: "Slim", icon: "👤" },
    { id: "athletic", label: "Athletic", icon: "💪" },
    { id: "average", label: "Average", icon: "🧍" },
    { id: "broad", label: "Broad", icon: "🫃" },
  ];

  const fitOptions = [
    { id: "slim", label: "Slim", description: "Close-fitting silhouette" },
    {
      id: "tailored",
      label: "Tailored",
      description: "Fitted but comfortable",
    },
    { id: "loose", label: "Loose", description: "Relaxed and roomy" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "age":
        return formData.age !== "";
      case "morphology":
        return formData.morphology !== "";
      case "fit":
        return formData.fitPreference !== "";
      case "collar":
        return formData.collarSize !== "";
      case "measurements":
        if (clothingType === "shirt") {
          return (
            formData.height &&
            formData.weight &&
            formData.chest &&
            formData.shoulder
          );
        } else if (clothingType === "pant") {
          return (
            formData.height &&
            formData.weight &&
            formData.waist &&
            formData.hip &&
            formData.inseam
          );
        } else if (clothingType === "shoes") {
          return formData.shoeSize !== "";
        }
        return false;
      default:
        return false;
    }
  };

  return (
    <Card className="shadow-card max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
          <Ruler className="h-8 w-8 text-white" />
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {currentStep === "age" && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">How old are you?</h2>
              <p className="text-muted-foreground">
                Age helps us recommend the right size based on body proportions
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <Input
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="text-center text-lg h-12"
                min="13"
                max="100"
              />
            </div>
          </div>
        )}

        {currentStep === "morphology" && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Your Morphology</h2>
              <p className="text-muted-foreground">
                Choose the body shape that best describes you
              </p>
            </div>
            <RadioGroup
              value={formData.morphology}
              onValueChange={(value) => handleInputChange("morphology", value)}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {morphologyOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex flex-col items-center space-y-2"
                >
                  <Label
                    htmlFor={option.id}
                    className="cursor-pointer border rounded-lg p-6 hover:bg-accent transition-colors flex flex-col items-center space-y-2 w-full"
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="sr-only"
                    />
                    <div className="text-3xl">{option.icon}</div>
                    <span className="font-medium">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {currentStep === "fit" && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Fit Preference</h2>
              <p className="text-muted-foreground">
                How would you like your {clothingType} to fit?
              </p>
            </div>
            <RadioGroup
              value={formData.fitPreference}
              onValueChange={(value) =>
                handleInputChange("fitPreference", value)
              }
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {fitOptions.map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <Label
                    htmlFor={`fit-${option.id}`}
                    className="cursor-pointer border rounded-lg p-6 hover:bg-accent transition-colors flex flex-col items-center space-y-2 w-full text-center"
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`fit-${option.id}`}
                      className="sr-only"
                    />
                    <div className="text-2xl">👕</div>
                    <span className="font-medium text-lg">{option.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {option.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {currentStep === "collar" && clothingType === "shirt" && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Collar Size</h2>
              <p className="text-muted-foreground">
                Select your collar circumference
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <Select
                value={formData.collarSize}
                onValueChange={(value) =>
                  handleInputChange("collarSize", value)
                }
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Choose your collar size" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 14).map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} inches
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === "measurements" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Detailed Measurements</h2>
              <p className="text-muted-foreground">
                Enter your precise measurements for the perfect fit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clothingType !== "shoes" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g. 175"
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange("height", e.target.value)
                      }
                      className="text-center text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g. 70"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                      className="text-center text-lg"
                    />
                  </div>
                </>
              )}

              {clothingType === "shirt" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="chest">Chest (cm) *</Label>
                    <Input
                      id="chest"
                      type="number"
                      placeholder="e.g. 100"
                      value={formData.chest}
                      onChange={(e) =>
                        handleInputChange("chest", e.target.value)
                      }
                      className="text-center text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shoulder">Shoulder Width (cm) *</Label>
                    <Input
                      id="shoulder"
                      type="number"
                      placeholder="e.g. 45"
                      value={formData.shoulder}
                      onChange={(e) =>
                        handleInputChange("shoulder", e.target.value)
                      }
                      className="text-center text-lg"
                    />
                  </div>
                </>
              )}

              {clothingType === "pant" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist (cm) *</Label>
                    <Input
                      id="waist"
                      type="number"
                      placeholder="e.g. 32"
                      value={formData.waist}
                      onChange={(e) =>
                        handleInputChange("waist", e.target.value)
                      }
                      className="text-center text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hip">Hip (cm) *</Label>
                    <Input
                      id="hip"
                      type="number"
                      placeholder="e.g. 38"
                      value={formData.hip}
                      onChange={(e) => handleInputChange("hip", e.target.value)}
                      className="text-center text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inseam">Inseam (cm) *</Label>
                    <Input
                      id="inseam"
                      type="number"
                      placeholder="e.g. 32"
                      value={formData.inseam}
                      onChange={(e) =>
                        handleInputChange("inseam", e.target.value)
                      }
                      className="text-center text-lg"
                    />
                  </div>
                </>
              )}

              {clothingType === "shoes" && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="shoeSize">Shoe Size *</Label>
                  <Input
                    id="shoeSize"
                    type="number"
                    placeholder="e.g. 9"
                    value={formData.shoeSize}
                    onChange={(e) =>
                      handleInputChange("shoeSize", e.target.value)
                    }
                    className="text-center text-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          {currentStepIndex > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-primary hover:shadow-elegant transition-all duration-300 ml-auto"
          >
            {currentStepIndex === steps.length - 1
              ? "Continue to Personal Info"
              : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;
