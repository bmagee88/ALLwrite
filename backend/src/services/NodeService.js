

async function createCover(client, cover){
  const res = await client.query(
    `insert into covers (title, author, genre, summary, first_page) values ('${cover.title}', '${cover.author}', '${cover.genre}', '${cover.summary}', ${cover.first_page});`
  );
  console.log(res.rows);
  return res.rows;

}


async function getBookmarksByUserId(client, user_id) {
  const res = await client.query(
    `select cb.cover_id as bm_cover_id \
    from cover_bookmarks cb \
    where cb.user_id = ${user_id}`
  );
  console.log(res.rows);
  return res.rows;
}


async function getCovers(client, limit) {
  const res = await client.query(
    // `select c.id as cover_id, c.title, c.author, c.genre, c.image_url, c.summary, cb.user_id as bm_user_id, cb.cover_id as bm_cover_id from covers c left join cover_bookmarks cb on c.id = cb.cover_id order by cover_id limit ${limit}`
    `select c.id as cover_id, c.title, c.author, c.genre, c.image_url, c.summary from covers c order by c.id limit ${limit}`
  );
  console.log(res.rows);
  return res.rows;
}

async function getAuthorChildForPage(client, author, p_id) {
  const res = await client.query(
    `select * from nodes where parent_id = '${p_id}' and author = '${author}'`
  );
  return res.rows;
}

async function getHighestRatingChoices(client, p_id) {
  const res = await client.query(
    `select * from nodes n join rating r on n.id = r.node_id where n.parent_id = ${p_id} order by r.rating desc limit 1`
  );
  return res.rows;
}

async function getLongestStoryChoicesFrom(client, n_id) {
  const res = await client.query(
    `with recursive tree AS (
        SELECT n1.id, n1.parent_id, 1 as hlevel, n1.id as root
        from nodes n1
        where n1.parent_id = ${n_id} -- is null -- = x --for root nodes
          
        UNION all
          
        SELECT n2.id, n2.parent_id, hlevel + 1, root as root
        FROM nodes n2
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
  getBookmarksByUserId,
  getCovers,
  getAuthorChildForPage,
  getHighestRatingChoices,
  getLongestStoryChoicesFrom,
};
