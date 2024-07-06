import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ChecklistTemplateManager = ({ templates, onSaveTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleTemplateChange = (templateName) => {
    const template = templates.find((t) => t.name === templateName);
    setSelectedTemplate(template);
    setTemplateName(template.name);
    setTasks(template.tasks);
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, { name: newTask, completed: false }];
    setTasks(updatedTasks);
    setNewTask("");
  };

  const handleSaveTemplate = () => {
    if (templateName.trim() === "") {
      toast.error("Template name cannot be empty");
      return;
    }
    const newTemplate = { name: templateName, tasks };
    onSaveTemplate(newTemplate);
    setTemplateName("");
    setTasks([]);
    setSelectedTemplate(null);
  };

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Manage Checklist Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="template">Select Template</Label>
          <Select onValueChange={handleTemplateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template, index) => (
                <SelectItem key={index} value={template.name}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="templateName">Template Name</Label>
          <Input
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center mb-2">
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
        <Button onClick={handleSaveTemplate} className="mt-4">
          Save Template
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChecklistTemplateManager;