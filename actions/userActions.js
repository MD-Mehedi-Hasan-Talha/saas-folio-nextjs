"use server";

import { signIn, signOut } from "@/auth";

export async function credntialLogin(data) {
  try {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    return response;
  } catch (error) {
    if (error?.cause?.err?.message?.includes("Invalid Credential!")) {
      return {
        error: "Invalid Credential!",
        status: 401,
      };
    }
    return {
      error: error?.message,
      status: 500,
    };
  }
}

export async function doSignOut() {
  await signOut();
}
