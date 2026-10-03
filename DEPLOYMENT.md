# How to Build and Deploy the NexaAI Website

This guide is written for beginners. Follow the steps in order. Do not skip any step.

---

## Part 0 – What you are doing (in plain words)

This website is a **static website**. That means:

- You run one command (**build**). It turns the code into a folder called **`out`**.
- The `out` folder holds ordinary files (HTML, images, CSS, JavaScript).
- You copy the `out` folder to a **server**, and a web server program (**Nginx**) shows those files to visitors.

The server does not need Node.js to run the site. Node.js is only needed on the computer where you **build**.

```
Your computer                          Server
-------------                          ------
code  --(npm run build)-->  out/  --(upload)-->  /var/www/nexaai  --> Nginx --> visitors
```

### Words you will see

| Word | Meaning |
|------|---------|
| Terminal | A window where you type commands (on Mac: the "Terminal" app) |
| Server | A computer on the internet that is always on (e.g. a VPS from Hetzner, Infomaniak, DigitalOcean, AWS) |
| SSH | A safe way to log in to the server from your terminal |
| Node.js / npm | Tools needed to build the website |
| Nginx | A program on the server that shows the website to visitors |
| Domain | The website address, e.g. `www.NexaAI.ch` |
| DNS | The setting that connects a domain to the server's IP address |

> Type each command exactly as shown, then press **Enter**. Lines starting with `#` are comments; do not type them.

---

## Part 1 – What you need before you start

1. **The code** on your computer (this folder).
2. **A server** running Ubuntu (22.04 or 24.04 is recommended). Write down:
   - the server's **IP address** (example: `203.0.113.10`)
   - the **username** (often `root` or `ubuntu`)
   - the **password or SSH key** from your hosting provider
3. **A domain name** (example: `www.NexaAI.ch`). You can add it later; the site works by IP address first.
4. **Node.js version 20.9 or newer** on the computer where you build. Check by typing:
   ```bash
   node -v
   ```
   If you see `v20.9.0` or higher, it is fine. If not, install the **LTS** version from https://nodejs.org.

---

## Part 2 – Build the website (on your computer)

### Step 1. Open the Terminal in the project folder

On Mac, open **Terminal** and type:

```bash
cd /Users/aanvi/Documents/GitHub/enelope-website
```

### Step 2. Install the required packages

```bash
npm install
```
This downloads everything the site needs. It takes 1–3 minutes. Warnings in yellow are normal. Red **errors** are not.

### Step 3. Set the website address

The site needs to know its final address (used for Google/SEO links).

1. Open the file named `.env.local` in the project folder (create it if it is missing).
2. Make sure it contains this line, using **your real domain**:
   ```
   NEXT_PUBLIC_SITE_URL=https://www.NexaAI.ch
   ```
3. Save the file.

> The other lines in `.env.example` (Supabase, Resend, admin) are **not used** by the current website code. You can ignore them. Never share or upload secret keys.

### Step 4. Build

```bash
npm run build
```

Wait until it finishes. Success looks like a list of pages and no red error message. A folder named **`out`** is created or updated.

> **Important:** Always run Step 4 again after any change to the code or to `.env.local`. The address is baked into the files at build time.

### Step 5. (Optional) Test the build on your computer

