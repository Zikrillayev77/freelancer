<h1 align="center">💼 workk.uz — Frilans platformasi</h1>

<p align="center"><img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white" alt="React"> <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite"> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS"> <img src="https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=white" alt="Zustand"></p>

<p align="center">Ish beruvchilar va frilanserlarni bog'lovchi veb-platforma: topshiriq joylashtiring yoki o'z xizmatingizni taklif qiling.</p>

## ✨ Imkoniyatlar

- 🔎 Loyihalarni qidirish va kategoriyalar bo'yicha filtrlash
- 📝 Yangi topshiriq joylashtirish (React Hook Form bilan validatsiya)
- ⭐ Ishlarni saqlab qo'yish (**Saqlanganlar** sahifasi)
- 🗂️ O'z e'lonlaringizni boshqarish (**Mening e'lonlarim**)
- 👤 Profil, bildirishnomalar paneli, aloqa oynasi
- 🌍 3 til: o'zbek, rus, ingliz
- 🌙 Yorug' / qorong'i rejim
- 📊 Statistika, FAQ, Maxfiylik siyosati va Foydalanish shartlari sahifalari
- 💾 Ma'lumotlar `localStorage` da saqlanadi — sahifa yangilanganda yo'qolmaydi

## 🗺️ Sahifalar

| Yo'l | Sahifa |
|---|---|
| `/` | Bosh sahifa |
| `/jobs` | Barcha ishlar |
| `/jobs/:id` | Ish tafsilotlari |
| `/saved` | Saqlangan ishlar |
| `/my-jobs` | Mening e'lonlarim |
| `/profile` | Profil |
| `/stats` | Statistika |
| `/privacy`, `/terms` | Huquqiy sahifalar |

## 📁 Tuzilma

```
freelancer/
├── demoday-fixed/        # Asosiy React ilova
│   ├── src/
│   │   ├── Components/   # Navbar, Jobcard, modallar, Footer...
│   │   ├── Pages/        # Sahifalar
│   │   ├── Context/      # Mavzu (theme) va toast
│   │   └── Store/        # Zustand store
│   └── package.json
├── netlify.toml          # Netlify sozlamalari
└── package.json          # Ildiz skriptlari demoday-fixed ga yo'naltiradi
```

## 🚀 Ishga tushirish

```bash
git clone https://github.com/Zikrillayev77/freelancer.git
cd freelancer/demoday-fixed
npm install
npm run dev
```

Brauzerda `http://localhost:5173` manzilini oching.

Production uchun build:

```bash
npm run build
npm run preview
```

> Ildiz papkadan ham ishlatish mumkin: `npm --prefix demoday-fixed install`, so'ng `npm run dev`.

## 🌐 Deploy

- **Netlify:** repo ulang — `netlify.toml` avtomatik ravishda `demoday-fixed` papkasini build qiladi.
- **Vercel:** *Root Directory* sifatida `demoday-fixed` ni tanlang (`vercel.json` SPA marshrutlashni sozlaydi).

---

👤 **Muallif:** [Abdulloh Zikrillayev](https://github.com/Zikrillayev77)
