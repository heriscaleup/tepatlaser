/**
 * WA Tracker — Google Ads GCLID → WhatsApp Attribution
 * =====================================================
 * Pasang script ini di <head> ATAU sebelum </body> landing page.
 *
 * CARA KERJA:
 *   1. User klik iklan Google Ads → URL mengandung ?gclid=...&utm_term=...
 *   2. Script tangkap GCLID + UTM, simpan localStorage (90 hari), lalu
 *      langsung pre-register ke backend → kode konsultasi sudah siap.
 *   3. User klik SEMUA tombol WA (termasuk Joinchat floating button):
 *      → kode disuntik ke pesan: "...Detail kebutuhan saya:\n\nKode konsultasi: TL-METAL-29FXW"
 *   4. Pesan masuk ke backend → lookup kode → GCLID + keyword tersimpan di customers.
 *
 * DUKUNGAN:
 *   - Link biasa: <a href="wa.me/...">
 *   - Plugin Joinchat (floating button) via window.open patch
 *   - Elemen dengan atribut [data-wa-track]
 *   - Konten dinamis via MutationObserver
 *
 * CORS: Tambahkan domain ini ke CORS_ORIGIN di EasyPanel backend:
 *   CORS_ORIGIN=https://tepatlaser.com,https://crm-n8n-dashboard.vercel.app
 */
