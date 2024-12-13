import { Status } from "./types";

export const PAGE_SIZE = 5;

export const statusToTagName: { [key in Status]: string } = {
  [Status.UNCONFIRMED]: "blue",
  [Status.CHECKED_IN]: "green",
  [Status.CHECKED_OUT]: "silver",
};
