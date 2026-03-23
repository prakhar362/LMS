import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Package, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchSCMDashboardDataService } from "@/services";

function SCMDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchSCMDashboardDataService();
      if (response?.success) setData(response.data);
    }
    fetchData();
  }, []);

  if (!data) return <div>Loading SCM Data...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Predicted Demand</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.forecasts.length > 0 ? data.forecasts[0].predictedDemand : 0} units</div>
            <p className="text-xs text-muted-foreground">Based on latest ML forecast</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Supply Allocation</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.supplyLogs.length} active logs</div>
            <p className="text-xs text-muted-foreground">Pre-allocated & Dynamic</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Push Status</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Optimized</div>
            <p className="text-xs text-muted-foreground">Forecast-driven resources active</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Demand Forecasts (SCM Push)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Predicted Demand</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Period</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.forecasts.map((f, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{f.courseTitle}</TableCell>
                  <TableCell>{f.predictedDemand}</TableCell>
                  <TableCell>{(f.confidenceLevel * 100).toFixed(0)}%</TableCell>
                  <TableCell>{f.period}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Supply Logs (SCM Pull)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.supplyLogs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell className="capitalize">{log.resourceType}</TableCell>
                  <TableCell>{log.allocatedAmount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${log.allocationType === "dynamic" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                      {log.allocationType}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default SCMDashboard;
