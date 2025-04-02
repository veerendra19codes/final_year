import { connectdb } from "@/lib/db";
import models from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

// GET request handler to retrieve budget details for a specific month and society
export async function GET(req) {
    await connectdb(); // Ensure database connection
    
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const societyId = searchParams.get("societyId");
    console.log("Starts here")
    console.log("Month is "+month)
    console.log("Society id is "+societyId)
    // Validate required query parameters
    if (!month || !societyId) {
        console.error("Missing query parameters: month or societyId");
        return NextResponse.json(
            { success: false, error: "Missing month or societyId in query" },
            { status: 400 }
        );
    }
    
    try {
        console.log(`Fetching budget for Month: ${month}, Society: ${societyId}`);
        const budgetDoc = await models.Budget.findOne({ month, societyId });
        
        if (!budgetDoc) {
            console.warn("No budget found for the given month and society.");
            return NextResponse.json(
                { success: false, error: "No budget found for this month/society." },
                { status: 404 }
            );
        }
        
        console.log("Budget found:", budgetDoc);
        return NextResponse.json({ success: true, budget: budgetDoc });
    } catch (error) {
        console.error("Error fetching budget:", error.message);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// POST request handler to create or update a budget entry
export async function POST(req) {
    await connectdb(); // Ensure database connection
    
    try {
        console.log("Post req reached")
        const body = await req.json(); // Parse request body
        const { month, societyId, totalBudget, expenses } = body;
        console.log(month, societyId, totalBudget, expenses)
        // Validate required fields
        if (!month || !societyId) {
            console.error("Missing required fields: month or societyId");
            return NextResponse.json(
                { success: false, error: "month and societyId are required." },
                { status: 400 }
            );
        }
        
        console.log(`Processing budget for Month: ${month}, Society: ${societyId}`);
        let budgetDoc = await models.Budget.findOne({ month, societyId });
        
        if (budgetDoc) {
            console.log("Existing budget found. Updating...");
            // Update the existing budget
            budgetDoc.totalBudget = totalBudget;
            budgetDoc.expenses = expenses;
            await budgetDoc.save();
        } else {
            console.log("No existing budget found. Creating new budget entry...");
            // Create a new budget document
            budgetDoc = await models.Budget.create({
                month,
                societyId,
                totalBudget,
                expenses,
            });
        }
        
        console.log("Budget saved successfully:", budgetDoc);
        return NextResponse.json({ success: true, budget: budgetDoc });
    } catch (error) {
        console.error("Error processing budget:", error.message);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}