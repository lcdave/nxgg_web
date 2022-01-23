export default function ({ redirect, store, route }) {
  const isAdmin = store.state.auth.user.admin ? true : false;

  console.log("is admin: ", isAdmin);

  if (!isAdmin) {
    if (route.path !== "/user/dashboard/overview") {
      redirect({ path: "/user/dashboard/overview" });
    }
  }
}
