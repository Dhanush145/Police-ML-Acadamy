import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, BarChart3, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome to Ensemble Learning
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how multiple AI models work together to make better crime predictions, 
            just like how multiple officers collaborate to solve cases.
          </p>
        </div>

        {/* Concept Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Voting Methods</CardTitle>
              <CardDescription>
                Learn how multiple models vote together, like officers reaching a consensus on a case.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/voting">
                <Button variant="outline" className="w-full group">
                  Explore Voting
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Stacking Models</CardTitle>
              <CardDescription>
                Discover how models build on each other's predictions, like detectives using different expertise.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/stacking">
                <Button variant="outline" className="w-full group">
                  Learn Stacking
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Police Dataset</CardTitle>
              <CardDescription>
                Explore real-world crime incident data used to train and test our models.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dataset">
                <Button variant="outline" className="w-full group">
                  View Dataset
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Why Ensemble Learning Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Why Use Ensemble Learning?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Better Accuracy</h3>
                <p className="text-muted-foreground">
                  Multiple models catch mistakes that a single model might miss, just like having multiple witnesses.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Reduced Bias</h3>
                <p className="text-muted-foreground">
                  Different models have different strengths, balancing each other out like officers with different expertise.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">More Reliable</h3>
                <p className="text-muted-foreground">
                  Even if one model performs poorly, others compensate, ensuring consistent results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
