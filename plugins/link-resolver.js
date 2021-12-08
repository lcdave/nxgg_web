export default function (doc) {
  console.warn(JSON.stringify(doc));
  if (doc.type === "tourney") {
    return "/tourney/detail/" + doc.uid;
  }

  return "/not-found";
}
