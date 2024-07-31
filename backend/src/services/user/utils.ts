import {
  ContributionRow,
  Contributions,
  CoverContribution,
  PageContribution,
  Story,
} from "./interfaces";

export function pickSubset<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}

/** returns: [cover1, page11, page12, page13, cover2, page21, page22, cover3, cover4, page41] */
export async function formatContributions(allContributions: any[]) {
  console.log("allContributions", allContributions);
  let story = [] as Story[];
  let seenCoverIds: number[] = [];
  let coverData;
  let pageData;
  let storyContributions: Contributions[] = [];
  let isFirstStory = true;
  if (allContributions.length === 0) {
    return story; // min items 0
  }
  allContributions.forEach((row: ContributionRow) => {
    console.log(`seen ${row.coverid} in ${seenCoverIds}?: ${seenCoverIds.includes(row.coverid)}`);
    if (!seenCoverIds.includes(row.coverid)) {
      if (isFirstStory) {
        console.log("first story");
        isFirstStory = false;
      } else {
        console.log("mid push");
        const newContribs = storyContributions;
        storyContributions = [];
        story.push({ storyContributions: newContribs });
        console.log("story:", story);
      }
      coverData = {
        coverid: row.coverid,
        covertitle: row.covertitle,
        coverauthorname: row.coverauthorname,
        coverlastupdated: row.coverlastupdated,
      } as CoverContribution;
      storyContributions.push({ type: "cover", data: coverData });
      pageData = {
        pagenum: row.pagenum,
        pageauthorname: row.pageauthorname,
        pagebody: row.pagebody,
        pagelastupdated: row.pagelastupdated,
      } as PageContribution;
      storyContributions.push({ type: "page", data: pageData });
    } else {
      pageData = {
        pagenum: row.pagenum,
        pageauthorname: row.pageauthorname,
        pagebody: row.pagebody,
        pagelastupdated: row.pagelastupdated,
      } as PageContribution;
      storyContributions.push({ type: "page", data: pageData });
    }

    seenCoverIds.push(row.coverid);
  });

  console.log("final push");
  const newContribs = storyContributions;
  story.push({ storyContributions: newContribs }); // min items 2 at this point
  return story;
}
