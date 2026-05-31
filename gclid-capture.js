(function () {
  var CRM_URL = 'https://filter-bot-crmcutting.qk6yxt.easypanel.host';
  var PREFIX  = 'TL';

  function getTrackingParams() {
    var params = new URLSearchParams(window.location.search);
    return {
      gclid:        params.get('gclid')        || sessionStorage.getItem('raw_gclid')  || null,
      wbraid:       params.get('wbraid')       || sessionStorage.getItem('raw_wbraid') || null,
      gbraid:       params.get('gbraid')       || sessionStorage.getItem('raw_gbraid') || null,
      utm_source:   params.get('utm_source')   || null,
      utm_medium:   params.get('utm_medium')   || null,
      utm_campaign: params.get('utm_campaign') || null,
      utm_term:     params.get('utm_term')     || null,
    };
  }

  function patchWaLinks(code) {
    // Format yang di-parse oleh CRM: "Kode konsultasi: TL-XXXXX"
    var tag = ' Kode konsultasi: ' + code;
    var sel = 'a[href*="wa.me"], a[href*="whatsapp.com/send"], a[href*="api.whatsapp.com"]';
    document.querySelectorAll(sel).forEach(function (link) {
      try {
        var url  = new URL(link.href);
        var text = url.searchParams.get('text') || '';
        if (text.indexOf('Kode konsultasi:') === -1) {
          url.searchParams.set('text', text + tag);
          link.href = url.toString();
        }
      } catch (e) { /* skip malformed URLs */ }
    });
  }

  function run() {
    var p = getTrackingParams();
    var hasTracking = p.gclid || p.wbraid || p.gbraid;
    if (!hasTracking) return;

    // Persist tracking IDs ke sessionStorage (bertahan navigasi antar halaman)
    if (p.gclid)  sessionStorage.setItem('raw_gclid',  p.gclid);
    if (p.wbraid) sessionStorage.setItem('raw_wbraid', p.wbraid);
    if (p.gbraid) sessionStorage.setItem('raw_gbraid', p.gbraid);

    var cacheKey = 'consult_code_' + (p.gclid || p.wbraid || p.gbraid);
    var cached   = sessionStorage.getItem(cacheKey);
    if (cached) {
      patchWaLinks(cached);
      return;
    }

    var payload = {
      prefix:       PREFIX,
      gclid:        p.gclid,
      wbraid:       p.wbraid,
      gbraid:       p.gbraid,
      utm_source:   p.utm_source,
      utm_medium:   p.utm_medium,
      utm_campaign: p.utm_campaign,
      utm_term:     p.utm_term,
      landing_page: window.location.pathname,
    };
    // Buang key dengan nilai null sebelum kirim
    Object.keys(payload).forEach(function (k) {
      if (payload[k] === null) delete payload[k];
    });

    fetch(CRM_URL + '/api/consultation-register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.code) return;
        sessionStorage.setItem(cacheKey, d.code);
        patchWaLinks(d.code);
      })
      .catch(function () { /* silent fail — tidak boleh break UX */ });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
