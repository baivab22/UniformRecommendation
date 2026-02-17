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
  ZoomIn,
} from "lucide-react";
import { ImageMagnifier } from "@/components/ImageMagnifier";

// Import morphology images
import slimMorphology from "/lovable-uploads/80c23089-2483-4d72-b7f1-426457668814.png";
import averageMorphology from "/lovable-uploads/6dbd9ca7-65f9-4816-8ca5-f9fd2920c129.png";
import stockyMorphology from "/lovable-uploads/2016f981-07f4-48ca-bced-4ddae6defc0a.png";
import fullerMorphology from "/lovable-uploads/45bf5c8f-e8fc-4f75-bbfb-834bf999cc60.png";

// Pant size chart based on waist measurement and fit preference
const PANT_SIZE_CHART = {
  waist_inch: {
    tight: [
      { "min": 20, "max": 22, "size": "3XS" },
      { "min": 23, "max": 24, "size": "2XS" },
      { "min": 25, "max": 26, "size": "XS" },
      { "min": 27, "max": 29, "size": "S" },
      { "min": 30, "max": 32, "size": "M" },
      { "min": 33, "max": 35, "size": "L" },
      { "min": 36, "max": 38, "size": "XL" },
      { "min": 39, "max": 42, "size": "2XL" },
      { "min": 43, "max": 48, "size": "3XL" },
      { "min": 49, "max": 62, "size": "4XL" }
    ],
    regular: [
      { "min": 20, "max": 24, "size": "3XS" },
      { "min": 25, "max": 26, "size": "2XS" },
      { "min": 27, "max": 28, "size": "XS" },
      { "min": 29, "max": 31, "size": "S" },
      { "min": 32, "max": 36, "size": "M" },
      { "min": 37, "max": 40, "size": "L" },
      { "min": 41, "max": 45, "size": "XL" },
      { "min": 46, "max": 50, "size": "2XL" },
      { "min": 51, "max": 55, "size": "3XL" },
      { "min": 56, "max": 62, "size": "4XL" }
    ],
    loose: [
      { "min": 20, "max": 25, "size": "3XS" },
      { "min": 26, "max": 27, "size": "2XS" },
      { "min": 28, "max": 29, "size": "XS" },
      { "min": 30, "max": 32, "size": "S" },
      { "min": 33, "max": 37, "size": "M" },
      { "min": 38, "max": 42, "size": "L" },
      { "min": 43, "max": 47, "size": "XL" },
      { "min": 48, "max": 52, "size": "2XL" },
      { "min": 53, "max": 58, "size": "3XL" },
      { "min": 59, "max": 62, "size": "4XL" }
    ]
  },
  waist_cm: {
    tight: [
      { "min": 52, "max": 56, "size": "3XS" },
      { "min": 57, "max": 60, "size": "2XS" },
      { "min": 61, "max": 66, "size": "XS" },
      { "min": 67, "max": 75, "size": "S" },
      { "min": 76, "max": 85, "size": "M" },
      { "min": 86, "max": 95, "size": "L" },
      { "min": 96, "max": 105, "size": "XL" },
      { "min": 106, "max": 115, "size": "2XL" },
      { "min": 116, "max": 135, "size": "3XL" },
      { "min": 136, "max": 157, "size": "4XL" }
    ],
    regular: [
      { "min": 52, "max": 62, "size": "3XS" },
      { "min": 63, "max": 66, "size": "2XS" },
      { "min": 67, "max": 72, "size": "XS" },
      { "min": 73, "max": 79, "size": "S" },
      { "min": 80, "max": 92, "size": "M" },
      { "min": 93, "max": 102, "size": "L" },
      { "min": 103, "max": 115, "size": "XL" },
      { "min": 116, "max": 128, "size": "2XL" },
      { "min": 129, "max": 140, "size": "3XL" },
      { "min": 141, "max": 157, "size": "4XL" }
    ],
    loose: [
      { "min": 52, "max": 66, "size": "3XS" },
      { "min": 67, "max": 70, "size": "2XS" },
      { "min": 71, "max": 75, "size": "XS" },
      { "min": 76, "max": 82, "size": "S" },
      { "min": 83, "max": 96, "size": "M" },
      { "min": 97, "max": 108, "size": "L" },
      { "min": 109, "max": 120, "size": "XL" },
      { "min": 121, "max": 132, "size": "2XL" },
      { "min": 133, "max": 145, "size": "3XL" },
      { "min": 146, "max": 157, "size": "4XL" }
    ]
  }
};

