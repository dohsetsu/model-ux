/**
 * Google Doc Extractor - Tool Doc Version
 * 
 * This script extracts tabs and images from Google Docs.
 * It can process the current doc OR external docs via URL.
 * 
 * Setup:
 * 1. Create a new Google Doc (this will be your "extractor tool")
 * 2. Extensions → Apps Script
 * 3. Paste this entire file
 * 4. Save and close
 * 5. Reload the doc - "📄 Doc Extractor" menu appears
 */

// ============================================
// MENU SETUP
// ============================================

function onOpen() {
  DocumentApp.getUi()
    .createMenu('📄 Doc Extractor')
    .addItem('🔗 Extract Docs...', 'showUrlDialog')
    .addItem('ℹ️ Help', 'showHelp')
    .addToUi();
}

// Also run on install
function onInstall(e) {
  onOpen(e);
}

// ============================================
// UI DIALOGS
// ============================================

function showUrlDialog() {
  const html = HtmlService.createHtmlOutput(`
    <style>
      body { font-family: Google Sans, Arial, sans-serif; padding: 16px; }
      h2 { margin-top: 0; color: #1a73e8; }
      textarea { 
        width: 100%; 
        height: 200px; 
        font-family: monospace; 
        font-size: 12px;
        border: 1px solid #dadce0;
        border-radius: 4px;
        padding: 8px;
        box-sizing: border-box;
      }
      textarea:focus { outline: 2px solid #1a73e8; border-color: transparent; }
      .hint { color: #5f6368; font-size: 12px; margin: 8px 0; }
      button {
        background: #1a73e8;
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        margin-top: 12px;
      }
      button:hover { background: #1557b0; }
      button:disabled { background: #dadce0; cursor: not-allowed; }
      #status { margin-top: 12px; padding: 8px; border-radius: 4px; display: none; }
      .processing { background: #e8f0fe; color: #1a73e8; }
      .success { background: #e6f4ea; color: #137333; }
      .error { background: #fce8e6; color: #c5221f; }
    </style>
    
    <h2>Extract Google Docs</h2>
    <p>Paste Google Doc URLs below (one per line):</p>
    
    <textarea id="urls" placeholder="https://docs.google.com/document/d/abc123.../edit
https://docs.google.com/document/d/def456.../edit
https://docs.google.com/document/d/ghi789.../edit"></textarea>
    
    <p class="hint">
      💡 Supports full URLs or just the document ID<br>
      📦 Each doc will be extracted with all tabs and images
    </p>
    
    <button id="extractBtn" onclick="startExtraction()">📦 Extract All</button>
    
    <div id="status"></div>
    
    <script>
      function startExtraction() {
        const urls = document.getElementById('urls').value.trim();
        if (!urls) {
          showStatus('Please enter at least one URL', 'error');
          return;
        }
        
        const btn = document.getElementById('extractBtn');
        btn.disabled = true;
        btn.textContent = '⏳ Processing...';
        showStatus('Extracting documents... This may take a moment.', 'processing');
        
        google.script.run
          .withSuccessHandler(onSuccess)
          .withFailureHandler(onError)
          .extractFromUrls(urls);
      }
      
      function onSuccess(result) {
        const btn = document.getElementById('extractBtn');
        btn.disabled = false;
        btn.textContent = '📦 Extract All';
        
        if (result.success) {
          showStatus('✅ ' + result.message + ' Check your Downloads folder!', 'success');
        } else {
          showStatus('⚠️ ' + result.message, 'error');
        }
      }
      
      function onError(error) {
        const btn = document.getElementById('extractBtn');
        btn.disabled = false;
        btn.textContent = '📦 Extract All';
        showStatus('❌ Error: ' + error.message, 'error');
      }
      
      function showStatus(message, type) {
        const status = document.getElementById('status');
        status.textContent = message;
        status.className = type;
        status.style.display = 'block';
      }
    </script>
  `)
  .setWidth(500)
  .setHeight(450);
  
  DocumentApp.getUi().showModalDialog(html, 'Extract Google Docs');
}

