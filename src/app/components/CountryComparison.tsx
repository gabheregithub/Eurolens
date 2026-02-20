import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  inflationByCountry,
  gdpGrowthByCountry,
  unemploymentByCountry,
  euCountries,
} from "../data/economicData";
import { TrendingUp, Users, Activity } from "lucide-react";

export function CountryComparison() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["Germany", "France", "Italy", "Spain"]);
  const [metric, setMetric] = useState<"inflation" | "gdp" | "unemployment">("gdp");

  const handleCountryToggle = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country));
    } else if (selectedCountries.length < 6) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const getComparisonData = () => {
    switch (metric) {
      case "inflation":
        return inflationByCountry.filter(c => selectedCountries.includes(c.country));
      case "gdp":
        return gdpGrowthByCountry.filter(c => selectedCountries.includes(c.country));
      case "unemployment":
        return unemploymentByCountry.filter(c => selectedCountries.includes(c.country));
      default:
        return [];
    }
  };

  const comparisonData = getComparisonData();

  // Prepare radar chart data
  const radarData = selectedCountries.map(country => {
    const inflation = inflationByCountry.find(c => c.country === country);
    const gdp = gdpGrowthByCountry.find(c => c.country === country);
    const unemployment = unemploymentByCountry.find(c => c.country === country);

    return {
      country: country,
      "Inflation": inflation?.["2025"] || 0,
      "GDP Growth": gdp?.["2025"] || 0,
      "Unemployment": unemployment?.rate || 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Country Comparison</h1>
        <p className="text-gray-600">
          Compare economic indicators across EU member states
        </p>
      </div>

      {/* Country Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Countries to Compare</CardTitle>
          <CardDescription>Choose up to 6 countries (currently selected: {selectedCountries.length})</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {euCountries.map((country) => {
              const isSelected = selectedCountries.includes(country.name);
              return (
                <button
                  key={country.code}
                  onClick={() => handleCountryToggle(country.name)}
                  disabled={!isSelected && selectedCountries.length >= 6}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  }`}
                >
                  {country.name}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Metric Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Compare by:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setMetric("gdp")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              metric === "gdp"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-green-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4" />
              GDP Growth
            </div>
          </button>
          <button
            onClick={() => setMetric("inflation")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              metric === "inflation"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-purple-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className="size-4" />
              Inflation
            </div>
          </button>
          <button
            onClick={() => setMetric("unemployment")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              metric === "unemployment"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-orange-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              Unemployment
            </div>
          </button>
        </div>
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>
              {metric === "gdp" && "GDP Growth Rate"}
              {metric === "inflation" && "Inflation Rate"}
              {metric === "unemployment" && "Unemployment Rate"}
            </CardTitle>
            <CardDescription>Comparison across selected countries (2025)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="country" width={100} />
                <Tooltip />
                <Bar
                  dataKey={metric === "unemployment" ? "rate" : "2025"}
                  fill={
                    metric === "gdp" ? "#10b981" :
                    metric === "inflation" ? "#a855f7" :
                    "#f97316"
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Multi-Indicator Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-Indicator Overview</CardTitle>
            <CardDescription>Combined view of key economic indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="country" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar name="Inflation" dataKey="Inflation" stroke="#a855f7" fill="#a855f7" fillOpacity={0.5} />
                <Radar name="GDP Growth" dataKey="GDP Growth" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* GDP Growth Historical Trends */}
      {metric === "gdp" && (
        <Card>
          <CardHeader>
            <CardTitle>GDP Growth Historical Trends</CardTitle>
            <CardDescription>Annual GDP growth rates from 2020 to 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis label={{ value: 'GDP Growth (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                {["2020", "2021", "2022", "2023", "2024", "2025"].map((year, index) => (
                  <Line
                    key={year}
                    type="monotone"
                    dataKey={year}
                    stroke={`hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Inflation Historical Trends */}
      {metric === "inflation" && (
        <Card>
          <CardHeader>
            <CardTitle>Inflation Historical Trends</CardTitle>
            <CardDescription>Annual inflation rates from 2020 to 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis label={{ value: 'Inflation Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                {["2020", "2021", "2022", "2023", "2024", "2025"].map((year, index) => (
                  <Line
                    key={year}
                    type="monotone"
                    dataKey={year}
                    stroke={`hsl(${280 + index * 15}, 70%, 50%)`}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
          <CardDescription>
            {metric === "gdp" && "GDP growth rates by country and year"}
            {metric === "inflation" && "Inflation rates by country and year"}
            {metric === "unemployment" && "Current unemployment rates by country"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-medium text-gray-600">Country</th>
                  {metric !== "unemployment" ? (
                    <>
                      <th className="pb-3 font-medium text-gray-600 text-right">2022</th>
                      <th className="pb-3 font-medium text-gray-600 text-right">2023</th>
                      <th className="pb-3 font-medium text-gray-600 text-right">2024</th>
                      <th className="pb-3 font-medium text-gray-600 text-right">2025</th>
                    </>
                  ) : (
                    <th className="pb-3 font-medium text-gray-600 text-right">Current Rate</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((data, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 text-gray-900">{data.country}</td>
                    {metric !== "unemployment" ? (
                      <>
                        <td className="py-3 text-gray-700 text-right">{data["2022"]?.toFixed(1)}%</td>
                        <td className="py-3 text-gray-700 text-right">{data["2023"]?.toFixed(1)}%</td>
                        <td className="py-3 text-gray-700 text-right">{data["2024"]?.toFixed(1)}%</td>
                        <td className="py-3 text-gray-700 text-right font-medium">{data["2025"]?.toFixed(1)}%</td>
                      </>
                    ) : (
                      <td className="py-3 text-gray-700 text-right font-medium">{data.rate?.toFixed(1)}%</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
