import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest) {
  try {
    const allUsers = await prisma.user.findMany();
    return new Response(JSON.stringify(allUsers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.log("Error Here")
    console.error(error);
    return new Response("Error on fetching", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return new Response('Method not allowed', {
      status: 405
    })
    //return res.status(405).json({ message: 'Method not allowed' });
  }
  console.log("Request:")
  console.log(req.body)
  const { userId, newScore }: { userId: number; newScore: number } = await req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        score: newScore
      },
    });

    return new Response(JSON.stringify({ message: 'User count updated successfully', user: userId }), {status:200});
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error updating user count' }), {status:500});
  }
}