function showHelp() {
  const html = HtmlService.createHtmlOutput(`
    <style>
      body { font-family: Google Sans, Arial, sans-serif; padding: 16px; line-height: 1.6; }
      h2 { color: #1a73e8; margin-top: 0; }
      h3 { color: #202124; margin-top: 20px; }
      code { background: #f1f3f4; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
      ul { padding-left: 20px; }
      .tip { background: #e8f0fe; padding: 12px; border-radius: 8px; margin: 12px 0; }
    </style>
    
    <h2>📄 Doc Extractor Help</h2>
    
    <h3>What this tool does</h3>
    <p>Extracts all <strong>tabs</strong> and <strong>images</strong> from Google Docs and downloads them as a ZIP file.</p>
    
    <h3>Two ways to use it</h3>
    <ul>
      <li><strong>Extract from URLs:</strong> Paste links to any Google Docs you have access to</li>
      <li><strong>Extract THIS doc:</strong> Extract the current document you're viewing</li>
    </ul>
    
    <h3>Output format</h3>
    <p>For each document, you get:</p>
    <ul>
      <li><code>TabName_annotated.txt</code> - Text content with table formatting</li>
      <li><code>TabName_IMG_1.png</code> - Images found in that tab</li>
    </ul>
    
    <div class="tip">
      💡 <strong>Tip:</strong> Bookmark this doc! Use it whenever you need to extract content from Google Docs.
    </div>
    
    <h3>Troubleshooting</h3>
    <ul>
      <li><strong>Menu not showing?</strong> Reload the page</li>
      <li><strong>Permission error?</strong> You need view access to the docs you're extracting</li>
      <li><strong>Nothing downloads?</strong> Check your browser's popup blocker</li>
    </ul>
  `)
  .setWidth(450)
  .setHeight(500);
  
  DocumentApp.getUi().showModalDialog(html, 'Help');
}

// ============================================
// EXTRACTION LOGIC
// ============================================

function extractCurrentDoc() {
  try {
    const doc = DocumentApp.getActiveDocument();
    const result = extractDocument(doc);
    downloadZip(result.zipBlob, result.docName);
    
    DocumentApp.getUi().alert(
      '✅ Extraction Complete',
      `Extracted ${result.tabCount} tab(s) and ${result.imageCount} image(s).\n\nCheck your Downloads folder!`,
      DocumentApp.getUi().ButtonSet.OK
    );
  } catch (error) {
    DocumentApp.getUi().alert('❌ Error', error.message, DocumentApp.getUi().ButtonSet.OK);
  }
}

function extractFromUrls(urlsText) {
  const urls = urlsText.split('\n').map(u => u.trim()).filter(u => u.length > 0);
  
  if (urls.length === 0) {
    return { success: false, message: 'No valid URLs provided' };
  }
  
  const results = [];
  const errors = [];
  
  for (const url of urls) {
    try {
      const docId = extractDocId(url);
      const doc = DocumentApp.openById(docId);
      const result = extractDocument(doc);
      results.push(result);
    } catch (error) {
      errors.push(`${url.substring(0, 50)}...: ${error.message}`);
    }
  }
  
  if (results.length === 0) {
    return { success: false, message: 'Failed to extract any documents. Errors: ' + errors.join('; ') };
  }
  
  // If single doc, download directly
  if (results.length === 1) {
    downloadZip(results[0].zipBlob, results[0].docName);
    return { 
      success: true, 
      message: `Extracted "${results[0].docName}" (${results[0].tabCount} tabs, ${results[0].imageCount} images)`
    };
  }
  
  // Multiple docs - combine into one ZIP
  const combinedZip = combineZips(results);
  downloadZip(combinedZip, 'docs_export');
  
  const totalTabs = results.reduce((sum, r) => sum + r.tabCount, 0);
  const totalImages = results.reduce((sum, r) => sum + r.imageCount, 0);
  
  let message = `Extracted ${results.length} docs (${totalTabs} tabs, ${totalImages} images)`;
  if (errors.length > 0) {
    message += `. ${errors.length} failed.`;
  }
  
  return { success: true, message };
}

function extractDocId(input) {
  // Handle full URLs
  const urlMatch = input.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (urlMatch) return urlMatch[1];
  
  // Handle just the ID
  if (/^[a-zA-Z0-9_-]+$/.test(input)) return input;
  
  throw new Error('Invalid document URL or ID');
}

function extractDocument(doc) {
  const docName = sanitizeFilename(doc.getName());
  const tabs = doc.getTabs();
  
  const files = [];
  let imageCount = 0;
  
  for (const tab of tabs) {
    const tabName = sanitizeFilename(tab.getTitle() || 'Untitled');
    const tabContent = tab.asDocumentTab();
    const body = tabContent.getBody();
    
    // Extract text with table formatting
    const textContent = extractBodyContent(body);
    files.push({
      name: `${tabName}_annotated.txt`,
      content: textContent
    });
    
    // Extract images
    const images = extractImages(body);
    images.forEach((imgBlob, idx) => {
      const ext = getImageExtension(imgBlob.getContentType());
      files.push({
        name: `${tabName}_IMG_${idx + 1}.${ext}`,
        blob: imgBlob
      });
      imageCount++;
    });
  }
  
  // Create ZIP
  const zipBlob = createZipFromFiles(files, docName);
  
  return {
    docName,
    tabCount: tabs.length,
    imageCount,
    zipBlob
  };
}

