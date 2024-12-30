import User from "@/models/User";
import connectToDB from "@/utils/database";

export const GET = async (request) => {
    try {
        // Connect to the database
        await connectToDB();
        // Fetch users from the database
        const users = await User.find({});
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Failed to fetch users" + error), { status: 500 })
    }
} 