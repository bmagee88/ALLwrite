import { Client, QueryResult } from "pg";
import User from "../../entities/User.entity";

export async function createUser(client: Client, user: User) {
  //should be of type User
  // should be of type User
  const resUser: QueryResult<any> = await client
    .query(`insert into allwrite_user (id) values (default) returning *;`)
    .then((resUser) => {
      // console.log("resUser.rows[0]", resUser.rows[0])
      client.query(
        `insert into user_profile (user_id, username, firstname, lastname, email, password) values (${resUser.rows[0].id}, '${user.username}', '${user.firstname}', '${user.lastname}', '${user.email}', '${user.password}');`
      );
      return resUser;
    })
    .then((resUser) => {
      if (resUser.rows.length !== 0) {
        client.query(
          `insert into user_account (user_id, amount) values (${resUser.rows[0].id}, 100);`
        );
      }
      return resUser;
    })
    .then((resUser) => {
      if (resUser.rows.length !== 0) {
        client.query(`insert into user_settings (user_id) values (${resUser.rows[0].id});`);
      }
      return resUser;
    })
    .catch((err) => {
      // console.log(err);
      return resUser;
    });

  // console.log("id from insert", resUser[0].id);
  // if (resUser.rows.length !== 0) {
  //   const resProfile = await client.query(
  //     `insert into user_profile (user_id, username, firstname, lastname, email, password) values (${resUser.rows.id}, '${user.username}', '${user.firstname}', '${user.lastname}', '${user.email}', '${user.password}');`
  //   );
  //   const resAccount = await client.query(
  //     `insert into user_account (user_id, amount) values (${resUser.rows.id}, 100;`
  //   );
  // }
  // console.log(res.rows);
  return resUser.rows;
}

export async function getContinueReadingByUserId(client: Client, user_id: number) {
  console.log("in service getContinueReadingByUserId");
  const query = `select b.user_id as userId, c.id as coverId, c.title as coverTitle, p.id as pageId, p.body as pageBody, b.updated_at as lastUpdated, p.page_num as pagenum
    from page_bookmarks b 
    join covers c 
    on b.cover_id = c.id 
    join page p 
    on b.page_id = p.id 
    where b.user_id = $1
    order by b.updated_at desc`;
  const values = [user_id];
  const res = await client.query(query, values);
  console.log("rows", res.rows);
  return res.rows;
}

/** TODO fix query now that cover_id is in pages */
export async function getContributionsByUserId(client: Client, user_id: string) {
  console.log("in service getContributionsByUserId");
  const query = `select c.id as userId, c.id as coverId, c.title as coverTitle, p.id as pageId, p.body as pageBody, c.updated_at as lastUpdated, p.page_num as pagenum 
    from covers c 
    join page p 
    on c.id = p.id 
    where c.id = $1
    order by c.updated_at desc`;
  const values = [user_id];
  const res = await client.query(query, values);
  console.log("rows", res.rows);
  return res.rows;
}
