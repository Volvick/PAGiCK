const submitBtn = document.getElementById("submitBtn");
const userName = document.getElementById("name");
const userClasss = document.getElementById("classs");
const userRoll = document.getElementById("roll");
const userAdmno = document.getElementById("admno");
const userSession = document.getElementById("session");
const userSubmit = document.getElementById("submitted");
const loadingBox = document.getElementById("loadingBox"); // Added loading box

const generatePDF = async (name, classs, roll, admno, submitted, session) => {
  loadingBox.style.display = "block"; // Show loading box

  const { PDFDocument, rgb, degrees } = PDFLib;

  const exBytes = await fetch("./cert.pdf").then((res) => res.arrayBuffer());
  const exFont = await fetch("./Poppins-Regular.ttf").then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(exBytes);
  pdfDoc.registerFontkit(fontkit);
  const myFont = await pdfDoc.embedFont(exFont);
  const pages = pdfDoc.getPages();
  const firstPg = pages[0];

  // Drawing text onto the PDF
  firstPg.drawText(name, { x: 94, y: 256, size: 18, font: myFont, color: rgb(0.078, 0.078, 0.078) });
  firstPg.drawText(classs, { x: 94, y: 198, size: 18, font: myFont, color: rgb(0.078, 0.078, 0.078) });
  firstPg.drawText(roll, { x: 100, y: 134, size: 18, font: myFont, color: rgb(0.078, 0.078, 0.078) });
  firstPg.drawText(admno, { x: 102, y: 63, size: 18, font: myFont, color: rgb(0.078, 0.078, 0.078) });
  firstPg.drawText(session, {
    x: 54,
    y: 470,
    size: 24,
    font: myFont,
    color: rgb(0.05, 0.05, 0.05),
    rotate: degrees(90),
  });
  firstPg.drawText(submitted, {
    x: 344,
    y: 114,
    size: 15,
    font: myFont,
    color: rgb(0.05, 0.05, 0.05),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();

  // Generate date-time string
  const now = new Date();
  const timestamp = now.toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0]; // Format: YYYY-MM-DD_HH-MM-SS

  // Create file and download
  const file = new Blob([pdfBytes], { type: "application/pdf" });
  const filename = `PAGiCK_${timestamp}.pdf`;
  saveAs(file, filename);

  loadingBox.style.display = "none"; // Hide loading box after PDF is generated
};

// Capitalization function
const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

// Button Click Event Listener
submitBtn.addEventListener("click", () => {
  const valName = capitalize(userName.value);
  const valClass = capitalize(userClasss.value);
  const valRoll = userRoll.value;
  const valAdmno = userAdmno.value;
  const valSubmitted = capitalize(userSubmit.value);
  const valSession = userSession.value;

  // Ensure all fields are filled before generating the PDF
  if (
    valName.trim() !== "" &&
    valClass.trim() !== "" &&
    valRoll.trim() !== "" &&
    valAdmno.trim() !== "" &&
    valSubmitted.trim() !== "" &&
    valSession.trim() !== ""
  ) {
    generatePDF(valName, valClass, valRoll, valAdmno, valSubmitted, valSession);
  } else {
    alert("Please fill in all fields before downloading the PDF.");
  }
});
