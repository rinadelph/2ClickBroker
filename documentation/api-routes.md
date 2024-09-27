# API Routes Documentation

## Listings

- `GET /api/listings`: Retrieve all listings
- `POST /api/listings`: Create a new listing
- `GET /api/listings/[id]`: Retrieve a specific listing
- `PUT /api/listings/[id]`: Update a specific listing
- `DELETE /api/listings/[id]`: Delete a specific listing
- `GET /api/listings/area`: Search listings by geographical area

## Analytics

- `GET /api/analytics`: Retrieve overall platform analytics
- `GET /api/analytics/[id]`: Retrieve analytics for a specific listing

## Commissions

- `GET /api/commission/[id]`: Retrieve commission information for a specific listing

## Subscriptions

- `GET /api/subscriptions`: Retrieve all subscriptions for the current user
- `POST /api/subscriptions`: Create a new subscription
- `GET /api/subscriptions/[id]`: Retrieve a specific subscription
- `PUT /api/subscriptions/[id]`: Update a specific subscription

## Authentication

- `POST /api/auth/verify`: Verify user credentials
- `POST /api/auth/token`: Generate access tokens

## Webhooks

- `POST /api/webhooks/clerk`: Handle Clerk authentication webhooks
- `POST /api/webhooks/stripe`: Handle Stripe payment webhooks

Ensure all API routes implement proper error handling, input validation, and authentication checks where necessary.