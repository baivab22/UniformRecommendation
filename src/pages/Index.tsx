import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ruler, ArrowRight, Share2, Copy, QrCode } from "lucide-react";
import { useState, useRef } from "react";
import QRCode from "qrcode";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    const currentUrl = window.location.origin;
    try {
      const qrDataUrl = await QRCode.toDataURL(currentUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF"
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const copyToClipboard = async () => {
    const currentUrl = window.location.origin;
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link copied!",
        description: "The website link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      {/* Simple Navigation */}
      <nav className="bg-background/90 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <Ruler className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Fit-Find</span>
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={generateQRCode}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share Fit-Find</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4 py-4">
                  {qrCodeUrl && (
                    <div className="flex flex-col items-center space-y-2">
                      <img src={qrCodeUrl} alt="QR Code" className="border rounded-lg" />
                      <p className="text-sm text-muted-foreground text-center">
                        Scan QR code to visit Fit-Find
                      </p>
                    </div>
                  )}
                  <div className="flex w-full items-center space-x-2">
                    <input
                      readOnly
                      value={window.location.origin}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                    <Button size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Link to="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary"></div>
        <div className="relative container mx-auto px-4 text-center text-primary-foreground">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Find Your Perfect Fit
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90">
              Get accurate size recommendations for shirts, pants, and shoes using our advanced biometric sizing technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 px-8 py-4 text-lg font-semibold rounded-full shadow-xl"
                asChild
              >
                <Link to="/student-form">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Start Sizing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Enter Details</h3>
              <p className="text-muted-foreground">
                Provide your basic measurements and body information
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Take Measurements</h3>
              <p className="text-muted-foreground">
                Follow our guided process for shirts, pants, and shoes
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive accurate size recommendations for all clothing types
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Ruler className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Fit-Find</span>
          </div>
          <p className="text-muted-foreground">&copy; 2024 Fit-Find. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
