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
  Shirt,
  ShoppingBag,
  Footprints,
  CheckCircle,
} from "lucide-react";

// Import morphology images
import slimMorphology from "/lovable-uploads/80c23089-2483-4d72-b7f1-426457668814.png";
import averageMorphology from "/lovable-uploads/6dbd9ca7-65f9-4816-8ca5-f9fd2920c129.png";
import stockyMorphology from "/lovable-uploads/2016f981-07f4-48ca-bced-4ddae6defc0a.png";
import fullerMorphology from "/lovable-uploads/45bf5c8f-e8fc-4f75-bbfb-834bf999cc60.png";

type Props = {
  gender: "male" | "female";
  onSubmit: (data: any) => void;
};

type MeasurementStep =
  | "personal"
  | "shirtMorphology"
  | "shirtFit"
  | "shirtChestType"
  | "shirtMeasurements"
  | "pantFit"
  | "pantMeasurements"
  | "shoesMeasurements"
  | "recommendation";

const MeasurementForm = ({ gender, onSubmit }: Props) => {
  const [currentStep, setCurrentStep] = useState<MeasurementStep>("personal");
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    morphology: "",
    // Shirt specific
    chest: "",
    chestType: "",
    shirtFit: "",
    // Pant specific
    waist: "",
    hip: "",
    inseam: "",
    thigh: "",
    pantFit: "",
    hipCircumference: "",
    // Shoes specific
    // footLength: "",
    // footWidth: "",
    archHeight: "",
    // Female specific
    bustSize: "",
    underbustSize: "",
    // Recommended sizes
    shirtSize: "",
    pantSize: "",
    shoeSize: "",
  });

  const getSteps = (): MeasurementStep[] => {
    return [
      "personal",
      "shirtMorphology",
      "shirtFit",
      "shirtChestType",
      "shirtMeasurements",
      "pantFit",
      "pantMeasurements",
      "shoesMeasurements",
      "recommendation",
    ];
  };

  const steps = getSteps();
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const getSizeFromChest = (
    chestSize: number,
    weight: number,
    height: number,
    gender: "male" | "female",
    morphology?: string
  ): string => {
    console.log(chestSize, weight, height, gender, "all data value");

    const sizeChart = [
      { maleSize: "3XS", min: 70, max: 75, femaleSize: "L" },
      { maleSize: "2XS", min: 75, max: 80, femaleSize: "XL" },
      { maleSize: "XS", min: 80, max: 85, femaleSize: "2XL" },
      { maleSize: "S", min: 85, max: 95, femaleSize: "3XL" },
      { maleSize: "M", min: 95, max: 105, femaleSize: "4XL" },
    ];

    // Find size index based on chestSize
    let index = sizeChart.findIndex(
      (size) => chestSize >= size.min && chestSize <= size.max
    );

    // Fallback if chestSize is out of defined range
    if (index === -1) index = chestSize < 70 ? 0 : sizeChart.length - 1;

    // Adjust size if user selected the larger morphology (last option)
    if (morphology === "large") {
      index = Math.min(index + 1, sizeChart.length - 1); // avoid overflow
    }

    // Return size based on gender
    return gender === "male"
      ? sizeChart[index].maleSize
      : sizeChart[index].femaleSize;
  };

  const getAdjustedSize = (baseSize: string, fitPreference: string): string => {
    const sizes =
      gender === "male"
        ? ["3XS", "2XS", "XS", "S", "M"]
        : ["L", "XL", "2XL", "3XL", "4XL"];

    const currentIndex = sizes.indexOf(baseSize);

    // Adjust for fit preference
    let adjustment = 0;
    if (fitPreference === "loose") adjustment += 1;

    const newIndex = Math.max(
      0,
      Math.min(sizes.length - 1, currentIndex + adjustment)
    );
    return sizes[newIndex];
  };

  const getShirtFitOptions = () => {
    return [
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
  };

  const getPantFitOptions = () => {
    if (gender === "female") {
      return [
        { id: "skinny", label: "Skinny", description: "Very tight fit" },
        { id: "slim", label: "Slim", description: "Close-fitting" },
        { id: "straight", label: "Straight", description: "Classic fit" },
        { id: "bootcut", label: "Bootcut", description: "Slightly flared" },
        { id: "wide", label: "Wide Leg", description: "Loose and flowing" },
      ];
    }

    return [
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

  const calculateAllSizes = () => {
    // Calculate shirt size
    const chestSize = parseInt(formData.chest);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const baseShirtSize = getSizeFromChest(
      chestSize,
      weight,
      height,
      gender,
      formData.morphology
    );
    const adjustedShirtSize = getAdjustedSize(baseShirtSize, formData.shirtFit);

    function recommendPantSize({ heightInch = null, waistInch = null }) {
      console.log(heightInch, waistInch, "inch values");

      const sizeChart = [
        { size: "3XS", waistMin: 20, waistMax: 24, length: 39 },
        { size: "2XS", waistMin: 21, waistMax: 25, length: 40 },
        { size: "XS", waistMin: 22, waistMax: 26, length: 41 },
        { size: "S", waistMin: 26, waistMax: 31, length: 42 },
        { size: "M", waistMin: 32, waistMax: 36, length: 43 },
        { size: "L", waistMin: 37, waistMax: 40, length: 44 },
        { size: "XL", waistMin: 41, waistMax: 45, length: 45 },
        { size: "2XL", waistMin: 45, waistMax: 50, length: 46 },
        { size: "3XL", waistMin: 51, waistMax: 55, length: 46 },
        { size: "4XL", waistMin: 56, waistMax: 62, length: 46 },
      ];

      if (!waistInch) return "Unknown";

      let matchedSize = sizeChart.find(
        (entry) => waistInch >= entry.waistMin && waistInch <= entry.waistMax
      );

      return matchedSize ? matchedSize.size : "Custom";
    }

    // Calculate pant size (simplified calculation based on waist)
    // const waistSize = parseInt(formData.waist);
    // let pantSize = "M";

    // if (waistSize < 30) pantSize = "S";
    // else if (waistSize > 36) pantSize = "L";
    // else pantSize = "M";

    const pantSize = recommendPantSize({
      heightInch: height,
      waistInch: parseInt(formData.waist),
    });

    // Calculate shoe size (simplified calculation based on foot length)
    const footLength = parseFloat(formData.shoeSize);
    let shoeSize = "42";
    // if (footLength < 24) shoeSize = "38";
    // else if (footLength < 25) shoeSize = "39";
    // else if (footLength < 26) shoeSize = "40";
    // else if (footLength < 27) shoeSize = "41";
    // else if (footLength < 28) shoeSize = "42";
    // else if (footLength < 29) shoeSize = "43";
    // else shoeSize = "44";

    setFormData((prev) => ({
      ...prev,
      shirtSize: adjustedShirtSize,
      pantSize: pantSize,
      shoeSize: formData.shoeSize,
    }));
  };

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);

    if (currentStep === "shoesMeasurements") {
      calculateAllSizes();
    }

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
      case "shirtMorphology":
        return formData.morphology !== "";
      case "shirtFit":
        return formData.shirtFit !== "";
      case "shirtChestType":
        return formData.chestType !== "" && formData.chest !== "";
      case "shirtMeasurements":
        return formData.chest !== "";
      case "pantFit":
        return formData.pantFit !== "";
      case "pantMeasurements":
        const required = ["waist"];
        // if (gender === "female") {
        //   required.push("hipCircumference");
        // }
        return required.every(
          (field) => formData[field as keyof typeof formData]
        );
      case "shoesMeasurements":
      // return formData.footLength && formData.footWidth;
      case "recommendation":
        return true;
      default:
        return false;
    }
  };

  const getCurrentIcon = () => {
    if (
      currentStep.includes("shirt") ||
      currentStep === "personal" ||
      currentStep === "recommendation"
    ) {
      return <Shirt className="h-8 w-8 text-white" />;
    } else if (currentStep.includes("pant")) {
      return <ShoppingBag className="h-8 w-8 text-white" />;
    } else {
      return <Footprints className="h-8 w-8 text-white" />;
    }
  };

  const getCurrentTitle = () => {
    if (currentStep.includes("shirt") || currentStep === "personal") {
      return "Shirt Measurement";
    } else if (currentStep.includes("pant")) {
      return "Pant Measurement";
    } else if (currentStep.includes("shoes")) {
      return "Shoes Measurement";
    } else {
      return "Size Recommendations";
    }
  };

  const getChestSizeRange = () => {
    return gender === "male" ? "70-105 cm" : "105-150 cm";
  };

  return (
    <Card className="shadow-xl max-w-3xl mx-auto border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
          {getCurrentIcon()}
        </div>
        <CardTitle className="text-2xl font-playfair text-gray-800">
          {getCurrentTitle()}
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

        {currentStep === "shirtMorphology" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Your Morphology
              </h2>
              <p className="text-gray-600 text-lg">
                Possible shapes for your height & weight:
              </p>
            </div>
            <RadioGroup
              value={formData.morphology}
              onValueChange={(value) => handleInputChange("morphology", value)}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  id: "slim",
                  label: "Slim",
                  description: "Lean build",
                  image: slimMorphology,
                },
                {
                  id: "athletic",
                  label: "Athletic",
                  description: "Muscular build",
                  image: averageMorphology,
                },
                {
                  id: "average",
                  label: "Average",
                  description: "Standard build",
                  image: stockyMorphology,
                },
                {
                  id: "large",
                  label: "Fuller",
                  description: "Broader build",
                  image: fullerMorphology,
                },
              ].map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <Label
                    htmlFor={`morphology-${option.id}`}
                    className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 flex flex-col items-center space-y-4 w-full text-center transform hover:scale-105 ${
                      formData.morphology === option.id
                        ? "border-blue-500 bg-blue-100 shadow-lg"
                        : "border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`morphology-${option.id}`}
                      className="sr-only"
                    />
                    <div className="w-24 h-32 border border-gray-300 rounded bg-white flex items-center justify-center p-2">
                      <img
                        src={option.image}
                        alt={`${option.label} body shape`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span
                      className={`font-semibold text-lg ${
                        formData.morphology === option.id
                          ? "text-blue-800"
                          : "text-gray-800"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`text-sm ${
                        formData.morphology === option.id
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

        {currentStep === "shirtFit" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Shirt Fit Preference
              </h2>
              <p className="text-gray-600 text-lg">
                How would you like your shirt to fit?
              </p>
            </div>
            <RadioGroup
              value={formData.shirtFit}
              onValueChange={(value) => handleInputChange("shirtFit", value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {getShirtFitOptions().map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <Label
                    htmlFor={`shirtFit-${option.id}`}
                    className={`cursor-pointer border-2 rounded-xl p-8 transition-all duration-300 flex flex-col items-center space-y-4 w-full text-center transform hover:scale-105 ${
                      formData.shirtFit === option.id
                        ? "border-blue-500 bg-blue-100 shadow-lg"
                        : "border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`shirtFit-${option.id}`}
                      className="sr-only"
                    />
                    <div className="text-3xl">👕</div>
                    <span
                      className={`font-semibold text-xl ${
                        formData.shirtFit === option.id
                          ? "text-blue-800"
                          : "text-gray-800"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`text-sm ${
                        formData.shirtFit === option.id
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

        {currentStep === "shirtChestType" && (
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
              </div>
            </div>
          </div>
        )}

        {currentStep === "shirtMeasurements" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Final Shirt Measurements
              </h2>
              <p className="text-gray-600 text-lg">
                Review your chest measurement
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-lg font-medium text-blue-800">
                Chest: {formData.chest} cm
              </p>
              <p className="text-sm text-blue-600 mt-2">
                Morphology: {formData.morphology}
              </p>
              <p className="text-sm text-blue-600">Fit: {formData.shirtFit}</p>
            </div>
          </div>
        )}

        {currentStep === "pantFit" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Pant Fit Preference
              </h2>
              <p className="text-gray-600 text-lg">
                How would you like your pants to fit?
              </p>
            </div>
            <RadioGroup
              value={formData.pantFit}
              onValueChange={(value) => handleInputChange("pantFit", value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {getPantFitOptions().map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <Label
                    htmlFor={`pantFit-${option.id}`}
                    className={`cursor-pointer border-2 rounded-xl p-8 transition-all duration-300 flex flex-col items-center space-y-4 w-full text-center transform hover:scale-105 ${
                      formData.pantFit === option.id
                        ? "border-blue-500 bg-blue-100 shadow-lg"
                        : "border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`pantFit-${option.id}`}
                      className="sr-only"
                    />
                    <div className="text-3xl">👖</div>
                    <span
                      className={`font-semibold text-xl ${
                        formData.pantFit === option.id
                          ? "text-blue-800"
                          : "text-gray-800"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`text-sm ${
                        formData.pantFit === option.id
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

        {currentStep === "pantMeasurements" && (
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
              {/* <div className="space-y-3">
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
              </div> */}
              {/* {gender === "female" && (
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
              )} */}
            </div>
          </div>
        )}

        {currentStep === "shoesMeasurements" && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Shoe Measurements
              </h2>
              <p className="text-gray-600 text-lg">
                Enter your precise foot measurements for the perfect fit
              </p>

              <div className="space-y-3">
                <Label
                  htmlFor="waist"
                  className="text-lg font-medium text-gray-700"
                >
                  Shoes Size
                </Label>
                <Input
                  id="shoeSize"
                  type="number"
                  placeholder="e.g. 32"
                  // value={formData.shoeSize}
                  onChange={(e) =>
                    handleInputChange("shoeSize", e.target.value)
                  }
                  className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === "recommendation" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-3xl font-bold font-playfair text-gray-800">
                Size Recommendations
              </h2>
              <p className="text-gray-600 text-lg">
                Based on all your measurements and preferences
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Shirt Recommendation */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <Shirt className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Shirt Size
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-4">
                  {formData.shirtSize}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Chest: {formData.chest} cm</p>
                  <p>Fit: {formData.shirtFit}</p>
                </div>
              </div>

              {/* Pant Recommendation */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Pant Size
                </h3>
                <div className="text-4xl font-bold text-purple-600 mb-4">
                  {formData.pantSize}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Waist: {formData.waist} cm</p>
                  <p>Hip: {formData.hip} cm</p>
                </div>
              </div>

              {/* Shoe Recommendation */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <Footprints className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Shoe Size
                </h3>
                <div className="text-4xl font-bold text-orange-600 mb-4">
                  {formData.shoeSize}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  {/* <p>Length: {formData.footLength} cm</p>
                  <p>Width: {formData.footWidth} cm</p> */}
                </div>
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
