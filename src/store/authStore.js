import { types, flow } from "mobx-state-tree";
import api from "../api";

const Profile = types.model({
  id: types.number,
  name: types.string,
  photoUrl: types.maybeNull(types.string)
});

const AuthStore = types
  .model({
    profile: types.maybe(Profile)
  })
  .actions(self => {
    return {
      loadProfile: flow(function*() {
        try {
          const { data } = yield api.get(`/api/me`);
          self.profile = data;
        } catch (e) {}
      }),
      afterCreate() {
        self.loadProfile();
      }
    };
  });

export default AuthStore;
