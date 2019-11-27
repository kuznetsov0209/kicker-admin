import { types, flow } from "mobx-state-tree";
import api from "../api";
import User from "./user";

const PAGE_SIZE = 20;

const UserStore = types
  .model({
    users: types.optional(types.array(User), []),
    hasMoreUsers: types.optional(types.boolean, true)
  })
  .actions(self => {
    return {
      getUsers: flow(function*({ page }) {
        const { users } = yield api.get("/api/users");
        self.users.push(
          ...users.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
        );
        self.hasMoreUsers = self.users.length != users.length;
      })
    };
  });

export const store = UserStore.create({});
