import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, UserCheck, Shirt, ShoppingBag, Footprints } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MeasurementForm from "@/components/MeasurementForm";

const StudentForm = () => {
  const [step, setStep] = useState<'gender' | 'clothing' | 'measurements'>('gender');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<'shirt' | 'pant' | 'shoes' | null>(null);
  const [measurementData, setMeasurementData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setStep('clothing');
  };

  const handleClothingSelect = (clothing: 'shirt' | 'pant' | 'shoes') => {
    setSelectedClothing(clothing);
    setStep('measurements');
  };

  const handleMeasurementSubmit = (data: any) => {
    // Store measurement data and pass to personal info
    const completeData = {
      gender: selectedGender,
      clothingType: selectedClothing,
      ...data
    };
    setMeasurementData(completeData);
    
    // Store in localStorage temporarily
    localStorage.setItem('measurementData', JSON.stringify(completeData));
    
    toast({
      title: "Measurements Recorded",
      description: "Now please provide your personal information.",
    });
    
    navigate('/personal-info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center space-x-4">
          <Badge variant={step === 'gender' ? 'default' : selectedGender ? 'secondary' : 'outline'}>
            1. Gender
          </Badge>
          <Badge variant={step === 'clothing' ? 'default' : selectedClothing ? 'secondary' : 'outline'}>
            2. Clothing
          </Badge>
          <Badge variant={step === 'measurements' ? 'default' : 'outline'}>
            3. Measurements
          </Badge>
        </div>

        {step === 'gender' && (
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-semibold">Welcome!</CardTitle>
              <CardDescription className="text-lg">Please select your gender to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-32 flex flex-col gap-4 hover:shadow-elegant transition-all duration-300"
                  onClick={() => handleGenderSelect('male')}
                >
                  <User className="h-12 w-12" />
                  <span className="text-xl font-medium">Male</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-32 flex flex-col gap-4 hover:shadow-elegant transition-all duration-300"
                  onClick={() => handleGenderSelect('female')}
                >
                  <UserCheck className="h-12 w-12" />
                  <span className="text-xl font-medium">Female</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'clothing' && (
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-semibold">Choose Clothing Type</CardTitle>
              <CardDescription className="text-lg">What would you like to get measured for?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-32 flex flex-col gap-4 hover:shadow-elegant transition-all duration-300"
                  onClick={() => handleClothingSelect('shirt')}
                >
                  <Shirt className="h-12 w-12" />
                  <span className="text-xl font-medium">Shirt</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-32 flex flex-col gap-4 hover:shadow-elegant transition-all duration-300"
                  onClick={() => handleClothingSelect('pant')}
                >
                  <ShoppingBag className="h-12 w-12" />
                  <span className="text-xl font-medium">Pants</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-32 flex flex-col gap-4 hover:shadow-elegant transition-all duration-300"
                  onClick={() => handleClothingSelect('shoes')}
                >
                  <Footprints className="h-12 w-12" />
                  <span className="text-xl font-medium">Shoes</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'measurements' && selectedClothing && (
          <MeasurementForm
            clothingType={selectedClothing}
            gender={selectedGender!}
            onSubmit={handleMeasurementSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default StudentForm;