# A minimal Nuxt site with Sanity Studio

This starter uses [Nuxt](https://nuxt.com/) for the front end and [Sanity](https://www.sanity.io/) to handle its content.

## Featuring

- How to fetch content as data from [the Sanity Content Lake](https://www.sanity.io/docs/datastore)
- How to render block content with [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- A [Sanity Studio](https://www.sanity.io/docs/sanity-studio) to create and edit content
- How to crop and render images with [Sanity Image URLs](https://www.sanity.io/docs/image-url)

> **Note**
>
> This starter features an `/app` and a `/studio` folder. The `/app` folder contains the frontend code, and the `/studio` folder contains the Sanity Studio code.
>
> It is configured as a monorepo using [pnpm workspaces](https://pnpm.io/workspaces), but you can treat these directories as separate projects if you prefer.

## Prerequisities

- [Node.js](https://nodejs.org/en/) (v16.12 or later)
- [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) (optional)

## Getting started

Run the following commands to prepare both applications, each step should be executed from the **root directory**:

1. Install dependencies.

```sh
pnpm install
```

2. Select or create a Sanity project and dataset, and output the details to a `.env` file.

```sh
cd studio && pnpm sanity init --env .env
```

3. [Generate a token](https://www.sanity.io/docs/http-auth#4c21d7b829fe) with read permissions for use in the next step.

```sh
pnpm sanity manage
```

4. Copy the example app `.env` file and populate it with the required values.

```sh
cp ./app/.env.example ./app/.env
```

5. Start the development servers:

```sh
pnpm dev
```

- Your Nuxt app should now be running on [http://localhost:3000/](http://localhost:3000/).
- Your Studio should now be running on [http://localhost:3333/](http://localhost:3333/).

### Add content

1. Visit the Studio and create and publish a new `Post` document
2. Visit the App and refresh the page to see your content rendered on the page

The schema for the `Post` document is defined in the `/studio/schemas` folder. You can add more documents and schemas to the Studio to suit your needs.

## Deployments

The `/app` and `/studio` folders are meant to be deployed separately.

Make sure that after `/app` is deployed the `.env` file in `/studio` is updated with its deployment URL under `SANITY_STUDIO_PREVIEW_URL`.

And `/app` has a `.env` file with `NUXT_SANITY_STUDIO_URL` that points to the Studio's deployment URL.

## Timeline of Issues and Solutions

### Importing @nuxtjs/sanity Module Error

#### Problem: The @nuxtjs/sanity module was causing issues when included in the project

Solution: Ensured the module was correctly installed and moved it to dependencies instead of devDependencies.

### Invalid Schema Loading Error

#### Problem: Errors were encountered loading schemas from json.schemastore.org

Solution: Ignored the errors related to the schema store URL and focused on other parts of the setup.

### Fetching Stickers Data from Sanity

#### Problem: Unable to properly fetch and display sticker data from Sanity

Solution: Corrected the GROQ query and ensured the fetched data structure matched expectations.

### Ordering Data in GROQ Query

#### Problem: Difficulty ordering sticker data by name in descending order

Solution: Updated the GROQ query to correctly order the data as required.

### Styling and Hover Effects for Stickers

#### Problem: Hover effects on stickers were not working as expected

Solution: Adjusted CSS and Vue logic to ensure hover effects applied correctly to sticker images.

### Flipping Stickers on Click

#### Problem: Stickers were not flipping when clicked

Solution: Used Vue's reactivity system to track and update the state of each sticker, allowing them to flip on click.

### Contact Form Submission Handling

#### Problem: Contact form submissions were not properly handled, and API endpoints were not accessible in production

Solution: Updated the form submission logic to use environment-specific API URLs and ensured correct deployment configurations on Netlify.

### Mail Configuration with Nodemailer

#### Problem: Issues with sending emails using Gmail SMTP due to incorrect credentials

Solution: Generated an app-specific password for Gmail and updated the environment variables accordingly.

### Deploying Serverless Functions on Netlify

#### Problem: Serverless functions were not recognized in production, leading to 404 errors

Solution: Verified the functions directory and ensured correct deployment paths in the Netlify configuration.

### Handling POST Requests in Serverless Functions

#### Problem: Errors reading the request method and body in serverless functions

Solution: Adjusted the serverless function to correctly parse and handle the HTTP request and response objects.

### Testing and Debugging in Production

#### Problem: Difficulty debugging issues specific to the production environment

Solution: Used tools like Postman to directly test the API endpoints and reviewed logs for detailed error messages.

### Environment Variables Configuration

#### Problem: Missing or incorrectly configured environment variables caused runtime errors

Solution: Ensured all necessary environment variables were set correctly in both local and production environments, particularly in the Netlify dashboard.
