import { Client } from "pg";

export async function updatePinNote(client: Client, userId: number, pageId: number, note: string) {
  try {
    const query = `
        update pinned_pages
        set note = $1
        where user_id = $2 and page_id = $3
      `;

    const values = [note, userId, pageId];
    const result = await client.query(query, values);
    console.log("updatePinNote result", result);

    return result.rows;
  } catch (err) {
    console.error("Error executing updatePinNote", err);
    return "Internal Server Error";
  }
}
