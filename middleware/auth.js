export default function ({ redirect, store, route }) {
  const isAuthenticated = store.state.auth.user ? true : false;

  console.log("isAuthenticated from auth: ", isAuthenticated);

  if (!isAuthenticated) {
    if (route.path !== "/user/login") {
      redirect({ name: "user-login" });
    }
  }
}
