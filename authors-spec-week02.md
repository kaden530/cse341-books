# Authors API Week 02 Spec - Version 1

## Goal

Implement a new Author API supporting all CRUD operations for authors. Every author route must be documented and testable in Swagger.

## Data Model

Author documents will be stored in the authors collection.
Required author fields:
- `id`: string, required, custom id such as a1
- `name`: string, required
- `bio`: string, optional
- `birthDate`: string, required
Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

## Relationship to Books

When deleting an author, the API must check if any book documents in the books collection still reference this author's id. If books exist, the deletion must be rejected with a   `400` status code to preserve data integrity.

## Routes


## GET /authors

Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

## GET /authors/:id

Purpose: Return one author by their custom id.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

## POST /authors

Purpose: Create a new author.

Request body:


{
  "id": "a3",
  "name": "Jane Doe",
  "bio": "Award-winning science fiction novelist.",
  "birthDate": "1985-05-12"
}

Success:

- Status code: `201`
- Response body: the newly created author object

Errors:

- `400` if a required field is missing
- `400` if the id already exists
- `500` if an unexpected server or database error occurs

## PUT /authors/:id

Purpose: Update an existing author.

Request body:

{
  "name": "Jane Smith",
  "bio": "Updated biography text.",
  "birthDate": "1985-05-12"
}

Success:

- Status code: `200`
- Response body: the updated author object

Errors:

- `400` if a required field is missing
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

## DELETE /authors/:id

Purpose: Delete an existing author.

Success:

- Status code: `204`
- Response body: none

Errors:

- `400` if the author cannot be deleted because books still reference their id
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

## Swagger Documentation

Swagger must document every author route.

## Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at /api-docs must allow someone to test every author route from the browser.