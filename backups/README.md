old files here


When making changes update the const myCacheName version


```
// sw.js
const myCacheName = "local-agentic-web-v002"; // Increment this when you update your app files
const myAssetsToCache = [
  "./",
  "./index.html",
  "./pwa/manifest.json",
  "./pwa/pwa.js",
  "./pwa/icon-192.png",
  "./pwa/icon-512.png"
];


```








If changing the PWA make sure to 

Summary Checklist for a New Repo:


Update myCacheName in sw.js.

Update name, short_name, and start_url in pwa/manifest.json.

Swap out your icon-192.png and icon-512.png.

Update the page title and UI text in index.html.





add to the index.html near the top




near the top

```


  <!-- PWA Manifest & Control Script -->
  <link rel="manifest" href="pwa/manifest.json">
  <script src="pwa/pwa.js" defer></script>


```



with the custom header

```
<!-- Existing Engine Chip -->
        <span id="myEngineChip" style="display:none; font-family:var(--font-mono); font-size:0.7rem; padding:2px 8px; border-radius:999px; border:1px solid var(--border); color:var(--text-muted); white-space:nowrap;" title="Which local engine loaded the current WebGPU model"></span>

        <!-- NEW: PWA Connection Badge & Action Buttons -->
        <span id="myConnectionBadge" style="padding: 3px 7px; border-radius: 4px; font-size: 11px; font-weight: bold; background-color: #22B14C; color: #ffffff; white-space:nowrap;">Online</span>
        
        <button id="myPwaInstallButton" style="display:none; padding: 4px 8px; font-size: 11px; cursor: pointer;" onclick="myHandleInstallButtonClick()">
          Install App
        </button>
        
        <button id="myPwaUpdateButton" style="display:none; padding: 4px 8px; font-size: 11px; cursor: pointer;" onclick="myHandleUpdateButtonClick()">
          Update Available
        </button>


```
