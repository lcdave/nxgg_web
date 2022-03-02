import { createClient } from "@supabase/supabase-js";

let supabase;

if (process.env.appmode === "dev") {
  supabase = createClient(
    process.env.SUPABASE_URL_DEV,
    process.env.SUPABASE_KEY_DEV
  );
} else if (process.env.appmode === "prod") {
  supabase = createClient(
    process.env.SUPABASE_URL_PROD,
    process.env.SUPABASE_KEY_PROD
  );
}

export default (_, inject) => {
  inject("supabase", supabase);
};
