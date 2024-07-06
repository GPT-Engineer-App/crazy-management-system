import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BreakageTracking = ({ onSave }) => {
  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    reason: "",
    date: new Date(),
  });
  const [breakageReports, setBreakageReports] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.itemName || !form.quantity || !form.reason) {
      toast.error("Please fill in all fields");
      return;
    }
    setBreakageReports([...breakageReports, form]);
    setForm({
      itemName: "",
      quantity: "",
      reason: "",
      date: new Date(),
    });
    toast.success("Breakage entry recorded successfully");
  };

  const totalBreakages = breakageReports.reduce((sum, report) => sum + parseInt(report.quantity), 0);

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto mt-4">
        <CardHeader>
          <CardTitle>Report Breakage</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                name="itemName"
                value={form.itemName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="reason">Reason for Breakage</Label>
              <Textarea
                id="reason"
                name="reason"
                value={form.reason}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    {form.date ? format(form.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button type="submit">Save Entry</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>Breakage Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakageReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.itemName}</TableCell>
                  <TableCell>{report.quantity}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>{format(new Date(report.date), "PP")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <strong>Total Breakages: {totalBreakages}</strong>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreakageTracking;