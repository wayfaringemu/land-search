# Deployment Instructions

## One-Click Deployment to Vercel

This app is ready to deploy to Vercel for free and it will be accessible from any device (phone, tablet, desktop).

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Sign up or log in with your GitHub account
3. Click "New Project"
4. Import this repository: `https://github.com/wayfaringemu/land-search`
5. Click "Deploy"
6. You'll get a live URL in ~2 minutes

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts and your site will be live!

### Your Deployment URL

Once deployed, you'll get a URL like:
`https://land-search.vercel.app`

You can access this from your phone by:
1. Opening the URL in your browser
2. Saving it as a bookmark
3. Or adding it to your home screen as a web app (iOS/Android)

## Features

✅ Search by city, state, or zip code
✅ Filter by minimum acres
✅ Filter by price range (min/max)
✅ View detailed property information
✅ Mobile-responsive design
✅ Fast, serverless backend

## Local Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000
