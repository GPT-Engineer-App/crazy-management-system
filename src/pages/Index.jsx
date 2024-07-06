import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import TimeClock from "@/components/TimeClock";
import AttendanceReport from "@/components/AttendanceReport";
import Checklist from "@/components/Checklist";
import ChecklistTemplateManager from "@/components/ChecklistTemplateManager";
import InventoryManagement from "@/components/InventoryManagement";
import ComplimentaryItems from "@/components/ComplimentaryItems";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [shiftForm, setShiftForm] = useState({
    date: "",
    time: "",
    staffMember: "",
    role: "",
    description: "",
  });
  const [attendanceData, setAttendanceData] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShiftForm({ ...shiftForm, date: date.toISOString().split("T")[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShiftForm({ ...shiftForm, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setShiftForm({ ...shiftForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShifts([...shifts, shiftForm]);
    setShiftForm({
      date: "",
      time: "",
      staffMember: "",
      role: "",
      description: "",
    });
  };

  const handleClockIn = (time) => {
    setAttendanceData([...attendanceData, { clockIn: time, clockOut: null }]);
  };

  const handleClockOut = (time) => {
    const updatedData = attendanceData.map((entry) =>
      entry.clockOut === null ? { ...entry, clockOut: time } : entry
    );
    setAttendanceData(updatedData);
  };

  const handleSaveTemplate = (template) => {
    const updatedTemplates = templates.filter((t) => t.name !== template.name);
    setTemplates([...updatedTemplates, template]);
  };

  const handleSaveChecklist = (tasks) => {
    const updatedTemplates = templates.map((template) =>
      template.name === selectedTemplate.name ? { ...template, tasks } : template
    );
    setTemplates(updatedTemplates);
  };

  const handleSaveComplimentaryItem = (item) => {
    // Logic to save complimentary item
    console.log("Complimentary Item Saved:", item);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Staff Scheduling</h1>
      <Calendar selected={selectedDate} onSelect={handleDateClick} />
      <div className="mt-4">
        <h2 className="text-2xl mb-2">Upcoming Shifts</h2>
        <ul>
          {shifts.map((shift, index) => (
            <li key={index} className="mb-2">
              {shift.date} - {shift.time} - {shift.staffMember} - {shift.role}
            </li>
          ))}
        </ul>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">
            Add Shift
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Shift</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={shiftForm.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={shiftForm.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="staffMember">Staff Member</Label>
              <Input
                id="staffMember"
                name="staffMember"
                value={shiftForm.staffMember}
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
                  <SelectItem value="Waiter">Waiter</SelectItem>
                  <SelectItem value="Chef">Chef</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={shiftForm.description}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Save Shift</Button>
          </form>
        </DialogContent>
      </Dialog>
      <TimeClock onClockIn={handleClockIn} onClockOut={handleClockOut} />
      <AttendanceReport attendanceData={attendanceData} />
      <ChecklistTemplateManager templates={templates} onSaveTemplate={handleSaveTemplate} />
      {selectedTemplate && (
        <Checklist template={selectedTemplate} onSave={handleSaveChecklist} />
      )}
      <InventoryManagement />
      <ComplimentaryItems inventory={inventory} onSave={handleSaveComplimentaryItem} />
    </div>
  );
};

export default Index;