import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface MeasurementFormProps {
  clothingType: 'shirt' | 'pant' | 'shoes';
  gender: 'male' | 'female';
  onSubmit: (data: any) => void;
}

const MeasurementForm = ({ clothingType, gender, onSubmit }: MeasurementFormProps) => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    morphology: '',
    // Shirt measurements
    chest: '',
    shoulder: '',
    sleeveLength: '',
    // Pant measurements
    waist: '',
    hip: '',
    inseam: '',
    // Shoe measurements
    footLength: '',
    footWidth: '',
    // Additional measurements
    neck: '',
    wrist: '',
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.height || !formData.weight || !formData.morphology) {
      toast({
        title: "Missing Information",
        description: "Please fill in all basic measurements.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const getClothingTitle = () => {
    switch (clothingType) {
      case 'shirt': return 'Shirt Measurements';
      case 'pant': return 'Pant Measurements';
      case 'shoes': return 'Shoe Measurements';
      default: return 'Measurements';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-semibold">{getClothingTitle()}</CardTitle>
        <CardDescription className="text-lg">
          Please provide your measurements for the best fit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="65"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="morphology">Body Type</Label>
              <Select value={formData.morphology} onValueChange={(value) => handleInputChange('morphology', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slim">Slim</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="athletic">Athletic</SelectItem>
                  <SelectItem value="broad">Broad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clothing-specific measurements */}
          {clothingType === 'shirt' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Shirt Specific Measurements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest (cm)</Label>
                  <Input
                    id="chest"
                    type="number"
                    placeholder="90"
                    value={formData.chest}
                    onChange={(e) => handleInputChange('chest', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shoulder">Shoulder Width (cm)</Label>
                  <Input
                    id="shoulder"
                    type="number"
                    placeholder="45"
                    value={formData.shoulder}
                    onChange={(e) => handleInputChange('shoulder', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleeveLength">Sleeve Length (cm)</Label>
                  <Input
                    id="sleeveLength"
                    type="number"
                    placeholder="60"
                    value={formData.sleeveLength}
                    onChange={(e) => handleInputChange('sleeveLength', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {clothingType === 'pant' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Pant Specific Measurements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    placeholder="75"
                    value={formData.waist}
                    onChange={(e) => handleInputChange('waist', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hip">Hip (cm)</Label>
                  <Input
                    id="hip"
                    type="number"
                    placeholder="90"
                    value={formData.hip}
                    onChange={(e) => handleInputChange('hip', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inseam">Inseam (cm)</Label>
                  <Input
                    id="inseam"
                    type="number"
                    placeholder="75"
                    value={formData.inseam}
                    onChange={(e) => handleInputChange('inseam', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {clothingType === 'shoes' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Shoe Specific Measurements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="footLength">Foot Length (cm)</Label>
                  <Input
                    id="footLength"
                    type="number"
                    placeholder="26"
                    value={formData.footLength}
                    onChange={(e) => handleInputChange('footLength', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footWidth">Foot Width (cm)</Label>
                  <Input
                    id="footWidth"
                    type="number"
                    placeholder="10"
                    value={formData.footWidth}
                    onChange={(e) => handleInputChange('footWidth', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              size="lg" 
              className="bg-gradient-primary hover:shadow-elegant transition-all duration-300"
            >
              Continue to Personal Information
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MeasurementForm;