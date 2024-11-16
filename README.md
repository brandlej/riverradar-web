# riverradar-web

## Description

Riverradar was an application where users could visit the site and see real-time river flows.
Rivers could be searched on the homepage by name or state. Detail pages were enriched with interactive charts,
real-time weather data, and the pinned location on google maps.

## Stack

- Next.js
- Prismic for CMS and blogs
- NestJS
- Postgres
- MikroORM for ORM
- Google Analytics for usage analytics

## Hosting

- Render.com was used for hosting backend service, database storage, and cron jobs for syncing / cleanup
- Vercel was used to host frontend application

Frontend for [riverradar-service](https://github.com/brandlej/riverradar-service).

## Getting Started

1. Install dependencies
   `npm install`
2. Set environment variables
   `cp .env.sample .env`
3. Run
   `npm run dev`
