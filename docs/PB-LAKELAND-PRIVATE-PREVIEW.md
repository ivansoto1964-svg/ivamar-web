# Lakeland–Aguadilla partner preview

Route: `/propuestas/lakeland-aguadilla`.

This is a non-indexed, encrypted concept review, not a public campaign launch. It is not in navigation or the sitemap and runs before analytics, ads and the public site shell.

Only an AES-256-GCM encrypted document is committed in `src/data/pb-lakeland-preview.encrypted.json`. A randomly generated 24-character review password is distributed separately by the owner. The password and source HTML are not committed, stored in environment variables, sent in URLs, or submitted to the server. Browser Web Crypto uses PBKDF2-SHA256 with 600,000 iterations and a random salt to derive the key.

After successful decryption the document renders in a sandboxed iframe. There is no localStorage/sessionStorage persistence, no analytics and no third-party code. The reviewer can lock the frame again. Encryption limits access to the content; it is not individual identity verification and cannot prevent an authorized reviewer from copying or sharing content/password. Remove the route or replace the encrypted envelope and distribute a fresh password to revoke the current shared access.

For updates, encrypt the complete reviewed HTML with a fresh random salt/IV, append the GCM authentication tag to ciphertext for Web Crypto compatibility, and verify roundtrip and wrong-key rejection before replacing the envelope. Keep key material in session memory. Do not put the plaintext preview under `public/` or add a client-side plaintext password check.

Checks: `node --test tests/pb-lakeland-preview.test.js` and `npm test`. Verify the actual HTTPS production route and browser unlock before stating that the review link works.
