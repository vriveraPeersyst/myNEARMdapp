/* eslint-disable @typescript-eslint/no-explicit-any */
// src/polyfills/randomUUID.ts
import { v4 as uuidv4 } from "uuid";

if (typeof crypto !== "undefined" && !crypto.randomUUID) {
  // Attach a polyfill for older browsers
  (crypto as any).randomUUID = uuidv4;
}