function extractBodyContent(body) {
  const lines = [];
  const numChildren = body.getNumChildren();
  
  for (let i = 0; i < numChildren; i++) {
    const child = body.getChild(i);
    const type = child.getType();
    
    if (type === DocumentApp.ElementType.PARAGRAPH) {
      lines.push(child.getText());
    } else if (type === DocumentApp.ElementType.LIST_ITEM) {
      const indent = '  '.repeat(child.getNestingLevel());
      const bullet = child.getGlyphType() === DocumentApp.GlyphType.NUMBER ? '#' : '•';
      lines.push(`${indent}${bullet} ${child.getText()}`);
    } else if (type === DocumentApp.ElementType.TABLE) {
      lines.push(formatTable(child.asTable()));
    }
  }
  
  return lines.join('\n');
}

function formatTable(table) {
  const rows = [];
  const numRows = table.getNumRows();
  
  rows.push('[TABLE]');
  
  for (let r = 0; r < numRows; r++) {
    const row = table.getRow(r);
    const cells = [];
    const numCells = row.getNumCells();
    
    for (let c = 0; c < numCells; c++) {
      cells.push(row.getCell(c).getText().replace(/\n/g, ' '));
    }
    
    rows.push('| ' + cells.join(' | ') + ' |');
  }
  
  rows.push('[/TABLE]');
  return rows.join('\n');
}

function extractImages(body) {
  const images = [];
  const numChildren = body.getNumChildren();
  
  for (let i = 0; i < numChildren; i++) {
    const child = body.getChild(i);
    findImagesInElement(child, images);
  }
  
  return images;
}

function findImagesInElement(element, images) {
  const type = element.getType();
  
  if (type === DocumentApp.ElementType.INLINE_IMAGE) {
    try {
      images.push(element.getBlob());
    } catch (e) {
      // Skip images that can't be extracted
    }
  } else if (type === DocumentApp.ElementType.PARAGRAPH) {
    const para = element.asParagraph();
    const numChildren = para.getNumChildren();
    for (let i = 0; i < numChildren; i++) {
      findImagesInElement(para.getChild(i), images);
    }
  } else if (type === DocumentApp.ElementType.TABLE) {
    const table = element.asTable();
    const numRows = table.getNumRows();
    for (let r = 0; r < numRows; r++) {
      const row = table.getRow(r);
      const numCells = row.getNumCells();
      for (let c = 0; c < numCells; c++) {
        const cell = row.getCell(c);
        const numChildren = cell.getNumChildren();
        for (let i = 0; i < numChildren; i++) {
          findImagesInElement(cell.getChild(i), images);
        }
      }
    }
  }
}

// ============================================
// ZIP CREATION
// ============================================

function createZipFromFiles(files, folderName) {
  const blobs = files.map(f => {
    if (f.blob) {
      return f.blob.setName(`${folderName}_export/${f.name}`);
    } else {
      return Utilities.newBlob(f.content, 'text/plain', `${folderName}_export/${f.name}`);
    }
  });
  
  return Utilities.zip(blobs, `${folderName}_export.zip`);
}

function combineZips(results) {
  const allBlobs = [];
  
  for (const result of results) {
    // Unzip each result
    const unzipped = Utilities.unzip(result.zipBlob);
    allBlobs.push(...unzipped);
  }
  
  return Utilities.zip(allBlobs, 'docs_export.zip');
}

function downloadZip(zipBlob, name) {
  // Create file in Drive (user can download from there)
  const file = DriveApp.createFile(zipBlob);
  const fileUrl = file.getUrl();
  const fileName = file.getName();
  
  // Show dialog with link to the file in Drive (avoids authuser issues)
  const html = HtmlService.createHtmlOutput(`
    <style>
      body { font-family: Google Sans, Arial, sans-serif; padding: 16px; text-align: center; }
      .success { color: #137333; font-size: 24px; margin-bottom: 12px; }
      .filename { background: #f1f3f4; padding: 8px 12px; border-radius: 4px; 
                  font-family: monospace; font-size: 13px; margin: 12px 0; }
      .btn { display: inline-block; background: #1a73e8; color: white; 
             padding: 10px 24px; border-radius: 4px; text-decoration: none; 
             font-size: 14px; margin: 8px 0; }
      .btn:hover { background: #1557b0; }
      .hint { color: #5f6368; font-size: 12px; margin-top: 16px; }
    </style>
    
    <div class="success">✅ Extraction Complete!</div>
    
    <div class="filename">${fileName}</div>
    
    <p>Your ZIP file has been saved to Google Drive.</p>
    
    <a class="btn" href="${fileUrl}" target="_blank">📂 Open in Drive</a>
    
    <p class="hint">
      Click "Open in Drive" → then click the ⬇️ download button in Drive<br>
      (The file is in your Drive root folder)
    </p>
  `)
  .setWidth(400)
  .setHeight(280);
  
  DocumentApp.getUi().showModalDialog(html, 'Download Ready');
}

// ============================================
// UTILITIES
// ============================================

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9_\- ]/g, '_').substring(0, 50);
}

function getImageExtension(mimeType) {
  const map = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp'
  };
  return map[mimeType] || 'png';
}

