import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";

const WastageLog = ({ onSave }) => {
  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    reason: "",
    date: new Date(),
    cost: "",
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
    if (!form.itemName || !form.quantity || !form.reason || !form.cost) {
      toast.error("Please fill in all fields");
      return;
    }
    onSave(form);
    setForm({
      itemName: "",
      quantity: "",
      reason: "",
      date: new Date(),
      cost: "",
    });
    toast.success("Wastage entry recorded successfully");
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Record Wastage</CardTitle>
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
            <Label htmlFor="reason">Reason for Wastage</Label>
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
            <DatePicker
              selected={form.date}
              onSelect={handleDateChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="cost">Cost</Label>
            <Input
              id="cost"
              name="cost"
              type="number"
              value={form.cost}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Save Entry</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WastageLog;