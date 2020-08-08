if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js")
      .then(() => console.log("Pendaftaran service worker berhasil"))
      .catch(() => console.log("Pendaftaran serviceWorker gagal"))
    })
  } else {
    console.log("Service Worker belum didukung pada browser ini")
  }

  document.addEventListener("DOMContentLoaded", function() {
  var urlParams = new URLSearchParams(window.location.search);
  var isFromSaved = urlParams.get("saved");
  var btnSave = document.getElementById("save");


  if (isFromSaved) {
    btnSave.style.display = 'none';
    
    getSavedArticleById();
  } else {
    var item = getArticleById();
  }

  btnSave.onclick = function() {
    console.log("Tombol FAB di klik.");
    item.then(function(article) {
      saveForLater(article);
    });
  };
});