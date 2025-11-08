const pageUrl = encodeURIComponent("https://pagickk.web.app");
const shareText = encodeURIComponent(
  "Hey! Struggling to create a Cover Page? PAGiCK is here to help! Check it out here: https://pagickk.web.app"
);

function toggleSharePopup() {
  const popup = document.getElementById("share-popup");

  if (popup.classList.contains("show")) {
    popup.classList.remove("show");
  } else {
    popup.classList.add("show");
  }
}
function toggleSharePopupMoney() {
  const popup = document.getElementById("share-popup-money");

  if (popup.classList.contains("show")) {
    popup.classList.remove("show");
  } else {
    popup.classList.add("show");
  }
}

function shareOnTwitter() {
  window.open(
    `https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`,
    "_blank",
    "width=600,height=400"
  );
}

function shareOnFacebook() {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    "_blank",
    "width=600,height=400"
  );
}

function shareOnLinkedIn() {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    "_blank",
    "width=600,height=400"
  );
}

function shareOnWhatsApp() {
  window.open(`https://api.whatsapp.com/send?text=${shareText}`, "_blank");
}

function copyForInstagram() {
  const textToCopy = `Hey! Struggling to create a Cover Page? PAGiCK is here to help! Check it out here: https://pagickk.web.app`;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Message copied! Paste it on Instagram.");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
function copyUPI() {
  const textToCopy = `volvick5050@okhdfcbank`;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("UPI ID copied!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
