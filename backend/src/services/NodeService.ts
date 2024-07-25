import { compare } from "bcryptjs";
import { Client, QueryResult } from "pg";
import User from "../entities/User.entity";
import Read from "../entities/Read.entity";
import Cover from "../entities/Cover.entity";
import PageDto from "../dtos/PageDto";

export async function togglePin(client: Client, userId: string, pageId: string) {
  try {
    const query = `
    WITH deleted AS (
      DELETE FROM pinned_pages
      WHERE user_id = $1 AND page_id = $2
      RETURNING *
    )
    INSERT INTO pinned_pages (user_id, page_id)
    SELECT $1, $2
    WHERE NOT EXISTS (SELECT 1 FROM deleted)
    returning *;
  `;

    const values = [userId, pageId];
    const result = await client.query(query, values);
    console.log("togglePin result", result);

    return result.rows;
  } catch (err) {
    console.error("Error executing toggling pin", err);
    return "Internal Server Error";
  }
}

export async function getPinByUserByPage(client: Client, userId: string, pageId: string) {
  try {
    const query = `
    SELECT * from pinned_pages where user_id = $1 AND page_id = $2
  `;

    const values = [userId, pageId];
    const result = await client.query(query, values);
    console.log("getPinByUserByPage result.rows", result.rows);

    return result.rows;
  } catch (err) {
    console.error("Error executing toggling pin", err);
    return "Internal Server Error";
  }
}

export async function getChoices(client: Client, parent_id: string, limit: string) {
  // console.log("pid, limit", parent_id, limit);
  const res = await client.query(
    `select * from page where parent_id = ${parent_id} order by RANDOM() limit ${limit}`
  );
  // console.log(res.rows);
  return res.rows;
}

export async function createCover(client: Client, cover: Cover) {
  // should be of type Cover
  // console.log("service: cover", cover);
  const query =
    "insert into covers (title, author, genre, summary, first_page) values ($1, $2, $3, $4, $5) returning *;";
  const values = [cover.title, cover.author, cover.genre, cover.summary, cover.first_page];
  const res = await client.query(query, values);
  // console.log(res.rows);
  return res.rows;
}

export async function updatePageWithCoverId(client: Client, pageid: number, coverid: number) {
  const query = "update page set cover_id = $1 where id = $2 returning *;";
  const values = [coverid, pageid];
  console.log("update page values", values);
  const res = await client.query(query, values);
  console.log(res.rows);
  return res.rows;
}

export async function login(client: Client, username: string, password: string) {
  console.log("username", username);
  console.log("password", password);
  const empty_result = {
    rowCount: 0,
    rows: [],
  };
  const testing = true;
  if (testing) {
    console.log("testing");

    const query = `select user_id, username, firstname, lastname, email from user_profile where username = $1 and test_text_password = $2`;
    const values = [username, password];

    const userInfo: QueryResult<any> = await client.query(query, values);
    console.log("userInfo:", userInfo.rows[0]);

    if (Array.isArray(userInfo.rows) && userInfo.rows.length === 0) {
      console.log("Array is empty or length is 0, returning empty result");
      return empty_result;
    } else {
      console.log("userInfo", userInfo.rows[0]);
      return userInfo.rows[0];
    }
  }
  // validate password
  // get username stored hashed password
  // const res: QueryResult<any> = await client
  //   .query(`select password from user_profile where username = '${username}';`)
  //   .then((get_hashed_pass_query_result) => {
  //     console.log("query results", get_hashed_pass_query_result);
  //     if (
  //       Array.isArray(get_hashed_pass_query_result) &&
  //       get_hashed_pass_query_result.length === 0
  //     ) {
  //       console.log("array empty or length 0, returning empty result");
  //       return empty_result;
  //     }
  //     let hashed_password_from_db = get_hashed_pass_query_result.rows[0].password;
  //     if (compare(password, hashed_password_from_db)) {
  //       const userInfo = client.query(
  //         `select user_id, username, firstname, lastname, email from user_profile where username = '${username}' and password = '${hashed_password_from_db}'`
  //       );
  //       console.log("userInfo:", userInfo);
  //       return userInfo;
  //     } else {
  //       console.log("password bad, returning empty result");
  //       return empty_result;
  //     }
  //   })
  //   .catch((err:Error) => {
  //     console.log("something went wrong:", err);
  //   });
  // console.log(res.rows);
  // return res.rows;
}

export async function isUsernameTaken(client: Client, username: string) {
  console.log("given username", username);
  const result = await client.query(
    `select username from user_profile where username = '${username}';`
  );
  console.log("usernames", result.rows);
  return Array.isArray(result.rows) && result.rows.length !== 0;
}

export async function createPage(client: Client, page: PageDto) {
  // page:Page
  // console.log("service: Page", page);
  const idQueryResult = await client.query("select id from page order by id desc limit 1"); // TODO table needs to auto incr the id
  // console.log("id", id.rows[0].id);
  const query = `insert into page (id, parent_id, prompt, body, page_num, author, cover_id) values ($1, $2, $3, $4, $5, $6, $7) returning *;`;
  const values = [
    idQueryResult.rows.length !== 0 ? idQueryResult.rows[0].id + 1 : 1,
    page.parent_id,
    page.prompt,
    page.body_text,
    page.page_num,
    page.author,
    page.cover_id,
  ];
  const res = await client.query(query, values);
  // const res = await client.query(`insert into page (id, parent_id, prompt, body, page_num, author) values (${id.rows[0].id+1}, ${page.parent_id}, ${page.prompt}, ${page.body}, ${page.page_num}, '${page.author}');`
  // );
  // console.log(res.rows);
  return res.rows;
}

