const CANONICAL_HOST = "date-night-ideas.com";

export function canonicalRedirectUrl(request) {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();

  if (hostname !== CANONICAL_HOST && hostname !== `www.${CANONICAL_HOST}`) {
    return null;
  }

  if (url.protocol === "https:" && hostname === CANONICAL_HOST) {
    return null;
  }

  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";
  return url;
}

export default {
  async fetch(request, env) {
    const redirectUrl = canonicalRedirectUrl(request);
    if (redirectUrl) {
      return Response.redirect(redirectUrl.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  }
};
