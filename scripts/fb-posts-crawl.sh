#!/usr/bin/env bash
# Visit each known Fix Eagle post permalink in agent-browser and capture
# every signed scontent image URL + post text from the DOM.
set -u
declare -A POSTS=(
  [koleos]="https://www.facebook.com/niklaas.n.kisilipile/posts/28381700051450264"
  [amarok]="https://www.facebook.com/niklaas.n.kisilipile/posts/28380572008229735"
  [wanted]="https://www.facebook.com/niklaas.n.kisilipile/posts/28378541278432808"
  [nissan]="https://www.facebook.com/niklaas.n.kisilipile/posts/28340496302237306"
  [jeep]="https://www.facebook.com/niklaas.n.kisilipile/posts/28323327190620884"
  [ranger]="https://www.facebook.com/niklaas.n.kisilipile/posts/28193867816900156"
  [mercedes]="https://www.facebook.com/niklaas.n.kisilipile/posts/28193727313580873"
  [workhorse]="https://www.facebook.com/niklaas.n.kisilipile/posts/26566500676303553"
)
mkdir -p /tmp/fb/posts
for key in koleos amarok wanted nissan jeep ranger mercedes workhorse; do
  url="${POSTS[$key]}"
  echo "=== $key"
  agent-browser open "$url" >/dev/null 2>&1
  agent-browser wait --load networkidle --timeout 25000 >/dev/null 2>&1
  agent-browser wait 3500 >/dev/null 2>&1
  agent-browser eval "
(() => {
  const imgs = Array.from(document.querySelectorAll('img[src*=\"scontent\"]'))
    .map(i => i.src).filter(s => /\\d{9,}_\\d{9,}_\\d+_n\\.(jpg|png|webp)/.test(s));
  const links = Array.from(document.querySelectorAll('a[href]'))
    .map(a => a.href).filter(h => /posts\\/|photos\\/|videos\\/|story_fbid|pfbid/.test(h))
    .slice(0, 12);
  const og = {};
  for (const m of document.querySelectorAll('meta[property^=\"og:\"]')) {
    og[m.getAttribute('property')] = m.getAttribute('content');
  }
  return JSON.stringify({imgs, links, og, text: document.body.innerText.slice(0, 2500)});
})()" > "/tmp/fb/posts/${key}.json" 2>&1
  python3 - "$key" <<'EOF'
import json, sys, re
key = sys.argv[1]
raw = open(f"/tmp/fb/posts/{key}.json").read().strip()
if raw.startswith('"'):
    raw = json.loads(raw)
try:
    d = json.loads(raw)
except Exception:
    print(f"{key}: PARSE FAIL: {raw[:100]}"); sys.exit(0)
ids = set()
for u in d["imgs"]:
    m = re.search(r"/(\d{9,15})_(\d{9,25})_\d+_n\.", u)
    if m: ids.add(f"{m.group(1)}_{m.group(2)}")
print(f"{key}: photos={len(ids)} ids={sorted(i.split('_')[1][-6:] for i in ids)}")
print(f"   og:title={str(d['og'].get('og:title'))[:60]!r}")
print(f"   og:img={(d['og'].get('og:image') or '')[:100]}")
txt = re.sub(r"\s+", " ", d["text"])[:220]
print(f"   text={txt!r}")
print(f"   links={[l.split('?')[0] for l in d['links'][:4]]}")
EOF
  sleep 2
done
