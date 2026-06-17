# SSH Workbench

A tiny wrapped PWA for common Daedalus SSH, Docker, Docker Compose, Cloudflare Tunnel, and system checks.

## Run locally

Serve the folder from a local web server:

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

Then open:

```text
http://localhost:4173
```

The app works offline after the first load because it registers a service worker.

For install testing, use a browser with PWA support and open the local server URL rather than opening `index.html` directly.

## Notes

- Search for terms like `502`, `logs`, `restart`, `tunnel`, `disk`, `ram`, `compose`, or `git`.
- Change the host, container, folder, and port fields to update the generated commands.
- Use **Copy** on a single command or **Copy visible** for the current filtered list.
