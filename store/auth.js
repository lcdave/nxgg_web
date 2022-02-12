export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, user) {
    console.log("setUser: ", user);
    state.user = user;
  },
  setAdmin(state, admin) {
    state.user.admin = admin;
  },
};
