"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function (window, document) {
  function accordion(options) {
    var options1 = {
      el: options.el || ".accordion",
      btns: options.btns || "button",
      panels: options.panels || ".panel",
      contents: options.contents || ".content"
    };
    var el = document.querySelector(options1.el);
    if (!el) return;
    var btns = el.querySelectorAll(options1.btns);
    var panels = el.querySelectorAll(options1.panels);
    var contents = el.querySelectorAll(options1.contents);
    var heights = [];
    var resizeTimer;
    function test() {
      heights = [];
      for (var i = 0; i < contents.length; i++) {
        heights.push(contents[i].scrollHeight);
      }
      for (var _i = 0; _i < btns.length; _i++) {
        if (btns[_i].classList.contains("active")) {
          panels[_i].style.height = heights[_i] + "px";
        } else {
          panels[_i].style.height = null;
        }
      }
    }
    ;
    var _loop = function _loop(i) {
      btns[i].onclick = function () {
        btns[i].classList.add("open");
        this.classList.toggle("active");
        test();
      };
    };
    for (var i = 0; i < btns.length; i++) {
      _loop(i);
    }
    window.addEventListener("resize", function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        test();
      }, 100);
    });
  }
  window.accordion = accordion;
})(window, document);
(function (window, document) {
  var video = document.querySelector('.video video');
  if (!video) return;
  var video_wrapper = document.querySelector('.video');
  var video_source = document.querySelector(".video source");
  var windowHeight;
  function _onresize() {
    windowHeight = window.innerHeight;
  }
  var src = video_source.src;
  var isOnviewport = false;
  var old;
  var bound;
  function _onviewport() {
    bound = video_wrapper.getBoundingClientRect();
    bound.top - windowHeight <= 200 ? isOnviewport = true : isOnviewport = false;
    if (old != isOnviewport) {
      if (isOnviewport == true) {
        video_wrapper.classList.add("active");
        video.play();
        video.setAttribute("autoplay", true);
        video_source.src = src;
        video.oncanplay = function () {
          video.play();
        };
      } else {
        video_wrapper.classList.remove("active");
        video.pause();
      }
    }
    old = isOnviewport;
  }
  window.addEventListener("resize", _onresize);
  window.addEventListener("scroll", _onviewport);
  _onresize();
  _onviewport();
})(window, document);
(function (window, document) {
  function breakpoint(size) {
    var onUnder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var onOver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var old = null;
    var over = false;
    var values = {
      small: 480,
      medium: 768,
      large: 1024,
      wild: 1200
    };
    function resize() {
      over = window.innerWidth > values[size] ? true : false;
      if (over != old) {
        if (over) onOver();else onUnder();
      }
      old = over;
    }
    window.addEventListener("resize", resize, false);
    resize();
  }
  window.breakpoint = breakpoint;
})(window, document);
(function (window, document) {
  function rgpd(options) {
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString() + "; path=/";
      document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    }
    var isCookie = getCookie("cookie_panel") ? true : false;
    if (!isCookie) {
      var cookie_panel = document.querySelector(".cookies");
      cookie_panel.classList.add("display");
      var accept = cookie_panel.querySelector(".accept");
      accept.onclick = function () {
        setCookie("cookie_panel", "true", 30);
        cookie_panel.classList.remove("display");
        if (typeof options.valid === "function") options.valid();
      };
    } else {
      if (typeof options.valid === "function") options.valid();
    }
  }
  window.rgpd = rgpd;
})(window, document);
var CLOSE_ANIM_MS = 160;
var _lastTriggerByDialog = new WeakMap();
var FOCUSABLE_SELECTOR = ['a[href]:not([disabled])', 'button:not([disabled])', 'textarea:not([disabled])', 'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'].join(", ");
var isDialogOpen = function isDialogOpen(dialog) {
  if (!dialog) return false;
  try {
    if (typeof dialog.open === "boolean") return dialog.open;
  } catch (_) {}
  return dialog.hasAttribute("open");
};
var getFocusableElements = function getFocusableElements(root) {
  if (!root) return [];
  return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR)).filter(function (el) {
    if (!(el instanceof HTMLElement)) return false;
    if (el.closest("[inert]")) return false;
    try {
      if (typeof el.checkVisibility === "function" && !el.checkVisibility({
        checkOpacity: true,
        checkVisibilityCSS: true
      })) {
        return false;
      }
    } catch (_) {}
    return true;
  });
};
var openDialog = function openDialog(dialog) {
  if (!dialog) return;
  try {
    if (typeof dialog.showModal === "function") dialog.showModal();else dialog.setAttribute("open", "");
  } catch (_) {
    try {
      dialog.setAttribute("open", "");
    } catch (_) {}
  }
};
var closeDialog = function closeDialog(dialog) {
  var returnValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "close";
  if (!dialog) return;
  try {
    if (typeof dialog.close === "function") dialog.close(returnValue);else dialog.removeAttribute("open");
  } catch (_) {
    try {
      dialog.removeAttribute("open");
    } catch (_) {}
  }
};
var requestCloseDialog = function requestCloseDialog(dialog) {
  var returnValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "close";
  if (!dialog) return;
  if (dialog.__dialogCloseTimer) return;
  try {
    dialog.setAttribute("data-dialog-closing", "1");
  } catch (_) {}
  dialog.__dialogCloseTimer = window.setTimeout(function () {
    dialog.__dialogCloseTimer = null;
    closeDialog(dialog, returnValue);
  }, CLOSE_ANIM_MS);
};
var focusDialogDefault = function focusDialogDefault(dialog) {
  if (!dialog) return;
  var preferred = dialog.querySelector("[data-dialog-close]") || dialog.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
  if (preferred && typeof preferred.focus === "function") {
    try {
      preferred.focus();
    } catch (_) {}
  }
};
var Dialog = function () {
  function Dialog(dialog) {
    _classCallCheck(this, Dialog);
    if (!(dialog instanceof HTMLDialogElement)) return;
    this.dialog = dialog;
    this.onopen = null;
    this.onclose = null;
    this._cleanups = [];
    this._trapCleanups = [];
    this._onTrapKeydown = null;
    this._onTrapFocusIn = null;
    this._bindDialogEvents();
    this._bindTriggers();
    this._bindCloseButtons();
  }
  return _createClass(Dialog, [{
    key: "destroy",
    value: function destroy() {
      this._disableFocusTrap();
      this._cleanups.forEach(function (fn) {
        try {
          fn();
        } catch (_) {}
      });
      this._cleanups = [];
    }
  }, {
    key: "_disableFocusTrap",
    value: function _disableFocusTrap() {
      this._trapCleanups.forEach(function (fn) {
        try {
          fn();
        } catch (_) {}
      });
      this._trapCleanups = [];
      this._onTrapKeydown = null;
      this._onTrapFocusIn = null;
    }
  }, {
    key: "_enableFocusTrap",
    value: function _enableFocusTrap() {
      var _this = this;
      var dialog = this.dialog;
      this._disableFocusTrap();
      this._onTrapKeydown = function (event) {
        if (event.key !== "Tab" || !isDialogOpen(dialog)) return;
        var focusable = getFocusableElements(dialog);
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        var active = document.activeElement;
        var activeInDialog = active === dialog || dialog.contains(active);
        if (event.shiftKey) {
          if (!activeInDialog || active === first) {
            try {
              event.preventDefault();
            } catch (_) {}
            try {
              last.focus();
            } catch (_) {}
          }
        } else if (!activeInDialog || active === last) {
          try {
            event.preventDefault();
          } catch (_) {}
          try {
            first.focus();
          } catch (_) {}
        }
      };
      this._onTrapFocusIn = function (event) {
        if (!isDialogOpen(dialog)) return;
        var t = event.target;
        if (!t || !(t instanceof Node)) return;
        if (dialog.contains(t)) return;
        var focusable = getFocusableElements(dialog);
        if (!focusable.length) return;
        window.requestAnimationFrame(function () {
          if (!isDialogOpen(dialog)) return;
          var cur = document.activeElement;
          if (cur && dialog.contains(cur)) return;
          try {
            focusable[0].focus();
          } catch (_) {}
        });
      };
      dialog.addEventListener("keydown", this._onTrapKeydown);
      document.addEventListener("focusin", this._onTrapFocusIn, true);
      this._trapCleanups.push(function () {
        return dialog.removeEventListener("keydown", _this._onTrapKeydown);
      });
      this._trapCleanups.push(function () {
        return document.removeEventListener("focusin", _this._onTrapFocusIn, true);
      });
    }
  }, {
    key: "_bindDialogEvents",
    value: function _bindDialogEvents() {
      var _this2 = this;
      var dialog = this.dialog;
      var onClick = function onClick(event) {
        if (event.target !== dialog) return;
        requestCloseDialog(dialog, "backdrop");
      };
      var onCancel = function onCancel(event) {
        try {
          event.preventDefault();
        } catch (_) {}
        requestCloseDialog(dialog, "cancel");
      };
      var onClose = function onClose() {
        _this2._disableFocusTrap();
        if (dialog.__dialogCloseTimer) {
          try {
            window.clearTimeout(dialog.__dialogCloseTimer);
          } catch (_) {}
          dialog.__dialogCloseTimer = null;
        }
        try {
          dialog.removeAttribute("data-dialog-closing");
        } catch (_) {}
        var trigger = _lastTriggerByDialog.get(dialog);
        if (trigger) {
          try {
            trigger.setAttribute("aria-expanded", "false");
          } catch (_) {}
          try {
            trigger.focus();
          } catch (_) {}
        }
        _lastTriggerByDialog.delete(dialog);
        if (typeof _this2.onclose === "function") {
          try {
            _this2.onclose({
              dialog: dialog,
              trigger: trigger || null,
              returnValue: dialog.returnValue || ""
            });
          } catch (_) {}
        }
      };
      dialog.addEventListener("click", onClick);
      dialog.addEventListener("cancel", onCancel);
      dialog.addEventListener("close", onClose);
      this._cleanups.push(function () {
        return dialog.removeEventListener("click", onClick);
      });
      this._cleanups.push(function () {
        return dialog.removeEventListener("cancel", onCancel);
      });
      this._cleanups.push(function () {
        return dialog.removeEventListener("close", onClose);
      });
    }
  }, {
    key: "_bindTriggers",
    value: function _bindTriggers() {
      var _this3 = this;
      var dialog = this.dialog;
      var id = dialog.id;
      if (!id) return;
      var selector = "[data-dialog-id=\"".concat(CSS.escape(id), "\"]");
      var triggers = Array.from(document.querySelectorAll(selector));
      triggers.forEach(function (btn) {
        var onOpen = function onOpen(event) {
          if (btn instanceof HTMLAnchorElement) {
            try {
              event === null || event === void 0 || event.preventDefault();
            } catch (_) {}
          }
          _lastTriggerByDialog.set(dialog, btn);
          try {
            btn.setAttribute("aria-expanded", "true");
          } catch (_) {}
          openDialog(dialog);
          _this3._enableFocusTrap();
          requestAnimationFrame(function () {
            return focusDialogDefault(dialog);
          });
          if (typeof _this3.onopen === "function") {
            try {
              _this3.onopen({
                dialog: dialog,
                trigger: btn
              });
            } catch (_) {}
          }
        };
        btn.addEventListener("click", onOpen);
        _this3._cleanups.push(function () {
          return btn.removeEventListener("click", onOpen);
        });
      });
    }
  }, {
    key: "_bindCloseButtons",
    value: function _bindCloseButtons() {
      var _this4 = this;
      var dialog = this.dialog;
      var closeButtons = Array.from(dialog.querySelectorAll("[data-dialog-close]"));
      closeButtons.forEach(function (btn) {
        var onCloseBtn = function onCloseBtn(event) {
          try {
            event.preventDefault();
          } catch (_) {}
          var returnValue = btn instanceof HTMLButtonElement && btn.value ? btn.value : "close";
          requestCloseDialog(dialog, returnValue);
        };
        btn.addEventListener("click", onCloseBtn);
        _this4._cleanups.push(function () {
          return btn.removeEventListener("click", onCloseBtn);
        });
      });
    }
  }]);
}();
var initDialog = function initDialog(el) {
  if (!(el instanceof HTMLDialogElement)) return;
  if (el.__dialogInstance) return;
  el.__dialogInstance = new Dialog(el);
};
window.dialog = initDialog;
document.querySelectorAll("dialog[data-dialog]").forEach(initDialog);
(function (window, document) {
  function navigation() {
    var header = document.querySelector('header[role="banner"]');
    if (!header) return;
    var nav = header.querySelector('nav[role="navigation"]');
    var btn_nav = header.querySelector('.btn-nav');
    var panel = header.querySelector(".panel");
    var btn_back = nav.querySelectorAll(".btn-back");
    var level0 = nav.querySelector(".list-level0");
    var lis_level0 = nav.querySelectorAll(".list-level0 > li");
    var link_level0 = nav.querySelectorAll(".list-level0 > li > a");
    var link_level1 = nav.querySelectorAll(".list-level1 > li > a");
    var link_level1_ = nav.querySelectorAll(".list-level1.hasSublevel > li > a");
    var link_level2 = nav.querySelectorAll(".list-level2 > li > a");
    var links = nav.querySelectorAll(".list-level0 > li > a,.list-level1 > li > a,.list-level2 > li > a");
    var mobile_header = header.querySelector(".mobile-header");
    function _reset() {
      nav.onmouseleave = function () {};
      nav.onmouseenter = function () {};
      for (var i = 0; i < lis_level0.length; i++) {
        lis_level0[i].onmouseleave = function () {};
      }
      for (var _i2 = 0; _i2 < links.length; _i2++) {
        links[_i2].onmouseenter = function () {};
        links[_i2].onmouseleave = function () {};
        links[_i2].classList.remove("active");
      }
    }
    this.mobile = function () {
      _reset();
      for (var i = 0; i < btn_back.length; i++) {
        btn_back[i].onclick = function () {
          var level = this.parentNode.parentNode.getAttribute("data-level");
          var link_levels = nav.querySelectorAll(".list-level" + (level - 1) + ">li>a");
          for (var u = 0; u < link_levels.length; u++) {
            link_levels[u].classList.remove("active");
          }
        };
      }
      var _loop2 = function _loop2(_i3) {
        (function () {
          links[_i3].onclick = function (e) {
            if (this.parentNode.querySelector(".sublevel")) {
              e.preventDefault();
              this.classList.add("active");
            }
          };
        })();
      };
      for (var _i3 = 0; _i3 < links.length; _i3++) {
        _loop2(_i3);
      }
      btn_nav.onclick = function () {
        header.classList.toggle("open");
        if (header.classList.contains("open")) {
          _open();
        } else {
          _close();
        }
      };
      function _close() {
        document.documentElement.style.overflow = "visible";
        document.body.scroll = "yes";
        document.body.style.overflow = "auto";
      }
      function _open() {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
        document.body.style.overflow = "hidden";
      }
      document.addEventListener("click", function () {
        header.classList.remove("open");
        _close();
      });
      mobile_header.onclick = function (e) {
        e.stopPropagation();
      };
      panel.onclick = function (e) {
        e.stopPropagation();
      };
    };
    this.desktop = function () {
      _reset();
      var pathname = window.location.pathname;
      var links = [];
      var lis = [];
      var sublevels = [];
      var prevent = false;
      var timoutprevent;
      function unactive_links_level1() {
        for (var i = 0; i < link_level1.length; i++) {
          link_level1[i].classList.remove("active");
        }
      }
      for (var i = 0; i < link_level0.length; i++) {
        var href = link_level0[i].getAttribute("href");
        if (pathname == href) {
          link_level0[i].classList.add("active");
        }
        var li = link_level0[i].parentNode;
        var sublevel = li.querySelector(".sublevel");
        if (sublevel) {
          lis.push(li);
          links.push(link_level0[i]);
          sublevels.push(sublevel);
        }
      }
      var _loop3 = function _loop3(_i4) {
        links[_i4].onclick = function (e) {
          e.preventDefault();
        };
        links[_i4].onmouseenter = function () {
          timeout = setTimeout(function () {
            sublevels[_i4].classList.add("active");
            nav.classList.add("inside");
          }, 150);
        };
        lis[_i4].onmouseleave = function () {
          timeout = setTimeout(function () {
            nav.classList.remove("inside");
            sublevels[_i4].classList.remove("active");
          }, 150);
        };
      };
      for (var _i4 = 0; _i4 < links.length; _i4++) {
        _loop3(_i4);
      }
      var timeout;
      var timeout1;
      var _loop4 = function _loop4(_i5) {
        link_level1_[_i5].onclick = function (e) {
          e.preventDefault();
        };
        link_level1_[_i5].onmouseenter = function () {
          if (prevent == true) return;
          var THIS = this;
          timeout1 = setTimeout(function () {
            for (var u = 0; u < link_level1_.length; u++) {
              if (_i5 != u) link_level1_[u].classList.remove("active");
            }
            THIS.classList.add("active");
          }, 150);
        };
        link_level1_[_i5].onmouseleave = function () {
          clearTimeout(timeout1);
        };
      };
      for (var _i5 = 0; _i5 < link_level1_.length; _i5++) {
        _loop4(_i5);
      }
      nav.onmouseenter = function () {
        unactive_links_level1();
        link_level1_[0].classList.add("active");
      };
      nav.onmouseleave = function () {};
      header.onmouseenter = function () {};
      header.onmouseleave = function (e) {
        header.style.pointerEvents = "none";
        setTimeout(function () {
          header.style.pointerEvents = "auto";
        }, 500);
      };
    };
  }
  window.navigation = navigation;
})(window, document);
(function (window, document) {
  function navStick(el) {
    var header = document.querySelector('header[role="banner"]');
    var navtab = document.querySelector('.navtab');
    var dir = 0;
    var holdscrollY = 0;
    var holdDir = -1;
    var windowYOffset;
    var isFixed = 0;
    var oldisFixed;
    var navtab_height = header.scrollHeight;
    if (navtab) {
      navtab_height = navtab.scrollHeight;
    }
    function _scroll() {
      windowYOffset = window.pageYOffset;
      if (windowYOffset <= navtab_height) {
        isFixed = 1;
        header.classList.remove("scrolled");
        header.classList.remove("scrolled-up");
      }
      if (windowYOffset > navtab_height) {
        isFixed = 2;
        header.classList.add("scrolled");
      }
      if (windowYOffset < holdscrollY) {
        dir = 1;
      } else {
        dir = 0;
      }
      if (oldisFixed != isFixed) {
        if (navtab) navtab.classList.remove("display");
      }
      if (dir != holdDir) {
        if (dir == 1) {
          header.classList.add("scrolled-up");
          header.classList.remove("scrolled-down");
          if (navtab) navtab.classList.add("display");
        } else {
          header.classList.add("scrolled-down");
          header.classList.remove("scrolled-up");
          if (navtab) navtab.classList.remove("display");
        }
      }
      oldisFixed = isFixed;
      holdDir = dir;
      holdscrollY = windowYOffset;
    }
    this.create = function () {
      window.addEventListener("scroll", _scroll);
    };
    this.destroy = function () {
      window.removeEventListener("scroll", _scroll);
    };
  }
  window.navStick = navStick;
})(window, document);
(function (window, document) {
  if (!!navigator.userAgent.match(/Trident\/7\./)) document.querySelector("body").classList.add("ie11");
  if ("objectFit" in document.documentElement.style !== false) return;
  var elements = document.querySelectorAll("picture");
  for (var i = 0; i < elements.length; i++) {
    elements[i].querySelector("img").classList.add("object-fit");
  }
})(window, document);
(function (window, document) {
  function navTab(el) {
    var has_touch = typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1;
    if (has_touch) {
      el.classList.add("touchable");
    }
    var content = el.querySelector(".wrapper");
    var ul = el.querySelector("ul");
    var li = el.querySelectorAll("li");
    var links = el.querySelectorAll(".content a");
    var next = document.querySelector(".main-content");
    var spage = next.querySelectorAll(".main-content section");
    var elPosY;
    var nextHeight;
    var isFixed = 0;
    var oldisFixed;
    var elheight = el.offsetHeight;
    var windowYOffset;
    var isMoving = false;
    var offset = 0;
    var x = 0;
    var el_width = content.offsetWidth;
    var ul_width = ul.offsetWidth;
    var num = 0;
    var oldnum;
    var diff;
    var noclick = false;
    var navtab_height = 80;
    function _cible() {
      var pos = -li[num].offsetLeft - li[num].offsetWidth / 2 + el_width / 2;
      if (pos > 0) pos = 0;
      if (pos <= el_width - ul_width) pos = el_width - ul_width;
      if (el_width >= ul_width) pos = 0;
      ul.style.transform = 'translateX(' + pos + 'px)';
    }
    function _mousemove(e) {
      if (isMoving === true) {
        x = e.clientX - diff + offset;
        if (x >= 0) {
          x = 0;
        }
        if (x <= el_width - ul_width) {
          x = el_width - ul_width;
        }
        ul.style.transform = 'translateX(' + x + 'px)';
      }
      ;
    }
    function drag(event) {
      isMoving = true;
      diff = event.clientX;
      document.addEventListener('mousemove', _mousemove);
    }
    ;
    function end() {
      isMoving = false;
      if (offset != x) noclick = true;else noclick = false;
      offset = x;
    }
    ;
    function _onresize() {
      elPosY = next.offsetTop;
      nextHeight = elPosY + next.offsetHeight - elheight;
      el_width = content.offsetWidth;
      ul_width = ul.offsetWidth;
      oldisFixed = -1;
      _cible();
      _onscroll();
    }
    function _onscroll() {
      windowYOffset = window.pageYOffset;
      if (windowYOffset >= elPosY && windowYOffset <= nextHeight) {
        isFixed = 1;
      }
      if (windowYOffset < elPosY) {
        isFixed = 0;
      }
      if (windowYOffset > nextHeight) {
        isFixed = 2;
      }
      if (isFixed != oldisFixed) {
        if (isFixed == 1) {
          el.classList.add("sticky");
          el.style.position = "fixed";
          el.style.top = 0 + "px";
        }
        if (isFixed == 0) {
          el.classList.remove("sticky");
          el.style.position = "absolute";
          el.style.top = elPosY + "px";
        }
        if (isFixed == 2) {
          el.style.position = "absolute";
          el.style.top = nextHeight + "px";
        }
      }
      num = 0;
      for (var i = 0; i < spage.length; i++) {
        if (windowYOffset > spage[i].offsetTop - elheight - 1 - navtab_height) {
          num = i;
        }
      }
      if (oldnum != num) {
        for (var _i6 = 0; _i6 < links.length; _i6++) {
          links[_i6].classList.remove("active");
        }
        links[num].classList.add("active");
        _cible(num);
      }
      oldnum = num;
      oldisFixed = isFixed;
    }
    var _loop5 = function _loop5(i) {
      links[i].ondragstart = function () {
        return false;
      };
      links[i].onclick = function (e) {
        e.preventDefault();
        if (!noclick) window.scrollToAnimate(spage[i].offsetTop - 1 - navtab_height, 300, 'easeOutQuad', function () {
          return console.log("".concat(window.pageYOffset));
        });
      };
    };
    for (var i = 0; i < links.length; i++) {
      _loop5(i);
    }
    window.addEventListener("scroll", _onscroll);
    window.addEventListener("resize", _onresize);
    window.addEventListener("load", function () {
      _onresize();
    });
    this.create = function () {
      if (!has_touch) {
        ul.addEventListener('mousedown', drag);
        document.addEventListener('mouseup', end);
      }
    };
    this.destroy = function () {
      ul.removeEventListener('mousedown', drag);
      document.removeEventListener('mouseup', end);
      x = 0;
      ul.style.transform = 'translateX(' + x + 'px)';
    };
  }
  window.navTab = navTab;
})(window, document);
(function (window, document) {
  function onviewport(element, func) {
    var els = element.querySelectorAll("li");
    var total = els.length;
    var datas = [];
    var count = 0;
    var isList = element.getAttribute('data-type') == "list" ? true : false;
    for (var i = 0; i < els.length; i++) {
      datas.push(els[i]);
    }
    var _list = function _list() {
      for (var _i7 = 0; _i7 < datas.length; _i7++) {
        var el = datas[_i7];
        if (el.getBoundingClientRect().top <= window.innerHeight * 1) {
          func(el, _i7);
          count++;
        }
      }
    };
    var _single = function _single() {
      if (element.getBoundingClientRect().top <= window.innerHeight * 1) {
        func(element, 0);
        window.removeEventListener("scroll", _onviewport);
      }
    };
    function _onviewport() {
      if (isList) {
        _list();
      } else {
        _single();
      }
    }
    window.addEventListener("scroll", _onviewport);
    _onviewport();
  }
  var test = document.querySelectorAll(".onviewport");
  for (var i = 0; i < test.length; i++) {
    onviewport(test[i], function (el, index) {
      el.classList.add("visible");
      el.style.transitionDelay = index * 4 / 100 + "s";
    });
  }
})(window, document);
(function (window, document) {
  function paralax(section, items, type) {
    var active = false;
    var oldactive = null;
    var myReq;
    var topY;
    var windowH;
    var sectionY = section.offsetTop;
    var sectionH = section.clientHeight;
    var percent = 0;
    var i = 0;
    function _onresize() {
      sectionY = section.offsetTop;
      sectionH = section.clientHeight;
      trigger();
    }
    var types = {
      "onLeave": function onLeave() {
        active = topY > sectionY && topY < sectionY + sectionH ? true : false;
      },
      "onEnter": function onEnter() {
        active = topY + window.innerHeight > sectionY && topY < sectionY + sectionH ? true : false;
      }
    };
    function _anim() {
      for (i = 0; i < items.length; i++) {
        items[i].el.style.transform = "translate3d(0," + percent * items[i].force + "px,0)";
      }
    }
    function _onscroll() {
      if (type == "onLeave") {
        percent = (topY - sectionY) * 100 / sectionH;
      }
      if (type == "onEnter") {
        windowH = window.innerHeight;
        percent = (topY + windowH - sectionY) * 100 / (sectionH + windowH);
      }
      _anim();
      myReq = requestAnimationFrame(_onscroll);
    }
    function _onEnd() {
      cancelAnimationFrame(myReq);
    }
    function trigger() {
      topY = window.pageYOffset;
      types[type]();
      if (oldactive != active) {
        if (active) myReq = requestAnimationFrame(_onscroll);else _onEnd();
      }
      oldactive = active;
    }
    window.addEventListener("resize", _onresize);
    window.addEventListener("touchmove", trigger);
    window.addEventListener("scroll", trigger);
    trigger();
    this.destroy = function () {};
    this.create = function () {};
  }
  window.paralax = paralax;
})(window, document);
(function (window, document) {
  function popin(content) {
    var popin = document.createElement("div");
    popin.className = "popin";
    var box = document.createElement("div");
    box.className = "box";
    var div = document.createElement("div");
    div.className = "content";
    div.innerHTML = content;
    var close = document.createElement("button");
    close.className = "btn-close";
    box.appendChild(close);
    box.appendChild(div);
    popin.appendChild(box);
    document.body.appendChild(popin);
    function _open() {
      popin.removeEventListener("animationend", _open);
    }
    function _close() {
      popin.parentNode.removeChild(popin);
      popin.removeEventListener("animationend", _close);
    }
    popin.addEventListener("animationend", _open);
    close.onclick = function () {
      popin.classList.add("close");
      popin.addEventListener("animationend", _close);
    };
    return popin;
  }
  var elements = document.querySelectorAll("[data-popin]");
  for (var i = 0; i < elements.length; i++) {
    elements[i].onclick = function (e) {
      e.preventDefault();
      var type = this.getAttribute(["data-popin"]);
      var value = this.getAttribute(["data-value"]);
      if (type == "youtube") {
        var popinYT = popin("\n                    <iframe data-src=\"https://www.youtube.com/embed/".concat(value, "?rel=0\" frameborder=\"0\" allowfullscreen></iframe>\n                    <div class=\"popin-info\">\n                        <div class=\"popin-info-content\">\n                            <p class=\"popin-info-title\">").concat(ParamsData.youtube.title, "</p>\n                            <div class=\"rte\">").concat(ParamsData.youtube.text, "</div>\n                            <button class=\"cta\">").concat(ParamsData.youtube.button, "</button>\n                        </div>\n                    </div>\n                "));
        var popinYTInfo = popinYT.querySelector('.popin-info');
        var popinYTInfoBtn = popinYTInfo.querySelector('button');
        var iframe = popinYT.querySelector('iframe');
        if (window.consentAccepted) {
          popinYTInfo.classList.remove('active');
          iframe.src = iframe.dataset.src;
        } else {
          popinYTInfo.classList.add('active');
        }
        popinYTInfoBtn.onclick = function () {
          window.axeptioSDK.requestConsent(ParamsData.youtube.category, function () {
            iframe.src = iframe.dataset.src;
            window.consentAccepted = true;
            popinYTInfo.classList.remove('active');
          });
        };
        onConsent(function () {}, function () {
          popinYTInfo.classList.add('active');
          iframe.src = "";
        });
      }
      if (type == "html") {
        popin(value);
      }
      if (type == "template") {
        popin(document.querySelector(value).innerHTML);
      }
    };
  }
  var waitForConsentReady = function waitForConsentReady(callback) {
    var retryDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var maxAttempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
    var attempts = 0;
    var _t = function t() {
      if (window.axeptioSDK && window.axeptioSDK.isReady) {
        callback();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(_t, retryDelay);
      }
    };
    _t();
  };
  var getConsentCategories = function getConsentCategories() {
    return [ParamsData.youtube.category];
  };
  var isConsentAccepted = function isConsentAccepted(result) {
    var consentCategories = getConsentCategories();
    var authorized = true;
    consentCategories.forEach(function (consentCategory) {
      var analyticsCategory = result[consentCategory] || {};
      if (analyticsCategory !== true) {
        authorized = false;
        return;
      }
    });
    return authorized;
  };
  var onConsent = function onConsent(onConsentAccepted, onConsentRejected) {
    waitForConsentReady(function () {
      window.axeptioSDK.on('cookies:complete', function (result) {
        isConsentAccepted(result) ? onConsentAccepted() : onConsentRejected();
      });
    });
  };
  window.consentAccepted = false;
  onConsent(function () {
    window.consentAccepted = true;
  }, function () {
    window.consentAccepted = false;
  });
})(window, document);
(function (window, document) {
  function scrollToAnimate(destination) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'easeOutQuad';
    var callback = arguments.length > 3 ? arguments[3] : undefined;
    var easings = {
      linear: function linear(t) {
        return t;
      },
      easeInQuad: function easeInQuad(t) {
        return t * t;
      },
      easeOutQuad: function easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad: function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic: function easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic: function easeOutCubic(t) {
        return --t * t * t + 1;
      },
      easeInOutCubic: function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart: function easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart: function easeOutQuart(t) {
        return 1 - --t * t * t * t;
      },
      easeInOutQuart: function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint: function easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint: function easeOutQuint(t) {
        return 1 + --t * t * t * t * t;
      },
      easeInOutQuint: function easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      }
    };
    var start = window.pageYOffset;
    var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }
    function scroll() {
      var now = 'now' in window.performance ? performance.now() : new Date().getTime();
      var time = Math.min(1, (now - startTime) / duration);
      var timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));
      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }
      requestAnimationFrame(scroll);
    }
    scroll();
  }
  window.scrollToAnimate = scrollToAnimate;
})(window, document);
(function (window, document) {
  var btn_open = document.querySelector(".js-search-overlay");
  var el = document.querySelector(".search-overlay");
  if (!btn_open) return;
  var btn_close = el.querySelector(".btn-close");
  btn_close.onclick = function () {
    el.classList.remove("open");
  };
  btn_open.onclick = function (e) {
    el.classList.add("open");
    setTimeout(function () {
      var input = document.querySelector('.search-overlay input[type="text"]');
      input.style.opacity = 0.5;
      input.focus();
    }, 100);
  };
})(window, document);
(function (window, document) {
  var slider = function slider(el) {
    var swiper;
    var wrapper = el.querySelector(".wrapper");
    var slides = el.querySelectorAll(".wrapper > li");
    var video;
    this.destroy = function () {
      if (_typeof(swiper) != "object") return;
      swiper.destroy();
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("swiper-slide");
      }
      el.classList.remove("swiper-container");
      wrapper.classList.remove("swiper-container");
      el.querySelector(".swiper-pagination").remove();
    };
    this.create = function () {
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.add("swiper-slide");
      }
      el.classList.add("swiper-container");
      wrapper.classList.add("swiper-wrapper");
      var pagination = document.createElement("div");
      pagination.className = "swiper-pagination";
      el.appendChild(pagination);
      var nav_prev = document.createElement("button");
      nav_prev.type = "button";
      nav_prev.className = "swiper-prev";
      nav_prev.setAttribute("aria-label", "Previous slide");
      el.appendChild(nav_prev);
      var nav_next = document.createElement("button");
      nav_next.type = "button";
      nav_next.className = "swiper-next";
      nav_next.setAttribute("aria-label", "Next slide");
      el.appendChild(nav_next);
      swiper = new Swiper(el, {
        slidesPerView: 1,
        init: false,
        loop: slides.length > 1 ? true : false,
        allowSlidePrev: slides.length > 1 ? true : false,
        allowSlideNext: slides.length > 1 ? true : false,
        navigation: {
          nextEl: nav_next,
          prevEl: nav_prev
        },
        pagination: {
          el: pagination,
          clickable: true
        }
      });
      swiper.on('slideChangeTransitionEnd', function () {
        if (video) video.stop();
        var video = document.querySelector('.swiper-slide-active video');
        if (video) video.play();
      });
      swiper.init();
    };
  };
  window.slider = slider;
  var carousel = function carousel(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      margin: 0
    };
    var swiper;
    var wrapper = el.querySelector(".wrapper");
    var slides = el.querySelectorAll(".wrapper > li");
    this.destroy = function () {
      if (_typeof(swiper) != "object") return;
      swiper.destroy();
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("swiper-slide");
      }
      el.classList.remove("swiper-container");
      wrapper.classList.remove("swiper-container");
      el.querySelector(".swiper-pagination").remove();
    };
    this.create = function () {
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.add("swiper-slide");
      }
      el.classList.add("swiper-container");
      wrapper.classList.add("swiper-wrapper");
      var pagination = document.createElement("div");
      pagination.className = "swiper-pagination";
      el.appendChild(pagination);
      var nav_prev = document.createElement("button");
      nav_prev.type = "button";
      nav_prev.className = "swiper-prev";
      nav_prev.setAttribute("aria-label", "Previous slide");
      el.appendChild(nav_prev);
      var nav_next = document.createElement("button");
      nav_next.type = "button";
      nav_next.className = "swiper-next";
      nav_next.setAttribute("aria-label", "Next slide");
      el.appendChild(nav_next);
      swiper = new Swiper(el, {
        slidesPerView: 4,
        spaceBetween: options.margin,
        breakpoints: {
          480: {
            slidesPerView: 1
          },
          1024: {
            slidesPerView: 2
          },
          1200: {
            slidesPerView: 3
          }
        },
        init: false,
        autoplay: {
          delay: 8000
        },
        loop: false,
        navigation: {
          nextEl: nav_next,
          prevEl: nav_prev
        },
        pagination: {
          el: pagination,
          clickable: true
        }
      });
      swiper.on('init', function () {
        if (pagination.querySelectorAll("span").length <= 1) {
          pagination.style.display = "none";
        }
      });
      swiper.init();
    };
  };
  window.carousel = carousel;
  var swipperList = function swipperList() {
    var slider = document.querySelector(".swiper-list");
    var swiper;
    var wrapper = slider.querySelector("ul");
    var slides = wrapper.querySelectorAll("li");
    this.destroy = function () {
      if (_typeof(swiper) != "object") return;
      swiper.destroy();
      slides.forEach(function (e) {
        return e.classList.remove("swiper-slide");
      });
      slider.classList.remove("swiper-container");
    };
    this.create = function () {
      var inc = 0;
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.add("swiper-slide");
        inc++;
      }
      slider.classList.add("swiper-container");
      wrapper.classList.add("swiper-wrapper");
      swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 0,
        watchOverflow: true,
        loop: inc > 1 ? true : false
      });
    };
  };
  window.swipperList = swipperList;
})(window, document);
(function (window, document) {
  function formValidate(el) {
    var form = el;
    var inpObj = form.querySelectorAll('input:not([type="submit"]), select, textarea');
    var isSubmit = false;
    var mandatory = form.getAttribute("data-mandatory");
    var isValid = false;
    for (var i = 0; i < inpObj.length; i++) {
      var field = inpObj[i];
      var msg = document.createElement("div");
      msg.className = 'error-msg';
      if (!field.parentNode.querySelector(".error-msg")) field.parentNode.appendChild(msg);
      field.onchange = function () {
        if (isSubmit) _validate();
      };
    }
    function _validate() {
      isSubmit = true;
      isValid = true;
      for (var _i8 = 0; _i8 < inpObj.length; _i8++) {
        var _field = inpObj[_i8];
        var _msg = _field.parentNode.querySelector(".error-msg");
        var validity = _field.validity;
        var dataTypeMismatch = _field.getAttribute("data-typeMismatch");
        var dataPatternMismatch = _field.getAttribute("data-patternMismatch");
        var dataStepMismatch = _field.getAttribute("data-dataStepMismatch");
        var checkValidity = _field.checkValidity();
        var tooLong = validity.tooLong;
        var tooShort = validity.tooShort;
        var typeMismatch = validity.typeMismatch;
        var patternMismatch = validity.patternMismatch;
        var stepMismatch = validity.stepMismatch;
        var valueMissing = validity.valueMissing;
        _field.setCustomValidity('');
        if (!checkValidity) {
          var custom = "";
          if ((typeMismatch || tooLong || tooShort || stepMismatch) && dataTypeMismatch) custom = dataTypeMismatch;
          if (patternMismatch && dataPatternMismatch) custom = dataPatternMismatch;
          if (valueMissing && mandatory) custom = mandatory;
          _field.setCustomValidity(custom);
          _field.classList.add("error");
          _msg.innerHTML = _field.validationMessage;
          isValid = false;
        }
        if (!tooLong && !tooShort && !typeMismatch && !patternMismatch && !stepMismatch && !valueMissing) {
          _field.classList.remove("error");
          _msg.innerHTML = "";
        }
      }
    }
    form.onsubmit = function (e) {
      e.preventDefault();
      _validate();
      if (isValid) form.submit();
    };
  }
  window.formValidate = formValidate;
})(window, document);
(function (window, document) {
  var inArray = function inArray(element, func, options) {
    var arr = [];
    var elements = document.querySelectorAll(element);
    for (var i = 0; i < elements.length; i++) {
      arr.push(new window[func](elements[i], options));
    }
    return arr;
  };
  var guruForms = document.querySelectorAll("form.guru");
  for (var i = 0; i < guruForms.length; i++) {
    var form = guruForms[i];
    var submitBtn = form.querySelector('input[type="submit"]');
    var requiredFields = form.querySelectorAll("[required]");
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      for (var _i9 = 0; _i9 < requiredFields.length; _i9++) {
        var error = false;
        var field = requiredFields[_i9];
        var type = field.getAttribute('data-required');
        var val = field.value;
        if (type == 'string') {
          var reg = /^[A-Za-z]+$/;
          if (!val.match(reg)) {
            error = true;
          }
        } else if (type == 'mail') {
          var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!val.match(reg)) {
            error = true;
          }
        } else if (type == 'tel') {
          var reg = /^[-+]?[0-9]+$/;
          if (!val.match(reg)) {
            error = true;
          }
        } else if (type == "checkbox") {
          if (!field.checked) {
            error = true;
          }
        } else {
          if (val == "" || val == "---") {
            error = true;
          }
        }
        if (error == true) {
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      }
      var recaptcha = form.querySelector('.g-recaptcha');
      if (null !== recaptcha) {
        var v = grecaptcha.getResponse();
        if (v.length == 0 || v == null) {
          error = true;
          recaptcha.querySelector('div').classList.add('error');
        } else {
          error = false;
          recaptcha.querySelector('div').classList.remove('error');
        }
      }
      var errors = form.querySelectorAll('.error');
      var errorMessage = form.querySelector('.error-message');
      if (errors.length == 0) {
        if (errorMessage) {
          errorMessage.classList.remove('active');
        }
        form.submit();
      } else {
        if (errorMessage) {
          errorMessage.classList.add('active');
        }
      }
    });
  }
  var selectForm_forms = document.querySelectorAll("div[data-select-form]");
  if (selectForm_forms.length > 0) {
    for (var _i0 = 0; _i0 < selectForm_forms.length; _i0++) {
      selectForm_forms[_i0].style.display = "none";
    }
    var selectForm = document.querySelector(".select-form");
    selectForm.selectedIndex = null;
    selectForm.onchange = function () {
      for (var u = 0; u < selectForm_forms.length; u++) {
        selectForm_forms[u].style.display = "none";
      }
      selectForm_forms[this.value - 1].style.display = "block";
    };
  }
  var currentUrl = document.URL;
  var urlParts = currentUrl.split('#');
  if (urlParts[1]) {
    var cible = document.getElementById(urlParts[1]).parentNode;
    cible.style.display = "block";
  }
  var sliders = inArray(".swipper-slider", "slider");
  sliders.forEach(function (val) {
    return val.create();
  });
  var carousels = inArray(".swipper-carousel", "carousel");
  carousels.forEach(function (val) {
    return val.create();
  });
  var swipperLists = inArray(".swiper-list", "swipperList");
  var navtabs = inArray(".navtab", "navTab");
  window.accordion({
    btns: "h2"
  });
  var navStick = new window.navStick();
  var _srite_animate = function srite_animate() {
    this.classList.remove("play");
    this.classList.remove("stop");
    this.removeEventListener("animationend", _srite_animate);
  };
  var sprites = document.querySelectorAll('.list-solutions a');
  for (var _i1 = 0; _i1 < sprites.length; _i1++) {
    sprites[_i1].onmouseover = function () {
      this.classList.add("play");
    };
    sprites[_i1].onmouseleave = function () {
      this.classList.add("stop");
      this.addEventListener("animationend", _srite_animate);
    };
  }
  var push_forward = document.querySelector('.js-push_forward');
  if (push_forward) {
    var _resize = function _resize() {
      height = push_forward.querySelector('.push-article').offsetHeight;
      push_forward.style.height = height + "px";
    };
    var height;
    window.addEventListener("resize", function () {
      _resize();
    });
    _resize();
  }
  var nav = new navigation();
  var stage_home = document.querySelector(".stage-home");
  if (stage_home) {
    var bg = stage_home.querySelector(".shape");
    var visu = stage_home.querySelector(".visu");
    var paralax = new window.paralax(stage_home, [{
      el: bg,
      force: 1
    }, {
      el: visu,
      force: 1.5
    }], "onLeave");
    var block_nos_services = document.querySelector(".block-nos_services");
    var visu = block_nos_services.querySelector("figure");
    var paralax1 = new window.paralax(block_nos_services, [{
      el: bg,
      force: 1
    }, {
      el: visu,
      force: 1.5
    }], "onLeave");
  }
  var cards = document.querySelectorAll(".card-actu,.card-machine");
  for (var _i10 = 0; _i10 < cards.length; _i10++) {
    cards[_i10].onmouseenter = function () {
      this.querySelector(".cta").classList.add("hover");
    };
    cards[_i10].onmouseleave = function () {
      this.querySelector(".cta").classList.remove("hover");
    };
    cards[_i10].onclick = function () {
      window.location = this.querySelector(".cta").getAttribute("href");
    };
  }
  var aside = document.querySelector(".layout-sidebar aside");
  if (aside) {
    aside.onclick = function () {
      this.classList.toggle("active");
    };
  }
  window.breakpoint("medium", function () {
    swipperLists.forEach(function (val) {
      return val.create();
    });
    navtabs.forEach(function (val) {
      return val.create();
    });
    navStick.destroy();
    if (stage_home) paralax.destroy();
    if (stage_home) paralax1.destroy();
  }, function () {
    swipperLists.forEach(function (val) {
      return val.destroy();
    });
    navtabs.forEach(function (val) {
      return val.destroy();
    });
    navStick.create();
    if (stage_home) paralax.create();
    if (stage_home) paralax1.create();
  });
  window.breakpoint("large", function () {
    nav.mobile();
  }, function () {
    nav.desktop();
  });
  var accordions = document.querySelectorAll(".js-accordion");
  accordions.forEach(function (accordion) {
    var btn = accordion.querySelector("button");
    btn.addEventListener("click", function () {
      accordion.classList.toggle("active");
    });
  });
  var waitForConsentReady = function waitForConsentReady(callback) {
    var retryDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var maxAttempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
    var attempts = 0;
    var _t2 = function t() {
      if (window.axeptioSDK && window.axeptioSDK.isReady) {
        callback();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(_t2, retryDelay);
      }
    };
    _t2();
  };
  var getConsentCategories = function getConsentCategories() {
    return [ParamsData.youtube.category];
  };
  var isConsentAccepted = function isConsentAccepted(result) {
    var consentCategories = getConsentCategories();
    var authorized = true;
    consentCategories.forEach(function (consentCategory) {
      var analyticsCategory = result[consentCategory] || {};
      if (analyticsCategory !== true) {
        authorized = false;
        return;
      }
    });
    return authorized;
  };
  var onConsent = function onConsent(onConsentAccepted, onConsentRejected) {
    waitForConsentReady(function () {
      window.axeptioSDK.on('cookies:complete', function (result) {
        isConsentAccepted(result) ? onConsentAccepted() : onConsentRejected();
      });
    });
  };
  window.consentAccepted = false;
  onConsent(function () {
    window.consentAccepted = true;
  }, function () {
    window.consentAccepted = false;
  });
  var hasPopinYTs = document.querySelectorAll('.hasPopinYt');
  var popinYT = document.querySelector('.popin-YT');
  var popinYTInfo = document.querySelector('.popin-YT .popin-info');
  var popinYTInfoBtn = document.querySelector('.popin-YT .popin-info button');
  if (popinYT) {
    var iframe = popinYT.querySelector('iframe');
    var btn_close = popinYT.querySelector('.btn-close');
    btn_close.onclick = function () {
      close();
      iframe.src = "";
    };
    popinYTInfoBtn.onclick = function () {
      window.axeptioSDK.requestConsent(ParamsData.youtube.category, function () {
        iframe.src = iframe.dataset.src;
        window.consentAccepted = true;
        popinYTInfo.classList.remove('active');
      });
    };
    var open = function open() {
      if (window.consentAccepted) {
        popinYTInfo.classList.remove('active');
        iframe.src = iframe.dataset.src;
      } else {
        popinYTInfo.classList.add('active');
      }
      popinYT.classList.add('open');
    };
    onConsent(function () {}, function () {
      popinYTInfo.classList.add('active');
      iframe.src = "";
    });
    var close = function close() {
      popinYT.classList.remove('open');
    };
    hasPopinYTs.forEach(function (item) {
      item.onclick = function (e) {
        e.preventDefault();
        iframe.setAttribute('data-src', item.dataset.src);
        open();
      };
    });
  }
  var links_us_canada = document.querySelectorAll('.gtag-event-us_canada');
  links_us_canada.forEach(function (link) {
    link.onclick = function () {
      gtag('event', 'conversion', {
        'send_to': 'AW-301212085/po31CMmYqJ0cELXD0I8B',
        'value': 1.0,
        'currency': 'USD'
      });
    };
  });
  var links_latino = document.querySelectorAll('.gtag-event-latino');
  links_latino.forEach(function (link) {
    link.onclick = function () {
      gtag('event', 'conversion', {
        'send_to': 'AW-16462665021/PYyhCNuclJoZEL2qgao9'
      });
    };
  });
})(window, document);