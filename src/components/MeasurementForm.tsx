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
import {
  Ruler,
  ArrowLeft,
  User,
  Shirt,
  ShoppingBag,
  Footprints,
  CheckCircle,
} from "lucide-react";

type Props = {
  clothingType: "shirt" | "pant" | "shoes";
  gender: "male" | "female";
  onSubmit: (data: any) => void;
};

type MeasurementStep =
  | "personal"
  | "fit"
  | "chestType"
  | "measurements"
  | "recommendation";

const MeasurementForm = ({ clothingType, gender, onSubmit }: Props) => {
  const [currentStep, setCurrentStep] = useState<MeasurementStep>("personal");
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    fitPreference: "",
    chestType: "",
    // Shirt specific
    chest: "",
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
    // Recommended size
    recommendedSize: "",
  });

  const getSteps = (): MeasurementStep[] => {
    if (clothingType === "shirt") {
      return ["personal", "fit", "chestType", "measurements", "recommendation"];
    } else {
      return ["personal", "fit", "measurements"];
    }
  };

  const steps = getSteps();
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const getSizeFromChest = (
    chestSize: number,
    weight: number,
    height: number,
    gender: "male" | "female"
  ): string => {
    console.log(chestSize, weight, height, gender, "all data value");

    const sizeChart = [
      { maleSize: "3XS", min: 70, max: 75, femaleSize: "L" },
      { maleSize: "2XS", min: 75, max: 80, femaleSize: "XL" },
      { maleSize: "XS", min: 80, max: 85, femaleSize: "2XL" },
      { maleSize: "S", min: 85, max: 95, femaleSize: "3XL" },
      { maleSize: "M", min: 95, max: 105, femaleSize: "4XL" },
    ];

    // BMI Calculation
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // BMI Category (based on WHO chart)
    let bmiCategory:
      | "underweight"
      | "normal"
      | "overweight"
      | "obese"
      | "extremely obese";

    if (bmi < 18.5) bmiCategory = "underweight";
    else if (bmi < 25) bmiCategory = "normal";
    else if (bmi < 30) bmiCategory = "overweight";
    else if (bmi < 35) bmiCategory = "obese";
    else bmiCategory = "extremely obese";

    // Find size index based on chestSize
    let index = sizeChart.findIndex(
      (size) => chestSize >= size.min && chestSize <= size.max
    );

    // Fallback if chestSize is out of defined range
    if (index === -1) index = chestSize < 70 ? 0 : sizeChart.length - 1;

    // Adjust size if person is obese or extremely obese
    if (bmiCategory === "obese" || bmiCategory === "extremely obese") {
      index = Math.min(index + 1, sizeChart.length - 1); // avoid overflow
    }

    // Return size based on gender
    return gender === "male"
      ? sizeChart[index].maleSize
      : sizeChart[index].femaleSize;
  };

  const getAdjustedSize = (baseSize: string): string => {
    const sizes =
      gender === "male"
        ? ["3XS", "2XS", "XS", "S", "M"]
        : ["L", "XL", "2XL", "3XL", "4XL"];

    const currentIndex = sizes.indexOf(baseSize);

    // Adjust for fit preference
    let adjustment = 0;
    if (formData.fitPreference === "loose") adjustment += 1;
    // if (formData.fitPreference === "slim") adjustment -= 1;

    const newIndex = Math.max(
      0,
      Math.min(sizes.length - 1, currentIndex + adjustment)
    );
    return sizes[newIndex];
  };

  const getFitOptions = () => {
    const baseOptions = [
      {
        id: "slim",
        label: "Slim Fit",
        description: "Close-fitting silhouette",
      },
      {
        id: "regular",
        label: "Regular Fit",
        description: "Standard comfortable fit",
      },
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

  const getChestTypes = () => {
    return [
      {
        id: "athletic",
        label: "Athletic",
        icon: "💪",
        description: "Well-defined chest muscles",
        range: "Usually 95-110 cm",
      },
      {
        id: "average",
        label: "Average",
        icon: "👤",
        description: "Normal chest proportions",
        range: "Usually 85-100 cm",
      },
      {
        id: "slim",
        label: "Slim",
        icon: "🥢",
        description: "Lean chest build",
        range: "Usually 75-90 cm",
      },
      {
        id: "broad",
        label: "Broad",
        icon: "🫃",
        description: "Wide chest frame",
        range: "Usually 100-120 cm",
      },
    ];
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    console.log(
      currentStep === "measurements",
      clothingType === "shirt",
      "data final",
      currentIndex,
      "currentIndex",
      steps.length - 2,
      steps.length,
      "steps length - 1",
      currentStep,
      currentStep === "measurements" && clothingType === "shirt",
      currentIndex < steps.length - 3
    );
    const chestSize = parseInt(formData.chest);
    if (currentStep === "measurements" && clothingType === "shirt") {
      // Calculate recommended size
      if (chestSize) {
        const weight = parseFloat(formData.weight);
        const height = parseFloat(formData.height);
        const baseSize = getSizeFromChest(chestSize, weight, height, gender);
        const adjustedSize = getAdjustedSize(baseSize);
        setFormData((prev) => ({ ...prev, recommendedSize: adjustedSize }));
      }
      setCurrentStep("recommendation");
    } else if (currentIndex < steps.length - 1) {
      if (currentIndex === 2) {
        if (chestSize) {
          const weight = parseFloat(formData.weight);
          const height = parseFloat(formData.height);
          const baseSize = getSizeFromChest(chestSize, weight, height, gender);
          const adjustedSize = getAdjustedSize(baseSize);
          setFormData((prev) => ({ ...prev, recommendedSize: adjustedSize }));
        }
        setCurrentStep("recommendation");
      } else {
        setCurrentStep(steps[currentIndex + 1]);
      }
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
      case "fit":
        return formData.fitPreference !== "";
      case "chestType":
        return (
          clothingType !== "shirt" ||
          (formData.chestType !== "" && formData.chest !== "")
        );
      case "measurements":
        return validateMeasurements();
      case "recommendation":
        return true;
      default:
        return false;
    }
  };

  const validateMeasurements = () => {
    if (clothingType === "shirt") {
      return formData.chest !== "";
    } else if (clothingType === "pant") {
      const required = ["waist", "hip", "inseam"];
      if (gender === "female") {
        required.push("hipCircumference");
      }
      return required.every(
        (field) => formData[field as keyof typeof formData]
      );
    } else if (clothingType === "shoes") {
      return formData.footLength && formData.footWidth;
    }
    return false;
  };

  const getIcon = () => {
    switch (clothingType) {
      case "shirt":
        return <Shirt className="h-8 w-8 text-white" />;
      case "pant":
        return <ShoppingBag className="h-8 w-8 text-white" />;
      case "shoes":
        return <Footprints className="h-8 w-8 text-white" />;
    }
  };

  const getChestSizeRange = () => {
    return gender === "male" ? "70-105 cm" : "105-150 cm";
  };

  return (
    <Card className="shadow-xl max-w-3xl mx-auto border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
          {getIcon()}
        </div>
        <CardTitle className="text-2xl font-playfair text-gray-800">
          {clothingType.charAt(0).toUpperCase() + clothingType.slice(1)}{" "}
          Measurement
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
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Basic Information
              </h2>
              <p className="text-gray-600 text-lg">
                Tell us about yourself for accurate sizing
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="space-y-3">
                <Label
                  htmlFor="age"
                  className="text-lg font-medium text-gray-700"
                >
                  Age
                </Label>
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
                <Label
                  htmlFor="height"
                  className="text-lg font-medium text-gray-700"
                >
                  Height (cm)
                </Label>
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
                <Label
                  htmlFor="weight"
                  className="text-lg font-medium text-gray-700"
                >
                  Weight (kg)
                </Label>
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

        {currentStep === "fit" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Preferred Fit
              </h2>
              <p className="text-gray-600 text-lg">
                How would you like your {clothingType} to fit?
              </p>
            </div>
            <RadioGroup
              value={formData.fitPreference}
              onValueChange={(value) =>
                handleInputChange("fitPreference", value)
              }
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {getFitOptions().map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <Label
                    htmlFor={`fit-${option.id}`}
                    className={`cursor-pointer border-2 rounded-xl p-8 transition-all duration-300 flex flex-col items-center space-y-4 w-full text-center transform hover:scale-105 ${
                      formData.fitPreference === option.id
                        ? "border-blue-500 bg-blue-100 shadow-lg"
                        : "border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`fit-${option.id}`}
                      className="sr-only"
                    />
                    <div className="text-3xl">
                      {clothingType === "shirt"
                        ? "👕"
                        : clothingType === "pant"
                        ? "👖"
                        : "👟"}
                    </div>
                    <span
                      className={`font-semibold text-xl ${
                        formData.fitPreference === option.id
                          ? "text-blue-800"
                          : "text-gray-800"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`text-sm ${
                        formData.fitPreference === option.id
                          ? "text-blue-700"
                          : "text-gray-600"
                      }`}
                    >
                      {option.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {currentStep === "chestType" && clothingType === "shirt" && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Chest Type & Measurement
              </h2>
              <p className="text-gray-600 text-lg">
                Choose your chest type and enter your precise measurement
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Chest Type Selection */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  What's Your Chest Type?
                </h3>
                <RadioGroup
                  value={formData.chestType}
                  onValueChange={(value) =>
                    handleInputChange("chestType", value)
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  {getChestTypes().map((option) => (
                    <div key={option.id}>
                      <Label
                        htmlFor={`chest-${option.id}`}
                        className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-300 flex flex-col items-center space-y-2 w-full transform hover:scale-105 ${
                          formData.chestType === option.id
                            ? "border-blue-500 bg-blue-100 shadow-lg"
                            : "border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                        }`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`chest-${option.id}`}
                          className="sr-only"
                        />
                        <div className="text-3xl">{option.icon}</div>
                        <span
                          className={`font-semibold text-base ${
                            formData.chestType === option.id
                              ? "text-blue-800"
                              : "text-gray-800"
                          }`}
                        >
                          {option.label}
                        </span>
                        <span
                          className={`text-xs text-center ${
                            formData.chestType === option.id
                              ? "text-blue-700"
                              : "text-gray-600"
                          }`}
                        >
                          {option.description}
                        </span>
                        <span className="text-xs text-blue-600 font-medium">
                          {option.range}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Chest Measurement */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  Enter Your Measurement
                </h3>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    How to Measure Your Chest
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-2 mb-6">
                    <li>
                      • Wrap tape measure around the fullest part of your chest
                    </li>
                    <li>• Keep the tape parallel to the floor</li>
                    <li>
                      • Breathe normally and don't pull the tape too tight
                    </li>
                    <li>
                      • Take measurement over light clothing or undergarments
                    </li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-3 font-medium">
                    📊 Expected range for {gender}: {getChestSizeRange()}
                  </p>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="chest"
                    className="text-lg font-medium text-gray-700"
                  >
                    Chest Size (cm) *
                  </Label>
                  <Input
                    id="chest"
                    type="number"
                    placeholder={gender === "male" ? "e.g. 95" : "e.g. 110"}
                    value={formData.chest}
                    onChange={(e) => handleInputChange("chest", e.target.value)}
                    className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                    min={gender === "male" ? "70" : "105"}
                    max={gender === "male" ? "105" : "150"}
                  />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">
                    ⚠️ Important Disclaimer
                  </h4>
                  <p className="text-sm text-gray-600">
                    Size recommendations are based on standard measurements.
                    Individual fit may vary depending on body shape, fabric, and
                    personal preference. We recommend trying on garments when
                    possible or consulting size guides provided by specific
                    brands.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === "measurements" && clothingType === "pant" && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Pant Measurements
              </h2>
              <p className="text-gray-600 text-lg">
                Enter your precise measurements for the perfect fit
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="space-y-3">
                <Label
                  htmlFor="waist"
                  className="text-lg font-medium text-gray-700"
                >
                  Waist (cm) *
                </Label>
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
                <Label
                  htmlFor="hip"
                  className="text-lg font-medium text-gray-700"
                >
                  Hip (cm) *
                </Label>
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
                <Label
                  htmlFor="inseam"
                  className="text-lg font-medium text-gray-700"
                >
                  Inseam (cm) *
                </Label>
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
                  <Label
                    htmlFor="hipCircumference"
                    className="text-lg font-medium text-gray-700"
                  >
                    Hip Circumference (cm) *
                  </Label>
                  <Input
                    id="hipCircumference"
                    type="number"
                    placeholder="e.g. 95"
                    value={formData.hipCircumference}
                    onChange={(e) =>
                      handleInputChange("hipCircumference", e.target.value)
                    }
                    className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === "measurements" && clothingType === "shoes" && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Shoe Measurements
              </h2>
              <p className="text-gray-600 text-lg">
                Enter your precise foot measurements for the perfect fit
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="space-y-3">
                <Label
                  htmlFor="footLength"
                  className="text-lg font-medium text-gray-700"
                >
                  Foot Length (cm) *
                </Label>
                <Input
                  id="footLength"
                  type="number"
                  placeholder="e.g. 26"
                  value={formData.footLength}
                  onChange={(e) =>
                    handleInputChange("footLength", e.target.value)
                  }
                  className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="footWidth"
                  className="text-lg font-medium text-gray-700"
                >
                  Foot Width (cm) *
                </Label>
                <Input
                  id="footWidth"
                  type="number"
                  placeholder="e.g. 10"
                  value={formData.footWidth}
                  onChange={(e) =>
                    handleInputChange("footWidth", e.target.value)
                  }
                  className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <Label
                  htmlFor="archHeight"
                  className="text-lg font-medium text-gray-700"
                >
                  Arch Height (optional)
                </Label>
                <Select
                  value={formData.archHeight}
                  onValueChange={(value) =>
                    handleInputChange("archHeight", value)
                  }
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
            </div>
          </div>
        )}

        {currentStep === "recommendation" && clothingType === "shirt" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Size Recommendation
              </h2>
              <p className="text-gray-600 text-lg">
                Based on your measurements and preferences
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Recommended Size
              </h3>
              <div className="text-6xl font-bold text-green-600 mb-4">
                {formData.recommendedSize}
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Chest: {formData.chest} cm</p>
                <p>Fit Preference: {formData.fitPreference}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="font-semibold text-blue-800 mb-3">
                📝 Size Calculation Details
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>
                  • Base size from chest measurement:{" "}
                  {getSizeFromChest(
                    parseInt(formData.chest),
                    parseFloat(formData.weight),
                    parseFloat(formData.height),
                    gender
                  )}
                </p>
                {formData.fitPreference === "loose" && (
                  <p>• +1 size for loose fit preference</p>
                )}
                {formData.fitPreference === "slim" && (
                  <p>• -1 size for slim fit preference</p>
                )}
                <p>
                  • Final recommended size:{" "}
                  <strong>{formData.recommendedSize}</strong>
                </p>
              </div>
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
            {currentStep === "recommendation"
              ? "Continue to Personal Info"
              : currentStepIndex === steps.length - 1
              ? "Continue to Personal Info"
              : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;
