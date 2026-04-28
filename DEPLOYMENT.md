# Deploying LaundroFlow to Render

## Prerequisites
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
