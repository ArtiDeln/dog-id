function normalizePhone(phone) {
  return phone.replace(/\D/g, "");
}

function formatTel(phone) {
  return `tel:${normalizePhone(phone)}`;
}

function formatSms(phone, text) {
  const digits = normalizePhone(phone);
  const body = encodeURIComponent(
    text ?? `Здравствуйте! Я нашёл(ла) вашу собаку ${PET_CONFIG.name}. `
  );
  return `sms:${digits}?body=${body}`;
}

function buildMapUrl(lat, lng) {
  return `https://yandex.ru/maps/?pt=${lng},${lat}&z=17&l=map`;
}

function buildLocationMessage(lat, lng) {
  return `Здравствуйте! Я нашёл(ла) вашу собаку ${PET_CONFIG.name}. Сейчас я здесь: ${buildMapUrl(lat, lng)}`;
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function parseBirthDate(dateStr) {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day);
}

function calculateAge(birthDateStr) {
  const birth = parseBirthDate(birthDateStr);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (today.getDate() < birth.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    return `${years} ${pluralize(years, "год", "года", "лет")}`;
  }

  if (months > 0) {
    return `${months} ${pluralize(months, "месяц", "месяца", "месяцев")}`;
  }

  return "меньше месяца";
}

const CALL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

const WHATSAPP_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;