export async function insertUserRatingByUserIdAndPageId(
  client: Client,
  user_id: string,
  page_id: string,
  rating: string
) {
  const res = await client.query(
    `insert into rating (user_id, page_id, rating) values (${user_id}, ${page_id}, ${rating})
    returning *;`
  );
  // console.log(res.rows);
  return res.rows;
}

export async function avgRatingByPageId(client: Client, page_id: string) {
  const res = await client.query(
    `select round(avg(rating),1) as avg_rating, count(rating) as total from rating where page_id = ${page_id}
    ;`
  );
  // console.log(res.rows);
  return res.rows;
}

export async function updateUserRatingByUserIdAndPageId(
  client: Client,
  user_id: string,
  page_id: string,
  rating: string
) {
  const res = await client.query(
    `update rating
    set rating = ${rating}
    where user_id = ${user_id} 
    and	page_id = ${page_id}
    returning *;`
  );
  // console.log(res.rows);
  return res.rows;
}

export async function getRatingByUserAndPage(client: Client, user_id: string, page_id: string) {
  const res = await client.query(
    `select * from rating where user_id = ${user_id} and page_id = ${page_id}`
  );
  // console.log(res.rows);
  return res.rows;
}

export async function readPage(client: Client, read: Read) {
  // should be of type Read
  const res = await client.query(
    // `insert into user_read_pages (user_id, page_id) values (${read.user_id}, ${read.page_id});`
    `insert into user_read_pages (user_id, page_id)
    SELECT ${read.user_id}, ${read.page_id}
    WHERE
    NOT EXISTS (
    SELECT user_id, page_id FROM user_read_pages WHERE user_id = ${read.user_id} and page_id = ${read.page_id}
    ) returning *;`
  );
  // console.log("read page:::", res.rows);
  return res.rows;
}

export async function getIfPageRead(client: Client, page_id: string, user_id: string) {
  const res = await client.query(
    `select * from user_read_pages where page_id=${page_id} and user_id=${user_id};`
  );
  // console.log("page is read", res.rows);
  return res.rows;
}

export async function getCoverById(client: Client, cover_id: string) {
  const res = await client.query(`select * from covers where id = ${cover_id};`);
  // console.log(res.rows);
  return res.rows;
}

export async function getPageById(client: Client, page_id: string) {
  const res = await client.query(`select * from page where id = ${page_id}`);
  // console.log(res.rows);
  return res.rows;
}

export async function getAllStarredCoversByUserId(client: Client, userId: number) {
  const res = await client.query(
    `select cb.cover_id as bm_cover_id \
    from cover_bookmarks cb \
    where cb.user_id = ${userId}`
  );
  // console.log(res.rows);
  return res.rows;
}

export async function getCovers(client: Client, limit: string) {
  console.log("node service typeof", typeof client);
  client.query;
  const res = await client.query(
    `select c.id as cover_id, c.title, c.author, c.genre, c.image_url, c.summary from covers c order by c.id limit ${limit}`
  );
  // console.log(res.rows);
  return res.rows;
}

export async function getAuthorChildForPage(client: Client, author: string, p_id: string) {
  const res = await client.query(
    `select * from page where parent_id = ${p_id} and author = '${author}' order by RANDOM()`
  );
  return res.rows;
}

export async function getHighestRatingChoices(client: Client, p_id: string) {
  const res = await client.query(
    `select * from page n join rating r on n.id = r.node_id where n.parent_id = ${p_id} order by r.rating desc limit 1`
  );
  return res.rows;
}

export async function getLongestStoryChoicesFrom(client: Client, n_id: string) {
  // console.log("longeststories:pageid:", n_id);
  const res = await client.query(
    `with recursive tree AS (
        SELECT n1.id, n1.parent_id, 1 as hlevel, n1.id as root
        from page n1
        where n1.parent_id = ${n_id} -- is null -- = x --for root nodes
          
        UNION all
          
        SELECT n2.id, n2.parent_id, hlevel + 1, root as root
        FROM page n2
        JOIN tree tr ON tr.id = n2.parent_id
      ),
      
      level_counts as (
          SELECT tr.root as root, tr.id as node_id, tr.parent_id as parent_id, tr.hlevel as hlevel
          FROM tree tr
          group by tr.root, tr.id, tr.parent_id, tr.hlevel
          order by tr.id, tr.hlevel
      )
      
      select lvlc.root as root_node, max(lvlc.hlevel) as more_pages
      from level_counts lvlc
      group by lvlc.root
      order by more_pages desc`
  );
  // console.log("lngeststories:rows", res.rows);
  return res.rows;
}

export async function upsertBookmark(
  client: Client,
  userId: number,
  coverId: number,
  pageId: number
) {
  try {
    const query = `
      INSERT INTO page_bookmarks (user_id, cover_id, page_id, updated_at)
      VALUES($1,$2,$3, NOW())
      ON CONFLICT (user_id, cover_id)
      DO UPDATE SET page_id = EXCLUDED.page_id,
      updated_at = NOW()
      RETURNING *;
    `;
    const values = [userId, coverId, pageId];

    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return "Record not found";
    }
  } catch (err) {
    console.error("Error executing query", err);
    return "Internal Server Error";
  }
}
export async function getAllCoversBookmarksByUserId(client: Client, userId: number) {
  try {
    const query = `select * from page_bookmarks where user_id = $1`;
    const values = [userId];

    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return "Record not found";
    }
  } catch (err) {
    console.error("Error executing query", err);
    return "Internal Server Error";
  }
}

export async function getBookmarkByUserIdAndCoverId(
  client: Client,
  userId: number,
  coverId: number
) {
  try {
    const query = `select * from page_bookmarks where user_id = $1 and cover_id = $2`;
    const values = [userId, coverId];

    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return "Record not found";
    }
  } catch (err) {
    console.error("Error executing query", err);
    return "Internal Server Error";
  }
}
