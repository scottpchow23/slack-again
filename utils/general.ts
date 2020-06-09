import { User } from "models/user";

export function userMapFromList(users: User[]) {
  let map: { [id: string]: User } = {};
  users.forEach((user) => {
    map[user.id] = user;
  });
  return map;
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== undefined && value !== null;
}