// Shoe size chart based on gender and UK sizing
const SHOE_SIZE_CHART = {
  men: {
    label: "Men",
    uk_sizes: [3, 3.5, 4, 5, 6, 7, 7.5, 8, 9, 10, 10.5, 11, 12, 13]
  },
  women: {
    label: "Women",
    uk_sizes: [3, 3.5, 4, 5, 6, 6.5, 7, 8]
  }
};

type Props = {
  gender: "male" | "female";
  measurementType: "all" | "shirt" | "shoes" | "pant";
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

const MeasurementForm = ({ gender, measurementType, onSubmit }: Props) => {
  const getInitialStep = (): MeasurementStep => {
    if (measurementType === "pant") return "pantFit";
    if (measurementType === "shoes") return "shoesMeasurements";
    return "personal";
  };

  const [currentStep, setCurrentStep] = useState<MeasurementStep>(getInitialStep());
  const [skippedSteps, setSkippedSteps] = useState<Set<MeasurementStep>>(new Set());
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
    waistUnit: "cm", // Add unit toggle
    hip: "",
    inseam: "",
    thigh: "",
    pantFit: "",
    hipCircumference: "",
    // Shoes specific
    archHeight: "",
    // Female specific
    bustSize: "",
    underbustSize: "",
    // Recommended sizes
    shirtSize: "",
    pantSize: "",
    shoe_size: "",
  });

  const getSteps = (): MeasurementStep[] => {
    if (measurementType === "shirt") {
      return [
        "personal",
        "shirtMorphology",
        "shirtFit",
        "shirtChestType",
        "shirtMeasurements",
        "recommendation",
      ];
    }
    if (measurementType === "pant") {
      return [
        "pantFit",
        "pantMeasurements",
        "recommendation",
      ];
    }
    if (measurementType === "shoes") {
      return [
        "shoesMeasurements",
        "recommendation",
      ];
    }
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

    function recommendPantSize({ waistInch = null, waistCM = null, fitPreference = "regular" }) {
      // Normalize fit preference to match chart keys
      const fit = fitPreference && ["tight", "loose"].includes(fitPreference) ? fitPreference : "regular";
      
      const chart = waistInch !== null 
        ? PANT_SIZE_CHART.waist_inch[fit as keyof typeof PANT_SIZE_CHART.waist_inch]
        : PANT_SIZE_CHART.waist_cm[fit as keyof typeof PANT_SIZE_CHART.waist_cm];
      
      const measurement = waistInch !== null ? waistInch : waistCM;

      if (!measurement || !chart) return "Unknown";

      // First try to find exact match within range
      let matchedSize = chart.find(
        (entry) => measurement >= entry.min && measurement <= entry.max
      );

      if (matchedSize) return matchedSize.size;

      // If no exact match, find closest size by rounding to nearest
      let closest = chart[0];
      let minDifference = Math.abs(measurement - chart[0].min);

      for (let i = 1; i < chart.length; i++) {
        const entry = chart[i];
        const distanceToMin = Math.abs(measurement - entry.min);
        const distanceToMax = Math.abs(measurement - entry.max);
        const minDistance = Math.min(distanceToMin, distanceToMax);

        if (minDistance < minDifference) {
          minDifference = minDistance;
          closest = entry;
        }
      }

      return closest.size;
    };

    // Calculate pant size (simplified calculation based on waist)
    // const waistSize = parseInt(formData.waist);
    // let pantSize = "M";

    // if (waistSize < 30) pantSize = "S";
    // else if (waistSize > 36) pantSize = "L";
    // else pantSize = "M";

    const pantSize = recommendPantSize({
      waistInch: formData.waistUnit === "inch" ? parseInt(formData.waist) : null,
      waistCM: formData.waistUnit === "cm" ? parseInt(formData.waist) : null,
      fitPreference: formData.pantFit,
    });

    // Calculate shoe size based on foot length in CM - UK sizing
    const getUKShoeSize = (footLengthCM: number, gender: "male" | "female"): string => {
      const maleShoeChart = [
        { cm: 23, uk: "3" },
        { cm: 23.5, uk: "3.5" },
        { cm: 24, uk: "4" },
        { cm: 25, uk: "5" },
        { cm: 25.5, uk: "6" },
        { cm: 26, uk: "7" },
        { cm: 26.5, uk: "7.5" },
        { cm: 27, uk: "8" },
        { cm: 28, uk: "9" },
        { cm: 28.5, uk: "10" },
        { cm: 29.5, uk: "10.5" },
        { cm: 30, uk: "11" },
        { cm: 31, uk: "12" },
        { cm: 31.5, uk: "13" },
      ];

      const femaleShoeChart = [
        { cm: 23, uk: "3" },
        { cm: 23.5, uk: "3.5" },
        { cm: 24, uk: "4" },
        { cm: 25, uk: "5" },
        { cm: 25.5, uk: "6" },
        { cm: 26, uk: "6.5" },
        { cm: 26.5, uk: "7" },
        { cm: 27, uk: "8" },
      ];

      const chart = gender === "male" ? maleShoeChart : femaleShoeChart;
      
      // Find the closest match
      let closestSize = chart[0];
      let closestDiff = Math.abs(footLengthCM - chart[0].cm);

      for (let i = 1; i < chart.length; i++) {
        const diff = Math.abs(footLengthCM - chart[i].cm);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestSize = chart[i];
        }
      }

      return closestSize.uk;
    };

    const footLengthCM = parseFloat(formData.shoe_size);
    const recommendedShoeSize = footLengthCM ? getUKShoeSize(footLengthCM, gender) : "";

    setFormData((prev) => ({
      ...prev,
      shirtSize: adjustedShirtSize,
      pantSize: pantSize,
      shoe_size: recommendedShoeSize,
    }));
  };

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    const nextStep = steps[currentIndex + 1];

    if (nextStep === "recommendation") {
      calculateAllSizes();
    }

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      onSubmit(formData);
    }
  };

  const handleSkip = () => {
    // Record the current step as skipped (except personal step)
    if (currentStep !== "personal") {
      setSkippedSteps((prev) => new Set(prev).add(currentStep));
    }
    
    const currentIndex = steps.indexOf(currentStep);
    const nextStep = steps[currentIndex + 1];
    if (nextStep === "recommendation") {
      calculateAllSizes();
    }
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
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
        // For shoe and pant only measurements, personal info is optional
        if (measurementType === "shoes" || measurementType === "pant") {
          return true; // Allow proceeding without personal info
        }
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
        return required.every(
          (field) => formData[field as keyof typeof formData]
        );
      case "shoesMeasurements":
        return formData.shoe_size !== "";
      case "recommendation":
        return true;
      default:
        return false;
    }
  };

  const getCurrentIcon = () => {
    if (currentStep === "personal") {
      return <Ruler className="h-8 w-8 text-white" />;
    }
    if (currentStep.includes("shirt") || currentStep === "recommendation") {
      return <Shirt className="h-8 w-8 text-white" />;
    }
    if (currentStep.includes("pant")) {
      return <ShoppingBag className="h-8 w-8 text-white" />;
    }
    return <Footprints className="h-8 w-8 text-white" />;
  };

  const getCurrentTitle = () => {
    if (currentStep === "personal") {
      return "Basic Information";
    }
    if (currentStep.includes("shirt")) {
      return "Shirt Measurement";
    }
    if (currentStep.includes("pant")) {
      return "Pant Measurement";
    }
    if (currentStep.includes("shoes")) {
      return "Shoes Measurement";
    }
    return "Size Recommendations";
  };

  const getChestSizeRange = () => {
    return gender === "male" ? "70-105 cm" : "105-150 cm";
  };

  return (
    <Card className="shadow-xl w-full mx-auto border border-orange-100 bg-white rounded-2xl">
      {/* CardHeader removed as it was empty */}

      <CardContent className="space-y-7 sm:space-y-8 p-4 sm:p-8 bg-white rounded-b-2xl">
        {currentStep === "personal" && (
          <div className="text-center space-y-8">
            {(measurementType === "all" || measurementType === "shirt") && (
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
            )}
          </div>
        )}

        {currentStep === "shirtMorphology" && (
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-800">
                Body Type Selection
              </h2>
              <p className="text-sm sm:text-lg text-gray-600">
                Choose the body type that best matches your build
              </p>
            </div>
            <RadioGroup
              value={formData.morphology}
              onValueChange={(value) => handleInputChange("morphology", value)}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 max-w-5xl mx-auto px-2 sm:px-0"
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
                        style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}
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
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-800">
                Shirt Fit Preference
              </h2>
              <p className="text-sm sm:text-lg text-gray-600">
                Select how you prefer your shirt to fit
              </p>
            </div>
            <RadioGroup
              value={formData.shirtFit}
              onValueChange={(value) => handleInputChange("shirtFit", value)}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto px-2 sm:px-0"
            >
              {getShirtFitOptions().map((option) => (
                <div key={option.id} className="flex flex-col items-center">
                  <Label
                    htmlFor={`shirtFit-${option.id}`}
                    className={`cursor-pointer border-2 rounded-xl p-4 sm:p-8 transition-all duration-300 flex flex-col items-center space-y-2 sm:space-y-4 w-full text-center transform active:scale-95 sm:hover:scale-105 ${
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
                    <div className="text-2xl sm:text-3xl">👕</div>
                    <span
                      className={`font-semibold text-base sm:text-xl ${
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto px-2 sm:px-0">
              {/* Chest Type Selection */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
                  What's Your Chest Type?
                </h3>
                <RadioGroup
                  value={formData.chestType}
                  onValueChange={(value) =>
                    handleInputChange("chestType", value)
                  }
                  className="grid grid-cols-2 gap-2 sm:gap-4"
                >
                  {getChestTypes().map((option) => (
                    <div key={option.id}>
                      <Label
                        htmlFor={`chest-${option.id}`}
                        className={`cursor-pointer border-2 rounded-xl p-3 sm:p-4 transition-all duration-300 flex flex-col items-center space-y-1 sm:space-y-2 w-full transform active:scale-95 sm:hover:scale-105 ${
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
                        <div className="text-2xl sm:text-3xl">{option.icon}</div>
                        <span
                          className={`font-semibold text-sm sm:text-base ${
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

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
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
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-800">
                Final Shirt Measurements
              </h2>
              <p className="text-sm sm:text-lg text-gray-600">
                Review your measurements and explore shirt styles
              </p>
            </div>

            {/* Shirt Images Gallery with Magnify */}
            <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto px-2 sm:px-0">
              <div className="bg-purple-50 rounded-xl p-4 sm:p-8 border-2 border-purple-200">
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 flex-wrap">
                  <ZoomIn className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600" />
                  <h3 className="text-base sm:text-xl font-semibold text-gray-800">Shirt Styles (hover to zoom)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {["shirt1.png", "shirt2.png", "shirt3.png", "shirt4.png"].map((image, idx) => (
                    <div key={idx} className="space-y-2 sm:space-y-3">
                      <ImageMagnifier
                        src={`/${image.replace(/\.(jpg|jpeg|webp)$/i, '.png')}`}
                        alt={`Shirt style ${idx + 1}`}
                        magnifierHeight={180}
                        magnifierWidth={180}
                        zoomLevel={2.5}
                        containerClassName="h-48 sm:h-64 md:h-80 rounded-lg"
                        imageClassName="w-full h-full object-cover"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-700">Style {idx + 1}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurements Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 max-w-md mx-auto w-full">
                <p className="text-base sm:text-lg font-medium text-blue-800">
                  Chest: {formData.chest} cm
                </p>
                <p className="text-xs sm:text-sm text-blue-600 mt-2">
                  Morphology: {formData.morphology}
                </p>
                <p className="text-xs sm:text-sm text-blue-600">Fit: {formData.shirtFit}</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === "pantFit" && (
          <div className="flex flex-col items-center space-y-8 sm:space-y-10">
            <div className="space-y-2 sm:space-y-3 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-playfair text-gray-900 tracking-tight">
                Pant Fit Preference
              </h2>
              <p className="text-base sm:text-lg text-gray-500">
                Select your preferred pant fit style
                <span className="hidden sm:inline"> – hover or tap to zoom</span>
              </p>
            </div>
            <div className="w-full max-w-5xl">
              <RadioGroup
                value={formData.pantFit}
                onValueChange={(value) => handleInputChange("pantFit", value)}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {getPantFitOptions().map((option, idx) => {
                  const pantImages = ["pant1.png", "pant2.png", "pant3.png", "pant4.png", "pant5.png"];
                  return (
                    <div key={option.id} className="flex flex-col items-center">
                      <Label
                        htmlFor={`pantFit-${option.id}`}
                        className={`cursor-pointer border-2 rounded-2xl p-6 sm:p-8 bg-white shadow-md transition-all duration-300 flex flex-col items-center space-y-4 w-full text-center transform hover:shadow-xl active:scale-98 sm:hover:scale-105 overflow-hidden ${
                          formData.pantFit === option.id
                            ? "border-blue-600 ring-2 ring-blue-200 bg-blue-50"
                            : "border-gray-200 hover:border-blue-400"
                        }`}
                        style={{ minHeight: 340 }}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={`pantFit-${option.id}`}
                          className="sr-only"
                        />
                        <div className="w-full flex justify-center">
                          <div className="w-32 h-44 sm:w-40 sm:h-56 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center mb-2 sm:mb-3 border border-gray-100">
                            <ImageMagnifier
                              src={`/${pantImages[idx % pantImages.length]}`}
                              alt={option.label}
                              magnifierHeight={140}
                              magnifierWidth={140}
                              zoomLevel={2.4}
                              containerClassName="h-full"
                              imageClassName="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        <span
                          className={`font-bold text-lg sm:text-xl tracking-wide ${
                            formData.pantFit === option.id
                              ? "text-blue-700"
                              : "text-gray-900"
                          }`}
                        >
                          {option.label}
                        </span>
                        <span
                          className={`text-sm sm:text-base ${
                            formData.pantFit === option.id
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          {option.description}
                        </span>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
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

            {/* Pant Images Gallery with Magnify */}
            <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto px-2 sm:px-0">
              <div className="bg-amber-50 rounded-xl p-4 sm:p-8 border-2 border-amber-200">
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 flex-wrap">
                  <ZoomIn className="h-4 sm:h-5 w-4 sm:w-5 text-amber-600" />
                  <h3 className="text-base sm:text-xl font-semibold text-gray-800">Pant Styles (hover to zoom)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {["pant1.png", "pant2.png", "pant3.png", "pant4.png", "pant5.png"].slice(0, 3).map((image, idx) => (
                    <div key={idx} className="space-y-2 sm:space-y-3">
                      <ImageMagnifier
                        src={`/${image.replace(/\.(jpg|jpeg|webp)$/i, '.png')}`}
                        alt={`Pant style ${idx + 1}`}
                        magnifierHeight={180}
                        magnifierWidth={180}
                        zoomLevel={2.5}
                        containerClassName="h-48 sm:h-64 md:h-80 rounded-lg"
                        imageClassName="w-full h-full object-cover"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-700">Style {idx + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Measurement Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="waist"
                    className="text-lg font-medium text-gray-700"
                  >
                    Waist *
                  </Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange("waistUnit", "cm")}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        formData.waistUnit === "cm"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      CM
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("waistUnit", "inch")}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        formData.waistUnit === "inch"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      INCH
                    </button>
                  </div>
                </div>
                <Input
                  id="waist"
                  type="number"
                  placeholder={formData.waistUnit === "cm" ? "e.g. 82" : "e.g. 32"}
                  value={formData.waist}
                  onChange={(e) => handleInputChange("waist", e.target.value)}
                  className="text-center text-lg h-14 border-2 border-blue-200 focus:border-blue-500"
                  step="0.5"
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
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-800">
                Shoe Size
              </h2>
              <p className="text-sm sm:text-lg text-gray-600">
                Select your shoe size (UK) - view styles below
              </p>
            </div>

            {/* Shoe Images Gallery with Magnify */}
            <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto px-2 sm:px-0">
              <div className="bg-green-50 rounded-xl p-4 sm:p-8 border-2 border-green-200">
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 flex-wrap">
                  <ZoomIn className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
                  <h3 className="text-base sm:text-xl font-semibold text-gray-800">Shoe Styles (hover to zoom)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                  {["shoes1.png", "shoes2.png"].map((image, idx) => (
                    <div key={idx} className="space-y-2 sm:space-y-3">
                      <ImageMagnifier
                        src={`/${image.replace(/\.(jpg|jpeg|webp)$/i, '.png')}`}
                        alt={`Shoe style ${idx + 1}`}
                        magnifierHeight={200}
                        magnifierWidth={200}
                        zoomLevel={2.5}
                        containerClassName="h-64 sm:h-80 md:h-96 rounded-lg"
                        imageClassName="w-full h-full object-cover"
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-700">Style {idx + 1}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3 sm:space-y-4">
                <p className="text-center text-gray-700 font-medium text-sm sm:text-base">Choose your UK size:</p>
                <div className="max-w-2xl mx-auto">
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3">
                    {(gender === "male" ? SHOE_SIZE_CHART.men.uk_sizes : SHOE_SIZE_CHART.women.uk_sizes).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleInputChange("shoe_size", size.toString())}
                        className={`py-2 sm:py-3 px-1.5 sm:px-2 rounded-lg font-semibold transition-all duration-200 transform active:scale-95 sm:hover:scale-110 text-xs sm:text-sm ${
                          formData.shoe_size === size.toString()
                            ? "bg-green-500 text-white shadow-lg scale-100 sm:scale-105"
                            : "bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === "recommendation" && (
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <CheckCircle className="h-12 sm:h-16 w-12 sm:w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-gray-800">
                Size Recommendations
              </h2>
              <p className="text-sm sm:text-lg text-gray-600">
                Based on your measurements and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto px-2 sm:px-0">
              {(measurementType === "all" || measurementType === "shirt") &&
                !skippedSteps.has("shirtMeasurements") && (
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 sm:p-6 shadow-md">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      Shirt Size
                    </h3>
                    <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-3 sm:mb-4">
                      {formData.shirtSize || "—"}
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                      <p>Chest: {formData.chest || "—"} cm</p>
                      <p>Fit: {formData.shirtFit || "—"}</p>
                    </div>
                  </div>
                )}

              {(measurementType === "all" || measurementType === "pant") &&
                !skippedSteps.has("pantMeasurements") && (
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 sm:p-6 shadow-md">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      Pant Size
                    </h3>
                    <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-3 sm:mb-4">
                      {formData.pantSize || "—"}
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                      <p>Waist: {formData.waist || "—"} {formData.waistUnit}</p>
                      <p>Fit: {formData.pantFit || "—"}</p>
                    </div>
                  </div>
                )}

              {(measurementType === "all" || measurementType === "shoes") &&
                !skippedSteps.has("shoesMeasurements") && (
                  <div className="bg-orange-100 border-2 border-orange-200 rounded-xl p-4 sm:p-6 shadow-md">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      Shoe Size (UK)
                    </h3>
                    <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-3 sm:mb-4">
                      {formData.shoe_size || "—"}
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                      <p>{gender === "male" ? "Men" : "Women"} size</p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}

        <div className="flex flex-row flex-wrap justify-between items-center pt-6 sm:pt-8 gap-3 sm:gap-4 border-t border-blue-100 w-full">
          {currentStepIndex > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-black px-3 py-2 text-sm min-w-fit"
            >
              <ArrowLeft className="h-3 sm:h-4 w-3 sm:w-4" />
              Back
            </Button>
          )}

          {currentStep !== "recommendation" && (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="px-3 py-2 text-xs text-gray-500 hover:text-white min-w-fit"
            >
              Skip
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm min-w-fit"
          >
            {currentStepIndex === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;
