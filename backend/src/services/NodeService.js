async function getChoices(client, parent_id, limit) {
  console.log("pid, limit", parent_id, limit);
  const res = await client.query(
    `select * from page where parent_id = ${parent_id} order by RANDOM() limit ${limit}`
  );
  // console.log(res.rows);
  return res.rows;
}

async function createCover(client, cover) {
  const res = await client.query(
    `insert into covers (title, author, genre, summary, first_page) values ('${cover.title}', '${cover.author}', '${cover.genre}', '${cover.summary}', ${cover.first_page});`
  );
  // console.log(res.rows);
  return res.rows;
}

async function createPage(client, page) {
  const id = await client.query("select id from page order by id desc limit 1");
  console.log("id", id.rows[0].id);
  const res = await client.query(
    `insert into page (id, parent_id, prompt, body, page_num, author) values (${
      id.rows[0].id + 1
    }, ${page.parent_id}, '${page.prompt}', '${page.body_text.toString()}', ${
      page.page_num
    }, '${page.author}');`
  );
  // const res = await client.query(`insert into page (id, parent_id, prompt, body, page_num, author) values (${id.rows[0].id+1}, ${page.parent_id}, ${page.prompt}, ${page.body}, ${page.page_num}, '${page.author}');`
  // );
  console.log(res.rows);
  return res.rows;
}

async function insertUserRatingByUserIdAndPageId(
  client,
  user_id,
  page_id,
  rating
) {
  const res = await client.query(
    `insert into rating (user_id, page_id, rating) values (${user_id}, ${page_id}, ${rating})
    returning *;`
  );
  // console.log(res.rows);
  return res.rows;
}

async function avgRatingByPageId(client, page_id) {
  const res = await client.query(
    `select round(avg(rating),1) as avg_rating, count(rating) as total from rating where page_id = ${page_id}
    ;`
  );
  // console.log(res.rows);
  return res.rows;
}

async function updateUserRatingByUserIdAndPageId(
  client,
  user_id,
  page_id,
  rating
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

async function getRatingByUserAndPage(client, user_id, page_id) {
  const res = await client.query(
    `select * from rating where user_id = ${user_id} and page_id = ${page_id}`
  );
  // console.log(res.rows);
  return res.rows;
}

async function readPage(client, read) {
  const res = await client.query(
    // `insert into user_read_pages (user_id, page_id) values (${read.user_id}, ${read.page_id});`
    `insert into user_read_pages (user_id, page_id)
    SELECT ${read.user_id}, ${read.page_id}
    WHERE
    NOT EXISTS (
    SELECT user_id, page_id FROM user_read_pages WHERE user_id = ${read.user_id} and page_id = ${read.page_id}
    ) returning *;`
  );
  console.log("read page:::", res.rows);
  return res.rows;
}

async function getCoverById(client, cover_id) {
  const res = await client.query(`select * from covers where id = ${cover_id}`);
  // console.log(res.rows);
  return res.rows;
}

async function getCoverByPageId(client, page_id) {
  const res = await client.query(`with recursive tree AS (
    SELECT n1.id, n1.parent_id, 1 as hlevel
    from page n1
    where n1.id = ${page_id}
      
    UNION all
      
    SELECT n2.id, n2.parent_id, hlevel + 1
    FROM page n2
    JOIN tree tr ON tr.parent_id = n2.id
  )

select *, ${page_id} as leaf_node
from covers c 
join tree t
on c.first_page = t.id
where c.first_page = (
select tr.id 
from tree tr 
where tr.parent_id is null)
`);
  console.log(res.rows);
  return res.rows;
}

async function getPageById(client, page_id) {
  const res = await client.query(`select * from page where id = ${page_id}`);
  // console.log(res.rows);
  return res.rows;
}

async function getBookmarksByUserId(client, user_id) {
  const res = await client.query(
    `select cb.cover_id as bm_cover_id \
    from cover_bookmarks cb \
    where cb.user_id = ${user_id}`
  );
  // console.log(res.rows);
  return res.rows;
}

async function getCovers(client, limit) {
  const res = await client.query(
    `select c.id as cover_id, c.title, c.author, c.genre, c.image_url, c.summary from covers c order by c.id limit ${limit}`
  );
  // console.log(res.rows);
  return res.rows;
}

async function getAuthorChildForPage(client, author, p_id) {
  const res = await client.query(
    `select * from page where parent_id = ${p_id} and author = '${author}' order by RANDOM()`
  );
  return res.rows;
}

async function getHighestRatingChoices(client, p_id) {
  const res = await client.query(
    `select * from page n join rating r on n.id = r.node_id where n.parent_id = ${p_id} order by r.rating desc limit 1`
  );
  return res.rows;
}

async function getLongestStoryChoicesFrom(client, n_id) {
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
  return res.rows;
}

module.exports = {
  createCover,
  avgRatingByPageId,
  createPage,
  getChoices,
  getCoverById,
  getPageById,
  getBookmarksByUserId,
  getCovers,
  getAuthorChildForPage,
  getHighestRatingChoices,
  getLongestStoryChoicesFrom,
  getCoverByPageId,
  readPage,
  getRatingByUserAndPage,
  insertUserRatingByUserIdAndPageId,
  updateUserRatingByUserIdAndPageId,
};
