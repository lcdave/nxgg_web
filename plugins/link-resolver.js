export default function (doc) {
  if (doc.type === "tourney") {
    return "/tourneys/detail/" + doc.uid;
  }

  if (doc.type === "news") {
    return "/news/detail/" + doc.uid;
  }

  if (doc.type === "event") {
    return "/events/detail/" + doc.uid;
  }

  return "/not-found";
}
