# 🌍 TravelBuddy Search

Help travelers find culturally relevant services when visiting a city.

---

## 🚀 Deploy to GitHub Pages (Step by Step)

### Step 1 — Create a GitHub repo
1. Go to [github.com](https://github.com) → click **New repository**
2. Name it exactly: `travelbuddy-search`
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Update the base path
Open `vite.config.js` and make sure the `base` matches your repo name:
```js
base: '/travelbuddy-search/',
```
If you named your repo something different, change it to match.

### Step 3 — Push the code
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/travelbuddy-search.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Save

### Step 5 — Watch it deploy
Go to the **Actions** tab in your repo. You'll see the workflow running.
Once it's green ✅, your site is live at:

```
https://YOUR_USERNAME.github.io/travelbuddy-search/
```

---

## 💻 Run locally
```bash
npm install
npm run dev
```