(function () {
  'use strict';

  // ─── CONFIG ─────────────────────────────────────────────────────────────────
  var BACKEND_URL         = 'https://filter-bot-crmcutting.qk6yxt.easypanel.host';
  var WA_PHONE            = '6282121292937';
  var CONSULTATION_PREFIX = 'TL-METAL';
  var STORAGE_KEY         = '_wa_gclid';
  var CODE_CACHE_KEY      = '_wa_code';
  var EXPIRE_MS           = 90 * 24 * 60 * 60 * 1000; // 90 hari
  // ────────────────────────────────────────────────────────────────────────────

  // ── Kode konsultasi yang sudah di-pre-register (di-cache in-memory) ─────────
  var _cachedCode = null;
  var _codePromise = null; // Promise<string|null> — hindari double-register

  // ── Ambil params dari URL ────────────────────────────────────────────────────
  function getUrlParams() {
    try {
      var p = new URLSearchParams(window.location.search);
      return {
        gclid:        p.get('gclid')        || '',
        wbraid:       p.get('wbraid')       || '',
        gbraid:       p.get('gbraid')       || '',
        utm_source:   p.get('utm_source')   || '',
        utm_medium:   p.get('utm_medium')   || '',
        utm_campaign: p.get('utm_campaign') || '',
        utm_term:     p.get('utm_term')     || '',
        keyword_text: p.get('keyword')      || p.get('utm_term') || '',
        landing_page: window.location.href,
      };
    } catch (e) { return {}; }
  }

  // ── localStorage helpers ─────────────────────────────────────────────────────
  function captureAndStore() {
    var params = getUrlParams();
    var hasTracking = params.gclid || params.wbraid || params.gbraid || params.utm_source;
    if (!hasTracking) return false;

    try {
      var prev = {};
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) prev = JSON.parse(raw);
      var merged = Object.assign({}, prev);
      Object.keys(params).forEach(function (k) {
        if (params[k]) merged[k] = params[k];
      });
      merged._ts = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {}

    return true;
  }

  function getStored() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var data = JSON.parse(raw);
      if (Date.now() - (data._ts || 0) > EXPIRE_MS) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(CODE_CACHE_KEY);
        return {};
      }
      return data;
    } catch (e) { return {}; }
  }

  function buildPayload() {
    var stored  = getStored();
    var current = getUrlParams();
    var merged  = Object.assign({}, stored, current);
    merged.landing_page = window.location.href;
    merged.keyword_text = merged.keyword_text || merged.utm_term || '';
    delete merged._ts;
    Object.keys(merged).forEach(function (k) { if (!merged[k]) delete merged[k]; });
    return merged;
  }

  // ── Pre-register saat halaman load ──────────────────────────────────────────
  // Segera daftarkan GCLID ke backend → kode siap sebelum user klik WA
  function preRegisterCode() {
    if (_codePromise) return _codePromise; // sudah jalan

    // Cek cache localStorage dulu (refresh halaman)
    try {
      var cached = localStorage.getItem(CODE_CACHE_KEY);
      if (cached) {
        var c = JSON.parse(cached);
        if (c.code && c.ts && Date.now() - c.ts < EXPIRE_MS) {
          _cachedCode = c.code;
          _codePromise = Promise.resolve(c.code);
          return _codePromise;
        }
      }
    } catch (e) {}

    var payload = buildPayload();
    payload.prefix = CONSULTATION_PREFIX;

    if (!payload.gclid && !payload.wbraid && !payload.gbraid) {
      _codePromise = Promise.resolve(null);
      return _codePromise;
    }

    _codePromise = fetch(BACKEND_URL + '/api/consultation-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        var code = res && res.code ? res.code : null;
        _cachedCode = code;
        if (code) {
          try {
            localStorage.setItem(CODE_CACHE_KEY, JSON.stringify({ code: code, ts: Date.now() }));
          } catch (e) {}
        }
        return code;
      })
      .catch(function () { return null; });

    return _codePromise;
  }

  // ── Inject kode ke URL WA ────────────────────────────────────────────────────
  function injectCodeIntoWaUrl(originalUrl, code) {
    try {
      var url = new URL(originalUrl);
      var text = url.searchParams.get('text') || '';

      if (!text && !code) return originalUrl;

      if (code) {
        // Kalau teks sudah mengandung kode konsultasi, tidak ditambah lagi
        if (text.toLowerCase().indexOf('kode konsultasi') === -1) {
          text = (text ? text.trimEnd() + '\n\n' : '') + 'Kode konsultasi: ' + code;
        }
      }

      if (text) {
        url.searchParams.set('text', text);
      }
      return url.toString();
    } catch (e) {
      return originalUrl;
    }
  }

  // ── Handler klik untuk link <a href="wa.me/..."> ─────────────────────────────
  function handleClick(e, btn) {
    e.preventDefault();

    var href  = btn.getAttribute('href') || btn.getAttribute('data-wa-href') || '';
    var match = href.match(/wa\.me\/(\d+)/);
    var phone = match ? match[1] : WA_PHONE;
    var customMsg = btn.getAttribute('data-wa-msg') || '';

    preRegisterCode().then(function (code) {
      var finalUrl;
      if (href && href.indexOf('wa.me') !== -1) {
        finalUrl = injectCodeIntoWaUrl(href, code);
      } else {
        var base = 'https://wa.me/' + phone;
        var text = customMsg || '';
        if (code) text = (text ? text.trimEnd() + '\n\n' : '') + 'Kode konsultasi: ' + code;
        finalUrl = text ? base + '?text=' + encodeURIComponent(text) : base;
      }
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // ── Hook link biasa ──────────────────────────────────────────────────────────
  function hookButtons() {
    var nodes = document.querySelectorAll(
      'a[href*="wa.me"], a[href*="api.whatsapp.com"], [data-wa-track]'
    );
    nodes.forEach(function (btn) {
      if (btn._waHooked) return;
      btn._waHooked = true;
      btn.addEventListener('click', function (e) { handleClick(e, btn); });
    });
  }

  // ── Patch window.open → tangkap Joinchat + plugin WA lain ───────────────────
  // Joinchat dan plugin serupa memanggil window.open('https://wa.me/...') langsung
  // tanpa membuat elemen <a>. Patch ini intercept semua WA URL yang dibuka.
  (function patchWindowOpen() {
    var _origOpen = window.open;
    window.open = function (url, target, features) {
      if (url && typeof url === 'string' &&
          (url.indexOf('wa.me/') !== -1 || url.indexOf('api.whatsapp.com/send') !== -1)) {

        // Cek apakah sudah ada kode (sync dari cache)
        if (_cachedCode) {
          var patched = injectCodeIntoWaUrl(url, _cachedCode);
          return _origOpen.call(window, patched, target || '_blank', features || 'noopener,noreferrer');
        }

        // Kode belum siap — tunggu sebentar (promise)
        preRegisterCode().then(function (code) {
          var patched = code ? injectCodeIntoWaUrl(url, code) : url;
          _origOpen.call(window, patched, target || '_blank', features || 'noopener,noreferrer');
        });

        // Return null — popup akan dibuka dari dalam promise
        // (browser modern izinkan ini selama dipicu user gesture)
        return null;
      }
      return _origOpen.apply(window, arguments);
    };
  })();

  // ── Init ─────────────────────────────────────────────────────────────────────
  var hasTracking = captureAndStore();

  // Pre-register di background jika ada GCLID — kode siap sebelum user klik
  if (hasTracking) preRegisterCode();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hookButtons);
  } else {
    hookButtons();
  }

  // Support konten dinamis (Joinchat render setelah DOM ready)
  if (window.MutationObserver) {
    new MutationObserver(hookButtons).observe(
      document.body || document.documentElement,
      { childList: true, subtree: true }
    );
  }

  // ── API global (opsional, untuk trigger manual dari script lain) ─────────────
  window.WaTracker = {
    open: function (phone, text) {
      preRegisterCode().then(function (code) {
        var msg = text || '';
        if (code && msg.toLowerCase().indexOf('kode konsultasi') === -1) {
          msg = (msg ? msg.trimEnd() + '\n\n' : '') + 'Kode konsultasi: ' + code;
        }
        var url = 'https://wa.me/' + (phone || WA_PHONE).replace(/\D/g, '');
        if (msg) url += '?text=' + encodeURIComponent(msg);
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    },
    getStored:   getStored,
    getCachedCode: function () { return _cachedCode; },
  };
})();
