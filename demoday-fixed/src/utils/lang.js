export const translations = {
  UZ: {
    projects: "Loyihalar",
    stats: "Statistika",
    categories: "Bo'limlar",
    allAds: "Barcha e'lonlar",
    freelancer: "Frilanser",
    searchPlaceholder: "Xizmatlar yoki loyihalar...",
    heroTag: "O'zbekistondagi eng yirik frilanserlar platformasi",
    heroTitle: "Loyihangizga mos frilanserlarni shu yerdan toping",
    heroDesc: "Ish beruvchi va frilanserlarni bog'lovchi platforma — topshiriq joylashtiring yoki o'z xizmatingizni taklif qiling.",
    postJob: "Topshiriq joylashtirish",
    viewServices: "Xizmat taklif qilish / Ko'rish",
    popular: "Mashhur:",
    footerDesc: "O'zbekistondagi eng zamonaviy frilanserlar va buyurtmachilar platformasi. O'z loyihangizni yarating yoki mutaxassis toping.",
    footerCat: "Kategoriyalar",
    footerPages: "Sahifalar",
    footerContact: "Bog'lanish",
    rights: "2026 WORKK.UZ. Barcha huquqlar himoyalangan.",
    privacy: "Maxfiylik siyosati",
    terms: "Foydalanish shartlari",
    
    // Jobs sahifasi uchun
    allProjects: "Barcha loyihalar",
    noAds: "Bu so'rov bo'yicha e'lonlar topilmadi.",
    searchInJobs: "Qidirish...",
    postJobNav: "Ish joylashtirish",
    home: "Bosh sahifa",
    catList: [
      "Dasturlash va IT",
      "Grafika va dizayn",
      "SEO va targ'ibot",
      "Ijtimoiy tarmoqlar",
      "Matn va tarjimalar",
      "Biznes va rivojlanish",
    ],
  },
  RU: {
    projects: "Проекты",
    stats: "Статистика",
    categories: "Категории",
    allAds: "Все объявления",
    freelancer: "Фрилансер",
    searchPlaceholder: "Поиск услуг...",
    heroTag: "Крупнейшая платформа фрилансеров в Узбекистане",
    heroTitle: "Найдите идеального фрилансера для вашего проекта",
    heroDesc: "Платформа, объединяющая работодателей и фрилансеров — размещайте заказы или предлагайте свои услуги.",
    postJob: "Разместить заказ",
    viewServices: "Предложить услугу / Смотреть",
    popular: "Популярные:",
    footerDesc: "Самая современная платформа фрилансеров и заказчиков в Узбекистане. Создайте свой проект или найдите специалиста.",
    footerCat: "Категории",
    footerPages: "Страницы",
    footerContact: "Контакты",
    rights: "2026 WORKK.UZ. Все права защищены.",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",

    // Jobs sahifasi uchun
    allProjects: "Все проекты",
    noAds: "По этому запросу объявлений пока нет.",
    searchInJobs: "Поиск...",
    postJobNav: "Разместить заказ",
    home: "Главная",
    catList: [
      "Программирование и IT",
      "Дизайн и графика",
      "SEO и продвижение",
      "Социальные сети",
      "Тексты и переводы",
      "Бизнес и развитие",
    ],
  },
  EN: {
    projects: "Projects",
    stats: "Stats",
    categories: "Categories",
    allAds: "All listings",
    freelancer: "Freelancer",
    searchPlaceholder: "Search services...",
    heroTag: "Uzbekistan's largest freelance platform",
    heroTitle: "Find the perfect freelancer for your project",
    heroDesc: "A platform connecting clients and freelancers — post a job or offer your services.",
    postJob: "Post a job",
    viewServices: "Offer a service / Browse",
    popular: "Popular:",
    footerDesc: "The most modern freelancer and client platform in Uzbekistan. Create your project or find a specialist.",
    footerCat: "Categories",
    footerPages: "Pages",
    footerContact: "Contact",
    rights: "2026 WORKK.UZ. All rights reserved.",
    privacy: "Privacy policy",
    terms: "Terms of use",

    // Jobs page
    allProjects: "All projects",
    noAds: "No listings found for this search.",
    searchInJobs: "Search...",
    postJobNav: "Post a job",
    home: "Home",
    catList: [
      "Programming & IT",
      "Design & Graphics",
      "SEO & Promotion",
      "Social Media",
      "Writing & Translation",
      "Business & Consulting",
    ],
  },
};

// Kichik harf bilan kelsa ham crash bo'lmasligi uchun aliaslar
translations.uz = translations.UZ;
translations.ru = translations.RU;
translations.en = translations.EN;

// Xavfsiz tarjima oluvchi funksiya
export const getTranslation = (lang) => {
  if (!lang) return translations.UZ;
  const key = String(lang).toUpperCase();
  return translations[key] || translations.UZ;
};