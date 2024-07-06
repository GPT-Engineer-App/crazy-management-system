import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";

const SuperAdminPanel = () => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    description: "",
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

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Super Admin Panel</h1>
      <Card className="max-w-md mx-auto mt-4">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
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
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
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
            <Button type="submit">Save User</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <h2 className="text-2xl mb-2">User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.name} - {user.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const fetchUsers = async () => {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default SuperAdminPanel;