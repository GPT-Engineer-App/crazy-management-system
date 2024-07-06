import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const EntertainmentFeeAccounting = ({ onSave }) => {
  const [form, setForm] = useState({
    marketer: "",
    promodizer: "",
    fee: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.marketer || !form.promodizer || !form.fee) {
      toast.error("Please fill in all fields");
      return;
    }
    onSave(form);
    setForm({
      marketer: "",
      promodizer: "",
      fee: "",
      date: new Date().toISOString().split("T")[0],
    });
    toast.success("Entertainment fee recorded successfully");
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Record Entertainment Fee</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="marketer">Girls Marketer</Label>
            <Input
              id="marketer"
              name="marketer"
              value={form.marketer}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="promodizer">Promodizer</Label>
            <Input
              id="promodizer"
              name="promodizer"
              value={form.promodizer}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="fee">Entertainment Fee</Label>
            <Input
              id="fee"
              name="fee"
              type="number"
              value={form.fee}
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
              value={form.date}
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

export default EntertainmentFeeAccounting;