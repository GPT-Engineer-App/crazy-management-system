import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const OnTheSpotDiscount = () => {
  const [form, setForm] = useState({
    discountAmount: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.discountAmount || !form.reason) {
      toast.error("Please fill in all fields");
      return;
    }
    // Handle the discount application logic here
    toast.success("Discount applied successfully");
    setForm({
      discountAmount: "",
      reason: "",
    });
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Apply On-the-Spot Discount</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="discountAmount">Discount Amount</Label>
            <Input
              id="discountAmount"
              name="discountAmount"
              type="number"
              value={form.discountAmount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="reason">Reason for Discount</Label>
            <Textarea
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Apply Discount</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OnTheSpotDiscount;