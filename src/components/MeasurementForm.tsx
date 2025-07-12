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
import { Ruler, ArrowLeft, User, Shirt, ShoppingBag, Footprints } from "lucide-react";

type Props = {
  clothingType: "shirt" | "pant" | "shoes";
  gender: "male" | "female";
  onSubmit: (data: any) => void;
};

type MeasurementStep = "personal" | "morphology" | "fit" | "measurements" | "collar";

const MeasurementForm = ({ clothingType, gender, onSubmit }: Props) => {
  const [currentStep, setCurrentStep] = useState<MeasurementStep>("personal");
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    morphology: "",
    fitPreference: "",
    collarSize: "",
    // Shirt specific
    chest: "",
    shoulder: "",
    sleeveLength: "",
    // Pant specific
    waist: "",
    hip: "",
    inseam: "",
    thigh: "",
    // Shoes specific
    footLength: "",
    footWidth: "",
    archHeight: "",
    // Female specific
    bustSize: "",
    underbustSize: "",
    hipCircumference: "",
  });

  const getSteps = (): MeasurementStep[] => {
    if (clothingType === "shirt") {
      return ["personal", "morphology", "fit", "collar", "measurements"];
    } else {
      return ["personal", "morphology", "fit", "measurements"];
    }
  };

  const steps = getSteps();
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const getMorphologyOptions = () => {
    if (gender === "female") {
      return [
        { id: "petite", label: "Petite", icon: "👩‍🦱", description: "Small frame" },
        { id: "curvy", label: "Curvy", icon: "👩", description: "Defined waist" },
        { id: "athletic", label: "Athletic", icon: "🏃‍♀️", description: "Sporty build" },
        { id: "plus", label: "Plus Size", icon: "👩‍🦳", description: "Fuller figure" },
      ];
    } else {
      return [
        { id: "slim", label: "Slim", icon: "👤", description: "Lean build" },
        { id: "athletic", label: "Athletic", icon: "💪", description: "Muscular" },
        { id: "regular", label: "Regular", icon: "🧍", description: "Average build" },
        { id: "broad", label: "Broad", icon: "🫃", description: "Wide frame" },
      ];
    }
  };

  const getFitOptions = () => {
    const baseOptions = [
      { id: "slim", label: "Slim Fit", description: "Close-fitting silhouette" },
      { id: "regular", label: "Regular Fit", description: "Standard comfortable fit" },
      { id: "loose", label: "Loose Fit", description: "Relaxed and roomy" },
    ];

    if (clothingType === "pant" && gender === "female") {
      return [
        { id: "skinny", label: "Skinny", description: "Very tight fit" },
        { id: "slim", label: "Slim", description: "Close-fitting" },
        { id: "straight", label: "Straight", description: "Classic fit" },
        { id: "bootcut", label: "Bootcut", description: "Slightly flared" },
        { id: "wide", label: "Wide Leg", description: "Loose and flowing" },
      ];
    }

    return baseOptions;
  };

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
      case "personal":
        return formData.age && formData.height && formData.weight;
      case "morphology":
        return formData.morphology !== "";
      case "fit":
        return formData.fitPreference !== "";
      case "collar":
        return clothingType !== "shirt" || formData.collarSize !== "";
      case "measurements":
        return validateMeasurements();
      default:
        return false;
    }
  };

  const validateMeasurements = () => {
    if (clothingType === "shirt") {
      const required = ["chest", "shoulder"];
      if (gender === "female") {
        required.push("bustSize", "underbustSize");
      }
      return required.every(field => formData[field as keyof typeof formData]);
    } else if (clothingType === "pant") {
      const required = ["waist", "hip", "inseam"];
      if (gender === "female") {
        required.push("hipCircumference");
      }
      return required.every(field => formData[field as keyof typeof formData]);
    } else if (clothingType === "shoes") {
      return formData.footLength && formData.footWidth;
    }
    return false;
  };

  const getIcon = () => {
    switch (clothingType) {
      case "shirt": return <Shirt className="h-8 w-8 text-white" />;
      case "pant": return <ShoppingBag className="h-8 w-8 text-white" />;
      case "shoes": return <Footprints className="h-8 w-8 text-white" />;
    }
  };

  return (
    <Card className="shadow-xl max-w-3xl mx-auto border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
          {getIcon()}
        </div>
        <CardTitle className="text-2xl font-playfair text-gray-800">
          {clothingType.charAt(0).toUpperCase() + clothingType.slice(1)} Measurement
        </CardTitle>
        <CardDescription className="text-gray-600">
          {gender === "female" ? "Female" : "Male"} sizing parameters
        </CardDescription>
        <div className="space-y-3 mt-4">
          <Progress value={progress} className="w-full h-3 bg-blue-100" />
          <p className="text-sm text-gray-600 font-medium">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-8">
        {currentStep === "personal" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">Basic Information</h2>
              <p className="text-gray-600 text-lg">
                Tell us about yourself for accurate sizing
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="space-y-3">
                <Label htmlFor="age" className="text-lg font-medium text-gray-700">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                  min="13"
                  max="100"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="height" className="text-lg font-medium text-gray-700">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="weight" className="text-lg font-medium text-gray-700">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="65"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === "morphology" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">Body Type</h2>
              <p className="text-gray-600 text-lg">
                Choose the body shape that best describes you
              </p>
            </div>
            <RadioGroup
              value={formData.morphology}
              onValueChange={(value) => handleInputChange("morphology", value)}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {getMorphologyOptions().map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <Label
                    htmlFor={option.id}
                    className="cursor-pointer border-2 border-blue-200 rounded-xl p-6 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 flex flex-col items-center space-y-3 w-full transform hover:scale-105"
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="sr-only"
                    />
                    <div className="text-4xl">{option.icon}</div>
                    <span className="font-semibold text-lg text-gray-800">{option.label}</span>
                    <span className="text-sm text-gray-600 text-center">{option.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {currentStep === "fit" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">Preferred Fit</h2>
              <p className="text-gray-600 text-lg">
                How would you like your {clothingType} to fit?
              </p>
            </div>
            <RadioGroup
              value={formData.fitPreference}
              onValueChange={(value) => handleInputChange("fitPreference", value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {getFitOptions().map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <Label
                    htmlFor={`fit-${option.id}`}
                    className="cursor-pointer border-2 border-blue-200 rounded-xl p-8 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 flex flex-col items-center space-y-4 w-full text-center transform hover:scale-105"
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`fit-${option.id}`}
                      className="sr-only"
                    />
                    <div className="text-3xl">{clothingType === "shirt" ? "👕" : clothingType === "pant" ? "👖" : "👟"}</div>
                    <span className="font-semibold text-xl text-gray-800">{option.label}</span>
                    <span className="text-sm text-gray-600">{option.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {currentStep === "collar" && clothingType === "shirt" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">Collar Size</h2>
              <p className="text-gray-600 text-lg">
                Select your collar circumference for shirts
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <Select
                value={formData.collarSize}
                onValueChange={(value) => handleInputChange("collarSize", value)}
              >
                <SelectTrigger className="h-16 text-lg border-2 border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Choose your collar size" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 13).map((size) => (
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
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">Detailed Measurements</h2>
              <p className="text-gray-600 text-lg">
                Enter your precise measurements for the perfect fit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {clothingType === "shirt" && (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="chest" className="text-lg font-medium text-gray-700">Chest (cm) *</Label>
                    <Input
                      id="chest"
                      type="number"
                      placeholder="e.g. 100"
                      value={formData.chest}
                      onChange={(e) => handleInputChange("chest", e.target.value)}
                      className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="shoulder" className="text-lg font-medium text-gray-700">Shoulder Width (cm) *</Label>
                    <Input
                      id="shoulder"
                      type="number"
                      placeholder="e.g. 45"
                      value={formData.shoulder}
                      onChange={(e) => handleInputChange("shoulder", e.target.value)}
                      className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  {gender === "female" && (
                    <>
                      <div className="space-y-3">
                        <Label htmlFor="bustSize" className="text-lg font-medium text-gray-700">Bust Size (cm) *</Label>
                        <Input
                          id="bustSize"
                          type="number"
                          placeholder="e.g. 90"
                          value={formData.bustSize}
                          onChange={(e) => handleInputChange("bustSize", e.target.value)}
                          className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="underbustSize" className="text-lg font-medium text-gray-700">Underbust (cm) *</Label>
                        <Input
                          id="underbustSize"
                          type="number"
                          placeholder="e.g. 75"
                          value={formData.underbustSize}
                          onChange={(e) => handleInputChange("underbustSize", e.target.value)}
                          className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              {clothingType === "pant" && (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="waist" className="text-lg font-medium text-gray-700">Waist (cm) *</Label>
                    <Input
                      id="waist"
                      type="number"
                      placeholder="e.g. 32"
                      value={formData.waist}
                      onChange={(e) => handleInputChange("waist", e.target.value)}
                      className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="hip" className="text-lg font-medium text-gray-700">Hip (cm) *</Label>
                    <Input
                      id="hip"
                      type="number"
                      placeholder="e.g. 38"
                      value={formData.hip}
                      onChange={(e) => handleInputChange("hip", e.target.value)}
                      className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="inseam" className="text-lg font-medium text-gray-700">Inseam (cm) *</Label>
                    <Input
                      id="inseam"
                      type="number"
                      placeholder="e.g. 32"
                      value={formData.inseam}
                      onChange={(e) => handleInputChange("inseam", e.target.value)}
                      className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  {gender === "female" && (
                    <div className="space-y-3">
                      <Label htmlFor="hipCircumference" className="text-lg font-medium text-gray-700">Hip Circumference (cm) *</Label>
                      <Input
                        id="hipCircumference"
                        type="number"
                        placeholder="e.g. 95"
                        value={formData.hipCircumference}
                        onChange={(e) => handleInputChange("hipCircumference", e.target.value)}
                        className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  )}
                </>
              )}

              {clothingType === "shoes" && (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="footLength" className="text-lg font-medium text-gray-700">Foot Length (cm) *</Label>
                    <Input
                      id="footLength"
                      type="number"
                      placeholder="e.g. 26"
                      value={formData.footLength}
                      onChange={(e) => handleInputChange("footLength", e.target.value)}
                      className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="footWidth" className="text-lg font-medium text-gray-700">Foot Width (cm) *</Label>
                    <Input
                      id="footWidth"
                      type="number"
                      placeholder="e.g. 10"
                      value={formData.footWidth}
                      onChange={(e) => handleInputChange("footWidth", e.target.value)}
                      className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="archHeight" className="text-lg font-medium text-gray-700">Arch Height (optional)</Label>
                    <Select
                      value={formData.archHeight}
                      onValueChange={(value) => handleInputChange("archHeight", value)}
                    >
                      <SelectTrigger className="h-14 text-lg border-2 border-blue-200 focus:border-blue-500">
                        <SelectValue placeholder="Select arch height" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Arch</SelectItem>
                        <SelectItem value="normal">Normal Arch</SelectItem>
                        <SelectItem value="high">High Arch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-8 border-t border-blue-100">
          {currentStepIndex > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 px-6 py-3"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ml-auto"
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