
# Playhost-Cra: Autopart Request Platform

## Overview
This project is a bilingual (English/Spanish) React web application for requesting car parts, styled to match a custom template. It features:

- **Bilingual UI** using `react-i18next`.
- **Autopart request workflow** with a modal form and template-matching styles.
- **Legal and compliance pages** (Terms, Privacy, etc).
- **Backend integration**: Python API (serverless) for handling form submissions and storing requests in a PostgreSQL (Supabase) database.
- **Production deployment**: Hosted on Vercel.

## Current Workflow
1. **User fills out the autopart request form** (bilingual, styled, modal).
2. **Form submits to a Python backend** (`api/request-autopart.py`), which:
   - Inserts the request into the `autopart_requests` table in PostgreSQL (Supabase).
   - (Planned) Will integrate with HubSpot for CRM automation.
3. **Success/error messages** are shown in the user's selected language.

## Project Structure
- `src/components/RequestAutopartForm.jsx`: Main form logic and UI.
- `api/request-autopart.py`: Python backend handler for form submissions.
- `autopart_requests.sql`: SQL schema for the requests table.
- `src/locales/`: i18n translation files.
- `public/`, `build/`: Static assets and build output.

## Development
Run locally:
```bash
npm install
npm start
# Open http://localhost:3000
```

## Deployment
- Production is deployed via Vercel, auto-building from the `master` branch.
- Ensure all changes are pushed to GitHub for Vercel to deploy the latest version.

## Backend/Database
- Python API in `api/request-autopart.py` (serverless, Vercel-compatible).
- PostgreSQL (Supabase) for storage. Table schema in `autopart_requests.sql`.
- All database columns use English metadata.

## HubSpot Integration (Planned)
- Will add HubSpot API integration to the backend for CRM automation.
- Requires a HubSpot API key/token and mapping of form fields to HubSpot properties.

## Status
- Supabase client and all frontend DB logic have been removed.
- All requests are now handled by the Python backend.
- Latest code is always on the `master` branch.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
