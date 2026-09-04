# FirePanel — safe Firebase Realtime Database console

This project recreates the general visual style of the supplied screenshots and provides a functional Firebase Realtime Database reader.

## Important
It does **not** extract secrets from APKs and does not accept Firebase Admin/service-account secrets in the browser. A Firebase Realtime Database URL can be added, and the app reads only data permitted by that database's security rules.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Vercel
Import the GitHub repository into Vercel. No special environment variables are required for this URL-based reader.

## Example
You can enter:
`https://xkpz-f937a-default-rtdb.firebaseio.com`

Whether data appears depends on that database's Firebase Realtime Database rules and authentication requirements.
