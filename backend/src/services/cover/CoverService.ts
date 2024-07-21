import { Client } from "pg";

/** this is recursive. Depreciate */
export async function getCoverByPageId(client: Client, page_id: string) {
  const res = await client.query(`with recursive tree AS (
      SELECT n1.id, n1.parent_id, 1 as hlevel
      from page n1
      where n1.id = ${page_id}
        
      UNION all
        
      SELECT n2.id, n2.parent_id, hlevel + 1
      FROM page n2
      JOIN tree tr ON tr.parent_id = n2.id
    )
  
  select  	  c.id as id
  , c.title
  , c.author
  , c.genre
  , c.summary
  , c.first_page
  , c.image_url
  , t.id as page_id
  , t.parent_id
  , t.hlevel
  , ${page_id} as leaf_node
  from covers c 
  join tree t
  on c.first_page = t.id
  where c.first_page = (
  select tr.id 
  from tree tr 
  where tr.parent_id is null)
  `);
  // console.log("get cover by page id", res.rows);
  return res.rows;
}
