export async function getData() {
  const { data, error } = await this.$supabase.from("tourneys").select();

  console.log(data);
  return { data, error };
}
