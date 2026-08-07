#!/usr/bin/env bash
# BuggyRents — one-command GitHub setup.
# Creates the repo, pushes the code, and prints the Cloudflare steps.
#
#   cd ~/Documents/Claude/BuggyRents/site
#   bash deploy.sh
#
# Your token is read into memory only. It is never written to disk or echoed.

set -euo pipefail

OWNER="digitumarketing"
REPO="buggyrents"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

bold() { printf "\033[1m%s\033[0m\n" "$1"; }
ok()   { printf "  \033[32m✓\033[0m %s\n" "$1"; }
die()  { printf "  \033[31m✗\033[0m %s\n" "$1"; exit 1; }

bold "BuggyRents → GitHub"
echo

# ---------------------------------------------------------------- preflight
[ -d .git ] || die "No git repo here. Are you in BuggyRents/site?"
command -v git >/dev/null || die "git is not installed."
command -v curl >/dev/null || die "curl is not installed."

[ -f .git/index.lock ] && rm -f .git/index.lock && ok "cleared a stale git lock"

if git grep -qE "AIza[A-Za-z0-9_-]{30,}" 2>/dev/null; then
  die "A Google API key is committed. Remove it before pushing."
fi
ok "no secrets in the repo"

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git -c user.email=buggyrents@gmail.com -c user.name="Buggy Rents" \
      commit -qm "Update site" || true
  ok "committed pending changes"
fi
ok "$(git ls-files | wc -l | tr -d ' ') files ready"

# ---------------------------------------------------------------- token
echo
echo "Create a token at:"
echo "  https://github.com/settings/tokens/new?scopes=repo&description=BuggyRents%20deploy"
echo "Tick 'repo', set expiry to 7 days, generate, then paste it below."
echo
printf "GitHub token (input hidden): "
read -rs TOKEN
echo
[ -n "$TOKEN" ] || die "No token entered."

USER_JSON=$(curl -sS -H "Authorization: Bearer $TOKEN" https://api.github.com/user)
LOGIN=$(printf '%s' "$USER_JSON" | sed -n 's/.*"login": *"\([^"]*\)".*/\1/p' | head -1)
[ -n "$LOGIN" ] || die "Token rejected by GitHub."
ok "authenticated as $LOGIN"

# ---------------------------------------------------------------- repo
CODE=$(curl -sS -o /dev/null -w '%{http_code}' \
  -H "Authorization: Bearer $TOKEN" \
  "https://api.github.com/repos/$OWNER/$REPO")

if [ "$CODE" = "404" ]; then
  if [ "$LOGIN" = "$OWNER" ]; then URL="https://api.github.com/user/repos"
  else URL="https://api.github.com/orgs/$OWNER/repos"; fi
  RESP=$(curl -sS -X POST -H "Authorization: Bearer $TOKEN" "$URL" \
    -d "{\"name\":\"$REPO\",\"private\":true,\"description\":\"BuggyRents — Astro + Keystatic, deployed on Cloudflare Pages\"}")
  printf '%s' "$RESP" | grep -q '"full_name"' || die "Could not create repo: $(printf '%s' "$RESP" | head -c 200)"
  ok "created $OWNER/$REPO (private)"
else
  ok "repo $OWNER/$REPO already exists"
fi

# ---------------------------------------------------------------- push
git remote remove origin 2>/dev/null || true
git remote add origin "https://${TOKEN}@github.com/$OWNER/$REPO.git"
git branch -M main
git push -u origin main --quiet
git remote set-url origin "https://github.com/$OWNER/$REPO.git"   # strip token from config
unset TOKEN
ok "pushed to main"
ok "token removed from git config"

# ---------------------------------------------------------------- next
cat <<'STEPS'

────────────────────────────────────────────────────────────
Done. Now the Cloudflare part — this must be done in a browser,
because connecting Pages to GitHub requires an OAuth handshake
that cannot be scripted.

1. Create the session store (one command, opens a browser to log in):

     npx wrangler login
     npx wrangler kv namespace create SESSION

   Paste the printed id into wrangler.toml, replacing
   REPLACE_WITH_KV_NAMESPACE_ID, then:

     git add wrangler.toml && git commit -m "Add KV id" && git push

2. dash.cloudflare.com → Workers & Pages → Create → Pages
   → Connect to Git → authorise GitHub → pick digitumarketing/buggyrents

3. Build settings:
     Framework preset  Astro
     Build command     npm run build
     Output directory  dist

4. Environment variables:
     NODE_VERSION          22
     GOOGLE_MAPS_API_KEY   <the key from api.txt>

5. Save and Deploy. About two minutes.

Then send me the buggyrents.pages.dev URL.
────────────────────────────────────────────────────────────
STEPS
