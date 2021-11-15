module.exports = {
  images: {
    domains: ["unsplash.com/", "fakestoreapi.com", "images.unsplash.com", "lh3.googleusercontent.com"]
  },
  env: {
    stripe_publice_key: process.env.STRIPE_PUBLIC_KEY,
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
    FB_MESSAGING_ID: process.env.FB_MESSAGING_ID,
    FB_APP_ID: process.env.FB_APP_ID
  }
}
