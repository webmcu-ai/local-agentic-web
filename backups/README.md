old files here



If changing the PWA make sure to 

Summary Checklist for a New Repo:


Update myCacheName in sw.js.

Update name, short_name, and start_url in pwa/manifest.json.

Swap out your icon-192.png and icon-512.png.

Update the page title and UI text in index.html.





add to the index.html near the top






```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>local-agentic-web</title>

  <!-- PWA Manifest & Control Script -->
  <link rel="manifest" href="pwa/manifest.json">
  <script src="pwa/pwa.js" defer></script>
</head>
<body>

  <header>
    <h1>local-agentic-web</h1>
    
    <!-- Connection Status Badge (Inline CSS) -->
    <span id="myConnectionBadge" style="padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; background-color: #22B14C; color: #ffffff; margin-right: 10px;">Online</span>

    <!-- PWA Action Buttons -->
    <button id="myPwaInstallButton" style="display: none;" onclick="myHandleInstallButtonClick()">
      Install App
    </button>
    <button id="myPwaUpdateButton" style="display: none;" onclick="myHandleUpdateButtonClick()">
      New Version Available (Click to Update)
    </button>
  </header>

  <main>
    <p>local-agentic-web interface workspace.</p>
  </main>

</body>
</html>

```
