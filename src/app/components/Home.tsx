import { Link } from "react-router";
import { TrendingUp, BarChart3, GitCompare, ArrowRight, Activity, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ecbInterestRatesData, inflationTimeSeriesData } from "../data/economicData";

export function Home() {
  const features = [
    {
      icon: TrendingUp,
      title: "ECB Interest Rates",
      description: "Track European Central Bank key interest rates over time",
      path: "/interest-rates",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Inflation Tracker",
      description: "Monitor inflation rates across the Eurozone",
      path: "/inflation",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: GitCompare,
      title: "Country Comparison",
      description: "Compare economic indicators across EU countries",
      path: "/comparison",
      color: "from-orange-500 to-red-500",
    },
  ];

  const currentRate = ecbInterestRatesData[ecbInterestRatesData.length - 1];
  const currentInflation = inflationTimeSeriesData[inflationTimeSeriesData.length - 1];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
          <Activity className="size-4" />
          <span>Real-time Economic Insights</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900">
          European Economic Data
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Visualized
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track ECB interest rates, inflation trends, and compare economic indicators
          across European Union countries with interactive charts
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardDescription>ECB Deposit Rate</CardDescription>
            <CardTitle className="text-3xl text-blue-600">
              {currentRate.depositRate.toFixed(2)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">as of {currentRate.date}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader>
            <CardDescription>Eurozone Inflation</CardDescription>
            <CardTitle className="text-3xl text-purple-600">
              {currentInflation.rate.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">as of {currentInflation.date}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <CardDescription>Countries Tracked</CardDescription>
            <CardTitle className="text-3xl text-green-600 flex items-center gap-2">
              <Globe className="size-8" />
              12+
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">EU member states</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Preview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ECB Interest Rates Trend</CardTitle>
            <CardDescription>Main refinancing operations rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={ecbInterestRatesData.slice(-8)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mainRate" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inflation Rate Trend</CardTitle>
            <CardDescription>Eurozone annual inflation rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={inflationTimeSeriesData.slice(-8)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.path} to={feature.path}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="size-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="size-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
