"use client";

import { generateReactHelpers } from "@uploadthing/react";
import { type AppFileRouter } from "./core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<AppFileRouter>();
