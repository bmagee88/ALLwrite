import { Client } from "pg";
import User from "../entities/User.entity";
import Cover from "../entities/Cover.entity";
import Page from "../entities/Page.entity";
import Read from "../entities/Read.entity";

export function getChoices(client: Client, parent_id: string, limit: string): void;

export function createCover(client: Client, cover: Cover): void;

export function login(client: Client, username: string, password: string): void;

export function isUsernameTaken(client: Client, username: string): void;

export function createPage(client: Client, page: Page): void;

export function insertUserRatingByUserIdAndPageId(
  client: Client,
  user_id: string,
  page_id: string,
  rating: string
): void;

export function avgRatingByPageId(client: Client, page_id: string): void;

export function updateUserRatingByUserIdAndPageId(
  client: Client,
  user_id: string,
  page_id: string,
  rating: string
): void;

export function getRatingByUserAndPage(client: Client, user_id: string, page_id: string): void;

export function getIfPageRead(client: Client, page_id: string, user_id: string): void;

export function getCoverById(client: Client, cover_id: string): void;

export function getPageById(client: Client, page_id: string): void;

export function getCovers(client: Client, limit: string): void;

export function getAuthorChildForPage(client: Client, author: string, p_id: string): void;

export function getHighestRatingChoices(client: Client, p_id: string): void;

export function getLongestStoryChoicesFrom(client: Client, n_id: string): void;

export function upsertBookmark(
  client: Client,
  userId: number,
  coverId: number,
  pageId: number
): void;

export function getAllStarredCoversByUserId(client: Client, userId: number): void;

export function getAllCoversBookmarksByUserId(client: Client, userId: number): void;

export function getBookmarkByUserIdAndCoverId(
  client: Client,
  userId: number,
  coverId: number
): void;

export function getContinueReadingByUserId(client: Client, user_id: string): void;

export function togglePin(client: Client, userId: string, pageId: string): void;

export function getPinByUserByPage(client: Client, userId: string, pageId: string): void;
