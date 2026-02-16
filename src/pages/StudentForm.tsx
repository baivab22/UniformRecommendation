import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, UserCheck, Building2, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MeasurementForm from "@/components/MeasurementForm";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { API_URL } from "@/lib/supabase";

type MeasurementType = "all" | "shirt" | "shoes" | "pant";

interface Campus {
  id: string;
  name: string;
  city: string;
  logo_url?: string;
  address?: string;
}

interface College {
  id: string;
  name: string;
  logo_url?: string;
  campuses: Campus[];
}

const StudentForm = () => {
  const [step, setStep] = useState<'college' | 'campus' | 'gender' | 'type' | 'measurements'>('college');
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [maleImgLoaded, setMaleImgLoaded] = useState(false);
  const [femaleImgLoaded, setFemaleImgLoaded] = useState(false);
  const [selectedMeasurementType, setSelectedMeasurementType] = useState<MeasurementType | null>(null);
  const [measurementData, setMeasurementData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/colleges`);
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load colleges. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCollegeSelect = (college: College) => {
    setSelectedCollege(college);
    if (college.campuses && college.campuses.length > 0) {
      setStep('campus');
    } else {
      // If no campuses, skip to gender
      setStep('gender');
    }
  };

  const handleCampusSelect = (campus: Campus) => {
    setSelectedCampus(campus);
    setStep('gender');
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
    setStep('type');
  };

  const handleMeasurementTypeSelect = (type: MeasurementType) => {
    setSelectedMeasurementType(type);
    setStep('measurements');
  };

  const handleMeasurementSubmit = (data: any) => {
    // Store measurement data and pass to personal info
    const completeData = {
      gender: selectedGender,
      college: selectedCollege?.name,
      campus: selectedCampus?.name,
      campus_city: selectedCampus?.city,
      ...data
    };
    setMeasurementData(completeData);
    
    // Store in localStorage temporarily
    localStorage.setItem('measurementData', JSON.stringify(completeData));
    
    toast({
      title: "All Measurements Recorded",
      description: "Now please provide your personal information.",
    });
    
    navigate('/personal-info');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <div className="flex-grow px-3 py-4 sm:p-4 md:p-6">
        <div className="container mx-auto max-w-7xl px-2 sm:px-4">
          {/* Page Intro */}
          <div className="mb-6 sm:mb-8 grid gap-4 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Get Your Perfect Fit
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                A quick, guided sizing experience that takes just a couple of minutes.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">2 Minutes</Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">Accurate Results</Badge>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">No Tools Needed</Badge>
              </div>
            </div>
            <Card className="border-blue-100 bg-white/80 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Tips</CardTitle>
                <CardDescription>For the best sizing results</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Stand straight and stay relaxed</li>
                  <li>Measure over light clothing</li>
                  <li>Use a soft tape if available</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Progress indicator */}
          <div className="mb-6 sm:mb-8 rounded-xl border border-blue-100 bg-white/80 p-3 sm:p-4 shadow-sm overflow-x-auto">
            <div className="flex flex-nowrap sm:flex-wrap items-center justify-center gap-1 sm:gap-3 min-w-min sm:min-w-0">
              <Badge variant={step === 'college' ? 'default' : selectedCollege ? 'secondary' : 'outline'} className={`${step === 'college' ? 'bg-primary text-primary-foreground' : ''} text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1`}>
                <span className="hidden sm:inline">1. College</span>
                <span className="sm:hidden">1</span>
              </Badge>
              <Badge variant={step === 'campus' ? 'default' : selectedCampus ? 'secondary' : 'outline'} className={`${step === 'campus' ? 'bg-primary text-primary-foreground' : ''} text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1`}>
                <span className="hidden sm:inline">2. Campus</span>
                <span className="sm:hidden">2</span>
              </Badge>
              <Badge variant={step === 'gender' ? 'default' : selectedGender ? 'secondary' : 'outline'} className={`${step === 'gender' ? 'bg-primary text-primary-foreground' : ''} text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1`}>
                <span className="hidden sm:inline">3. Gender</span>
                <span className="sm:hidden">3</span>
              </Badge>
              <Badge variant={step === 'type' ? 'default' : selectedMeasurementType ? 'secondary' : 'outline'} className={`${step === 'type' ? 'bg-primary text-primary-foreground' : ''} text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1`}>
                <span className="hidden sm:inline">4. Items</span>
                <span className="sm:hidden">4</span>
              </Badge>
              <Badge variant={step === 'measurements' ? 'default' : 'outline'} className={`${step === 'measurements' ? 'bg-primary text-primary-foreground' : ''} text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1`}>
                <span className="hidden sm:inline">5. Measure</span>
                <span className="sm:hidden">5</span>
              </Badge>
            </div>
          </div>

          {/* College Selection */}
          {step === 'college' && (
            <Card className="shadow-lg border-blue-100 mx-auto">
              <CardHeader className="text-center bg-white p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Select Your College
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-gray-600">Choose your college to continue</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-4">
                    <Loader2 className="h-10 sm:h-12 w-10 sm:w-12 animate-spin text-blue-600" />
                    <p className="text-sm sm:text-base text-gray-600">Loading colleges...</p>
                  </div>
                ) : colleges.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <Building2 className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-sm sm:text-lg text-gray-600">No colleges available at the moment.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-8 rounded-2xl bg-white/80 border border-blue-100 shadow-sm">
                      {colleges.map((college) => (
                        <Card
                          key={college.id}
                          className="cursor-pointer bg-white border-2 border-blue-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group active:scale-97 rounded-2xl flex flex-col items-center py-8 px-4 sm:px-6"
                          onClick={() => handleCollegeSelect(college)}
                        >
                          <div className="flex flex-col items-center gap-4">
                            {college.logo_url ? (
                              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-4 ring-primary/20 group-hover:ring-blue-400 transition-all flex-shrink-0 shadow-md">
                                <img 
                                  src={college.logo_url} 
                                  alt={college.name} 
                                  className="w-24 sm:w-28 h-24 sm:h-28 object-cover rounded-full border-4 border-white shadow"
                                />
                              </div>
                            ) : (
                              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary/20 group-hover:ring-blue-400 transition-all flex-shrink-0 shadow-md">
                                <Building2 className="h-12 sm:h-16 w-12 sm:w-16 text-white" />
                              </div>
                            )}
                            <div className="space-y-1 max-w-full">
                              <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {college.name}
                              </h3>
                              <div className="text-sm sm:text-base text-gray-500">
                                <span>{college.campuses?.length || 0} Campus{college.campuses?.length !== 1 ? 'es' : ''}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                    {/* No Change College button in college tab */}
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Campus Selection */}
          {step === 'campus' && selectedCollege && (
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="text-center bg-white p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
                  {selectedCollege.logo_url ? (
                    <img 
                      src={selectedCollege.logo_url} 
                      alt={selectedCollege.name} 
                      className="w-12 sm:w-14 h-12 sm:h-14 object-contain rounded-md"
                    />
                  ) : (
                    <Building2 className="h-9 sm:h-10 w-9 sm:w-10 text-blue-600" />
                  )}
                  <CardTitle className="text-lg sm:text-2xl font-semibold text-gray-900">
                    {selectedCollege.name}
                  </CardTitle>
                </div>
                <CardDescription className="text-base sm:text-lg text-gray-600">Select</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                  {selectedCollege.campuses.map((campus) => (
                    <Card
                      key={campus.id}
                      className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 group active:scale-95 sm:hover:scale-105"
                      onClick={() => handleCampusSelect(campus)}
                    >
                      <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          {campus.logo_url ? (
                            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all flex-shrink-0">
                              <img 
                                src={campus.logo_url} 
                                alt={campus.name} 
                                className="w-12 sm:w-16 h-12 sm:h-16 object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg bg-primary flex items-center justify-center ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all flex-shrink-0">
                              <Building2 className="h-7 sm:h-8 w-7 sm:w-8 text-white" />
                            </div>
                          )}
                          <div className="flex-1 space-y-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                              {campus.name}
                            </h3>
                            <div className="text-xs sm:text-sm text-gray-600">
                              <span className="line-clamp-1">{campus.city}</span>
                            </div>
                            {campus.address && (
                              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{campus.address}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCollege(null);
                      setStep('college');
                    }}
                    className="text-xs sm:text-sm w-auto px-4"
                  >
                    Change College
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 'gender' && (
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="text-center bg-white p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900">Select</CardTitle>
                <CardDescription className="text-base sm:text-lg text-gray-600">Choose one to continue</CardDescription>
                {selectedCampus && (
                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                    <span className="line-clamp-2">{selectedCollege?.name} - {selectedCampus.name}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <button
                    type="button"
                    aria-label="Male"
                    onClick={() => handleGenderSelect('male')}
                    className={`flex items-center justify-center h-40 sm:h-48 border-2 rounded-xl transition-all focus:outline-none ${selectedGender === 'male' ? 'ring-4 ring-primary/60 bg-primary/10' : 'border-gray-200 hover:shadow-lg'}`}
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src="/male.png"
                        alt="Male"
                        onLoad={() => setMaleImgLoaded(true)}
                        onError={() => setMaleImgLoaded(false)}
                        className={`${maleImgLoaded ? '' : 'hidden'} h-24 sm:h-28 w-auto object-contain`}
                      />
                      {!maleImgLoaded && <User className="h-24 sm:h-28 w-auto text-blue-600" />}
                      <span className="sr-only">Male</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    aria-label="Female"
                    onClick={() => handleGenderSelect('female')}
                    className={`flex items-center justify-center h-40 sm:h-48 border-2 rounded-xl transition-all focus:outline-none ${selectedGender === 'female' ? 'ring-4 ring-primary/60 bg-primary/10' : 'border-gray-200 hover:shadow-lg'}`}
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src="/female.png"
                        alt="Female"
                        onLoad={() => setFemaleImgLoaded(true)}
                        onError={() => setFemaleImgLoaded(false)}
                        className={`${femaleImgLoaded ? '' : 'hidden'} h-24 sm:h-28 w-auto object-contain`}
                      />
                      {!femaleImgLoaded && <UserCheck className="h-24 sm:h-28 w-auto" />}
                      <span className="sr-only">Female</span>
                    </div>
                  </button>
                </div>
                {/* Back Button below gender icons */}
                <div className="flex justify-center mt-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedGender(null);
                      if (selectedCollege && selectedCollege.campuses.length > 0) {
                        setStep('campus');
                      } else {
                        setStep('college');
                      }
                    }}
                    className="text-xs sm:text-sm"
                  >
                    ← Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 'type' && (
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="text-center bg-white p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-3xl font-semibold text-gray-900">What Do You Want to Measure?</CardTitle>
                <CardDescription className="text-sm sm:text-lg text-gray-600 mt-1 sm:mt-2">Choose what items you need to measure</CardDescription>
                {selectedCampus && (
                  <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-center justify-center gap-1 text-xs sm:text-sm text-gray-600">
                    <Building2 className="h-3 sm:h-4 w-3 sm:w-4 flex-shrink-0" />
                    <span className="line-clamp-2">{selectedCollege?.name} - {selectedCampus.name}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-3 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
                  {/* All Items */}
                  <Card
                    className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 group overflow-hidden active:scale-95 sm:hover:scale-105"
                    onClick={() => handleMeasurementTypeSelect("all")}
                  >
                    <CardContent className="p-0 h-64 sm:h-72 flex flex-col">
                      <div className="relative h-40 sm:h-56 bg-blue-50 flex items-center justify-center overflow-hidden transition-colors px-2">
                        <div className="flex gap-2 sm:gap-4 items-center justify-center">
                          <img 
                            src="/all.jpg" 
                            alt="Shirt" 
                            className="h-24 sm:h-32 w-auto object-contain group-hover:scale-110 transition-transform"
                          />
                     
                        </div>
                      </div>
                        <div className="flex-1 flex flex-col items-center justify-center px-3 py-3 sm:px-4 sm:py-4 text-center">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-4">All Items</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 line-clamp-2">Shirt, Pant & Shoes</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shirt */}
                  <Card
                    className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500 group overflow-hidden active:scale-95 sm:hover:scale-105"
                    onClick={() => handleMeasurementTypeSelect("shirt")}
                  >
                    <CardContent className="p-0 h-64 sm:h-72 flex flex-col">
                      <div className="relative h-40 sm:h-56 bg-purple-50 flex items-center justify-center overflow-hidden transition-colors px-2">
                        <img 
                          src="/shirt1.png" 
                          alt="Shirt" 
                          className="h-28 sm:h-40 w-auto object-contain group-hover:scale-110 transition-transform drop-shadow-md"
                          loading="lazy"
                        />
                      </div>
                        <div className="flex-1 flex flex-col items-center justify-center px-3 py-3 sm:px-4 sm:py-4 text-center">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-4">Shirt</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Measure for shirts</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pant */}
                  <Card
                    className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 group overflow-hidden active:scale-95 sm:hover:scale-105"
                    onClick={() => handleMeasurementTypeSelect("pant")}
                  >
                    <CardContent className="p-0 h-64 sm:h-72 flex flex-col">
                      <div className="relative h-40 sm:h-56 bg-amber-50 flex items-center justify-center overflow-hidden transition-colors px-2">
                        <img 
                          src="/pant2.png" 
                          alt="Pant" 
                          className="h-28 sm:h-40 w-auto object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                        <div className="flex-1 flex flex-col items-center justify-center px-3 py-3 sm:px-4 sm:py-4 text-center">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-4">Pant</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Measure for pants</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shoes */}
                  <Card
                    className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 group overflow-hidden active:scale-95 sm:hover:scale-105"
                    onClick={() => handleMeasurementTypeSelect("shoes")}
                  >
                    <CardContent className="p-0 h-64 sm:h-72 flex flex-col">
                      <div className="relative h-40 sm:h-56 bg-green-50 flex items-center justify-center overflow-hidden transition-colors px-2">
                        <img 
                          src="/shoes1.png" 
                          alt="Shoes" 
                          className="h-28 sm:h-40 w-auto object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                        <div className="flex-1 flex flex-col items-center justify-center px-3 py-3 sm:px-4 sm:py-4 text-center">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-4">Shoes</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Measure for shoes</p>
                              
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Navigation Buttons Row */}
                <div className="flex flex-row justify-between items-center mt-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedMeasurementType(null);
                      setStep('gender');
                    }}
                    className="text-xs sm:text-sm"
                  >
                    ← Back
                  </Button>
                  {/* Next button placeholder: insert your Next button here if needed */}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 'measurements' && (
            <MeasurementForm
              gender={selectedGender!}
              measurementType={selectedMeasurementType || "all"}
              onSubmit={handleMeasurementSubmit}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentForm;