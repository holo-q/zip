# GoDaddy DNS Configuration for holoq.ai

## DNS Records to Add in GoDaddy DNS Management

### A Records (for root domain)
Add these 4 A records for holoq.ai:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

### CNAME Record (for www subdomain)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | YOUR-GITHUB-USERNAME.github.io | 3600 |

## Steps to Configure in GoDaddy:

1. Log into your GoDaddy account
2. Go to "My Products" → "Domains"
3. Click "Manage" next to holoq.ai
4. Select "DNS" from the domain settings
5. Delete any existing A records for @ (root domain)
6. Add the 4 A records listed above
7. Add the CNAME record for www (replace YOUR-GITHUB-USERNAME with your actual GitHub username)
8. Save all changes

## GitHub Repository Settings:

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Choose "main" (or "master") branch and "/ (root)" folder
5. The custom domain should auto-populate from the CNAME file
6. Wait for DNS propagation (can take up to 48 hours, usually much faster)
7. Once DNS propagates, check "Enforce HTTPS"

## Verification:

After setup, you can verify DNS propagation using:
```bash
dig holoq.ai
nslookup holoq.ai
```

The domain should resolve to GitHub's IP addresses listed above.

## Timeline:
- DNS changes: 5-60 minutes typically
- GitHub Pages deployment: 10-20 minutes
- HTTPS certificate: Automatic after DNS verification (few minutes)