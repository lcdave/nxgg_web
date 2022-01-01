import { createClient } from "@supabase/supabase-js";

const credentials = {
  anonPulic:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTAzNTY4OSwiZXhwIjoxOTU2NjExNjg5fQ.GzJ2mWj7Dsi8YG8gzXSKA7QjJuJmb105-4Jc9hdC3Gg",
  url: "https://gmbuzdpradbrxaddglbn.supabase.co",
};
const supabase = createClient(credentials.url, credentials.anonPulic);
export default (_, inject) => {
  inject("supabase", supabase);
};
