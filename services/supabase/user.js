const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const user = supabase.auth.user();

export async function getProfile() {
  const data = await supabase.from("profiles").select("*").eq("id", user.id);

  return data.data;
}

export async function getAuthUser() {
  const ff = await supabase.auth.user();
  console.log("service: ", ff);
  return ff;
}

export async function checkIfAdminUser() {
  const data = await supabase.from("profiles").select("*").eq("id", user.id);

  if (data.data[0].isAdmin) {
    return true;
  } else {
    return false;
  }
}
