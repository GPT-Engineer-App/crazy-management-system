import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { toast } from "sonner";

const CashFlowManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    date: "",
    description: "",
    amount: "",
    type: "inflow",
  });

  useEffect(() => {
    // Fetch initial transactions from an API or local storage
    // setTransactions(fetchedTransactions);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.description || !form.amount) {
      toast.error("Please fill in all fields");
      return;
    }
    const newTransaction = {
      ...form,
      amount: parseFloat(form.amount),
      date: new Date(form.date),
    };
    setTransactions([...transactions, newTransaction]);
    setForm({
      date: "",
      description: "",
      amount: "",
      type: "inflow",
    });
    toast.success("Transaction recorded successfully");
  };

  const totalInflow = transactions
    .filter((t) => t.type === "inflow")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflow = transactions
    .filter((t) => t.type === "outflow")
    .reduce((sum, t) => sum + t.amount, 0);

  const netCashFlow = totalInflow - totalOutflow;

  return (
    <Card className="max-w-4xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Cash Flow Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="inflow">Inflow</option>
              <option value="outflow">Outflow</option>
            </select>
          </div>
          <Button type="submit">Save Transaction</Button>
        </form>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <strong>Total Inflow: ${totalInflow.toFixed(2)}</strong>
        </div>
        <div className="mt-2">
          <strong>Total Outflow: ${totalOutflow.toFixed(2)}</strong>
        </div>
        <div className="mt-2">
          <strong>Net Cash Flow: ${netCashFlow.toFixed(2)}</strong>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashFlowManagement;