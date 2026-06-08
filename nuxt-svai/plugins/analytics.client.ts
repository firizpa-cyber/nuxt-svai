/**
 * Analytics plugin — loads Yandex Metrika and Google Analytics (GA4)
 * on the client side only after the page is hydrated.
 *
 * Set in .env:
 *   YANDEX_METRIKA_ID=12345678
 *   GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const ymId = config.public.yandexMetrikaId
  const gaId = config.public.googleAnalyticsId

  // ── Yandex Metrika ──────────────────────────────────────────────────────────
  if (ymId) {
    useHead({
      script: [
        {
          innerHTML: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${ymId}, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              ecommerce: "dataLayer"
            });
          `,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          innerHTML: `<div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute; left:-9999px;" alt="" /></div>`,
        },
      ],
    })
  }

  // ── Google Analytics (GA4) ──────────────────────────────────────────────────
  if (gaId) {
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { page_path: window.location.pathname });
          `,
          type: 'text/javascript',
        },
      ],
    })
  }
})
