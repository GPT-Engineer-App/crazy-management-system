import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

const CommissionManagement = () => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    sales: "",
    commissionRate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const { data: salesData, isLoading, error } = useQuery({
    queryKey: ["salesData"],
    queryFn: fetchSalesData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading sales data</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Commission Management</h1>
      <Card className="max-w-md mx-auto mt-4">
        <CardHeader>
          <CardTitle>Add New Commission</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="role">Role</Label>
              <Select
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Girls Marketer">Girls Marketer</SelectItem>
                  <SelectItem value="Promodizer">Promodizer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="sales">Sales</Label>
              <Input
                id="sales"
                name="sales"
                type="number"
                value={form.sales}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                name="commissionRate"
                type="number"
                value={form.commissionRate}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Save Commission</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <h2 className="text-2xl mb-2">Sales Data</h2>
        <ul>
          {salesData.map((data) => (
            <li key={data.id} className="mb-2">
              {data.name} - {data.role} - ${data.sales} - {data.commissionRate}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const fetchSalesData = async () => {
  const response = await fetch("/api/salesData");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default CommissionManagement;