const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getProfile() {
  console.log("call here");
  const data = await supabase.from("profiles").select("*");

  console.log("user: ", data.data);

  return data.data;
}
