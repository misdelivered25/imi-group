# Remove Gallery and Add Card Photography

## What will change
- Remove Gallery from the public menu, public routes, search metadata, and sitemap.
- Keep the private upload/media tools available for administrators, so existing uploaded files and management workflows are not deleted.
- Replace the Portfolio page’s gallery-folder interface with a curated visual portfolio that does not depend on the removed public Gallery.
- Add relevant image areas to public content cards that currently rely only on patterns or icons, including services, projects, insights, divisions, and package groups.
- Keep small informational blocks—such as checklists, contact details, and form panels—clean rather than forcing decorative photos into controls.

## Image direction
- Reuse the approved IMI posters and founder/division photography where the subject fits.
- Use cohesive, locally stored visuals for technology and project cards where no approved IMI image exists.
- Preserve readable text with restrained overlays and keep existing icon badges layered over images.
- Add meaningful alternative text and lazy loading for non-critical imagery.

## Technical details
- Remove `/gallery`, `/gallery/:slug`, and `/projects-gallery` from the public route map and remove Gallery SEO entries.
- Remove Gallery and other gallery-only public URLs from `sitemap.xml`; retain robots exclusions for private media tools.
- Refactor shared card data to include image references, then consume those references consistently across pages.
- Add a clearly separated “Individual Design Services” price list with the eleven supplied services and exact USD prices.
- Verify the public navigation, representative pages, and pricing at mobile and desktop sizes, and confirm there are no missing images or broken links.
