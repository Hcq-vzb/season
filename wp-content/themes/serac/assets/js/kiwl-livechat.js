/**
 * KIWL Live Chat floating widget
 * Opens a chat panel first; WhatsApp opens only from the green CTA,
 * with site + current page URL in the prefilled message.
 */
(function () {
  if (window.__kiwlLiveChatInit) return;
  window.__kiwlLiveChatInit = true;

  var PHONE = "8617751189576";
  var SITE = "https://seasoningpackagingmachinery.com/";

  function publicPageUrl() {
    try {
      if (location.protocol === "http:" || location.protocol === "https:") {
        if (
          /seasoningpackagingmachinery\.com$/i.test(location.hostname) ||
          /github\.io$/i.test(location.hostname)
        ) {
          return location.href.split("#")[0].split("?")[0];
        }
      }
      // file:// or other hosts: map mirror path to public URL
      var path = (location.pathname || "").replace(/\\/g, "/");
      var marker = "/www.serac-group.com/";
      var idx = path.toLowerCase().indexOf(marker);
      if (idx === -1) {
        marker = "www.serac-group.com/";
        idx = path.toLowerCase().indexOf(marker);
      }
      if (idx !== -1) {
        var rel = path.slice(idx + marker.length).replace(/^\/+/, "");
        if (!rel || /\/$/.test(rel)) rel = (rel || "") + "index.html";
        rel = rel.replace(/\/index\.html$/i, "/").replace(/^index\.html$/i, "");
        return SITE + rel;
      }
    } catch (e) {}
    return SITE;
  }

  function waHref() {
    var page = publicPageUrl();
    var text =
      "Hello, I came from " +
      SITE +
      " Page: " +
      page +
      " I am interested in your filling/packaging machines. Please contact me.";
    return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text);
  }

  function removeLegacy() {
    document.querySelectorAll("a.kiwl-wa-float").forEach(function (el) {
      el.remove();
    });
  }

  function build() {
    removeLegacy();
    if (document.getElementById("kiwl-livechat")) return;

    var root = document.createElement("div");
    root.id = "kiwl-livechat";
    root.className = "kiwl-lc";
    root.innerHTML =
      '<div class="kiwl-lc-panel" id="kiwl-lc-panel" role="dialog" aria-label="KIWL Live Chat" aria-hidden="true">' +
      '  <div class="kiwl-lc-head">' +
      '    <div class="kiwl-lc-avatar" aria-hidden="true">KIWL</div>' +
      '    <div class="kiwl-lc-head-text">' +
      "      <strong>KIWL Support</strong>" +
      "      <span>Online · Sales team</span>" +
      "    </div>" +
      '    <button type="button" class="kiwl-lc-close" id="kiwl-lc-close" aria-label="Close chat">&times;</button>' +
      "  </div>" +
      '  <div class="kiwl-lc-body" id="kiwl-lc-body">' +
      '    <div class="kiwl-lc-msg kiwl-lc-msg--user">Hi, I would like more information.</div>' +
      '    <div class="kiwl-lc-msg kiwl-lc-msg--bot">Hello! Welcome to KIWL Machine (Ching King Whale) 👋</div>' +
      '    <div class="kiwl-lc-msg kiwl-lc-msg--bot">We are a professional seasoning packaging machinery manufacturer. We provide sauce filling machines, edible oil packaging lines, and turnkey plant solutions worldwide.</div>' +
      '    <div class="kiwl-lc-typing" id="kiwl-lc-typing" aria-hidden="true"><i></i><i></i><i></i></div>' +
      "  </div>" +
      '  <div class="kiwl-lc-foot">' +
      '    <a class="kiwl-lc-wa" id="kiwl-lc-wa" href="#" target="_blank" rel="noopener noreferrer">' +
      '      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C9.4 3 4 8.28 4 14.77c0 2.1.56 4.08 1.54 5.8L4 29l8.67-1.5c1.64.9 3.5 1.38 5.43 1.38h.01C24.7 28.88 30 23.6 30 17.11 30 10.62 24.68 3 16.04 3zm7.56 17.63c-.32.9-1.85 1.66-2.57 1.77-.66.1-1.5.14-2.42-.15-.56-.17-1.28-.4-2.2-.78-3.87-1.67-6.39-5.57-6.58-5.83-.2-.26-1.57-2.09-1.57-3.99s.99-2.83 1.34-3.22c.35-.38.76-.48 1.01-.48h.73c.24 0 .56-.09.87.67.32.79 1.08 2.64 1.18 2.83.1.19.16.41.03.66-.13.26-.2.41-.39.63-.2.22-.41.49-.59.66-.2.19-.4.39-.17.76.22.38 1 1.65 2.15 2.67 1.48 1.31 2.72 1.72 3.1 1.91.38.19.61.16.83-.1.23-.26.97-1.13 1.23-1.52.26-.38.52-.32.87-.19.35.13 2.22 1.05 2.6 1.24.38.19.64.29.73.45.1.16.1.93-.22 1.83z"/></svg>' +
      "      Chat on WhatsApp" +
      "    </a>" +
      '    <p class="kiwl-lc-note">Your page link will be sent automatically so we know what you need.</p>' +
      "  </div>" +
      "</div>" +
      '<button type="button" class="kiwl-lc-launcher" id="kiwl-lc-launcher" aria-expanded="false" aria-controls="kiwl-lc-panel">' +
      '  <span class="kiwl-lc-dot" aria-hidden="true"></span>' +
      '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      "  Live Chat" +
      "</button>";

    document.body.appendChild(root);

    var panel = document.getElementById("kiwl-lc-panel");
    var launcher = document.getElementById("kiwl-lc-launcher");
    var closeBtn = document.getElementById("kiwl-lc-close");
    var wa = document.getElementById("kiwl-lc-wa");
    var typing = document.getElementById("kiwl-lc-typing");

    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      launcher.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && typing) {
        typing.style.display = "inline-flex";
        setTimeout(function () {
          if (typing) typing.style.display = "none";
        }, 1800);
      }
    }

    launcher.addEventListener("click", function () {
      setOpen(!panel.classList.contains("is-open"));
    });
    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    wa.addEventListener("click", function (e) {
      e.preventDefault();
      window.open(waHref(), "_blank", "noopener,noreferrer");
    });
    // keep href fresh for middle-click / open-in-new-tab
    wa.setAttribute("href", waHref());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
