"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, PlusCircle, TrendingDown, Wallet } from "lucide-react";

// (Optional) If you still want the top-right pie chart, leave this section
// import { Pie } from "react-chartjs-2"; 
// and render it conditionally where needed

// We already calculate pieData below for the current month expense breakdown
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function BudgetPage() {
  const session = useSession();
  console.log("session: ", session);

  // Use the session user id as societyId (or adjust as needed)
  const soc_id = session.data?.user?.id;
  const [societyId] = useState(soc_id);
  const [month, setMonth] = useState("2023-06");
  const [expenses, setExpenses] = useState([]);
  const [totalBudget, setTotalBudget] = useState(300000);
  const [newExpense, setNewExpense] = useState({
    name: "",
    date: "",
    amount: 0,
    category: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State to store user details (including role)
  const [user, setUser] = useState({});

  // State for line chart (monthly balance from Jan to current month)
  const [monthlyBalance, setMonthlyBalance] = useState([]);
  const [lineLabels, setLineLabels] = useState([]);

  // Fetch user details by id
  useEffect(() => {
    const fetchUserById = async () => {
      try {
        console.log("fetch user");
        if (!session.data?.user?.id) return;
        console.log("session is: " + session.data.user.id);
        const res = await fetch("/api/getuserbyid", {
          method: "POST",
          body: JSON.stringify({ id: session.data.user.id }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        console.log("data: ", data);
        setUser(data.user);
      } catch (error) {
        console.log("error in fetching user by id: ", error);
      }
    };
    fetchUserById();
  }, [session]);

  // Load the budget data for the selected month
  const loadBudget = async () => {
    if (!month || !societyId) return;
    try {
      const res = await fetch(`/api/budget?month=${month}&societyId=${societyId}`);
      const data = await res.json();
      if (data.success) {
        setExpenses(data.budget.expenses || []);
        setTotalBudget(data.budget.totalBudget || 300000);
      } else {
        // Reset if no budget exists
        setExpenses([]);
        setTotalBudget(300000);
      }
    } catch (error) {
      console.error("Error loading budget:", error);
    }
  };

  // Save (or update) the budget data
  const saveBudget = async () => {
    try {
      const res = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month,
          societyId,
          totalBudget,
          expenses,
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Budget saved successfully:", data.budget);
      } else {
        console.error("Error saving budget:", data.error);
      }
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  // Add a new expense locally
  const handleAddExpense = () => {
    if (newExpense.name && newExpense.date && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, amount: Number(newExpense.amount) }]);
      setNewExpense({ name: "", date: "", amount: 0, category: "" });
      setIsDialogOpen(false);
    }
  };

  // Calculate budget figures for the current month
  const budgetSpend = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetBalance = totalBudget - budgetSpend;

  // Reload budget when the month changes
  useEffect(() => {
    loadBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  // Calculate pie chart data: group current month's expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Function to fetch monthly balance data from January to the current month
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMonthlyLineData = async () => {
    if (!societyId) return;
    const currentDate = new Date();
    const currentMonthNumber = currentDate.getMonth() + 1; // 1-indexed month
    const currentYear = currentDate.getFullYear();
    let balances = [];
    let labels = [];
    for (let i = 1; i <= currentMonthNumber; i++) {
      const monthStr = `${currentYear}-${i.toString().padStart(2, "0")}`;
      labels.push(new Date(currentYear, i - 1).toLocaleString("default", { month: "short" }));
      try {
        const res = await fetch(`/api/budget?month=${monthStr}&societyId=${societyId}`);
        const data = await res.json();
        if (data.success && data.budget) {
          // Compute balance = totalBudget - sum(expense amounts)
          const expenseSum = (data.budget.expenses || []).reduce(
            (sum, expense) => sum + expense.amount,
            0
          );
          const balance = data.budget.totalBudget - expenseSum;
          balances.push(balance);
        } else {
          // Default balance if no data exists
          balances.push(300000);
        }
      } catch (error) {
        console.error(`Error fetching budget for ${monthStr}:`, error);
        balances.push(300000);
      }
    }
    setMonthlyBalance(balances);
    setLineLabels(labels);
  };

  // Build Line chart data using monthlyBalance state
  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Budget Balance",
        data: monthlyBalance,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  // Fetch monthly line data once societyId is available
  useEffect(() => {
    if (societyId) {
      fetchMonthlyLineData();
    }
  }, [societyId, fetchMonthlyLineData]);

  return (
    <div className="container mx-auto p-4 space-y-6 bg-white text-black">
      {/* Month Selector and Load */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Society Budget</h1>
        <div className="flex items-center gap-2">
          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <Button onClick={loadBudget} className="bg-blue-500 hover:bg-blue-400">Load Budget</Button>
        </div>
      </div>

      {/* Total Budget and Save Button (only for secretary) */}
      {user.role === "secretary" && (
        <div className="flex items-center gap-4">
          <label>Total Budget:</label>
          <Input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value))}
            className="max-w-xs"
          />
          <Button onClick={saveBudget} className="bg-blue-500 hover:bg-blue-400">Save Budget</Button>
        </div>
      )}

      {/* Dialog for Adding a New Expense (only for secretary) */}
      {user.role === "secretary" && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-400">
              <PlusCircle className="mr-2 h-4 w-4 " /> Add New Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-black">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Enter the details of the new expense.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">Name</label>
                <Input
                  id="name"
                  value={newExpense.name}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right">Date</label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, date: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="amount" className="text-right">Amount</label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: Number(e.target.value) })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right">Category</label>
                <Input
                  id="category"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, category: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="bg-gray-200 hover:bg-gray-100 text-black rounded-lg p-2">
                Cancel
              </DialogClose>
              <Button type="submit" onClick={handleAddExpense} className="bg-blue-500 hover:bg-blue-400">
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Budget Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {budgetBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Remaining from total budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Budget Spend</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {budgetSpend.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total expenses so far
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs.{totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Allocated budget for the period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Expense Table and Current Month Expense Pie Chart */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Expense Table */}
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Expense Table</CardTitle>
              <CardDescription>
                A detailed list of all society expenses for {month}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Serial No.</TableHead>
                    <TableHead>Name of Expense</TableHead>
                    <TableHead>Date of Expense</TableHead>
                    <TableHead>Amount Spent</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense, index) => (
                    <TableRow key={expense.id || index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>Rs. {expense.amount.toFixed(2)}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        {/* Current Month Expense Pie Chart */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Current Month Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={pieData} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Line Chart: Monthly Budget Balance from January to current month */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Balance</CardTitle>
          <CardDescription>
            Budget balance from January to the current month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Budget Balance Trend" },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
// 6701239534d37f87f82f5a2d