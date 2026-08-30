# SENSE FC — EA FC26 Pro Clubs

Tek sayfalık kulüp sitesi. Koyu lacivert zemin, tek buz-mavisi vurgu, editoryal tipografi.
Framework yok, build adımı yok.

---

## Bölümler

- **Hero** — büyük "SENSE FC" yazı bloğu (düz metin, `<h1>`), kısa tanıtım, meta şeridi
- **Kinetik şerit** — yavaş kayan kelime marküsü (`prefers-reduced-motion` ile durur)
- **Kulüp** — iki kolon anlatım + logo, altında 4'lü künye ızgarası
- **Kadro** — mevkiye göre filtreli (Tümü / Kaleci / Defans / Orta Saha / Forvet) oyuncu ızgarası
- **Galeri** — editoryal ızgara, tıklayınca lightbox (ok tuşları + Esc)
- **İletişim** — çağrı bloğu, sosyal bağlantılar, e-posta butonu
- **Footer** — marka, alt menü, sosyal, telif

## Teknoloji

- Saf HTML / CSS / JavaScript
- [Google Fonts](https://fonts.google.com/) — Space Grotesk (başlık) + Inter (gövde)
- Görseller: `assets/images/` — `logo.png`, `no_image.png`, `eMajorLeague.png`, `gallery/g1..g7.jpg`

## Kurulum

1. Kulüp logosunu **`assets/images/logo.png`** olarak kaydet (kare, tercihen saydam PNG).
2. `index.html`'i tarayıcıda aç.
3. Oyuncu verisi: `js/main.js` → `PLAYERS` dizisi (`num` + `pos`: KAL/DEF/OSA/FOR).
4. Sosyal linkler ve `mailto:` adresi: `index.html` içinde `#join` bölümü.

## Renk & tipografi

`css/style.css` başındaki `:root` değişkenleri:

```css
--ink:        #060B14;  /* sayfa zemini */
--surface-2:  #111E2E;  /* kart zemini */
--line:       #1C2C3E;  /* kılcal çizgiler */
--ice:        #8FB9E0;  /* tek vurgu rengi */
--frost:      #DCEAF7;  /* başlık / açık metin */
--text-mid:   #9FB2C4;  /* ikincil metin */
```

## Lisans

MIT.
