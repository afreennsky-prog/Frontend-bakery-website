# Golden Crumb Bakery

A handmade bakery website concept — fresh cakes, breads, pastries and cookies baked daily in Chennai or anywhere in the world.

> This is a fictional concept project. All product descriptions, prices, testimonials and the address are placeholders.

## Preview

Open `index.html` in a web browser to view the site locally.

## Project Structure

```
Frontend Website/
├── index.html        # Main HTML page (all 8 sections)
├── style.css         # Styles (variables, layouts, responsive media queries)
├── script.js         # Interactivity (menu filter, lightbox, form, scroll reveal)
├── README.md         # This file
├── Resize images.py  # Utility script — do NOT upload with the site
└── images/           # All website images
    ├── about.jpg
    ├── hero.jpg
    ├── (menu items: chocolate-cake, mango-cake, sourdough, etc.)
    └── (gallery: gallery-1.jpg … gallery-6.jpg)
```

## Uploading / Deployment

1. **Rename files to lowercase** — web hosts running Linux (Apache/Nginx) are case-sensitive, so `style.css` ≠ `Style.css`. Rename:
   - `Index.html` → `index.html`
   - `Style.css` → `style.css`
   - `Script.js` → `script.js`
   - `Images` → `images`

2. **Upload all files EXCEPT `Resize images.py`** — that script is only for locally rescaling images and is not part of the website.

Recommended hosting options: Netlify, Vercel, GitHub Pages, or any traditional shared host (GoDaddy, HostGator, Bluehost).

## Setting up the contact form (Formsubmit.co)

The enquiry form forwards submissions to your email via Formsubmit.co (free, no sign-up required).

### Steps

1. Open `index.html` and edit line 163:
   ```html
   <form id="enquiryForm" action="https://formsubmit.co/YOUR_EMAIL@example.com" method="POST" novalidate>
   ```
   Replace `YOUR_EMAIL@example.com` with your real email address.

2. Save and open the site in a browser, then submit a test enquiry.

3. **Activate your email** — Formsubmit.co will send a confirmation email. You must click the link inside to activate the address. Check your spam/junk folder.

4. After activation, every enquiry will arrive in your inbox with the customer's name, phone, email and message.

If nothing arrives:
- Check your spam/junk folder.
- Wait 1–2 minutes after submitting (small delivery delays are normal).
- Make sure you clicked the activation link in the first confirmation email.

## Adding new menu items

Each item is an `<article class="card">` block in the menu section. To add a new product, copy an existing block and change the text, image and category:

```html
<article class="card" data-category="cakes">
  <img src="images/your-new-item.jpg" alt="Description of the item">
  <div class="card-body">
    <h3>Item Name</h3>
    <p>Short description.</p>
    <span class="price">Rs. 200</span>
  </div>
</article>
```

The category (`cakes`, `breads`, `pastries`, `cookies`) must match one of the filter buttons for the item to show up.

## Gallery images

The gallery section shows 6 placeholder images (`gallery-1.jpg` through `gallery-6.jpg`). Replace them in the `images/` folder with your own — no HTML changes needed.

## Customising styles

Colours, fonts and shadows live at the top of `style.css` in the `:root` variables:

- `--cream`, `--cream-dark` — background tones
- `--brown`, `--brown-light`, `--gold`, `--gold-dark` — brand colours
- `--font-heading`, `--font-body` — fonts
- `--radius`, `--shadow` — border radius and card shadows

## Notes

- The map placeholder in the Contact section can be swapped for a real Google Maps iframe later.
- Footer social links currently point to `#` — replace with your real Instagram / Facebook / WhatsApp URLs.
