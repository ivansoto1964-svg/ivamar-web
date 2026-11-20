# Publishing PB notes through the connected repository

This is the durable publication route for authorized PB editorial work when the browser panel session expires. It uses the existing GitHub and Render connections, with no new credentials or public publishing API. Browser login remains available for normal manual editing.

## Procedure

1. Check the public `/lo-mas-reciente` archive and `/api/pb-lo-mas-reciente` feed for duplicates. Research and verify primary sources and publication dates. Prepare original Spanish text and a licensed cover or clearly marked original illustration.
2. Add one JSON record to `editorial/latest/` and its optimized WebP/JPG/PNG cover to `public/images/editorial/`. Follow the existing records. Required fields: stable `editorialId` beginning `pb-`, unique positive integer `id`, permanent URL `slug`, `title`, `summary`, sanitized article HTML `body`, local `image`, `publishedAt` ISO timestamp, and `sources` containing `{label,url}` with HTTPS URLs. Put source/internal links at the end via `sources`. Include the subscription/social invitation and illustration credit in the body.
3. Keep all records in the inbox after publication. Use a unique filename and cover name per article; never replace an already cached cover file. Preserve existing entries, source code, and unrelated changes. Do not include secrets, reader data, or credentials.
4. Run `node --test tests/pb-editorial-inbox.test.js`, validate the actual records against a temporary data directory, and run `npm test` for changes to importer/application code. Commit through the authenticated GitHub connector in `ivansoto1964-svg/ivamar-web`; create and merge a PR against current main. Reject stale-head writes and refetch before retrying.
5. Check Render service `srv-d6f2ahn5r7bs738fuhlg` in workspace `tea-d5609km3jp1c73a4ulh0`. If auto deploy is disabled, trigger a single deploy for the batch and wait for `live`. If enabled, use the deployment already triggered by the merge. Never change environment variables, billing, or authentication to publish a note.
6. The synchronous startup importer validates the whole inbox, atomically appends new records to persistent `/data/pb-latest/approved.json`, and journals their editorial IDs. It preserves existing articles and panel edits; it never republishes an article deleted after import. A malformed inbox or existing storage produces a log error and leaves content unchanged.
7. Verify each public `/lo-mas-reciente/<slug>` page returns 200, has the correct headline and body, and its cover returns an actual image. Check cover display/metadata, source links, and the public feed. Only then report it as published and share the confirmed public URL. A successful commit or deploy alone does not prove publication.

## Limitations

Publication requires the GitHub and Render connections to remain authorized and deployment to succeed. This is a deployment-backed workflow, not a permanent logged-in browser session. It does not post to social networks. Events still use Agenda's normal authenticated editorial tools; do not put dated event invitations into Lo Más Reciente merely to bypass Agenda access.

An article already imported is edited through the PB panel; changing its inbox JSON will not overwrite its live version. Retain the import journal with the persistent data backups. Future migrations can replace this route with a dedicated scoped publishing integration when needed.
