# Premium Personal Portfolio - Komal Maurya

A premium, highly interactive, responsive, and production-ready static developer portfolio for Komal Maurya. The site uses semantic HTML, CSS, and vanilla JavaScript with smooth scroll/reveal animations, project modals, and a Web3Forms-powered contact form.

## Features & Sections
1. **Intro Loader**: Quick initials logo fade transition.
2. **Interactive Navigation**: Sticky, self-hiding header with a visual scroll progress indicator, active tab tracker, and responsive mobile burger overlay.
3. **Interactive Hero**: Dynamic role typing effect, contact / resume buttons, social anchors, availability marker, and cursor spotlights.
4. **About Me**: Grid storytelling panels illustrating academic and specialization highlights.
5. **Technical Skills**: Dynamically rendered filterable categories with an ambient sliding tech marquee.
6. **Featured Projects**: Custom card layouts highlighting SketchNest, KFOOD, and AI Chatbot with interactive spec sheets.
7. **Academic Timeline**: Glowing vertical milestones for B.Sc CS, HSC, and SSC.
8. **Certifications**: Modern list cards for certifications.
9. **Soft Skills Grid**: Clean icon cards highlighting professional soft skills.
10. **Web3Forms Contact Form**: Client-side validation, loading state, success state, and error state without any backend server.

## Tech Stack
* **Frontend**: HTML5, CSS3, Vanilla JavaScript, Google Fonts, FontAwesome Icons.
* **Form Handling**: Web3Forms.
* **Deployment Target**: Render Static Site.

## Web3Forms Setup
1. Create a Web3Forms access key.
2. Open `index.html`.
3. Replace this placeholder with your real key:
   ```html
   YOUR_WEB3FORMS_ACCESS_KEY
   ```
4. Keep the key in the hidden `access_key` input:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```

## Local Preview
This is now a fully static website. You can preview it by opening `index.html` directly in a browser, or by using any static server / Live Server extension.

No Node.js server, MySQL database, `.env`, or API route is required.

## Contact Form Testing
1. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your real Web3Forms access key.
2. Open the site.
3. Submit valid name, email, subject, and message values.
4. Confirm that the form shows a loading message, then a success message.
5. Test empty/invalid values to confirm inline validation.
6. Temporarily disconnect from the internet or use an invalid access key to confirm the error message.

## Files Removed From Runtime
The backend has been removed from the deployable project. These files are no longer needed for Render Static Site deployment:

* `server.js`
* `package.json`
* `package-lock.json`
* `.env.example`
* `database/contact_messages.sql`
* `database/`

Local-only cleanup you can also delete if present:

* `.env`
* `node_modules/`

## Render Static Site Settings
Use **New > Static Site** on Render and connect the Git repository.

* **Root Directory**: leave blank if the repo root contains `index.html`
* **Build Command**: leave blank
* **Publish Directory**: `.`
* **Auto Deploy**: enabled
* **Environment Variables**: none required
* **Start Command**: not used for Static Sites

## Git Push Commands
```bash
git status
git add .
git commit -m "Convert portfolio to static Web3Forms contact form"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If the remote already exists, use:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
