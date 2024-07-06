import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { toast } from "sonner";

const ComplimentaryItems = ({ inventory, onSave }) => {
  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    recipient: "",
    date: new Date(),
    reason: "",
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
    if (!form.itemName || !form.quantity || !form.recipient || !form.reason) {
      toast.error("Please fill in all fields");
      return;
    }
    onSave(form);
    setForm({
      itemName: "",
      quantity: "",
      recipient: "",
      date: new Date(),
      reason: "",
    });
    toast.success("Complimentary item recorded successfully");
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Record Complimentary Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="itemName">Item Name</Label>
            <Select
              onValueChange={(value) => handleInputChange({ target: { name: "itemName", value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select item" />
              </SelectTrigger>
              <SelectContent>
                {inventory.map((item, index) => (
                  <SelectItem key={index} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              name="recipient"
              value={form.recipient}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={format(form.date, "yyyy-MM-dd")}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              name="reason"
              value={form.reason}
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

export default ComplimentaryItems;