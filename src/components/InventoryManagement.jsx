import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format } from "date-fns";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", expirationDate: "", reorderPoint: "" });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    checkAlerts();
  }, [inventory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInventory([...inventory, form]);
    setForm({ name: "", quantity: "", expirationDate: "", reorderPoint: "" });
  };

  const handleDelete = (index) => {
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
  };

  const checkAlerts = () => {
    const newAlerts = inventory.filter(item => {
      const isLowStock = item.quantity <= item.reorderPoint;
      const isExpiringSoon = new Date(item.expirationDate) <= new Date(new Date().setDate(new Date().getDate() + 7));
      return isLowStock || isExpiringSoon;
    });
    setAlerts(newAlerts);
  };

  return (
    <Card className="max-w-4xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-4">Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleInputChange} required />
              </div>
              <div className="mb-4">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" name="quantity" type="number" value={form.quantity} onChange={handleInputChange} required />
              </div>
              <div className="mb-4">
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input id="expirationDate" name="expirationDate" type="date" value={form.expirationDate} onChange={handleInputChange} required />
              </div>
              <div className="mb-4">
                <Label htmlFor="reorderPoint">Reorder Point</Label>
                <Input id="reorderPoint" name="reorderPoint" type="number" value={form.reorderPoint} onChange={handleInputChange} required />
              </div>
              <Button type="submit">Save Item</Button>
            </form>
          </DialogContent>
        </Dialog>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Item Name</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Expiration Date</th>
              <th className="py-2">Reorder Point</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index}>
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">{format(new Date(item.expirationDate), "PP")}</td>
                <td className="py-2">{item.reorderPoint}</td>
                <td className="py-2">
                  <Button variant="outline" onClick={() => handleDelete(index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {alerts.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-4">View Alerts</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Inventory Alerts</AlertDialogTitle>
              </AlertDialogHeader>
              <ul>
                {alerts.map((alert, index) => (
                  <li key={index} className="mb-2">
                    {alert.name} - {alert.quantity <= alert.reorderPoint ? "Low Stock" : "Expiring Soon"}
                  </li>
                ))}
              </ul>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryManagement;