# Haq Collectibles LLC - Website

A professional static website for Haq Collectibles LLC, ready to host on GitHub Pages.

## 🚀 Quick Start

### Option 1: GitHub Pages Deployment

1. **Fork or clone this repository**

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Under "Source," select `main` branch
   - Select `/ (root)` folder
   - Click Save

3. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/REPO_NAME/
   ```

### Option 2: Custom Domain

1. Follow Option 1 steps above
2. In Settings → Pages, add your custom domain
3. Create a `CNAME` file in the root with your domain:
   ```
   www.haqcollectibles.com
   ```
4. Configure your domain's DNS to point to GitHub Pages

## 📁 File Structure

```
haq-collectibles/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services (Buy/Sell/Consign/Procure)
├── categories.html         # Category descriptions
├── collection.html         # Photo gallery page
├── how-it-works.html       # Process explanations
├── contact.html            # Contact forms (Google Form embeds)
├── insights.html           # Educational content
├── policies.html           # Privacy, Terms, Shipping, Returns
├── 404.html                # Custom 404 error page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Core functionality
│   └── collection.js       # Gallery functionality
├── collection/
│   └── images.json         # Gallery image manifest
├── images/                 # Site images (logo, favicon, etc.)
└── README.md               # This file
```

## 🖼️ Setting Up the Collection Gallery

The collection page displays photos from your `collection/` folder. There are two ways to configure it:

### Method 1: JSON Manifest (Recommended)

Edit `collection/images.json` to list your images:

```json
{
  "images": [
    {
      "filename": "coin-1921-morgan-dollar.jpg",
      "title": "1921 Morgan Silver Dollar",
      "category": "coins",
      "description": "Uncirculated condition"
    },
    {
      "filename": "book-hemingway-first-edition.jpg",
      "title": "Hemingway First Edition",
      "category": "books"
    }
  ]
}
```

**Fields:**
- `filename` (required): Image filename in the collection folder
- `title` (optional): Display title (defaults to formatted filename)
- `category` (optional): For filtering (coins, currency, books, cards, games, tech, ephemera)
- `description` (optional): Additional details

### Method 2: GitHub API Auto-Detection

Edit `js/collection.js` and change the CONFIG:

```javascript
const CONFIG = {
  USE_GITHUB_API: true,
  GITHUB_REPO: 'your-username/haq-collectibles',
  // ...
};
```

**Naming convention for auto-categorization:**
- `coins-morgan-1921.jpg` → Category: Coins
- `books-hemingway.jpg` → Category: Books
- `cards-pokemon-charizard.jpg` → Category: Cards

**Note:** GitHub API has rate limits. The JSON manifest method is more reliable for high-traffic sites.

## 📝 Adding Google Forms

The contact page has placeholders for Google Form embeds. To add your forms:

1. **Create your Google Form** with appropriate fields
2. **Get the embed code:**
   - Click "Send" in Google Forms
   - Click the `<>` embed icon
   - Copy the iframe code
3. **Replace the placeholder** in `contact.html`:

```html
<!-- Replace this: -->
<div class="form-placeholder">
  <p>📝 Google Form will be embedded here</p>
</div>

<!-- With this: -->
<iframe 
  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
  width="100%" 
  height="600" 
  frameborder="0">
  Loading…
</iframe>
```

### Recommended Form Fields

**General Contact Form:**
- Name
- Email
- Message

**Sell/Consign Form:**
- Name (required)
- Email (required)
- Phone (optional)
- Service type: Sell / Consign / Not sure
- Category: Coins / Currency / Books / Cards / Games / Tech / Ephemera / Other
- Item description (required)
- Photo upload (allow multiple)
- Provenance/history (optional)
- Price expectation (optional)

**Procurement Request Form:**
- Name (required)
- Email (required)
- Category
- Item description (required)
- Condition requirements
- Budget range
- Timeline/urgency

## 🎨 Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
  --color-cream: #F7F5F0;
  --color-charcoal: #2C2C2C;
  --color-gold: #B8956E;
  /* ... */
}
```

### Fonts

The site uses Google Fonts:
- **Cormorant Garamond** - Headlines
- **Source Sans 3** - Body text

To change fonts, update the `<link>` tags in each HTML file and the CSS variables.

### Logo

Replace the text logo by editing the `.logo` element in each HTML file, or add an image:

```html
<a href="index.html" class="logo">
  <img src="images/logo.png" alt="Haq Collectibles">
</a>
```

### Contact Information

Update contact details in:
- `contact.html` - Main contact information
- Footer sections in all HTML files
- `policies.html` - Email references

## 📱 Mobile Responsiveness

The site is fully responsive. Key breakpoints:
- **1024px** - Tablet adjustments
- **768px** - Mobile navigation, stacked layouts
- **480px** - Small phone optimizations

## 🔍 SEO

Each page includes:
- Unique `<title>` tag
- Meta description
- Semantic HTML structure
- Proper heading hierarchy

To improve SEO:
1. Add a `sitemap.xml`
2. Register with Google Search Console
3. Add structured data (JSON-LD) for business information

## 🔒 Security Notes

- Forms use Google Forms (hosted externally)
- No sensitive data stored in the repository
- HTTPS is automatic with GitHub Pages
- Consider adding a Content Security Policy header

## 📄 License

This website template is provided for Haq Collectibles LLC. 

---

## Checklist Before Going Live

- [ ] Update all contact information (email, phone)
- [ ] Add your logo/favicon to `images/` folder
- [ ] Create and embed Google Forms
- [ ] Add collection images to `collection/` folder
- [ ] Update `collection/images.json` with your items
- [ ] Review and customize policy text in `policies.html`
- [ ] Update copyright year if needed
- [ ] Test all links and navigation
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Remove setup instructions from `collection.html` (the `#setup-instructions` section)

## Support

For questions about this website, contact the developer.

For questions about Haq Collectibles services, visit the [Contact page](contact.html).
