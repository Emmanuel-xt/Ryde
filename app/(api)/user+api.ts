import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        const { name, email, clerkId } = await request.json();

        if (!name || !email || !clerkId) {
            return Response.json({ error: "Missing required fields" });
        }

        const response = await sql`
        INSERT INTO users (
            name, email, clerk_id
        )
        VALUES (
            ${name},
            ${email},
            ${clerkId}
        )`;

        console.log('user was created', response)

        return new Response(JSON.stringify({ data: response }), { status: 201 });
    } catch (error: any) {
        console.log("error inserting user", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
