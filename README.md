# NOSH7 CRM — WhatsApp Lead Manager

A lightweight CRM for managing real estate/diet-food leads with WhatsApp messaging, built for **GitHub Pages + Supabase**.

---

## 🚀 How to Go Live (5 mins)

### Step 1 — Upload to GitHub
1. Open your GitHub repo (`nosh7-crm`)
2. Click **Add file → Upload files**
3. Drag and drop `index.html` (this file's companion)
4. Click **Commit changes**

### Step 2 — Enable GitHub Pages
1. Go to repo **Settings → Pages**
2. Under **Source**, select `Deploy from a branch`
3. Choose branch: `main`, folder: `/ (root)`
4. Click **Save**
5. Wait ~60 seconds → your site is live at:
   `https://YOUR_USERNAME.github.io/nosh7-crm`

---

## 🗄️ Database Setup (Supabase)

Run this SQL in your Supabase **SQL Editor**:

```sql
-- Leads table
create table leads (
  id text primary key,
  name text,
  phone text,
  email text,
  website text,
  address text,
  status text default 'New',
  category text,
  area text,
  follow_up_date text,
  last_contacted text,
  notes text,
  created_date text
);

-- Templates table
create table templates (
  id text primary key,
  name text,
  message text
);

-- Categories table
create table categories (
  name text primary key
);

-- Allow public read/write (for anon key access)
alter table leads enable row level security;
alter table templates enable row level security;
alter table categories enable row level security;

create policy "Public access" on leads for all using (true) with check (true);
create policy "Public access" on templates for all using (true) with check (true);
create policy "Public access" on categories for all using (true) with check (true);
```

---

## ✅ Features

| Feature | Details |
|---|---|
| Leads | Add, edit, delete, bulk update |
| WhatsApp | Opens wa.me with pre-filled message |
| Templates | Saved messages with `{name}` personalization |
| Categories | Organize leads by type |
| Import | Upload CSV to bulk-add leads |
| Export | Download filtered leads as CSV |
| Dashboard | Stats, status bars, category breakdown |
| Storage | All data saved to Supabase cloud |

---

## 📱 Access From Anywhere

Once live, open on:
- **Laptop** → browser bookmark
- **Phone** → Add to Home Screen (PWA-like)
- **Team** → Share the GitHub Pages URL

---

## 🛠 Tech Stack
- React 18 (via CDN, no build needed)
- Supabase JS v2
- Tailwind-inspired custom CSS
- No npm, no webpack, no dependencies to install

---

*Built for NOSH7 · Ahmedabad · 2026*
