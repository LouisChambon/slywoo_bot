import { Ping } from "./Ping.js";
import { Help } from "./Help.js";

export function Commands(client) {
  return Ping(client), Help(client);
}
