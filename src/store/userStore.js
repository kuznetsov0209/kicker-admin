import { types, flow } from "mobx-state-tree";
import api from "../api";
import User from "./user";

const UserStore = types
  .model({
    user: types.optional(types.array(User), [])
  })
  .actions(self => {
    return {
      getUsers: flow(function*() {
        const { users } = yield api.get("/api/users");
        self.users = users;
      })
    };
  });

export const store = UserStore.create({});
