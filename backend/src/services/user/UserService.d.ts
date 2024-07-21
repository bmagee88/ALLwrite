import { Client } from "pg";
import User from "../../entities/User.entity";

export function createUser(client: Client, user: User): void;

export function getContinueReadingByUserId(client: Client, user_id: string): void;

export function getContributionsByUserId(client: Client, user_id: string);
