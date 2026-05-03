# Component Guide - Quick Reference

This guide provides a quick reference for working with individual components in the Aura Dental website.

---

## Component Quick Links

| Section | File | Size | Key Elements |
|---------|------|------|--------------|
| **Navigation** | `navbar.html` | 1.5 KB | Logo, Menu, Mobile Toggle, CTA |
| **Hero Banner** | `hero.html` | 1.2 KB | Background, Headline, Buttons |
| **Trust Indicators** | `trust-bar.html` | 1 KB | 4 Stat Cards |
| **About** | `about.html` | 2.5 KB | Image, Text, Doctor Card, Features |
| **Services** | `services.html` | 2 KB | 6 Service Cards |
| **Why Us** | `why-us.html` | 1 KB | 3 Value Props |
| **Doctors** | `doctors.html` | 2 KB | 3 Doctor Profiles |
| **CTA Banner** | `cta-banner.html` | 0.9 KB | Background, Headline, Button |
| **Gallery** | `gallery.html` | 1.3 KB | Image Slider |
| **Testimonials** | `testimonials.html` | 1.5 KB | 2 Review Cards |
| **Contact/Book** | `contact-appointment.html` | 4 KB | FAQ, Form, Info |
| **Map** | `map.html` | 0.3 KB | Location Placeholder |
| **Footer** | `footer.html` | 2.2 KB | Branding, Links, Newsletter |
| **Floating** | `floating-elements.html` | 0.4 KB | WhatsApp, Back-to-Top |

---

## Common Modifications

### Changing Text Content

**Example: Update hero headline**

File: `sections/hero.html`

```html
<h1>
    Bright Smiles <br><span class="gradient-text">Start Here</span>
</h1>
```

Change to:

```html
<h1>
    Your New Headline <br><span class="gradient-text">Here</span>
</h1>
```

### Updating Images

**Example: Update about section image**

File: `sections/about.html`

```html
<img src="assets/about_doctor.png" alt="Dr. Sarah Jenkins">
```

Change `src` to your new image path:

```html
<img src="assets/your_new_image.png" alt="Description">
```

### Adding/Removing Cards

**Example: Add a new service card**

File: `sections/services.html`

Copy an existing service card block and modify:

```html
<div class="service-card">
    <div class="service-icon sky">
        <i class="fas fa-tooth"></i>
    </div>
    <h3>Your Service Name</h3>
    <p>Your service description here.</p>
</div>
```

### Updating Form Fields

**Example: Add a new appointment form field**

File: `sections/contact-appointment.html`

Add within the `appointment-form`:

```html
<div class="form-group">
    <label>Field Name <span class="required">*</span></label>
    <input type="text" id="field-id" required placeholder="Placeholder text">
</div>
```

---

## CSS Class Reference

### Layout Classes
- `.container` - Max-width container with padding
- `.section` - Full-width section with padding
- `.section-grid` - Grid layout for sections

### Button Classes
- `.btn` - Base button style
- `.btn-primary` - Primary color button
- `.btn-outline` - Outlined button style
- `.btn-white` - White text on dark background
- `.btn-nav` - Navigation button style

### Icon Classes
- `.trust-icon` - Trust bar icon styling
- `.service-icon` - Service card icon
- `.why-us-icon` - Why us section icon
- `.doctor-card-icon` - Doctor profile icon

### Color Variants
- `.sky` - Sky blue color
- `.teal` - Teal color
- `.primary` - Primary accent color
- `.secondary` - Secondary accent color

### Animation Classes
- `.animate-fade-in-up` - Fade and slide up animation
- `.animate-float` - Floating animation
- `.scroll-reveal` - Reveal on scroll animation

---

## Component Data Attributes

### Navbar
- `id="navbar"` - Main navbar container
- `id="mobile-menu-btn"` - Mobile menu toggle button
- `id="mobile-menu"` - Mobile menu container

### Services Section
- `id="services"` - Section anchor link
- `.service-card` - Individual service cards

### Doctors Section
- `id="doctors"` - Section anchor link
- `.doctor-profile` - Doctor profile card

