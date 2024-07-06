import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const fetchPromotions = async () => {
  const response = await fetch("/api/promotions");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const addPromotion = async (promotion) => {
  const response = await fetch("/api/promotions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promotion),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PromotionTracking = () => {
  const queryClient = useQueryClient();
  const { data: promotions, isLoading, error } = useQuery({
    queryKey: ["promotions"],
    queryFn: fetchPromotions,
  });

  const mutation = useMutation(addPromotion, {
    onSuccess: () => {
      queryClient.invalidateQueries("promotions");
      toast.success("Promotion added successfully");
    },
    onError: () => {
      toast.error("Failed to add promotion");
    },
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    discount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
    setForm({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      discount: "",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading promotions</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Promotion Tracking System</h1>
      <Card className="max-w-md mx-auto mt-4">
        <CardHeader>
          <CardTitle>Add New Promotion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">Promotion Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                value={form.discount}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Save Promotion</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <h2 className="text-2xl mb-2">Current Promotions</h2>
        <ul>
          {promotions.map((promotion) => (
            <li key={promotion.id} className="mb-2">
              {promotion.name} - {promotion.description} - {promotion.startDate} to {promotion.endDate} - {promotion.discount}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromotionTracking;