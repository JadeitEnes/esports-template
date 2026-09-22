# SENSE FC

Tek sayfalık e-spor kulübü sitesi. EA FC Kulübü.

Açık palet (beyaz zemin / koyu lacivert metin / buz mavisi aksan), e-spor
takımı yerleşimi: kadro önde, sola dayalı bölüm başlıkları. Framework yok,
build yok.

---

## Bölümler

- **Hero** — logo, ince "2026" kuruluş yılı, "SENSE FC", tek satırlık slogan
- **Kadro** — mevki sekmeleriyle filtre (Tümü / Kaleci / Defans / Orta Saha / Forvet), portre oyuncu kartları
- **Kulüp** — sol başlık + sağ metin, açık bant
- **Galeri** — kare görsel ızgara (amblem/forma); tıkla → lightbox (← → · Esc)
- **İletişim** — büyük başlıksız, sade kapanış şeridi: e-posta + sosyal bağlantılar
- **Footer** — marka, menü, telif

## Teknoloji

- Saf HTML / CSS / JavaScript
- Google Fonts: **Bricolage Grotesque** (başlık) · **Inter** (metin) · **JetBrains Mono** (rakam/etiket)
- Görseller: `assets/images/` → `logo.png`, `no_image.png`, `gallery/forma-yaka.jpg`, `gallery/amblem-cerceveli.jpg`, `gallery/forma-on.jpg`

## Kurulum

1. Kulüp logosunu `assets/images/logo.png` olarak koy (kare, saydam PNG).
2. `index.html`'i tarayıcıda aç.
3. Oyuncular: `js/main.js` → `PLAYERS` (`num` + `pos`: KAL / DEF / OSA / FOR).
4. Künye, sosyal linkler ve `mailto:` → `index.html` içinde düzenlenir.

## Palet (`css/style.css` → `:root`)

```css
--void:   #EEF5FF;   /* zemin — yumuşak beyaz */
--deep:   #ECF0F6;   /* açık bant */
--panel:  #FFFFFF;   /* kart */
--edge:   rgba(11,21,38,0.10);  /* kılcal çizgi */
--chrome: #0B1526;   /* başlık — koyu lacivert */
--mist:   #4A5A72;   /* gövde metni */
--ice:    #3D7DBF;   /* aksan */
--ice-hi: #1F5A94;   /* koyu aksan / hover */
```

## Güvenlik

- `index.html` başında kısıtlayıcı bir Content-Security-Policy meta etiketi var: script/stil/görsel sadece siteden (`'self'`) ve Google Fonts'tan yüklenir, `object-src`/`base-uri`/`form-action` tamamen kapalı.
- Dış bağlantılar (`target="_blank"`) hepsinde `rel="noopener noreferrer"` var.
- Clickjacking/HSTS gibi HTTP başlığı gerektiren korumalar statik HTML'den ayarlanamaz — barındırma platformunun (Netlify, Cloudflare Pages vb.) header ayarlarından eklenmeli.

## Lisans

MIT.
