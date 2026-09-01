import { google } from "googleapis";
import http from "http";
import { URL } from "url";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const REDIRECT_URI = "http://localhost:3001/oauth2callback";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing from .env.local"
  );
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.freebusy",
  "https://www.googleapis.com/auth/calendar.events",
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
  prompt: "consent",
});

console.log("\nOpen this URL in your browser:\n");
console.log(authUrl);
console.log("\nWaiting for Google authorization...\n");

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(
      req.url,
      "http://localhost:3001"
    );

    if (url.pathname !== "/oauth2callback") {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const code = url.searchParams.get("code");

    if (!code) {
      res.writeHead(400);
      res.end("Authorization code missing");
      return;
    }

    const { tokens } = await oauth2Client.getToken(code);

    console.log("\n====================================");
    console.log("GOOGLE REFRESH TOKEN");
    console.log("====================================\n");

    console.log(tokens.refresh_token);

    console.log(
      "\nCopy this value into your .env.local file."
    );

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end(`
      <h1>Google authorization successful!</h1>
      <p>You can close this browser tab and return to PowerShell.</p>
    `);

    server.close();
  } catch (error) {
    console.error("\nAuthorization failed:", error);

    res.writeHead(500);
    res.end("Authorization failed. Check PowerShell.");
  }
});

server.listen(3001, () => {
  console.log(
    "Authorization server running on http://localhost:3001"
  );
});