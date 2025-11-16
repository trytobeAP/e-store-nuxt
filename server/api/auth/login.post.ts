import { createError, useRuntimeConfig } from "#imports";

import { defineEventHandler, getHeader, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const contentType = getHeader(event, "content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw createError({
      statusCode: 415,
      statusMessage:
        "Unsupported Media Type: Content-Type must be application/json.",
    });
  }

  const body = await readBody(event);

  if (!body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Username and password are required.",
    });
  }

  const config = useRuntimeConfig(event);
  const apiBase = config.apiBase;

  try {
    const response = await $fetch("/auth/login", {
      method: "POST",
      baseURL: apiBase,
      body: {
        username: body.username,
        password: body.password,
      },
    });

    return response;
  } catch (error) {
    console.error("Login failed via Fake Store API:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid username or password.",
    });
  }
});
