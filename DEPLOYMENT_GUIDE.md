# Complete Guide: Editing Your Portfolio & Deploying to a `.com` Domain

This comprehensive guide takes you step-by-step from editing your projects and skills to hosting your website for free and connecting your custom `.com` domain.

---

## 1. How to Edit, Add, or Remove Stuff Anytime

You have **two frictionless ways** to edit your portfolio:

### Method A: Using the In-Browser Live Editor (Zero Code!)
1. Run your website locally (`npm run dev`) or visit your live website.
2. Click the floating **"⚡ Live Editor"** button in the bottom-right corner (or press `Ctrl + Shift + E`).
3. An intuitive control modal opens where you can:
   - Change your name, bio, titles, email, and social links.
   - Click **"+ Add New Project"** to add a new project with image, tags, demo link, and github link.
   - Click **"Delete"** or edit any existing project.
   - Add or remove skills with emojis and proficiency levels.
4. Click **"Apply & Preview Changes"** to see your changes immediately on the page!
5. When satisfied, switch to the **"Export Code"** tab and click **"Download portfolioData.js"**. Place that downloaded file into `src/data/portfolioData.js`, and your changes are permanently saved!

### Method B: Directly Editing the Data File
Open `src/data/portfolioData.js` in any text editor. It is cleanly formatted:
- To add a project, copy one of the project objects in the `projects: [...]` list and fill in your details.
- To remove a project, delete that block.
- To update your skills, tweak the `skillCategories` list.

---

## 2. Deploying Your Website to the Web (100% Free)

We recommend **Vercel** or **Netlify** because they are free forever, lightning-fast, and provide automatic SSL (HTTPS) and continuous deployment whenever you update your code.

### Step 1: Push Your Code to GitHub
1. Make sure Git is initialized (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Go to [github.com](https://github.com) and create a new repository called `portfolio`.
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/log in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Select your `portfolio` repository from the list and click **"Import"**.
4. Leave all build settings at their defaults (Vite is automatically detected).
5. Click **"Deploy"**.
6. In about 30 seconds, your site is live worldwide on a free URL like: `https://your-portfolio.vercel.app`!

*Whenever you push changes or new projects to GitHub, Vercel automatically rebuilds and updates your site live within seconds.*

---

## 3. How to Connect Your Custom `.com` Domain

To have an address like `https://www.yourname.com` or `https://yourname.com`:

### Step 1: Purchase Your `.com` Domain
If you don't already own a domain, buy one from any reliable registrar (costs ~$9 to $12 per year):
- **Porkbun** ([porkbun.com](https://porkbun.com)) — Lowest renewal prices, free WHOIS privacy.
- **Cloudflare Registrar** ([cloudflare.com](https://cloudflare.com)) — At-cost pricing ($9.77/yr), maximum security.
- **Namecheap** ([namecheap.com](https://namecheap.com)) — Popular with beginner-friendly UI.

### Step 2: Add the Domain in Vercel
1. In your Vercel Dashboard, click on your portfolio project.
2. Go to **Settings** > **Domains**.
3. Type your domain (e.g., `yourname.com`) and click **Add**.
4. Vercel will recommend adding both `yourname.com` and `www.yourname.com`. Select that recommended option.

### Step 3: Configure DNS Records at Your Domain Registrar
Log into the website where you bought your domain (e.g. Porkbun, Namecheap, GoDaddy):
1. Navigate to your domain's **DNS Management** or **Manage DNS** area.
2. Add the following two records provided by Vercel:

| Type | Name / Host | Value / Points to | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or leave blank) | `76.76.21.21` | Automatic / 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 3600 |

*(Delete any default parking page records that your registrar may have added).*

### Step 4: Verification & Automatic Free SSL
- Within 5–15 minutes (often instant), Vercel will verify the DNS records.
- Vercel automatically issues an SSL certificate (free HTTPS lock icon).
- Your portfolio is now globally accessible at **`https://yourname.com`**!

---

## 4. Summary of Your Workflow Going Forward

```
┌─────────────────────────────────┐
│ Edit in Browser or Data File    │  Ctrl + Shift + E or edit portfolioData.js
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│ Commit & Push to GitHub         │  git add . && git commit -m "Update projects" && git push
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│ Automatic Vercel Redeployment   │  Live on yourname.com in under 60 seconds!
└─────────────────────────────────┘
```
