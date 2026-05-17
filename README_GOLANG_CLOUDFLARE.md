# 🛡️ TVK Golang Production Backend for Cloudflare

This directory contains the production-ready **Golang 1.25** backend for the **Tamilaga Vettri Kazhagam (TVK)** official web platform. It is engineered with zero external framework dependencies for maximum performance, security, and portability.

## 🌟 Key Features
- **Standard Library Routing**: Uses Go 1.25's built-in high-performance HTTP multiplexer.
- **Built-in CORS Middleware**: Enables secure cross-origin requests from your Vue frontend.
- **Persistent Data Storage**: Automatically stores citizen ideas, grievances, volunteer registrations, and newsletter subscribers to a persistent JSON store (`data.json`).
- **Multi-Stage Docker Build**: Generates a secure, ultra-lightweight Alpine container under 15MB.

---

## 🚀 How to Run Locally

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run the server:
   ```bash
   go build -o tvk-server main.go
   ./tvk-server
   ```
3. The server will start on `http://localhost:8080`.

---

## ☁️ How to Host on Cloudflare (100% Free)

You can connect this lightning-fast Go backend directly to Cloudflare's global edge network using **Cloudflare Tunnels (`cloudflared`)** for secure, free SSL hosting without opening any firewall ports!

### Step 1: Run your Go Backend (or Docker Container)
```bash
docker build -t tvk-golang-backend ./backend
docker run -d -p 8080:8080 --name tvk-backend -v $(pwd)/backend/data:/data tvk-golang-backend
```

### Step 2: Install Cloudflared CLI
```bash
brew install cloudflare/cloudflare/cloudflared
```

### Step 3: Authenticate & Create Tunnel
```bash
cloudflared tunnel login
cloudflared tunnel create tvk-prod-backend
```

### Step 4: Route Traffic to Your Subdomain
```bash
cloudflared tunnel route dns tvk-prod-backend api.tvk.family
```

### Step 5: Run the Tunnel
Create a `config.yml`:
```yaml
url: http://localhost:8080
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json
```
Start the tunnel:
```bash
cloudflared tunnel run tvk-prod-backend
```

Your Golang backend is now live worldwide behind Cloudflare's enterprise DDoS protection and CDN!
