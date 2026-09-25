# Deployment guide

The site is a static single-page app. `pnpm run build:web` produces everything in `dist/public/`, and both Cloudflare and Vercel serve that folder directly — no server needed. The repo already contains the config for both, so each host only needs to be pointed at the GitHub repo.

| | Cloudflare Workers | Vercel |
| --- | --- | --- |
| Config file | `wrangler.jsonc` + `client/public/_headers` | `vercel.json` |
| Build command | `pnpm run build:web` | read from `vercel.json` |
| Output | `dist/public` | `dist/public` |
| Node.js | 22 (from `.node-version`) | 22 (from `package.json` `engines`) |
| Auto-deploy | every push to `main` | every push to `main` |

Pick one host for the live domain. You can deploy to both, but point the domain at only one.

---

## Option A — Cloudflare Workers

### 1. Import the existing repository

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application**.
2. Choose **Import a repository** (under "Get started").
   Do **not** use the flow that says *"A Git repository will be created for you"* — that creates a new, empty repo instead of deploying this one.
3. Connect GitHub if asked, and select **swandigitalsolutions / Karate-Website-New**.

### 2. Configure the build

Cloudflare detects `wrangler.jsonc` automatically. Check the fields match:

| Setting | Value |
| --- | --- |
| Project name | `karate-website-new` — **must match** `name` in `wrangler.jsonc` |
| Production branch | `main` |
| Build command | `pnpm run build:web` — **required; do not leave this as None** |
| Deploy command | `npx wrangler deploy` (default) |
| Root directory | leave empty |

No environment variables or secrets are needed.

### 3. Deploy

Click **Save and Deploy**. If the build settings show **Build command: None**, enter `pnpm run build:web` before saving. The first build takes 2–3 minutes. When it finishes the site is live at
`https://karate-website-new.<your-subdomain>.workers.dev`.

### 4. Add your own domain (optional)

1. The domain must be on Cloudflare (**Add a domain** in the dashboard, then change the nameservers at your registrar to the two Cloudflare gives you).
2. Open the Worker → **Settings** → **Domains & Routes** → **Add** → **Custom domain** → enter e.g. `disciplinekarate.in` (and again for `www.disciplinekarate.in`).
3. HTTPS certificates are issued automatically within a few minutes.

### Deploying from your computer instead (optional)

```bash
pnpm install
pnpm exec wrangler login     # one-time browser sign-in
pnpm run deploy              # builds, then uploads dist/public
```

---

## Option B — Vercel

### 1. Import the repository

1. Open [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Under **Import Git Repository**, pick **swandigitalsolutions / Karate-Website-New** → **Import**.

### 2. Configure the project

`vercel.json` sets the install command, build command and output folder, so the dashboard fields can stay as detected:

| Setting | Value |
| --- | --- |
| Framework Preset | **Other** |
| Root Directory | `./` |
| Build / Output / Install | leave the overrides **off** — `vercel.json` provides them |

No environment variables are needed.

### 3. Deploy

Click **Deploy**. The site is live at `https://karate-website-new.vercel.app` (or a similar name) when the build completes.

### 4. Add your own domain (optional)

1. Project → **Settings** → **Domains** → enter your domain → **Add**.
2. Vercel shows the DNS record to create at your registrar (an `A` record for the root domain, a `CNAME` for `www`). HTTPS is automatic once DNS resolves.

---

## After the first deploy

- **Updates:** push to `main` and the site redeploys automatically on whichever host is connected.
- **Update the domain in SEO files:** once the real domain is known, replace `disciplinekarate.example` in `client/public/robots.txt` and `client/public/sitemap.xml`, and add a `<link rel="canonical">` to `client/index.html`.
- **Check the result:** open the site on a phone, tap the floating **Call** and **WhatsApp** buttons, and submit the trial form once to confirm the WhatsApp message arrives.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Cloudflare: *"The name in your Wrangler configuration file does not match…"* | Rename the project in the dashboard to `karate-website-new`, or change `name` in `wrangler.jsonc` to match and push. |
| Cloudflare: *"No Wrangler configuration detected"* | You're on the create-new-repo flow; go back and use **Import a repository** instead. |
| Build fails on `pnpm install --frozen-lockfile` | `pnpm-lock.yaml` is out of date — run `pnpm install` locally, commit the lockfile, push. |
| Photos missing after deploy | Make sure `client/public/images/` is committed. Regenerate with `python scripts/build-images.py` if needed. |
| Old version still showing | Hard-refresh (Ctrl + Shift + R). Pages revalidate on every visit; JS/CSS filenames change on every build, so caches never serve stale code. |
