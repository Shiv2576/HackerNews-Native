import { apiFetch } from "./client";
import type { Item, User } from "@/shared/types";

// ---- Story Lists ----

export const getTopStories = () => apiFetch<number[]>("/topstories.json");

export const getBestStories = () => apiFetch<number[]>("/beststories.json");

export const getAskStories = () => apiFetch<number[]>("/askstories.json");

export const getShowStories = () => apiFetch<number[]>("/showstories.json");

export const getNewStories = () => apiFetch<number[]>("/newstories.json");

export const getJobStories = () => apiFetch<number[]>("/jobstories.json");

// ---- Single Item ----

export const getItemDetails = (id: number | string) =>
  apiFetch<Item>(`/item/${id}.json`);

// ---- User ----

export const getUserDetails = (id: number | string) =>
  apiFetch<User>(`/user/${id}.json`);
