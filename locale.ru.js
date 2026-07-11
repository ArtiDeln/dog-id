const LOCALE = {
  lang: "ru",

  meta: {
    description: "Потерялась собака. Помогите вернуть домой.",
    pageTitle: "{name} – информация для возврата домой",
  },

  hero: {
    openPhoto: "Открыть фото",
       lostBadge: "📇 Информация для связи",
  },

  sections: {
    about: "О собаке",
    help: "Помогите вернуть домой",
    contacts: "Контакты",
    fallback: "Если не удаётся с нами связаться",
  },

  help: {
    text:
      "Если вы нашли нашу Киру — пожалуйста, свяжитесь с нами как можно скорее. Мы заберём её в любое удобное для вас время.",
  },

  info: {
    nickname: "Кличка",
    breed: "Порода",
    age: "Возраст",
    chip: "Чип",
    chipped: "Имеется",
  },

  age: {
    year: ["год", "года", "лет"],
    month: ["месяц", "месяца", "месяцев"],
    lessThanMonth: "меньше месяца",
  },

  contacts: {
    includeLocation: "Отправить геолокацию вместе с сообщением",
    openMap: "Открыть на карте",
  },

  location: {
    unsupported: "Геолокация не поддерживается в этом браузере",
    httpsRequired: "Геолокация доступна на опубликованном сайте (HTTPS)",
    detecting: "Определяем местоположение…",
    ready: "Геолокация будет добавлена в сообщение",
    errors: {
      1: "Нужен доступ к геолокации — разрешите в настройках браузера",
      2: "Не удалось определить местоположение",
      3: "Превышено время ожидания — попробуйте ещё раз",
      default: "Ошибка геолокации",
    },
  },

  maps: {
    title: "Открыть в картах",
    cancel: "Отмена",
    yandex: "Яндекс Карты",
    google: "Google Maps",
    apple: "Apple Maps",
    organic: "Organic Maps",
  },

  messengers: {
    call: "Позвонить",
    telegram: "Telegram",
    viber: "Viber",
    whatsapp: "WhatsApp",
    sms: "SMS",
  },

  messages: {
    default: "Здравствуйте! Я нашёл(ла) вашу собаку {nameAcc}.",
    backup: "Здравствуйте! Я нашёл(ла) {nameAcc} — собаку Артёма и Насти.",
    locationSuffix: "Сейчас Кира находится здесь: {url}",
  },

  content: {
    fallbackNote:
      "Если не удаётся с нами связаться, будем благодарны, если вы сможете отвести Киру в клинику:",
    fallbackClinic: {
      name: "ПолиВет",
      address: "Речицкий просп. 135б, Гомель",
      lat: "52.405372",
      lng: "30.910278",
    },
    notes: [
      "Дружелюбная, не агрессивна",
      "Может испугаться громких звуков",
      "Есть аллергия, каждый день принимает Апоквел",
    ],
  },

  footer: {
    thanks: "Спасибо, что помогаете 🙏",
  },

  backup: {
    toggle: "Дополнительные резервные номера",
  },

  carousel: {
    title: "Фото",
    close: "Закрыть",
    prev: "Предыдущее",
    next: "Следующее",
    photoAlt: "{name} — фото {n}",
    photoLabel: "Фото {n}",
    counter: "{current} / {total}",
  },
};

function t(key, vars = {}) {
  const value = key.split(".").reduce((obj, part) => obj?.[part], LOCALE);
  if (typeof value !== "string") return key;
  return value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
}

function applyLocale() {
  document.documentElement.lang = LOCALE.lang;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = t("meta.description");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
}
