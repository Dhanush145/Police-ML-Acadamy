import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Prediction = "Burglary" | "Vandalism" | "Theft";

const Voting = () => {
  const [hardVoteActive, setHardVoteActive] = useState(false);
  const [softVoteActive, setSoftVoteActive] = useState(false);

  const model1 = { prediction: "Burglary" as Prediction, confidence: 85 };
  const model2 = { prediction: "Burglary" as Prediction, confidence: 78 };
  const model3 = { prediction: "Theft" as Prediction, confidence: 65 };

  const softVoteScores = {
    Burglary: ((85 + 78) / 3).toFixed(1),
    Theft: (65 / 3).toFixed(1),
    Vandalism: (0).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Voting Methods in Ensemble Learning</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Learn how multiple AI models combine their predictions, similar to how officers vote on the most likely crime type.
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
                  <p className="font-semibold">2:30 AM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">Residential Area</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Day</p>
                  <p className="font-semibold">Wednesday</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weather</p>
                  <p className="font-semibold">Clear Night</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hard Voting */}
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Hard Voting (Majority Vote)</CardTitle>
              <CardDescription>
                Each model votes for one crime type. The crime type with the most votes wins.
                Like officers taking a simple majority vote.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "Model 1", pred: model1.prediction, conf: model1.confidence },
                  { name: "Model 2", pred: model2.prediction, conf: model2.confidence },
                  { name: "Model 3", pred: model3.prediction, conf: model3.confidence },
                ].map((model, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 border-2 rounded-lg transition-all duration-500",
                      hardVoteActive && "animate-vote-cast"
                    )}
                    style={{ animationDelay: `${idx * 200}ms` }}
                  >
                    <h3 className="font-semibold mb-2">{model.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-1">{model.pred}</p>
                    <p className="text-sm text-muted-foreground">{model.conf}% confident</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setHardVoteActive(!hardVoteActive)}
                className="w-full"
                size="lg"
              >
                <Play className="mr-2 h-4 w-4" />
                {hardVoteActive ? "Reset" : "Cast Votes"}
              </Button>

              {hardVoteActive && (
                <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary animate-fade-in">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" />
                    Final Prediction (Hard Vote)
                  </h3>
                  <p className="text-3xl font-bold text-primary mb-2">Burglary</p>
                  <p className="text-muted-foreground">
                    Reason: 2 out of 3 models voted for Burglary (majority)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Soft Voting */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Soft Voting (Weighted Average)</CardTitle>
              <CardDescription>
                Models share their confidence levels, and predictions are averaged.
                Like officers weighing opinions based on expertise and certainty.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "Model 1", pred: model1.prediction, conf: model1.confidence },
                  { name: "Model 2", pred: model2.prediction, conf: model2.confidence },
                  { name: "Model 3", pred: model3.prediction, conf: model3.confidence },
                ].map((model, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 border-2 rounded-lg transition-all duration-500",
                      softVoteActive && "animate-vote-cast"
                    )}
                    style={{ animationDelay: `${idx * 200}ms` }}
                  >
                    <h3 className="font-semibold mb-2">{model.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-1">{model.pred}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
                        <span className="font-semibold">{model.conf}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000"
                          style={{ width: softVoteActive ? `${model.conf}%` : "0%" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setSoftVoteActive(!softVoteActive)}
                className="w-full"
                size="lg"
              >
                <Play className="mr-2 h-4 w-4" />
                {softVoteActive ? "Reset" : "Calculate Weighted Average"}
              </Button>

              {softVoteActive && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-3">Average Confidence Scores:</h3>
                    <div className="space-y-2">
                      {Object.entries(softVoteScores).map(([crime, score]) => (
                        <div key={crime} className="flex justify-between items-center">
                          <span>{crime}</span>
                          <Badge variant={crime === "Burglary" ? "default" : "outline"}>
                            {score}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="text-primary" />
                      Final Prediction (Soft Vote)
                    </h3>
                    <p className="text-3xl font-bold text-primary mb-2">Burglary</p>
                    <p className="text-muted-foreground">
                      Reason: Highest average confidence score ({softVoteScores.Burglary}%)
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Voting;