```bash
npm start
```
Open the link shown in the terminal (usually http://localhost:3000). If the site looks right, press **Ctrl + C** to stop.

### Step 6. Pack the `out` folder into one file (makes uploading easier)

```bash
cd out
zip -r ../out.zip .
cd ..
```
You now have `out.zip` in the project folder.

---

## Part 3 – Prepare the server (do this only once)

### Step 7. Log in to the server

Replace `SERVER_IP` with your server's IP address, and `root` with your username if it is different:

```bash
ssh root@SERVER_IP
```
- If asked "Are you sure you want to continue connecting?", type `yes` and press Enter.
- Enter the password (nothing appears as you type; that is normal).

From now on, commands in Steps 8–11 run **on the server**.

### Step 8. Update the server and install Nginx and unzip

```bash
sudo apt update
sudo apt install -y nginx unzip
```

### Step 9. Create the folder for the website

```bash
sudo mkdir -p /var/www/nexaai
```

### Step 10. Tell Nginx how to serve the website

Create the settings file:

```bash
sudo nano /etc/nginx/sites-available/nexaai
```

Paste this (replace `www.NexaAI.ch` and `NexaAI.ch` with your domain; if you have no domain yet, use `server_name _;`):

```nginx
server {
    listen 80;
    server_name NexaAI.ch www.NexaAI.ch;

    root /var/www/nexaai;
    index index.html;

    # Lets /about open about.html, etc.
    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Show the site's own "not found" page
    error_page 404 /404.html;

    # Cache files that never change (faster site)
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Save and exit `nano`: press **Ctrl + O**, then **Enter**, then **Ctrl + X**.

### Step 11. Turn the settings on

```bash
sudo ln -s /etc/nginx/sites-available/nexaai /etc/nginx/sites-enabled/nexaai
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
```
`nginx -t` must say **"syntax is ok"** and **"test is successful"**. If not, re-check Step 10. Then:

```bash
sudo systemctl reload nginx
```

Type `exit` to leave the server and return to your computer.

---

## Part 4 – Upload and publish the website

### Step 12. Upload `out.zip` to the server (on your computer)

In the project folder:

```bash
scp out.zip root@SERVER_IP:/tmp/out.zip
```

### Step 13. Unpack it on the server

```bash
ssh root@SERVER_IP
```
Then on the server:

```bash
sudo rm -rf /var/www/nexaai/*
sudo unzip -o /tmp/out.zip -d /var/www/nexaai
sudo chown -R www-data:www-data /var/www/nexaai
rm /tmp/out.zip
```

### Step 14. Check that it works

Open a browser and go to `http://SERVER_IP`. You should see the website.

If you see a blank page or the Nginx welcome page, see **Troubleshooting** below.

---

## Part 5 – Connect your domain and enable HTTPS (the padlock)

### Step 15. Point the domain to the server

In your domain provider's website (where you bought the domain), open **DNS settings** and add:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `SERVER_IP` |
| A | `www` | `SERVER_IP` |

Wait 5–60 minutes (sometimes longer) for this to take effect.

### Step 16. Install the free HTTPS certificate

Log in to the server (`ssh root@SERVER_IP`) and run:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d NexaAI.ch -d www.NexaAI.ch
```
- Enter your email when asked and accept the terms.
- When asked about redirecting HTTP to HTTPS, choose **redirect**.

Now open `https://www.NexaAI.ch`. You should see the padlock. The certificate renews automatically.

---

## Part 6 – How to update the website later

Every time you change the website, repeat only these:

1. On your computer, in the project folder: `npm run build`
2. `cd out && zip -r ../out.zip . && cd ..`
3. `scp out.zip root@SERVER_IP:/tmp/out.zip`
4. On the server:
   ```bash
   sudo rm -rf /var/www/nexaai/*
   sudo unzip -o /tmp/out.zip -d /var/www/nexaai
   sudo chown -R www-data:www-data /var/www/nexaai
   rm /tmp/out.zip
   ```

No restart is needed. Refresh the browser (**Ctrl/Cmd + Shift + R**) to see the changes.

---

## Troubleshooting

| Problem | What to do |
|---------|------------|
| `node: command not found` | Install Node.js LTS from https://nodejs.org and reopen Terminal. |
| `npm run build` shows red errors | Run `npm install` again. If it still fails, copy the error text and ask a developer. |
| Browser shows the Nginx "Welcome" page | Step 11 was skipped. Run `sudo rm -f /etc/nginx/sites-enabled/default` then `sudo systemctl reload nginx`. |
| `403 Forbidden` | Run `sudo chown -R www-data:www-data /var/www/nexaai`. |
| `404 Not Found` on the home page | Check `ls /var/www/nexaai`. `index.html` must be directly inside it, not in a subfolder. If it's in a subfolder, redo Step 13. |
| Site opens by IP but not by domain | DNS not updated yet (wait), or the domain name in Step 10 has a typo. |
| Certbot fails | The domain must already point to the server (Step 15). Wait and retry. |
| Can't connect with `ssh` | Check the IP, and that the hosting provider's firewall allows ports **22, 80, 443**. |
| Old version still showing | Hard refresh the browser (**Ctrl/Cmd + Shift + R**). |

---

## Notes

- **Forms and server features:** The site is a static export (`output: "export"` in `next.config.mjs`). It has no back-end. If a contact form, admin page, Supabase or Resend email is added later, this setup will need changes (a Node.js server or a separate API).
- **Never commit secrets.** `.env.local` is already ignored by git. Don't upload it to the server; it's not needed there.
- **Easier alternative:** Hosts like Vercel, Netlify or Cloudflare Pages can build and publish this site automatically from GitHub, with no server to manage.
