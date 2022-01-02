export default function ({ redirect, store, route }) {
  const isAuthenticated = store.state.auth.user ? true : false;

  if (!isAuthenticated) {
    if (route.path !== "/user/login") {
      redirect({ name: "user-login" });
    }
  }
}
