import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const AttendanceReport = ({ attendanceData }) => {
  const [report, setReport] = useState(null);

  const generateReport = () => {
    const reportData = attendanceData.map((entry) => ({
      ...entry,
      hoursWorked: (new Date(entry.clockOut) - new Date(entry.clockIn)) / 3600000,
    }));
    setReport(reportData);
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Attendance Report</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={generateReport} className="mb-4">
          Generate Report
        </Button>
        {report && (
          <ul>
            {report.map((entry, index) => (
              <li key={index} className="mb-2">
                {`${format(new Date(entry.clockIn), "PPpp")} - ${format(new Date(entry.clockOut), "PPpp")}: ${entry.hoursWorked.toFixed(2)} hours`}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceReport;