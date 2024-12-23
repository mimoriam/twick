import { Webhook } from "svix";

import { headers } from "next/headers";

import db from "@/lib/db";

import { Prisma } from "@prisma/client";

import { WebhookEvent } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  return Response.json({ message: "The route is working" });
}

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;
  console.log({ eventType });

  if (eventType === "user.created" || eventType === "session.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username ?? "DEFAULT",
        imageUrl: payload.data.image_url ?? "",
      },
    });
  }

  if (eventType === "user.updated") {
    try {
      await db.user.update({
        where: {
          externalUserId: payload.data.id,
        },
        data: {
          username: payload.data.username,
          imageUrl: payload.data.image_url,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Record doesn't exist:
        if (err.code === "P2025") {
          await db.user.create({
            data: {
              externalUserId: payload.data.id,
              username: payload.data.username,
              imageUrl: payload.data.image_url,
            },
          });
        }
      }
    }
  }

  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      },
    });
  }

  return new Response("", { status: 200 });
}
