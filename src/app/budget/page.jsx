'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DollarSign, PlusCircle, TrendingDown, Wallet } from 'lucide-react'

// type Expense = {
//     id: number
//     name: string
//     date: string
//     amount: number
//     category: string
// }

export default function BudgetPage() {
    const [expenses, setExpenses] = useState([
        { id: 1, name: "Electricity Bill", date: "2023-06-01", amount: 150, category: "Utilities" },
        { id: 2, name: "Water Bill", date: "2023-06-05", amount: 80, category: "Utilities" },
        { id: 3, name: "Landscaping", date: "2023-06-10", amount: 200, category: "Maintenance" },
        { id: 4, name: "Security System", date: "2023-06-15", amount: 100, category: "Security" },
        { id: 5, name: "Cleaning Services", date: "2023-06-20", amount: 300, category: "Maintenance" },
        { id: 6, name: "Insurance Premium", date: "2023-06-25", amount: 500, category: "Insurance" },
        { id: 7, name: "Internet Services", date: "2023-06-30", amount: 120, category: "Utilities" },
    ])
    const [newExpense, setNewExpense] = useState({ name: '', date: '', amount: 0, category: '' })
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const totalBudget = 300000
    const budgetSpend = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const budgetBalance = totalBudget - budgetSpend

    const handleAddExpense = () => {
        if (newExpense.name && newExpense.date && newExpense.amount) {
            setExpenses([
                ...expenses,
                {
                    id: expenses.length + 1,
                    ...newExpense,
                    amount: Number(newExpense.amount)
                }
            ])
            setNewExpense({ name: '', date: '', amount: 0, category: '' })
            setIsDialogOpen(false)
        }
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Society Budget</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Expense
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white">
                        <DialogHeader>
                            <DialogTitle>Add New Expense</DialogTitle>
                            <DialogDescription>
                                Enter the details of the new expense here.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="name" className="text-right">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    value={newExpense.name}
                                    onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="date" className="text-right">
                                    Date
                                </label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={newExpense.date}
                                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="amount" className="text-right">
                                    Amount
                                </label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={newExpense.amount}
                                    onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="category" className="text-right">
                                    Category
                                </label>
                                <Input
                                    id="category"
                                    value={newExpense.category}
                                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddExpense}>Add Expense</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Budget Balance
                        </CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${budgetBalance.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            Remaining from total budget
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Budget Spend
                        </CardTitle>
                        <TrendingDown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${budgetSpend.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            Total expenses so far
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Budget
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            Allocated budget for the period
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Expense Table</CardTitle>
                    <CardDescription>A detailed list of all society expenses.</CardDescription>
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
                                <TableRow key={expense.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{expense.name}</TableCell>
                                    <TableCell>{expense.date}</TableCell>
                                    <TableCell>${expense.amount.toFixed(2)}</TableCell>
                                    <TableCell>{expense.category}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}