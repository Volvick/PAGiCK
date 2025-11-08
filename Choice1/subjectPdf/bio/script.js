const submitBtn = document.getElementById("submitBtn");
const userName = document.getElementById("name");
const userClasss = document.getElementById("classs");
const userRoll = document.getElementById("roll");
const userAdmno = document.getElementById("admno");
const userSession = document.getElementById("session");
const userSubmit = document.getElementById("submitted");
const loadingBox = document.getElementById("loadingBox"); // Added for loading message

const generatePDF = async (name, classs, roll, admno, submitted, session) => {
  loadingBox.style.display = "block"; // Show loading message

  const { PDFDocument, rgb, degrees } = PDFLib;

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

  const exBytes = await fetch("./cert.pdf").then((res) => res.arrayBuffer());
  const exFont = await fetch("./Poppins-Regular.ttf").then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(exBytes);
  pdfDoc.registerFontkit(fontkit);
  const myFont = await pdfDoc.embedFont(exFont);
  const pages = pdfDoc.getPages();
  const firstPg = pages[0];

  // Keeping the coordinates unchanged
  firstPg.drawText(name, { x: 67, y: 242, size: 17, font: myFont, color: rgb(0.05, 0.05, 0.05) });
  firstPg.drawText(classs, { x: 67, y: 170, size: 17, font: myFont, color: rgb(0.05, 0.05, 0.05) });
  firstPg.drawText(roll, { x: 67, y: 100, size: 17, font: myFont, color: rgb(0.05, 0.05, 0.05) });
  firstPg.drawText(admno, { x: 67, y: 25, size: 17, font: myFont, color: rgb(0.05, 0.05, 0.05) });
  firstPg.drawText(submitted, { x: 369, y: 120, size: 18, font: myFont, color: rgb(0.05, 0.05, 0.05) });
  firstPg.drawText(session, { x: 54, y: 493, size: 24, font: myFont, color: rgb(0.05, 0.05, 0.05), rotate: degrees(90) });

  // Generate date-time string for the filename
  const now = new Date();
  const timestamp = now.toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0]; // Format: YYYY-MM-DD_HH-MM-SS
  const filename = `PAGiCK_${timestamp}.pdf`;

  const pdfBytes = await pdfDoc.save();
  const file = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(file, filename);

  setTimeout(() => {
    loadingBox.style.display = "none"; // Hide loading message after PDF is ready
  }, 1000);
};

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

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
