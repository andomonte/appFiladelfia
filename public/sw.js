if (!self.define) {
  const e = (e) => {
    e !== 'require' && (e += '.js');
    let a = Promise.resolve();
    return (
      s[e] ||
        (a = new Promise(async (a) => {
          if ('document' in self) {
            const s = document.createElement('script');
            (s.src = e), document.head.appendChild(s), (s.onload = a);
          } else importScripts(e), a();
        })),
      a.then(() => {
        if (!s[e]) throw new Error(`Module ${e} didn’t register its module`);
        return s[e];
      })
    );
  };
  const a = (a, s) => {
    Promise.all(a.map(e)).then((e) => s(e.length === 1 ? e[0] : e));
  };
  const s = { require: Promise.resolve(a) };
  self.define = (a, i, c) => {
    s[a] ||
      (s[a] = Promise.resolve().then(() => {
        const s = {};
        const n = { uri: location.origin + a.slice(1) };
        return Promise.all(
          i.map((a) => {
            switch (a) {
              case 'exports':
                return s;
              case 'module':
                return n;
              default:
                return e(a);
            }
          }),
        ).then((e) => {
          const a = c(...e);
          return s.default || (s.default = a), s;
        });
      }));
  };
}
define('./sw.js', ['./workbox-ea903bce'], (e) => {
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url:
            '/_next/static/chunks/008187a416af31393efbd6483834f11cf514c5ae.450a069df18935a5b8ab.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/1027677e8d335693b4117f97979c9fbe176f9753.b2c2e87450d3a72d954c.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/252f366e.20f7fc31344e9cae65d1.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/29107295.1e3e8a822fac415177b8.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/2a9117599b1eeb0a0c46caed80d46a024c476177.2636b63170ad6d63b5e4.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/330bf75bdda92afd731de9b874115c1b69b2f17d.ecee692173ef8ecfc05c.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/3b790b0d78414dad7a5612dd1e29c3761e19221c.36eea57affea6bda014a.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/5bfe4174ef4e2da608a2ded8844b3e8dc7209b83.96f6862302638355e35a.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/75fc9c18.9786e5e9417eac1eaa93.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/792b7109e2f82b8c2ece5bebb60441af041ae109.3c4dfd0aa2c84b9a01a0.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/b0860ff140dc209478983253972a496ed640df6e.b1a3b8c9acd048c074ed.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/b23c08a04366bfde0638670f36b94c84f02cc20e.3687937ea7c2185da583.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/commons.566c9ba42f744d165499.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/d554cd4ac87198d5f48cb8ba2b009ab7156cf11e.2ffa9e5e03f688d12e7e.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/daba0448a4922a3dfd1d25ea7bfad75b9faadbf4.4ba4ac770ad5e4fa2fa6.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/f67c7acf436ed46cb6da78b0748f151e94c1c0f1.09fbc023e3a61155aaab.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/framework.29f9e2f3d4a33bafbaa5.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/main-c9e95e3eb2aa3b7481f7.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/_app-ef1a6e1828c3a9433db2.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/_error-57a8abbe2ab3c44b21ec.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/atualizar-c2cc18cd7222a6624bf9.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/auth/signin-26cf897a4eb98afbdb25.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/index-847def69deb3f866d0e9.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/midia-a962ab6aa4598d243793.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/missoes-389f33189d4200b3eb4d.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/pages/missoesLogado-8050cd599ab68e609bc5.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/pages/nacionalLogado-681d8be99274e994fce9.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/relatorios-fbb628f8c1dc5ee7e231.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url:
            '/_next/static/chunks/pages/selectPerfil-233aeb30aed518ef9b4d.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/pages/userPerfil-f4c2d16c7abc7051bfe1.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/polyfills-1682bd92282ca2daa11e.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/chunks/webpack-7e827f325576e682ac28.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/css/30bec2fe96aff2c4559e.css',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/gGAa1QSituQMOBExWA6YJ/_buildManifest.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        {
          url: '/_next/static/gGAa1QSituQMOBExWA6YJ/_ssgManifest.js',
          revision: 'gGAa1QSituQMOBExWA6YJ',
        },
        { url: '/favicon.ico', revision: '21b739d43fcb9bbb83d8541fe4fe88fa' },
        {
          url: '/images/Amazonas.svg',
          revision: '66e8ff2e697eb5f312990f98cc08398d',
        },
        {
          url: '/images/IDPBNAC.png',
          revision: '0f7a95dbb2c452c3d59f54873e2ccf13',
        },
        {
          url: '/images/IDPB_R.png',
          revision: '151a43adac53a0e03cfca5cf21c3ace9',
        },
        { url: '/images/MM.png', revision: '39f7b7325c768346a6448abcc347949d' },
        {
          url: '/images/Missoes_1.png',
          revision: '9fdf5187c34acb7673a4fb2838352cf2',
        },
        {
          url: '/images/Missoes_2.png',
          revision: 'eec19d7c160757e9c598ff437ffd64b4',
        },
        {
          url: '/images/Missoes_3.png',
          revision: '55be83d6c54ac799c3403d5eb21cc77c',
        },
        {
          url: '/images/analise.svg',
          revision: '3f52bd0e4afc87f310d0882be31a2cd1',
        },
        {
          url: '/images/apple-icon.png',
          revision: 'eb5c5ab6101f8aac87c69a8188d01e1c',
        },
        {
          url: '/images/birthdayCake.svg',
          revision: 'aa47de851db6fb45ac9cff7e82df2034',
        },
        {
          url: '/images/brasil.svg',
          revision: '594fd14f77a6be6250cf5f2d26ba1f3a',
        },
        {
          url: '/images/facebook.svg',
          revision: 'c1e769605e4686003967900cb433dc65',
        },
        {
          url: '/images/favicon.png',
          revision: '9a10a0c57853a065708f39c0cf7c8640',
        },
        {
          url: '/images/finanças.svg',
          revision: '10b95ca99daf9e6813ac82edb653d6bb',
        },
        {
          url: '/images/globo.svg',
          revision: 'b1461c8b996ce09d454f4bdf4e17c507',
        },
        {
          url: '/images/home/contato.png',
          revision: 'e75a7999446b893d5f69a002a373074c',
        },
        {
          url: '/images/home/img01.png',
          revision: 'ea7be80f19407b2c768a8338be65329f',
        },
        {
          url: '/images/home/telaHome.png',
          revision: '70aa3a43a77d39875aed376800c3a6ee',
        },
        {
          url: '/images/icon-1024x1024.png',
          revision: 'a2a85bb38e47d70000b035f46f0af454',
        },
        {
          url: '/images/icon-128x128.png',
          revision: '96b3a75d010033150d269a737487b991',
        },
        {
          url: '/images/icon-256x256.png',
          revision: '0bb0a69e2d9c78b78952366fc5bd6447',
        },
        {
          url: '/images/icon-512x512.png',
          revision: '757763f8e94602ef84910525af947e55',
        },
        {
          url: '/images/idpb.ico',
          revision: 'af899316a30021e27aa863356176f913',
        },
        {
          url: '/images/instagram.svg',
          revision: 'fc23b90236f87b11147810f35f4c5293',
        },
        {
          url: '/images/manifest.json',
          revision: 'c6e418e25d3870f8e602f493a7d90c46',
        },
        {
          url: '/images/mapasGoogle.svg',
          revision: 'e56bfd16211d6382661efc2164c69de4',
        },
        {
          url: '/images/midia.png',
          revision: 'a814d7317c9030a2aa6ffa90bd4b4df1',
        },
        {
          url: '/images/missoes.svg',
          revision: '20d6478a37657e6791b9adc24dd2ec34',
        },
        {
          url: '/images/mm/home/MM_21.png',
          revision: '267b5d19ffb0c94a6cd4cb1b22003445',
        },
        {
          url: '/images/mm_globo.svg',
          revision: '6be23a6324593160cdaf978cd27a4b70',
        },
        {
          url: '/images/relatorio.svg',
          revision: '11b4a432c63a0c1642b7c05492dee626',
        },
        {
          url: '/images/statistics.svg',
          revision: '3882d9a0e1782816ce76cbaa09301a11',
        },
        {
          url: '/images/temp/imgTemp.jpeg',
          revision: '4dd33296a42a325aa5c79312ed556de1',
        },
        {
          url: '/images/youtube.svg',
          revision: 'a6372485318244c18a497ae9a9b62467',
        },
        { url: '/vercel.svg', revision: '4b4f1876502eb6721764637fe5c41702' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: s,
              state: i,
            }) =>
              a && a.type === 'opaqueredirect'
                ? new Response(a.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-media-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET',
    );
});