### Gallery
- `id="gallery-container"` - Gallery slider container
- `#scroll-left`, `#scroll-right` - Navigation buttons

### Contact/Appointment
- `id="appointment-form"` - Booking form
- `id="contact"` - Contact information section
- `.faq-item` - FAQ accordion items
- `.faq-btn` - FAQ toggle button

### Testimonials
- `id="testimonials"` - Section anchor link
- `.testimonial-card` - Review card

---

## Interactive Elements

### Gallery Slider
```javascript
// Controlled by script.js
const scrollLeft = document.getElementById('scroll-left');
const scrollRight = document.getElementById('scroll-right');
const galleryContainer = document.getElementById('gallery-container');
```

### FAQ Accordion
```javascript
// FAQ buttons toggle .faq-content visibility
const faqButtons = document.querySelectorAll('.faq-btn');
faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active state
    });
});
```

### Appointment Form
```javascript
// Form submission handled in script.js
const form = document.getElementById('appointment-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle submission
});
```

### Navigation Menu
```javascript
// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});
```

---

## Adding new Components

To add a completely new section:

1. **Create the HTML file**
   ```bash
   touch sections/new-feature.html
   ```

2. **Write the component HTML** (structural markup only):
   ```html
   <!-- ============================================
        NEW FEATURE SECTION
        ============================================ -->
   <section id="new-feature" class="section new-feature scroll-reveal">
       <div class="container">
           <div class="section-header">
               <h2 class="section-title">Your Title</h2>
               <p class="section-desc">Your description</p>
           </div>
           
           <!-- Component content here -->
       </div>
   </section>
   ```

3. **Update component-loader.js**:
   ```javascript
   const COMPONENTS = [
       // ... existing components ...
       { id: 'new-feature-container', path: 'sections/new-feature.html' },
   ];
   ```

4. **Add a placeholder in index.html**:
   ```html
   <div id="new-feature-container"></div>
   ```

5. **Add styles to styles.css** as needed:
   ```css
   .new-feature {
       /* Your styles */
   }
   ```

---

## Best Practices

### HTML Structure
- Use semantic HTML elements (section, article, div)
- Keep markup clean and minimal
- Use clear, descriptive class names
- Avoid inline styles; use CSS classes instead

### CSS Classes
- Use BEM (Block Element Modifier) naming for clarity
- Reuse utility classes from styles.css
- Keep component-specific styles minimal
- Follow existing naming conventions

### IDs and Links
- Use IDs for section anchors and form elements
- Link IDs in navbar match section IDs
- Avoid using IDs for styling when classes work

### Images
- Always use responsive image paths
- Include descriptive alt text
- Place images in the `assets/` folder
- Optimize image sizes for web

### Forms
- Always mark required fields with `<span class="required">*</span>`
- Use appropriate input types (text, email, tel, etc.)
- Include helpful placeholder text
- Group related fields with `.form-group`

---

## Debugging Tips

### Check Component Loading
```javascript
document.addEventListener('componentsLoaded', () => {
    console.log('All components loaded!');
    // Your initialization code
});
```

### Verify Element IDs
```javascript
// In browser console
console.log(document.getElementById('navbar-container'));
```

### Test Responsive Behavior
- Use browser DevTools to test different screen sizes
- Check mobile menu toggle functionality
- Verify grid layouts on mobile

### CSS Debugging
- Use DevTools Inspector to check applied styles
- Look for conflicting CSS rules
- Check media query breakpoints

---

## Common Issues & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| Component not loading | Wrong file path | Verify path in component-loader.js |
| Styles not applying | Missing CSS class | Check class name spelling |
| Mobile menu not working | Missing script | Ensure script.js is loaded after component-loader.js |
| Form not submitting | Missing ID | Check form element has correct ID |
| Icons not displaying | Font Awesome not loaded | Verify FontAwesome CDN link in index.html |
| Images not showing | Wrong path | Check relative path from component file |

---

**For detailed architecture information, see [ARCHITECTURE.md](ARCHITECTURE.md)**
