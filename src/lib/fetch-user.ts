import { env } from "@/env";
import type { IClerkUserResponse } from "./clerk";

export const fetchUser = async (id: string) => {
  const res = await fetch(
    "https://api.clerk.com/v1/users?limit=1&offset=0&order_by=-created_at&user_id=" +
    id,
    {
      headers: {
        Authorization: "Bearer " + env.CLERK_SECRET_KEY,
      },
    },
  );

  const [user] = res.ok
    ? ((await res.json()) as [IClerkUserResponse | undefined])
    : []

  return user;
};
