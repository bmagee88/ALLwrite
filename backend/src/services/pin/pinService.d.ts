import { Client } from "pg";

export function updatePinNote(client: Client, userId: number, pageId: number, note: string): void;
