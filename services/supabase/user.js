const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const user = supabase.auth.user();

export async function getProfile() {
  const data = await supabase.from("profiles").select("*").eq("id", user.id);

  return data.data[0];
}

export async function checkIfUsernameExists(username) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username);

  if (data.length > 0 && !error) {
    return true;
  } else if (data.length == 0 && !error) {
    return false;
  }

  if (error) {
    this.$toast.show("Fehler, bitte kontaktieren Sie den Administrator", {
      duration: 4000,
      type: "error",
      position: "top-right",
    });

    return false;
  }
}

export async function checkIfEmailExists(email) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (data.length > 0 && !error) {
    return true;
  } else if (data.length == 0 && !error) {
    return false;
  }

  if (error) {
    this.$toast.show("Fehler, bitte kontaktieren Sie den Administrator", {
      duration: 4000,
      type: "error",
      position: "top-right",
    });

    return false;
  }
}

export async function getAuthUser() {
  return user;
}

export async function checkIfAdminUser() {
  const data = await supabase.from("profiles").select("*").eq("id", user.id);

  if (data.data[0].isAdmin) {
    return true;
  } else {
    return false;
  }
}
