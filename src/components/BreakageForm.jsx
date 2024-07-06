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

const BreakageForm = ({ onSave }) => {
  const [form, setForm] = useState({
    itemDescription: "",
    date: new Date(),
    reason: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.itemDescription || !form.reason || !form.quantity) {
      toast.error("Please fill in all fields");
      return;
    }
    onSave(form);
    setForm({
      itemDescription: "",
      date: new Date(),
      reason: "",
      quantity: "",
    });
    toast.success("Breakage reported successfully");
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Report Breakage</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="itemDescription">Item Description</Label>
            <Input
              id="itemDescription"
              name="itemDescription"
              value={form.itemDescription}
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
          <Button type="submit">Report Breakage</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BreakageForm;