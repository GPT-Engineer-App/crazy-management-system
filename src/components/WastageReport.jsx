import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const WastageReport = ({ wastageData }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredData = wastageData.filter((entry) => {
    const entryDate = new Date(entry.date);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;
    const reasonMatch = filters.reason ? entry.reason.includes(filters.reason) : true;

    return (
      (!startDate || entryDate >= startDate) &&
      (!endDate || entryDate <= endDate) &&
      reasonMatch
    );
  });

  const totalCost = filteredData.reduce((sum, entry) => sum + parseFloat(entry.cost), 0);

  return (
    <Card className="max-w-4xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Wastage Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="reason">Reason for Wastage</Label>
          <Input
            id="reason"
            name="reason"
            value={filters.reason}
            onChange={handleInputChange}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.itemName}</TableCell>
                <TableCell>{entry.quantity}</TableCell>
                <TableCell>{entry.reason}</TableCell>
                <TableCell>{format(new Date(entry.date), "PP")}</TableCell>
                <TableCell>${entry.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <strong>Total Financial Impact: ${totalCost.toFixed(2)}</strong>
        </div>
      </CardContent>
    </Card>
  );
};

export default WastageReport;