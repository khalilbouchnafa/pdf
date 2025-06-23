const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib;
function showMainContainer() {
  document.getElementById('mainContainer').classList.remove('d-none');
  document.getElementById('secondaryContainer').classList.add('d-none');
}

function showSecondaryContainer() {
  document.getElementById('mainContainer').classList.add('d-none');
  document.getElementById('secondaryContainer').classList.remove('d-none');
}

let uploadedPdfBytes; // Ensure this is defined in the outer scope to be accessible in all functions

document.getElementById('dropZone').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    readPdfFile(file);
  }
});

document.getElementById('dropZone').addEventListener('dragover', (event) => {
  event.preventDefault();
  event.currentTarget.classList.add('dragover');
});

document.getElementById('dropZone').addEventListener('dragleave', (event) => {
  event.currentTarget.classList.remove('dragover');
});

document.getElementById('dropZone').addEventListener('drop', (event) => {
  event.preventDefault();
  event.currentTarget.classList.remove('dragover');
  const file = event.dataTransfer.files[0];
  if (file) {
    readPdfFile(file);
  }
});
document.getElementById('dropZone').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});
document.getElementById('fileInput').addEventListener('change', function() {
  var fileName = this.files[0].name;
  document.getElementById('fileNameDisplay1').value = fileName;
});

// ********************************************************************************
// ********************************************************************************
// ********************************************************************************

document.getElementById('file1Input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    readPdfFile(file);
  }
});

document.getElementById('drop1Zone').addEventListener('dragover', (event) => {
  event.preventDefault();
  event.currentTarget.classList.add('dragover');
});

document.getElementById('drop1Zone').addEventListener('dragleave', (event) => {
  event.currentTarget.classList.remove('dragover');
});

document.getElementById('drop1Zone').addEventListener('drop', (event) => {
  event.preventDefault();
  event.currentTarget.classList.remove('dragover');
  const file = event.dataTransfer.files[0];
  if (file) {
    readPdfFile(file);
  }
});
document.getElementById('drop1Zone').addEventListener('click', () => {
  document.getElementById('file1Input').click();
});
document.getElementById('file1Input').addEventListener('change', function() {
  var fileName = this.files[0].name;
  document.getElementById('fileNameDisplay2').value = fileName;
});
// ********************************************************************************
// ********************************************************************************
// ********************************************************************************

function readPdfFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    uploadedPdfBytes = new Uint8Array(reader.result);
  };
  reader.readAsArrayBuffer(file);
}

async function modifyPdf() {
  // Fetch an existing PDF document
  if (!uploadedPdfBytes) {
    alert('Please upload a PDF file first.');
    return;
  }

  const inputText = document.getElementById('inputText').value;
  const inputText1 = document.getElementById('inputText1').value;
  const inputText2 = document.getElementById('inputText2').value;
  const inputText3 = document.getElementById('inputText3').value;
  const inputText4 = document.getElementById('inputText4').value;

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(uploadedPdfBytes);
  const fontSize = 12;

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaFontb = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Get the pages of the document
  const pages = pdfDoc.getPages();

  // Check if the PDF has at least 3 pages
  if (pages.length < 3) {
    alert('The PDF does not have enough pages.');
    return;
  }

  const firstPage = pages[1];

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize();

   // Draw the texts
   firstPage.drawText(inputText, {
    x: 75,
    y: height / 2 + 338,
    size: 11.5,
    font: helveticaFontb,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });
  firstPage.drawText(inputText1, {
    x: 75,
    y: height / 2 + 320,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });
  firstPage.drawText(inputText2, {
    x: 75,
    y: height / 2 + 304,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });
  firstPage.drawText(inputText3, {
    x: 75.2,
    y: height / 2 + 275,
    size: 10,
    font: helveticaFontb,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });
  firstPage.drawText(inputText4, {
    x: 70,
    y: height / 2 + 195,
    size: 11,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  const inputText5 = document.getElementById('inputText5').value;

  // Trigger the browser to download the PDF document using FileSaver.js
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(blob, inputText5);
}
async function modifyonePdf() {
  // Fetch an existing PDF document
  if (!uploadedPdfBytes) {
    alert('Please upload a PDF file first.');
    return;
  }

  const inputText = document.getElementById('input1Text').value;
  const inputText1 = document.getElementById('input1Text1').value;
  const inputText2 = document.getElementById('input1Text2').value;
  const inputText3 = document.getElementById('input1Text3').value;
  const inputText4 = document.getElementById('input1Text4').value;

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(uploadedPdfBytes);
  const fontSize = 12;

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaFontb = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Get the pages of the document
  const pages = pdfDoc.getPages();

  // Check if the PDF has at least 3 pages
  if (pages.length > 1) {
    alert('The PDF does not have enough pages.');
    return;
  }

  const firstPage = pages[0];

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize();

  // Draw the texts
  firstPage.drawText(inputText, {
    x: 75,
    y: height / 2 + 338,
    size: 11.5,
    font: helveticaFontb,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });
  firstPage.drawText(inputText1, {
    x: 75,
    y: height / 2 + 320,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });
  firstPage.drawText(inputText2, {
    x: 75,
    y: height / 2 + 304,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });
  firstPage.drawText(inputText3, {
    x: 75.2,
    y: height / 2 + 275,
    size: 10,
    font: helveticaFontb,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });
  firstPage.drawText(inputText4, {
    x: 70,
    y: height / 2 + 195,
    size: 10,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  const inputText5 = document.getElementById('input1Text5').value;

  // Trigger the browser to download the PDF document using FileSaver.js
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(blob, inputText5);
}
