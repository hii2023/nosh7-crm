# NOSH7 CRM — WhatsApp Lead Manager

A **lightweight WhatsApp lead management CRM** built to run on GitHub Pages with a Supabase backend — no build pipeline, no server, just open and use.

## What It Does

Helps the NOSH7 sales team manage leads from first contact to conversion — add leads, send personalized WhatsApp messages with one tap, import bulk lists via CSV, and track status across the entire funnel.

## Key Features

### Lead Management
- **Add, edit, delete leads** — full CRUD with modal forms
- **Bulk status update** — change multiple leads at once
- **Lead categories** — organize by type, source, or segment
- **Search and filter** — find leads instantly

### WhatsApp Integration
- **One-tap WhatsApp send** via `wa.me` deep link
- **Message templates** with `{name}` personalization
- **Template library** — create and reuse message formats
- **No WhatsApp API needed** — works with standard WhatsApp

### Data Management
- **CSV import** — bulk-add leads from a spreadsheet
- **CSV export** — download filtered lead list at any time
- **Supabase backend** — data stored in PostgreSQL (leads, templates, categories tables)
- **Public RLS policies** — no auth server needed

### Dashboard
- **Stats overview** — total leads, by status, by category
- **Status distribution bars** — visual breakdown at a glance
- **Category breakdown** — pie/bar view by lead type

### PWA
- **Installable on mobile** — add to home screen via `manifest.json`
- **Service worker** (`sw.js`) — offline caching

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 (CDN) | UI — no build step |
| Supabase JS v2 | Backend (PostgreSQL) |
| HTML/CSS | Structure and styling |
| PWA | Installable app |

## Live Site

[https://hii2023.github.io/nosh7-crm](https://hii2023.github.io/nosh7-crm)

## Supabase Tables

| Table | Purpose |
|-------|---------|
| `leads` | Lead records |
| `templates` | WhatsApp message templates |
| `categories` | Lead category definitions |

## Audience

NOSH7 sales team and similar small sales teams managing WhatsApp-based lead outreach.