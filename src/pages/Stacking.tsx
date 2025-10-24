import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Play, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Stacking = () => {
  const [step, setStep] = useState(0);

  const baseModels = [
    { name: "Time Pattern Model", prediction: "Burglary", confidence: 75 },
    { name: "Location Model", prediction: "Burglary", confidence: 82 },
    { name: "Weather Model", prediction: "Theft", confidence: 68 },
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Stacking - Multi-Level Learning</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Stacking uses multiple models in layers, like a police department with patrol officers 
            reporting to detectives who make final decisions.
          </p>

          {/* Sample Case */}
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline" className="text-accent">Sample Case</Badge>
                Crime Incident Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold">11:45 PM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">Commercial District</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Day</p>
                  <p className="font-semibold">Friday</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weather</p>
                  <p className="font-semibold">Rainy</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stacking Visualization */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Stacking Architecture</CardTitle>
              <CardDescription>
                Watch how base models (Level 1) pass their predictions to a meta-model (Level 2) 
                that makes the final decision.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Level 1: Base Models */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-primary/20 text-primary">Level 1</Badge>
                  <h3 className="font-semibold">Base Models (Specialized Officers)</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {baseModels.map((model, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-4 border-2 rounded-lg transition-all duration-500",
                        step >= 1 && "bg-primary/5 border-primary animate-pulse-glow"
                      )}
                    >
                      <h4 className="font-semibold mb-2 text-sm">{model.name}</h4>
                      {step >= 1 && (
                        <div className="animate-fade-in">
                          <p className="text-xl font-bold text-primary">{model.prediction}</p>
                          <p className="text-sm text-muted-foreground">
                            {model.confidence}% confident
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              {step >= 2 && (
                <div className="flex justify-center animate-fade-in">
                  <div className="flex flex-col items-center">
                    <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Predictions passed to meta-model
                    </p>
                  </div>
                </div>
              )}

              {/* Level 2: Meta Model */}
              {step >= 2 && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-accent/20 text-accent">Level 2</Badge>
                    <h3 className="font-semibold">Meta-Model (Detective)</h3>
                  </div>
                  <Card className="border-2 border-accent bg-accent/5">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-3">
                        Analyzing all base model predictions...
                      </h4>
                      <div className="space-y-2 mb-4">
                        {baseModels.map((model, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            <span>
                              {model.name}: <strong>{model.prediction}</strong> ({model.confidence}%)
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-2000"
                          style={{ width: step >= 3 ? "100%" : "0%" }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Final Prediction */}
              {step >= 3 && (
                <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary animate-fade-in">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" />
                    Final Stacked Prediction
                  </h3>
                  <p className="text-3xl font-bold text-primary mb-3">Burglary</p>
                  <p className="text-muted-foreground mb-4">
                    The meta-model learned that when Time Pattern and Location models both predict 
                    Burglary with high confidence, it's very reliable - even if Weather model disagrees.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Key Advantage:</strong> The meta-model learns which base models to trust 
                      in different situations, like a detective knowing which officers have the best 
                      judgment for specific crime types.
                    </p>
                  </div>
                </div>
              )}

              <Button onClick={handleNext} className="w-full" size="lg">
                <Play className="mr-2 h-4 w-4" />
                {step === 0 && "Start Stacking Process"}
                {step === 1 && "Pass to Meta-Model"}
                {step === 2 && "Make Final Prediction"}
                {step === 3 && "Reset"}
              </Button>
            </CardContent>
          </Card>

          {/* Key Differences */}
          <Card className="mt-8 border-2 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle>Stacking vs Voting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Badge className="h-fit">Voting</Badge>
                <p className="text-muted-foreground">
                  Models make predictions independently, then combine them using a simple rule (majority or average).
                </p>
              </div>
              <div className="flex gap-3">
                <Badge variant="secondary" className="h-fit">Stacking</Badge>
                <p className="text-muted-foreground">
                  A meta-model learns the best way to combine base model predictions by training on their outputs.
                  More sophisticated but requires more training data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stacking;
