export interface Story {
  storyContributions: Contributions[];
}

export interface Contributions {
  type: "cover" | "page";
  data: CoverContribution | PageContribution;
}

export interface CoverContribution {
  coverid: number;
  coverlastupdated: string;
  coverauthorname: string;
  covertitle: string;
}

export interface PageContribution {
  pagenum: number;
  pageauthorname: string;
  pagebody: string;
  pagelastupdated: string;
}

export interface ContributionRow {
  userid: number;

  coverid: number;
  coverlastupdated: string;
  coverauthorname: string;
  covertitle: string;

  pagenum: number;
  pageauthorname: string;
  pagebody: string;
  pagelastupdated: string;
}
