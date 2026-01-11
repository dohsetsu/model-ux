# 📄 Google Doc Extractor - Tool Doc

A single Google Doc that extracts tabs and images from any Google Docs you have access to.

## 5-Minute Setup

### Step 1: Create Your Tool Doc

1. Go to [Google Docs](https://docs.google.com) and create a new blank document
2. Name it something like **"Doc Extractor Tool"**

### Step 2: Add the Script

1. In your new doc, go to **Extensions → Apps Script**
2. Delete any code in the editor (usually `function myFunction() {}`)
3. Copy the entire contents of `Code.gs` from this folder
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon or Ctrl+S)
6. Close the Apps Script tab

### Step 3: Activate

1. **Reload** your Google Doc (F5 or Cmd+R)
2. Wait a few seconds...
3. You should see **"📄 Doc Extractor"** in the menu bar!

### Step 4: First Run (Authorization)

1. Click **📄 Doc Extractor → 🔗 Extract from URLs...**
2. Google will ask you to authorize the script
3. Click through the permissions (it needs access to Docs and Drive)
4. The dialog will appear - you're ready to go!

---

## How to Use

### Extract from URLs (main feature)

1. Click **📄 Doc Extractor → 🔗 Extract from URLs...**
2. Paste Google Doc URLs (one per line)
3. Click **📦 Extract All**
4. ZIP file downloads automatically

### Extract Current Doc

1. Click **📄 Doc Extractor → 📑 Extract THIS doc**
2. ZIP file downloads automatically

---

## Output Format

For each document, you get a folder containing:

```
DocName_export/
├── Tab1_annotated.txt      # Text with table formatting
├── Tab1_IMG_1.png          # Images from Tab1
├── Tab1_IMG_2.png
├── Tab2_annotated.txt
└── Tab2_IMG_1.png
```

Tables are formatted like:
```
[TABLE]
| Header 1 | Header 2 | Header 3 |
| Cell 1   | Cell 2   | Cell 3   |
[/TABLE]
```

---

## Troubleshooting

### Menu not appearing?
- Make sure you saved the script
- Reload the page (not just refresh)
- Wait 5-10 seconds after page load

### "Authorization required" error?
- This is normal on first run
- Click through the Google permissions dialog
- You may see "This app isn't verified" - click "Advanced → Go to [script name]"

### Can't access a document?
- You need at least "Viewer" access to extract a doc
- Check that the URL is correct

### Download not starting?
- Check your browser's popup blocker
- Try the manual download link in the dialog

---

## Sharing with Colleagues

Two options:

### Option A: Share the Doc (Recommended)
1. Share your Tool Doc with colleagues (Viewer access is fine)
2. They make a copy: **File → Make a copy**
3. Their copy has the script attached and ready to use

### Option B: Share the Code
1. Send them this README + Code.gs
2. They follow the setup steps above

---

## Notes

- The script temporarily creates a file in your Drive to enable download, then deletes it
- Works with docs that have multiple tabs
- Images are extracted at their original resolution
- Large docs may take a few seconds to process