const TELEGRAM_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`;

const VIBER_ICON = `<svg viewBox="0 0 72.21 76.21" fill="currentColor" aria-hidden="true"><g transform="translate(-429.267,-345.047)"><path d="m 493.4,352.5 c -1.9,-1.7 -9.5,-7.3 -26.6,-7.4 0,0 -20.1,-1.2 -29.9,7.8 -5.5,5.5 -7.4,13.4 -7.6,23.3 -0.2,9.9 -0.5,28.4 17.4,33.5 v 7.7 c 0,0 -0.1,3.1 1.9,3.7 2.5,0.8 3.9,-1.6 6.3,-4.1 1.3,-1.4 3.1,-3.4 4.4,-5 12.2,1 21.6,-1.3 22.7,-1.7 2.5,-0.8 16.4,-2.6 18.7,-21.1 2.4,-19.2 -1,-31.3 -7.3,-36.7 z m 2.1,35.2 c -1.9,15.5 -13.2,16.5 -15.3,17.1 -0.9,0.3 -9.1,2.3 -19.5,1.7 0,0 -7.7,9.3 -10.2,11.8 -0.4,0.4 -0.8,0.5 -1.1,0.5 -0.4,-0.1 -0.5,-0.6 -0.5,-1.3 0,-1 0.1,-12.8 0.1,-12.8 -15.1,-4.2 -14.2,-20 -14.1,-28.3 0.2,-8.3 1.7,-15 6.3,-19.6 8.3,-7.5 25.4,-6.4 25.4,-6.4 14.4,0.1 21.3,4.4 22.9,5.9 5.2,4.6 7.9,15.5 6,31.4 z"/><path fill="none" stroke="currentColor" stroke-width="1.927" stroke-linecap="round" stroke-linejoin="round" d="m 473.8,375.8 c -0.2,-3.8 -2.1,-5.8 -5.8,-6"/><path fill="none" stroke="currentColor" stroke-width="1.927" stroke-linecap="round" stroke-linejoin="round" d="m 478.8,377.4 c 0.1,-3.5 -1,-6.5 -3.1,-8.8 -2.2,-2.4 -5.2,-3.7 -9,-4"/><path fill="none" stroke="currentColor" stroke-width="1.927" stroke-linecap="round" stroke-linejoin="round" d="m 483.8,379.4 c 0,-6.1 -1.9,-10.9 -5.5,-14.4 -3.6,-3.5 -8.1,-5.3 -13.5,-5.3"/><path d="m 468.2,388.7 c 0,0 1.4,0.1 2.1,-0.8 l 1.4,-1.8 c 0.7,-0.9 2.3,-1.5 4,-0.6 0.9,0.5 2.5,1.5 3.5,2.3 1.1,0.8 3.3,2.6 3.3,2.6 1.1,0.9 1.3,2.2 0.6,3.6 -0.7,1.3 -1.7,2.5 -3,3.6 -1,0.9 -2,1.3 -3,1.5 h -0.4 c -0.4,0 -0.9,-0.1 -1.3,-0.2 -1.5,-0.4 -4,-1.5 -8.3,-3.8 -2.7,-1.5 -5,-3.1 -6.9,-4.6 -1,-0.8 -2.1,-1.7 -3.1,-2.8 l -0.4,-0.4 c -1.1,-1.1 -2,-2.1 -2.8,-3.1 -1.5,-1.9 -3.1,-4.2 -4.6,-6.9 -2.3,-4.2 -3.4,-6.7 -3.8,-8.3 -0.1,-0.4 -0.2,-0.8 -0.2,-1.3 v -0.4 c 0.1,-1 0.6,-2 1.5,-3 1.1,-1.2 2.3,-2.2 3.6,-3 1.4,-0.7 2.7,-0.5 3.6,0.6 0,0 1.8,2.2 2.6,3.3 0.7,1 1.7,2.6 2.3,3.5 0.9,1.6 0.3,3.3 -0.5,4 l -1.8,1.4 c -0.9,0.7 -0.8,2.1 -0.8,2.1 0,0 2.5,9.9 12.4,12.5 z"/></g></svg>`;

const SMS_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;

function messengerLinks(phone, customMessage) {
  const digits = normalizePhone(phone);
  const messageText =
    customMessage ?? `Здравствуйте! Я нашёл(ла) вашу собаку ${PET_CONFIG.name}. `;
  const message = encodeURIComponent(messageText);

  return [
    {
      id: "call",
      label: "Позвонить",
      href: formatTel(phone),
      icon: CALL_ICON,
      primary: true,
    },
    {
      id: "telegram",
      label: "Telegram",
      href: `https://t.me/+${digits}`,
      icon: TELEGRAM_ICON,
    },
    {
      id: "viber",
      label: "Viber",
      href: `viber://chat?number=${digits}`,
      icon: VIBER_ICON,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${digits}?text=${message}`,
      icon: WHATSAPP_ICON,
    },
    {
      id: "sms",
      label: "SMS",
      href: formatSms(phone, messageText),
      icon: SMS_ICON,
    },
  ];
}

function createActionButton(link, options = {}) {
  const a = document.createElement("a");
  a.className = `action${link.primary ? " action--primary" : ""}`;
  if (options.id) a.id = options.id;
  a.href = link.href;
  a.innerHTML = `${link.icon}<span>${link.label}</span>`;
  if (link.id === "whatsapp" || link.id === "telegram") {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  return a;
}

function renderOwnerCard(owner) {
  const card = document.createElement("div");
  card.className = "owner";

  const name = document.createElement("div");
  name.className = "owner__name";
  name.textContent = owner.name;

  const phoneLink = document.createElement("a");
  phoneLink.className = "owner__phone";
  phoneLink.href = formatTel(owner.phone);
  phoneLink.textContent = owner.phoneDisplay || owner.phone;

  const actions = document.createElement("div");
  actions.className = "actions actions--compact";
  messengerLinks(owner.phone)
    .filter((l) => l.id !== "call")
    .forEach((link) =>
      actions.appendChild(createActionButton(link, { id: `${link.id}-${owner.name}` }))
    );

  const callBtn = createActionButton(
    messengerLinks(owner.phone).find((l) => l.id === "call"),
    { id: `call-${owner.name}` }
  );
  callBtn.classList.add("owner__call");
  actions.prepend(callBtn);

  card.append(name, phoneLink, actions);
  return card;
}

function initCarousel(photos) {
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("carousel-track");
  const viewport = document.getElementById("carousel-viewport");
  const dotsContainer = document.getElementById("carousel-dots");
  const counter = document.getElementById("carousel-counter");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const closeBtn = document.getElementById("carousel-close");
  const openBtn = document.getElementById("hero-photo-btn");
  const photoHint = document.getElementById("photo-hint");

  let current = 0;
  let touchStartX = 0;
  let touchDeltaX = 0;

  if (photos.length > 1) {
    photoHint.hidden = false;
  }

  photos.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel__slide";
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${PET_CONFIG.name} — фото ${i + 1}`;
    img.loading = i === 0 ? "eager" : "lazy";
    slide.appendChild(img);
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", `Фото ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = [...dotsContainer.querySelectorAll(".carousel__dot")];

  function updateUI() {
    track.style.transform = `translateX(-${current * 100}%)`;
    counter.textContent = `${current + 1} / ${photos.length}`;
    dots.forEach((dot, i) => dot.classList.toggle("carousel__dot--active", i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === photos.length - 1;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, photos.length - 1));
    updateUI();
  }

  function openCarousel(index = 0) {
    current = index;
    updateUI();
    carousel.classList.remove("hidden");
    document.body.classList.add("carousel-open");
  }

  function closeCarousel() {
    carousel.classList.add("hidden");
    document.body.classList.remove("carousel-open");
  }

  openBtn.addEventListener("click", () => openCarousel(0));
  closeBtn.addEventListener("click", closeCarousel);
  carousel.addEventListener("click", (e) => {
    if (e.target === carousel) closeCarousel();
  });

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  viewport.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  viewport.addEventListener("touchend", () => {
    if (Math.abs(touchDeltaX) > 50) {
      goTo(current + (touchDeltaX < 0 ? 1 : -1));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (carousel.classList.contains("hidden")) return;
    if (e.key === "Escape") closeCarousel();
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  if (photos.length <= 1) {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
    dotsContainer.hidden = true;
  }

  updateUI();
}

function initLocationShare() {
  const btn = document.getElementById("location-btn");
  const status = document.getElementById("location-status");
  const result = document.getElementById("location-result");
  const mapLink = document.getElementById("location-map-link");
  const sendList = document.getElementById("location-send-list");

  if (!navigator.geolocation) {
    status.textContent = "Геолокация не поддерживается в этом браузере";
    status.classList.remove("hidden");
    btn.disabled = true;
    return;
  }

  if (!window.isSecureContext) {
    status.textContent =
      "Для геолокации нужен HTTPS — на опубликованном сайте будет работать";
    status.classList.remove("hidden");
  }

  btn.addEventListener("click", () => {
    btn.disabled = true;
    btn.classList.add("location__btn--loading");
    status.textContent = "Определяем местоположение…";
    status.classList.remove("hidden", "location__status--error");
    result.classList.add("hidden");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const lat = latitude.toFixed(6);
        const lng = longitude.toFixed(6);
        const mapUrl = buildMapUrl(lat, lng);
        const message = buildLocationMessage(lat, lng);

        status.textContent = "Местоположение определено — отправьте его нам:";
        status.classList.remove("location__status--error");

        mapLink.href = mapUrl;
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";

        sendList.replaceChildren();
        PET_CONFIG.owners.forEach((owner) => {
          const block = document.createElement("div");
          block.className = "location-owner";

          const name = document.createElement("div");
          name.className = "location-owner__name";
          name.textContent = owner.name;

          const actions = document.createElement("div");
          actions.className = "actions actions--compact";

          messengerLinks(owner.phone, message)
            .filter((l) => l.id !== "call")
            .forEach((link) =>
              actions.appendChild(
                createActionButton(link, { id: `loc-${link.id}-${owner.name}` })
              )
            );

          block.append(name, actions);
          sendList.appendChild(block);
        });

        result.classList.remove("hidden");
        btn.disabled = false;
        btn.classList.remove("location__btn--loading");
      },
      (error) => {
        const messages = {
          1: "Нужен доступ к геолокации — разрешите в настройках браузера",
          2: "Не удалось определить местоположение",
          3: "Превышено время ожидания — попробуйте ещё раз",
        };
        status.textContent = messages[error.code] ?? "Ошибка геолокации";
        status.classList.add("location__status--error");
        btn.disabled = false;
        btn.classList.remove("location__btn--loading");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });
}

function init() {
  const c = PET_CONFIG;
  const age = calculateAge(c.birthDate);
  const photos = c.photos?.length ? c.photos : ["assets/kira.jpg"];

  document.title = `${c.name} — найдена собака`;
  document.getElementById("pet-name").textContent = c.name;
  document.getElementById("pet-breed").textContent = `${c.breed} · ${age}`;

  const heroPhoto = document.getElementById("hero-photo");
  heroPhoto.src = photos[0];
  heroPhoto.alt = c.name;

  initCarousel(photos);
  initLocationShare();

  const ownersList = document.getElementById("owners-list");
  ownersList.replaceChildren();
  c.owners.forEach((owner) => ownersList.appendChild(renderOwnerCard(owner)));

  document.getElementById("fallback-note").textContent = c.fallbackClinic.note;
  document.getElementById("fallback-name").textContent = c.fallbackClinic.name;
  document.getElementById("fallback-address").textContent = c.fallbackClinic.address;

  const infoList = document.getElementById("info-list");
  infoList.replaceChildren();

  const infoItems = [
    ["Кличка", c.name],
    ["Порода", c.breed],
    ["Возраст", age],
    c.chipped ? ["Чип", "Имеется"] : null,
  ].filter(Boolean);

  infoItems.forEach(([term, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = value;
    infoList.append(dt, dd);
  });

  const notesList = document.getElementById("notes-list");
  notesList.replaceChildren();
  c.notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });

  if (c.reward && c.rewardText) {
    const rewardSection = document.getElementById("reward-section");
    rewardSection.classList.remove("hidden");
    document.getElementById("reward-text").textContent = c.rewardText;
  }
}

document.addEventListener("DOMContentLoaded", init);
