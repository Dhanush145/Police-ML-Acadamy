import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Info } from "lucide-react";
import { toast } from "sonner";

const crimeData = [
  { id: 1, time: "02:30", location: "Residential", day: "Wednesday", weather: "Clear", crime: "Burglary" },
  { id: 2, time: "14:15", location: "Commercial", day: "Monday", weather: "Rainy", crime: "Theft" },
  { id: 3, time: "23:45", location: "Industrial", day: "Friday", weather: "Foggy", crime: "Vandalism" },
  { id: 4, time: "03:20", location: "Residential", day: "Saturday", weather: "Clear", crime: "Burglary" },
  { id: 5, time: "18:30", location: "Park", day: "Sunday", weather: "Sunny", crime: "Vandalism" },
  { id: 6, time: "22:00", location: "Commercial", day: "Thursday", weather: "Rainy", crime: "Burglary" },
  { id: 7, time: "13:45", location: "Residential", day: "Tuesday", weather: "Cloudy", crime: "Theft" },
  { id: 8, time: "01:15", location: "Commercial", day: "Friday", weather: "Clear", crime: "Burglary" },
  { id: 9, time: "16:20", location: "Park", day: "Saturday", weather: "Sunny", crime: "Vandalism" },
  { id: 10, time: "04:30", location: "Industrial", day: "Monday", weather: "Foggy", crime: "Theft" },
  { id: 11, time: "21:00", location: "Residential", day: "Wednesday", weather: "Rainy", crime: "Burglary" },
  { id: 12, time: "11:30", location: "Commercial", day: "Friday", weather: "Sunny", crime: "Theft" },
];

const Dataset = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const downloadCSV = () => {
    const headers = ["ID", "Time", "Location", "Day", "Weather", "Crime Type"];
    const csvContent = [
      headers.join(","),
      ...crimeData.map(row => 
        `${row.id},${row.time},${row.location},${row.day},${row.weather},${row.crime}`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "police_crime_dataset.csv";
    a.click();
    
    toast.success("Dataset downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Police Crime Dataset</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This dataset contains incident records used to train our ensemble models. 
            Each row represents a crime incident with relevant features.
          </p>

          {/* Dataset Info Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{crimeData.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">4</p>
                <p className="text-xs text-muted-foreground">Input variables</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Crime Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">3</p>
                <p className="text-xs text-muted-foreground">Target classes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Format</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">CSV</p>
                <p className="text-xs text-muted-foreground">Comma-separated</p>
              </CardContent>
            </Card>
          </div>

          {/* Feature Descriptions */}
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Feature Descriptions
              </CardTitle>
              <CardDescription>
                Understanding what each column represents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Badge className="mb-2">Time</Badge>
                  <p className="text-sm text-muted-foreground">
                    24-hour format of when the incident occurred. Night hours often correlate with burglaries.
                  </p>
                </div>
                <div>
                  <Badge className="mb-2">Location</Badge>
                  <p className="text-sm text-muted-foreground">
                    Type of area (Residential, Commercial, Industrial, Park). Different crimes occur in different locations.
                  </p>
                </div>
                <div>
                  <Badge className="mb-2">Day</Badge>
                  <p className="text-sm text-muted-foreground">
                    Day of the week. Weekends may show different crime patterns than weekdays.
                  </p>
                </div>
                <div>
                  <Badge className="mb-2">Weather</Badge>
                  <p className="text-sm text-muted-foreground">
                    Weather conditions. Poor weather can affect crime types and frequencies.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                <Badge variant="secondary" className="mb-2">Crime Type (Target)</Badge>
                <p className="text-sm text-muted-foreground">
                  The type of crime that occurred - this is what our models predict: 
                  <strong> Burglary</strong>, <strong>Theft</strong>, or <strong>Vandalism</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Crime Incident Records</CardTitle>
                <CardDescription>
                  Click on any row to highlight it
                </CardDescription>
              </div>
              <Button onClick={downloadCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Weather</TableHead>
                      <TableHead>Crime Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crimeData.map((row) => (
                      <TableRow
                        key={row.id}
                        className={`cursor-pointer transition-colors ${
                          selectedRow === row.id ? "bg-primary/10" : ""
                        }`}
                        onClick={() => setSelectedRow(row.id === selectedRow ? null : row.id)}
                      >
                        <TableCell className="font-medium">{row.id}</TableCell>
                        <TableCell>{row.time}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.day}</TableCell>
                        <TableCell>{row.weather}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              row.crime === "Burglary"
                                ? "default"
                                : row.crime === "Theft"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {row.crime}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Usage Note */}
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-2">
            <CardHeader>
              <CardTitle>How This Dataset is Used</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Training:</strong> Our ensemble models learn patterns 
                from this data - for example, burglaries often occur at night in residential areas.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Testing:</strong> We hold back some records to test 
                how well our models predict crime types for incidents they haven't seen before.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Prediction:</strong> When a new incident occurs, 
                we input its features, and our ensemble models predict the most likely crime type.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dataset;
