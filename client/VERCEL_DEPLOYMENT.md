# Vercel Deployment Configuration

## Environment Variables Setup

To fix the API URL issues in your Vercel deployment, you need to set the following environment variable:

### 1. Set NEXT_PUBLIC_API_URL

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend-domain.com` or `https://your-backend-app.herokuapp.com`)
   - **Environment**: Production (and Preview if needed)

### 2. Backend Deployment

Make sure your Flask backend is deployed and accessible. You can deploy it to:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS/GCP/Azure
- Or any other hosting service

### 3. CORS Configuration

If your backend is on a different domain, ensure CORS is properly configured in your Flask app:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://your-frontend-domain.vercel.app"])
```

### 4. Testing the Configuration

After setting the environment variable:

1. Redeploy your Vercel app
2. Check the browser console for any API URL warnings
3. Test the delete functionality
4. Verify that items are properly deleted without showing "failed" messages

### 5. Troubleshooting

If you still see issues:

1. Check the browser's Network tab to see if API calls are going to the correct URL
2. Verify your backend is responding correctly
3. Check Vercel function logs for any errors
4. Ensure your backend is accessible from the internet

## Common Issues

- **404 errors**: Usually means the API URL is incorrect
- **CORS errors**: Backend needs CORS configuration
- **Network errors**: Backend might be down or unreachable
- **Delete shows "failed" but item is deleted**: This was fixed in the updated code 