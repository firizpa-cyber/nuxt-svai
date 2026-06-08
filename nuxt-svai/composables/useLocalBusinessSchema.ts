/**
 * Injects Schema.org LocalBusiness + WebSite structured data.
 * Call once in app.vue or layouts/default.vue.
 */
export function useLocalBusinessSchema() {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'LocalBusiness',
              '@id': 'https://surgutsvai.ru/#organization',
              name: 'СтройМонтаж-86 — Завод винтовых свай',
              alternateName: 'Завод винтовых свай Сургут',
              description:
                'Производство и профессиональный монтаж винтовых свай в Сургуте и ХМАО-Югре. Диаметры Ø57–325 мм. Монтаж за 1 день. Собственное производство с 2019 года.',
              url: 'https://surgutsvai.ru',
              logo: 'https://surgutsvai.ru/logo.webp',
              image: 'https://surgutsvai.ru/gallery/hero-piles.webp',
              telephone: ['+7-999-256-88-00', '+7-3462-67-70-70'],
              email: 'surgutsvai43@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ул. Индустриальная, 17, офис 108',
                addressLocality: 'Сургут',
                addressRegion: 'Ханты-Мансийский автономный округ — Югра',
                postalCode: '628400',
                addressCountry: 'RU',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 61.254,
                longitude: 73.396,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ],
                  opens: '08:00',
                  closes: '22:00',
                },
              ],
              priceRange: '₽₽',
              currenciesAccepted: 'RUB',
              paymentAccepted: 'Наличные, безналичный расчёт',
              areaServed: [
                { '@type': 'City', name: 'Сургут' },
                { '@type': 'AdministrativeArea', name: 'ХМАО — Югра' },
                { '@type': 'City', name: 'Нефтеюганск' },
                { '@type': 'City', name: 'Нижневартовск' },
                { '@type': 'City', name: 'Когалым' },
                { '@type': 'City', name: 'Лангепас' },
                { '@type': 'City', name: 'Пыть-Ях' },
              ],
              sameAs: ['https://t.me/stroymantazh86'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Винтовые сваи и услуги монтажа',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Монтаж винтового свайного фундамента',
                      description: 'Профессиональный монтаж свайного фундамента в Сургуте за 1 день',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Product',
                      name: 'Винтовые сваи Ø57–325 мм',
                      description: 'Собственное производство, антикоррозийное покрытие мастикой, срок службы 100+ лет',
                    },
                  },
                ],
              },
            },
            {
              '@type': 'WebSite',
              '@id': 'https://surgutsvai.ru/#website',
              url: 'https://surgutsvai.ru',
              name: 'Завод винтовых свай СтройМонтаж-86',
              inLanguage: 'ru',
              publisher: { '@id': 'https://surgutsvai.ru/#organization' },
            },
          ],
        }),
      },
    ],
  })
}
