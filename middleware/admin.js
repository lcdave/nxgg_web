import * as UserService from "@/services/supabase/user";

export default async function ({ redirect, store, route }) {
  const isAdmin = await UserService.checkIfAdminUser();

  console.log("is admin: ", isAdmin);

  if (!isAdmin) {
    if (route.path !== "/user/dashboard/overview") {
      redirect({ path: "/user/dashboard/overview" });
    }
  }
}
