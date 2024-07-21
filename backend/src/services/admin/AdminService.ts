import { Client } from "pg";
import { getCoverByPageId } from "../cover/CoverService";

export async function addCoverIdsToPages(client: Client) {
  console.log("XXX adding coverid to pages");

  let pageAndCovers: [{ pageid: number; coverid: number | null }] = [{ pageid: -1, coverid: -1 }];
  pageAndCovers.pop();
  // get all page ids
  // for each pageid get the coverid associated with it
  // update page set coverid where pageid = i
  const getAllPages_Query = `
      select id from page;
    `;
  const pageIdQueryResults = await client.query(getAllPages_Query);
  const pagesArr = [];
  for (let i = 0; i < pageIdQueryResults.rows.length; i++) {
    pageAndCovers.push({ pageid: pageIdQueryResults.rows[i].id, coverid: null });
    pagesArr.push(pageIdQueryResults.rows[i].id);
  }

  // console.log("pagesArr", pagesArr);
  // console.log("pageAndCovers", pageAndCovers);

  for (let i = 0; i < pageAndCovers.length; i++) {
    // console.log("=====================");
    const cover = await getCoverByPageId(client, pageAndCovers[i].pageid + "");
    // console.log("cover", cover);

    const pc_cover_index = pageAndCovers.findIndex((obj) => {
      // console.log("obj", obj);
      return obj.pageid === pageAndCovers[i].pageid;
    });
    // console.log("pc_cover_index (not 0 everytime)", pc_cover_index);
    if (cover.length === 0) {
      // console.log("cover not found, setting to page id");
      pageAndCovers[pc_cover_index].coverid = null;
      // console.log("pageAndCovers[pc_cover_index].coverid", pageAndCovers[pc_cover_index].coverid);
    } else {
      // console.log("cover found, taking cover id");
      // console.log("cover id", cover[0].id);
      pageAndCovers[pc_cover_index].coverid = cover[0].id;
      // console.log("pageAndCovers[pc_cover_index].coverid", pageAndCovers[pc_cover_index].coverid);
    }
  }

  // console.log("page and covers", pageAndCovers);

  const updateQuery = `update page set cover_id = $1 where id = $2 returning *`;
  for (let i = 0; i < pageAndCovers.length; i++) {
    const values = [pageAndCovers[i].coverid, pageAndCovers[i].pageid];
    console.log("updatevalues", values);

    try {
      const result = await client.query(updateQuery, values);
      console.log("result.rows", result.rows);
    } catch (err) {
      console.log("error happened during insert");
    }
  }

  return "test good (hopefully)";
}
