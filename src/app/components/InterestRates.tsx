import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ecbInterestRatesData } from "../data/economicData";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

export function InterestRates() {
  const [timeRange, setTimeRange] = useState<"1y" | "3y" | "all">("3y");

  const getFilteredData = () => {
    const now = new Date("2026-02");
    switch (timeRange) {
      case "1y":
        return ecbInterestRatesData.slice(-12);
      case "3y":
        return ecbInterestRatesData.slice(-36);
      default:
        return ecbInterestRatesData;
    }
  };

  const filteredData = getFilteredData();
  const currentRates = ecbInterestRatesData[ecbInterestRatesData.length - 1];
  const previousRates = ecbInterestRatesData[ecbInterestRatesData.length - 2];

  const rateChange = currentRates.depositRate - previousRates.depositRate;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">ECB Interest Rates</h1>
        <p className="text-gray-600">
          Track the European Central Bank's key interest rates and their evolution over time
        </p>
      </div>

      {/* Current Rates Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardDescription>Main Refinancing Rate</CardDescription>
            <CardTitle className="text-3xl text-blue-600 flex items-center gap-2">
              {currentRates.mainRate.toFixed(2)}%
              {rateChange > 0 ? (
                <TrendingUp className="size-6 text-green-600" />
              ) : rateChange < 0 ? (
                <TrendingDown className="size-6 text-red-600" />
              ) : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Primary rate for lending to banks
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardDescription>Deposit Facility Rate</CardDescription>
            <CardTitle className="text-3xl text-purple-600">
              {currentRates.depositRate.toFixed(2)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Rate for overnight deposits
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardDescription>Marginal Lending Rate</CardDescription>
            <CardTitle className="text-3xl text-orange-600">
              {currentRates.lendingRate.toFixed(2)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Rate for overnight lending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="flex items-start gap-3 pt-6">
          <Info className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">About ECB Interest Rates</p>
            <p>
              The ECB uses these three key interest rates to implement monetary policy
              in the Eurozone. Changes in these rates influence borrowing costs,
              inflation, and economic growth across member countries.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Interest Rates Timeline</CardTitle>
              <CardDescription>Historical ECB key interest rates</CardDescription>
            </div>
            <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
              <TabsList>
                <TabsTrigger value="1y">1 Year</TabsTrigger>
                <TabsTrigger value="3y">3 Years</TabsTrigger>
                <TabsTrigger value="all">All Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[-1, 5]} label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="mainRate"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Main Refinancing"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="depositRate"
                stroke="#a855f7"
                strokeWidth={2}
                name="Deposit Facility"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="lendingRate"
                stroke="#f97316"
                strokeWidth={2}
                name="Marginal Lending"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rate Changes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Rate Changes</CardTitle>
          <CardDescription>Latest adjustments to ECB interest rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Main Rate</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Deposit Rate</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Lending Rate</th>
                </tr>
              </thead>
              <tbody>
                {ecbInterestRatesData.slice(-6).reverse().map((rate, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 text-sm text-gray-900">{rate.date}</td>
                    <td className="py-3 text-sm text-gray-700">{rate.mainRate.toFixed(2)}%</td>
                    <td className="py-3 text-sm text-gray-700">{rate.depositRate.toFixed(2)}%</td>
                    <td className="py-3 text-sm text-gray-700">{rate.lendingRate.toFixed(2)}%</td>
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
