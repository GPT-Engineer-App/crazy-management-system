import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Checklist = ({ template, onSave }) => {
  const [tasks, setTasks] = useState(template.tasks || []);
  const [newTask, setNewTask] = useState("");

  const handleTaskChange = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    onSave(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, { name: newTask, completed: false }];
    setTasks(updatedTasks);
    setNewTask("");
    onSave(updatedTasks);
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center mb-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleTaskChange(index)}
              />
              <span className="ml-2">{task.name}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-4">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
          />
          <Button onClick={handleAddTask} className="ml-2">
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Checklist;