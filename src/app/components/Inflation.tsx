import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { inflationTimeSeriesData, inflationByCountry } from "../data/economicData";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

export function Inflation() {
  const [view, setView] = useState<"timeseries" | "countries">("timeseries");

  const currentInflation = inflationTimeSeriesData[inflationTimeSeriesData.length - 1];
  const previousInflation = inflationTimeSeriesData[inflationTimeSeriesData.length - 7];
  const inflationChange = currentInflation.rate - previousInflation.rate;

  const targetRate = 2.0;
  const isAboveTarget = currentInflation.rate > targetRate;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Inflation Tracker</h1>
        <p className="text-gray-600">
          Monitor inflation rates across the Eurozone and individual EU countries
        </p>
      </div>

      {/* Current Inflation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardDescription>Current Eurozone Inflation</CardDescription>
            <CardTitle className="text-3xl text-purple-600 flex items-center gap-2">
              {currentInflation.rate.toFixed(1)}%
              {inflationChange > 0 ? (
                <TrendingUp className="size-6 text-red-600" />
              ) : (
                <TrendingDown className="size-6 text-green-600" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">as of {currentInflation.date}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardDescription>ECB Target Rate</CardDescription>
            <CardTitle className="text-3xl text-blue-600">2.0%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Medium-term inflation target
            </p>
          </CardContent>
        </Card>

        <Card className={`border-2 ${isAboveTarget ? 'border-orange-200' : 'border-green-200'}`}>
          <CardHeader>
            <CardDescription>6-Month Change</CardDescription>
            <CardTitle className={`text-3xl ${inflationChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {inflationChange > 0 ? '+' : ''}{inflationChange.toFixed(1)}pp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {isAboveTarget ? 'Above target' : 'Near target'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Banner */}
      {isAboveTarget && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="flex items-start gap-3 pt-6">
            <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Inflation Above Target</p>
              <p>
                Current inflation rate is above the ECB's 2% target. The central bank
                may maintain or adjust interest rates to bring inflation closer to target levels.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Toggle */}
      <Tabs value={view} onValueChange={(v) => setView(v as any)}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="timeseries">Time Series</TabsTrigger>
          <TabsTrigger value="countries">By Country</TabsTrigger>
        </TabsList>

        <TabsContent value="timeseries" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Eurozone Inflation Timeline</CardTitle>
              <CardDescription>
                Annual inflation rate over time with ECB target reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={inflationTimeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={[0, 12]}
                    label={{ value: 'Inflation Rate (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#a855f7"
                    strokeWidth={3}
                    name="Inflation Rate"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    data={inflationTimeSeriesData.map(d => ({ ...d, target: 2 }))}
                    dataKey="target"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="ECB Target"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Inflation Data</CardTitle>
              <CardDescription>Monthly inflation rates for the Eurozone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Rate</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Change</th>
                      <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inflationTimeSeriesData.slice(-8).reverse().map((data, index, arr) => {
                      const prevRate = arr[index + 1]?.rate || data.rate;
                      const change = data.rate - prevRate;
                      return (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-3 text-sm text-gray-900">{data.date}</td>
                          <td className="py-3 text-sm text-gray-700">{data.rate.toFixed(1)}%</td>
                          <td className={`py-3 text-sm ${change > 0 ? 'text-red-600' : change < 0 ? 'text-green-600' : 'text-gray-700'}`}>
                            {change !== 0 ? (change > 0 ? '+' : '') + change.toFixed(1) + 'pp' : '—'}
                          </td>
                          <td className="py-3 text-sm">
                            {data.rate > 2 ? (
                              <span className="text-orange-600">Above target</span>
                            ) : (
                              <span className="text-green-600">Near target</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countries" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inflation by Country (2025)</CardTitle>
              <CardDescription>
                Annual inflation rates across EU member states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={inflationByCountry} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 5]} label={{ value: 'Inflation Rate (%)', position: 'bottom' }} />
                  <YAxis type="category" dataKey="country" width={100} />
                  <Tooltip />
                  <Bar dataKey="2025" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Historical Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Historical Inflation Comparison</CardTitle>
              <CardDescription>Inflation rates by country and year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 font-medium text-gray-600">Country</th>
                      <th className="pb-3 font-medium text-gray-600 text-right">2022</th>
                      <th className="pb-3 font-medium text-gray-600 text-right">2023</th>
                      <th className="pb-3 font-medium text-gray-600 text-right">2024</th>
                      <th className="pb-3 font-medium text-gray-600 text-right">2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inflationByCountry.map((country, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 text-gray-900">{country.country}</td>
                        <td className="py-3 text-gray-700 text-right">{country["2022"].toFixed(1)}%</td>
                        <td className="py-3 text-gray-700 text-right">{country["2023"].toFixed(1)}%</td>
                        <td className="py-3 text-gray-700 text-right">{country["2024"].toFixed(1)}%</td>
                        <td className="py-3 text-gray-700 text-right font-medium">{country["2025"].toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
