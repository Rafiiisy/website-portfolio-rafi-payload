# VPS deploy (pull-only)

Do **not** run `docker compose build` on a 1 GB VPS. Images are built on GitHub Actions and stored on GHCR.

## 1. GitHub (one-time)

1. Push to `main` — workflow **Docker publish** builds and pushes:
   `ghcr.io/<owner>/project-sumba-air-payload:main` (owner lowercased).
2. Repo → **Packages** → open the package → set visibility if needed.
3. For a **private** package, the VPS needs `docker login ghcr.io` with a PAT (`read:packages`).

## 2. VPS infrastructure (one-time)

- Traefik in a separate folder (e.g. `~/traefik`) on Docker network **`proxy`**:
  ```bash
  docker network create proxy   # if missing
  cd ~/traefik && docker compose up -d
  ```
- DNS: your hostname → VPS IP.
- Optional: 2 GB swap on small instances.

## 3. App `.env` on the VPS

Copy `.env.example` → `.env` and set (example):

```env
SITE_URL=https://test-sumba.ai.dev.kesato.com
PAYLOAD_SECRET=<long random>
DOCKER_PAYLOADCMS_IMAGE=ghcr.io/<your-github-user>/project-sumba-air-payload:main
DOCKER_PAYLOADCMS_HOST=Host(`test-sumba.ai.dev.kesato.com`)
DOCKER_MONGO_DB_PASSWORD=<strong password>
```

Traefik cert resolver name must be `letsencrypt` (matches labels in `docker-compose.yml`).

## 4. Deploy / update

```bash
cd ~/project-sumba-air-payload
git pull
docker login ghcr.io   # once, if package is private
docker compose --profile production pull payloadcms
docker compose --profile production up -d mongo payloadcms
```

Never use `--build` on the VPS.

## 5. Seed database (first time)

With Mongo publishing `27017`, from your PC:

```bash
ssh -L 27017:127.0.0.1:27017 root@YOUR_VPS
# In project folder, DATABASE_URI=...@127.0.0.1:27017/...
npm run seed
```

Or install Node on the VPS and run `npm run seed` there (no image build required).

## 6. Verify

```bash
docker compose --profile production ps
docker compose --profile production logs -f payloadcms
curl -s https://your-hostname/api/healthcheck
```

Admin: `https://your-hostname/admin`
