# IHCC — Navbar + Header

React (Create React App / Vite friendly) — plain CSS, no Tailwind, no Next.js.

## الملفات
- `src/components/Navbar.jsx` + `Navbar.css` — الشريط العلوي، اللوجو مكبّر ليكون أول شيء يلفت النظر، يتحول للون الداكن عند التمرير (scroll)، وفيه قائمة موبايل (هامبرغر).
- `src/components/Header.jsx` + `Header.css` — قسم الهيرو بخلفية بلوبرنت (Blueprint grid) وخط كرين (Crane) بلون الأزرق تيمّناً بشعارك.
- `src/App.jsx` + `src/App.css` — يجمع الكومبوننتس مع متغيرات الألوان (CSS variables) المشتركة.
- `src/assets/logo.jpeg` — اللوجو المرفوع منك.

## طريقة الاستخدام
1. انسخ مجلد `src` داخل مشروع React الحالي عندك (أو أنشئ مشروع جديد بـ Vite: `npm create vite@latest my-app -- --template react`).
2. تأكد إن `App.jsx` مستدعى من `main.jsx` أو `index.js`.
3. عدّل روابط القائمة (`NAV_LINKS` في `Navbar.jsx`) والنصوص في `Header.jsx` حسب المحتوى النهائي.
4. الخط المستخدم Cairo (يدعم عربي/إنجليزي) مستورد تلقائياً من Google Fonts داخل `App.css`.

## الألوان (CSS variables في App.css)
- `--color-white: #ffffff`
- `--color-primary: #1b4177`
- `--color-accent: #017bfd`
- `--color-dark: #1b2d3a`

كل التصميم متجاوب (responsive) لغاية الموبايل، والاتجاه RTL افتراضي.
