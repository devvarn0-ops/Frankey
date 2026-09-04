# Profex-style Firebase Result Dashboard

GitHub + Vercel ready static frontend.

## Flow
1. Add an authorized Firebase RTDB URL.
2. Import an authorized Firebase JSON export or paste JSON.
3. Phone-like fields are extracted locally in the browser.
4. Results appear on the dashboard.
5. OTP verification page is provider-ready and requires a user-entered OTP.

This project intentionally does not read/intercept device SMS or retrieve OTPs from Firebase. For real OTP delivery, connect your own authorized SMS/OTP provider and verify its webhook/server response.

Deploy on Vercel: import this repository, framework preset `Other`, no build command required.
