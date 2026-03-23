import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Award, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchERPDashboardDataService } from "@/services";

function ERPDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchERPDashboardDataService();
      if (response?.success) setData(response.data);
    }
    fetchData();
  }, []);

  if (!data) return <div>Loading ERP Data...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total ERP Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{data.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Tracked via Finance Module</p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Instructors Managed</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.instructors.length}</div>
            <p className="text-xs text-muted-foreground">HR Module Activity</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Financial Records</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.financialRecords.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs font-mono">{r.orderId}</TableCell>
                  <TableCell>₹{r.amount}</TableCell>
                  <TableCell className="capitalize">{r.paymentMethod}</TableCell>
                  <TableCell><span className="text-green-600 font-medium">● {r.status}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Instructor Performance (HR)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instructor</TableHead>
                <TableHead>Workload (Hrs)</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.instructors.map((ins, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{ins.name}</TableCell>
                  <TableCell>{ins.totalWorkloadHours}</TableCell>
                  <TableCell>{ins.enrollmentsCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                       <Award className="h-4 w-4 text-yellow-500 mr-1" />
                       {ins.performanceRating}/5
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ERPDashboard;
