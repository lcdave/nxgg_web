const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getFieldFromTable(table, field, whereField, whereValue) {
  const data = await supabase
    .from(table)
    .select(field)
    .eq(whereField, whereValue)
    .single();

  return data.data;
}
