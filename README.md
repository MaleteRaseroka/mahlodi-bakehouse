# Mahlodi Bakehouse Website

**Module:** WEDE5020 Web Development (Introduction) | **Assessment:** Portfolio of Evidence (Parts 1-3)
**Student:** Malete Raseroka (ST10518036) | **Group:** Group 1 | **Lecturer:** Heinrich

**Live website:** [PASTE YOUR GITHUB PAGES / NETLIFY LINK HERE]
**Repository:** https://github.com/MaleteRaseroka/mahlodi-bakehouse

## Project overview
Mahlodi Bakehouse is a fictional independent bakery in Pretoria, South Africa. The website lets visitors learn about the bakery, browse and search products, request a quote and contact the shops. The organisation is fictional and was created for this academic project.

## Website goals and objectives
1. Provide information about the bakery.
2. Display available products and services.
3. Encourage customers to make enquiries.
4. Provide easily accessible contact information.
5. Improve the bakery's online visibility.
6. Present the organisation professionally.

## Key features and functionality
- Five pages: `index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`.
- **Part 2:** external stylesheet, CSS reset, CSS variables, Flexbox and Grid layouts, media queries (1023px and 767px), responsive images with `srcset` and `sizes`.
- **Part 3:** product search/filter/sort loaded with `fetch`, product details dialog, gallery lightbox, About tabs, FAQ accordion, scroll animations, Leaflet map with two shop locations, validated enquiry form with instant quote and availability, validated contact form that builds an email, SEO tags, `robots.txt`, `sitemap.xml`.

## Timeline and milestones
| Part | Focus | Status |
|---|---|---|
| 1 | Planning, sitemap, HTML structure | Done |
| 2 | CSS styling and responsive design | Done |
| 3 | JavaScript, SEO, forms, deployment | Done |

## Sitemap
```
index.html (Home)
├── about.html (About)
├── products.html (Products)
├── enquiry.html (Enquiry)
└── contact.html (Contact)
```

## File and folder structure
```
mahlodi-bakehouse/
├── index.html  about.html  products.html  enquiry.html  contact.html
├── robots.txt  sitemap.xml  README.md
├── css/style.css
├── js/main.js  validate.js  products.js  enquiry.js  contact.js
├── data/products.json  pricing.json
└── images/  (400px, 800px and 1200px versions)
```

## Part 2 details (CSS and responsive design)
See `css/style.css`. Breakpoints: desktop 1024px+, tablet up to 1023px, mobile up to 767px.
Screenshots: [ADD YOUR DESKTOP, TABLET AND MOBILE SCREENSHOTS HERE, e.g. `![Desktop](screenshots/desktop.png)`]

## Part 3 details (functionality, SEO, forms)
- **Dynamic content:** `js/products.js` loads `data/products.json` with `fetch` and builds the product cards.
- **Search / filter / sort:** by name, category, availability and price.
- **Forms:** `js/validate.js` (shared rules), `js/enquiry.js` (quote and availability), `js/contact.js` (email builder). The email recipient is the `RECIPIENT` constant at the top of `js/contact.js`.
- **SEO:** unique title and meta description per page, one `h1` per page, alt text, descriptive image names, canonical links, Open Graph tags, LocalBusiness structured data, `robots.txt`, `sitemap.xml`.
- **Security and speed:** user input is written with `textContent`, links use `rel="noopener noreferrer"`, Leaflet is loaded with an integrity hash, scripts use `defer`, images are lazy-loaded.
- **Deployment:** GitHub Pages / Netlify (see live link above).

## Changelog
| Version | Date | Change |
|---|---|---|
| 3.0 | [DATE] | Added `js/` files, `data/` folder, tabs, accordion, lightbox, product dialog, Leaflet map, validated enquiry and contact forms, SEO tags, `robots.txt`, `sitemap.xml`, and deployed the site. |
| 3.0 | [DATE] | Part 2 feedback: [PASTE LECTURER FEEDBACK AND WHAT YOU CHANGED]. Fixed hero image path and replaced the Figure 3 placeholder screenshot. |
| 2.0 | 05 Oct 2026 | Added `css/style.css`, responsive layout and `srcset` images. Moved images inside `<main>` and renamed files with a double `.jpg.jpg` extension (Part 1 feedback). |
| 1.0 | 01 Sep 2026 | Created five HTML pages, folder structure and navigation. |

## References
Add your Part 1 and Part 2 references here, then the Part 3 references from your Word document (IIE Harvard-Anglia style, alphabetical). Re-letter any author that now has more than one 2026 entry (2026a, 2026b, ...).
