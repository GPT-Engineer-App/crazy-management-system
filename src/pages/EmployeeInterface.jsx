import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";

const EmployeeInterface = () => {
  const [form, setForm] = useState({
    task: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Employee Interface</h1>
      <Card className="max-w-md mx-auto mt-4">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                name="task"
                value={form.task}
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
            <Button type="submit">Save Task</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-4">
        <h2 className="text-2xl mb-2">Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-2">
              {task.task} - {task.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const fetchTasks = async () => {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default EmployeeInterface;