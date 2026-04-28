# Deploying LaundroFlow - Frontend & Backend

## Architecture

- **Backend:** Express.js server on Render (https://laundroflow.onrender.com)
- **Frontend:** React + Vite on Vercel

---

## Part 1: Backend Deployment (Render)

### Prerequisites

- GitHub account with your repository
- Render.com account (free tier available)

## Deployment Steps

### 1. Push Your Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/laundroflow.git
git branch -M main
git push -u origin main
```

### 2. Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### 3. Configure the Web Service

Fill in the following settings:

- **Name:** `laundroflow`
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Plan:** Free (or upgrade as needed)

### 4. Add Environment Variables

In the "Advanced" section, click "Add Environment Variable" and add:

- **Key:** `NODE_ENV` → **Value:** `production`
- **Key:** `GEMINI_API_KEY` → **Value:** `[Your Google Gemini API Key]`

### 5. Deploy

Click "Create Web Service" and watch the deployment logs. Your app will be live at:

```
https://laundroflow.onrender.com
```

## How It Works

- **Build Phase:** Runs `npm run build` (builds React frontend with Vite)
- **Start Phase:** Runs `npm start` (starts Express server serving static files)
- **PORT:** Automatically assigned by Render and read from `process.env.PORT`
- **GEMINI_API_KEY:** Provided as environment variable for API access

## Troubleshooting

### Build Fails

- Check that `npm run build` works locally: `npm run build`
- Verify all dependencies are in `package.json` (not devDependencies only)

### Server Won't Start

- Check logs in Render dashboard
- Ensure `PORT` is read from `process.env.PORT` (already configured)

### API Requests Fail

- Verify GEMINI_API_KEY is correctly set
- Check CORS settings if frontend can't reach backend

## Local Testing

Test the production build locally:

```bash
npm run build
npm start
# Visit http://localhost:3000
```

## Redeployment

After pushing changes to GitHub, Render automatically redeploys:

```bash
git add .
git commit -m "Your changes"
git push
```

---

## Part 2: Frontend Deployment (Vercel)

### Prerequisites

- GitHub account with your repository
- Vercel.com account (free tier available)
- Backend URL from Render: `https://laundroflow.onrender.com`

### Deployment Steps

#### 1. Ensure Changes Are Pushed to GitHub

```bash
git add .
git commit -m "Add Vercel configuration"
git push
```

#### 2. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Search for and select your `laundroflow` repository
5. Click "Import"

#### 3. Configure Project Settings

**Framework Preset:** Select `Vite`

**Build & Development Settings:**

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### 4. Add Environment Variables

Click "Environment Variables" and add:

- **Name:** `VITE_API_BASE_URL`
- **Value:** `https://laundroflow.onrender.com`
- **Environments:** Select all (Production, Preview, Development)

Click "Add"

#### 5. Deploy

Click "Deploy" and wait for the build to complete. Your frontend will be live at:

```
https://laundroflow.vercel.app
```

(Vercel will show the actual URL after deployment)

### How It Works

- **Build Phase:** Runs `npm run build` (builds React with Vite, outputs to `dist/`)
- **Environment Variables:** `VITE_API_BASE_URL` is injected into the frontend
- **API Calls:** Frontend automatically communicates with Render backend
- **CORS:** Already configured in backend to accept requests from Vercel

### Environment Variables Reference

| Variable            | Value                              | Purpose                                         |
| ------------------- | ---------------------------------- | ----------------------------------------------- |
| `VITE_API_BASE_URL` | `https://laundroflow.onrender.com` | Backend API endpoint                            |
| `GEMINI_API_KEY`    | Your API Key                       | (only needed if frontend calls Gemini directly) |

### Testing the Connection

After deployment:

1. Visit your Vercel frontend URL
2. Try creating an order or viewing the dashboard
3. Check browser DevTools → Network tab to verify API calls go to `https://laundroflow.onrender.com/api/*`

### Troubleshooting

#### Build Fails on Vercel

- Check build logs in Vercel dashboard
- Run locally: `npm run build`
- Verify all dependencies are listed (not devDependencies)

#### Frontend Can't Reach Backend

- Verify `VITE_API_BASE_URL` is set to `https://laundroflow.onrender.com`
- Check browser console for CORS errors
- Confirm backend is running on Render

#### API Requests Return 404

- Ensure backend routes match: `/api/orders`, `/api/dashboard`
- Check Render backend logs
- Verify GEMINI_API_KEY is set on Render if needed

### Redeployment

Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Frontend changes"
git push origin main
```

Watch deployment progress in Vercel dashboard.

### Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `VITE_API_BASE_URL` if needed (backend can handle both URLs)

---

## Summary

| Service     | URL                              | Purpose                              |
| ----------- | -------------------------------- | ------------------------------------ |
| Backend API | https://laundroflow.onrender.com | Express server with order management |
| Frontend    | https://laundroflow.vercel.app   | React UI deployed on Vercel          |

Both services communicate via REST API. The frontend is configured to call the backend automatically.
