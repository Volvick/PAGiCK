const submitBtn = document.getElementById("submitBtn");
const userName = document.getElementById("name");
const userClasss = document.getElementById("classs");
const userRoll = document.getElementById("roll");
const userAdmno = document.getElementById("admno");
const userSession = document.getElementById("session");
const userSubmit = document.getElementById("submitted");
const userDate = document.getElementById("date");
const loadingBox = document.getElementById("loadingBox");

const generatePDF = async (name, classs, roll, admno, submitted, session, date) => {
  loadingBox.style.display = "block";

  const { PDFDocument, rgb, degrees } = PDFLib;

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

  const exBytes = await fetch("./cert.pdf").then((res) => res.arrayBuffer());
  const exFont = await fetch("./Poppins-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(exBytes);
  pdfDoc.registerFontkit(fontkit);
  const myFont = await pdfDoc.embedFont(exFont);
  const pages = pdfDoc.getPages();
  const firstPg = pages[0];

  firstPg.drawText(name, {
    x: 73,
    y: 302,
    size: 18,
    font: myFont,
    color: rgb(0.102, 0.102, 0.102),
  });
  firstPg.drawText(classs, {
    x: 73,
    y: 228,
    size: 18,
    font: myFont,
    color: rgb(0.102, 0.102, 0.102),
  });
  firstPg.drawText(admno, {
     x: 70,
    y: 83,
    size: 18,
    font: myFont,
    color: rgb(0.102, 0.102, 0.102),
  });
  firstPg.drawText(roll, {

    x: 70,
    y: 158,
    size: 18,
    font: myFont,
    color: rgb(0.102, 0.102, 0.102),
  });
  firstPg.drawText(submitted, {
    x: 390,
    y: 168,
    size: 13,
    font: myFont,
    color: rgb(0.102, 0.102, 0.102),
  });
  firstPg.drawText(session, {
    x: 390,
    y: 269,
    size: 13,
    font: myFont,
    color: rgb(0.102, 0.102, 0.102),
  });
  firstPg.drawText(date, {
    x: 498,
    y: 813,
    size: 12,
    font: myFont,
    color: rgb(0.102, 0.102, 0.102),
  });

  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/T/, "_")
    .replace(/:/g, "-")
    .split(".")[0];
  const filename = `PAGiCK_${timestamp}.pdf`;

  const pdfBytes = await pdfDoc.save();
  const file = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(file, filename);

  setTimeout(() => {
    loadingBox.style.display = "none";
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
  const valDate = userDate.value;


  if (
    valName.trim() !== "" &&
    valClass.trim() !== "" &&
    valRoll.trim() !== "" &&
    valAdmno.trim() !== "" &&
    valSubmitted.trim() !== "" &&
    valSession.trim() !== "" &&
    valDate.trim() !== ""
  ) {
    generatePDF(valName, valClass, valRoll, valAdmno, valSubmitted, valSession, valDate); 
  } else {
    alert("Please fill in all fields before downloading the PDF.");
  }
});
