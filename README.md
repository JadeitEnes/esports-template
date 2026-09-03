# SENSE FC

Tek sayfalık e-spor kulübü sitesi. EA FC26 Pro Clubs.

Soğuk palet (mavi-siyah / lacivert / gümüş-beyaz / buz mavisi), e-spor takımı
yerleşimi: kadro önde, künye şeridi, sola dayalı bölüm başlıkları. Framework yok,
build yok.

---

## Bölümler

- **Hero** — logo, "SENSE FC", tek satır, iki CTA, mono künye satırı
- **Künye şeridi** — Oyuncu / Kuruluş / Lig / Bölge (mono)
- **01 · Kadro** — mevki sekmeleriyle filtre (Tümü / Kaleci / Defans / Orta Saha / Forvet), portre oyuncu kartları
- **02 · Kulüp** — sol başlık + sağ metin, açık bant
- **03 · Maçlar** — görsel ızgara, ilki tam en; tıkla → lightbox (← → · Esc)
- **04 · İletişim** — e-posta butonu + sosyal bağlantılar
- **Footer** — marka, menü, telif

## Teknoloji

- Saf HTML / CSS / JavaScript
- Google Fonts: **Bricolage Grotesque** (başlık) · **Inter** (metin) · **JetBrains Mono** (rakam/etiket)
- Görseller: `assets/images/` → `logo.png`, `no_image.png`, `gallery/g1..g7.jpg`

## Kurulum

1. Kulüp logosunu `assets/images/logo.png` olarak koy (kare, saydam PNG).
2. `index.html`'i tarayıcıda aç.
3. Oyuncular: `js/main.js` → `PLAYERS` (`num` + `pos`: KAL / DEF / OSA / FOR).
4. Künye, sosyal linkler ve `mailto:` → `index.html` içinde düzenlenir.

## Palet (`css/style.css` → `:root`)

```css
--void:   #070B12;   /* zemin — mavi-siyah */
--deep:   #0A1220;   /* açık bant */
--panel:  #0F1930;   /* kart */
--edge:   rgba(159,191,227,0.13);  /* kılcal çizgi */
--chrome: #ECF2FA;   /* başlık — gümüş-beyaz */
--mist:   #94A8C0;   /* gövde metni */
--ice:    #8FBEEC;   /* aksan */
--ice-hi: #CDE4FB;   /* buzul parlama */
```

## Lisans

MIT.
