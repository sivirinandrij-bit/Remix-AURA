

const products = [
  {
    id: 1,
    name: "Titan Phone 16 Pro",
    category: "Смартфони",
    categoryId: "smartphones",
    price: 45999,
    oldPrice: 49999,
    badge: "Новинка",
    rating: 4.95,
    reviews: 128,
    emoji: "📱",
    subtitle: "Флагманський смартфон із титановим корпусом",
    description: "Потужний смартфон із яскравим OLED-дисплеєм, професійною камерою та швидким процесором.",
    specs: "6.7″ OLED · 120 Гц · 256 ГБ · 48 Мп"
  },
  {
    id: 2,
    name: "AuraBook Pro 15 M4",
    category: "Ноутбуки",
    categoryId: "laptops",
    price: 71999,
    oldPrice: 76999,
    badge: "Топ продажів",
    rating: 4.98,
    reviews: 94,
    emoji: "💻",
    subtitle: "Ноутбук для роботи, навчання та творчості",
    description: "Тонкий і продуктивний ноутбук із якісним дисплеєм та тривалим часом автономної роботи.",
    specs: "15.3″ · 24 ГБ RAM · 1 ТБ SSD"
  },
  {
    id: 3,
    name: "Aether Studio Wireless",
    category: "Аудіо",
    categoryId: "audio",
    price: 14899,
    badge: "Вибір редакції",
    rating: 4.92,
    reviews: 76,
    emoji: "🎧",
    subtitle: "Навушники з активним шумопоглинанням",
    description: "Комфортні бездротові навушники з чистим звучанням і системою активного шумозаглушення.",
    specs: "ANC · Bluetooth 5.4 · до 45 год"
  },
  {
    id: 4,
    name: "Titan Horizon Watch Ultra",
    category: "Годинники",
    categoryId: "watches",
    price: 19499,
    oldPrice: 21999,
    badge: "Limited Run",
    rating: 4.89,
    reviews: 63,
    emoji: "⌚",
    subtitle: "Смартгодинник для активного способу життя",
    description: "Міцний корпус, яскравий екран, GPS та корисні функції для щоденного використання.",
    specs: "49 мм · GPS · OLED · водозахист"
  },
  {
    id: 5,
    name: "Aura Pods Pro Gen-2",
    category: "Аудіо",
    categoryId: "audio",
    price: 8799,
    badge: "Новинка",
    rating: 4.94,
    reviews: 152,
    emoji: "🎵",
    subtitle: "Компактні навушники з просторовим звуком",
    description: "Легкі бездротові навушники з адаптивним шумозаглушенням і компактним зарядним кейсом.",
    specs: "Smart ANC · IP55 · до 38 год"
  },
  {
    id: 6,
    name: "Aura MagDock 3-in-1",
    category: "Аксесуари",
    categoryId: "accessories",
    price: 3499,
    rating: 4.85,
    reviews: 42,
    emoji: "🔋",
    subtitle: "Зарядна станція для трьох пристроїв",
    description: "Зручна настільна станція для одночасного заряджання смартфона, годинника та навушників.",
    specs: "GaN · 65 Вт · 3 пристрої"
  }
];


// Категорії товарів
const categories = [
  ["all", "Всі пристрої"],
  ["smartphones", "Смартфони"],
  ["laptops", "Ноутбуки"],
  ["audio", "Аудіо"],
  ["watches", "Годинники"],
  ["accessories", "Аксесуари"]
];


// Валюти
const rates = {
  UAH: 1,
  USD: 0.0242,
  EUR: 0.0224,
  PLN: 0.0968
};

const symbols = {
  UAH: "₴",
  USD: "$",
  EUR: "€",
  PLN: "zł"
};


// Основні змінні
let activeCategory = "all";
let currency = "UAH";
let cart = [];
let searchTerm = "";

const $ = id => document.getElementById(id);


// Форматування ціни
function money(value) {
  const n = Math.round(value * rates[currency])
    .toLocaleString("uk-UA");

  return currency === "PLN"
    ? `${n} zł`
    : `${symbols[currency]}${n}`;
}


// Відображення категорій
function renderCategories() {
  $("categoryList").innerHTML = categories
    .map(([id, name]) => `
      <button
        class="category-button ${id === activeCategory ? "active" : ""}"
        data-category="${id}"
      >
        ${name}
      </button>
    `)
    .join("");
}


// Відображення товарів
function renderProducts() {
  const filtered = products.filter(p =>
    (activeCategory === "all" || p.categoryId === activeCategory) &&
    `${p.name} ${p.category} ${p.subtitle}`
      .toLowerCase()
      .includes(searchTerm)
  );

  $("productGrid").innerHTML = filtered
    .map(p => `
      <article class="product-card">

        <div class="product-image">
          <span class="product-emoji">${p.emoji}</span>

          ${p.badge ? `
            <span class="product-badge">${p.badge}</span>
          ` : ""}
        </div>

        <div class="product-info">

          <div class="product-meta">
            <span>${p.category}</span>

            <span class="rating">
              ★ ${p.rating} (${p.reviews})
            </span>
          </div>

          <h3>${p.name}</h3>

          <p>${p.subtitle}</p>

          <div class="product-bottom">

            <div>
              <div class="price">
                ${money(p.price)}
              </div>

              ${p.oldPrice ? `
                <small class="muted">
                  <s>${money(p.oldPrice)}</s>
                </small>
              ` : ""}
            </div>

            <button
              class="add-button"
              data-add="${p.id}"
            >
              До кошика +
            </button>

          </div>
        </div>
      </article>
    `)
    .join("");

  $("emptyMessage").classList.toggle(
    "hidden",
    filtered.length !== 0
  );
}


// Оновлення кошика
function updateCart() {
  $("cartCount").textContent = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  $("cartItems").innerHTML = cart.length
    ? cart.map(item => `
        <div class="cart-line">

          <div>
            <strong>${item.name}</strong>

            <small>
              ${money(item.price)} за одиницю
            </small>

            <div class="quantity-controls">

              <button
                data-qty="${item.id}"
                data-change="-1"
              >
                −
              </button>

              <span>${item.qty}</span>

              <button
                data-qty="${item.id}"
                data-change="1"
              >
                +
              </button>

              <button data-remove="${item.id}">
                Видалити
              </button>

            </div>
          </div>

          <strong>
            ${money(item.price * item.qty)}
          </strong>

        </div>
      `).join("")
    : '<p class="empty">Ваш кошик поки порожній.</p>';

  $("cartTotal").textContent = money(
    cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    )
  );

  $("checkoutButton").disabled = !cart.length;
}


// Повідомлення користувачу
function toast(message) {
  $("toast").textContent = message;
  $("toast").classList.remove("hidden");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    $("toast").classList.add("hidden");
  }, 2300);
}


// Перемикання категорій
$("categoryList").addEventListener("click", e => {
  const b = e.target.closest("[data-category]");

  if (!b) return;

  activeCategory = b.dataset.category;

  renderCategories();
  renderProducts();
});


// Додавання товару до кошика
function addToCart(p) {
  const item = cart.find(x => x.id === p.id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...p, qty: 1 });
  }

  updateCart();

  toast(`${p.name} додано до кошика`);
}


// Відкриття інформації про товар
function openProduct(p) {
  $("productDetails").innerHTML = `
    <div class="detail-image">
      <span>${p.emoji}</span>
    </div>

    <p class="eyebrow">${p.category}</p>

    <h2>${p.name}</h2>

    <p class="detail-subtitle">
      ${p.subtitle}
    </p>

    <div class="detail-rating">
      ★ ${p.rating} (${p.reviews} відгуків)
    </div>

    <p class="detail-description">
      ${p.description}
    </p>

    <div class="detail-specs">
      <strong>Характеристики:</strong>

      <p>${p.specs}</p>
    </div>

    <div class="detail-buy">

      <strong>${money(p.price)}</strong>

      <button
        class="primary-button"
        id="detailAddButton"
      >
        Додати до кошика +
      </button>

    </div>
  `;

  $("productOverlay").classList.remove("hidden");

  $("detailAddButton").addEventListener("click", () => {
    addToCart(p);

    $("productOverlay").classList.add("hidden");
  });
}


// Натискання на товар або кнопку кошика
$("productGrid").addEventListener("click", e => {

  // Кнопка додавання до кошика
  const addButton = e.target.closest("[data-add]");

  if (addButton) {
    const p = products.find(
      x => x.id === Number(addButton.dataset.add)
    );

    addToCart(p);

    return;
  }

  // Натискання на картку товару
  const card = e.target.closest(".product-card");

  if (card) {
    const index = [...$("productGrid").children]
      .indexOf(card);

    const shownProducts = products.filter(p =>
      (activeCategory === "all" || p.categoryId === activeCategory) &&
      `${p.name} ${p.category} ${p.subtitle}`
        .toLowerCase()
        .includes(searchTerm)
    );

    if (shownProducts[index]) {
      openProduct(shownProducts[index]);
    }
  }
});


// Закриття вікна товару
$("closeProductDialog").addEventListener("click", () => {
  $("productOverlay").classList.add("hidden");
});

$("productOverlay").addEventListener("click", e => {
  if (e.target === $("productOverlay")) {
    $("productOverlay").classList.add("hidden");
  }
});


// Відкриття кошика
$("cartButton").addEventListener("click", () => {
  $("overlay").classList.remove("hidden");

  updateCart();
});


// Закриття кошика
$("closeDialog").addEventListener("click", () => {
  $("overlay").classList.add("hidden");
});

$("overlay").addEventListener("click", e => {
  if (e.target === $("overlay")) {
    $("overlay").classList.add("hidden");
  }
});


// Зміна кількості товарів у кошику
$("cartItems").addEventListener("click", e => {
  const q = e.target.closest("[data-qty]");
  const r = e.target.closest("[data-remove]");

  if (q) {
    const item = cart.find(
      x => x.id === Number(q.dataset.qty)
    );

    item.qty += Number(q.dataset.change);

    if (item.qty <= 0) {
      cart = cart.filter(x => x.id !== item.id);
    }
  }

  if (r) {
    cart = cart.filter(
      x => x.id !== Number(r.dataset.remove)
    );
  }

  updateCart();
});


// Оформлення замовлення
$("checkoutButton").addEventListener("click", () => {
  if (!cart.length) return;

  alert(
    "Дякуємо за замовлення! Це демонстраційний магазин — реальна оплата не проводиться."
  );

  cart = [];

  updateCart();

  $("overlay").classList.add("hidden");
});


//Пошук товарів
$("searchInput").addEventListener("input", e => {
  searchTerm = e.target.value
    .toLowerCase()
    .trim();

  renderProducts();
});


// Зміна валюти
$("currencySelect").addEventListener("change", e => {
  currency = e.target.value;

  renderProducts();
  updateCart();
});


// Зміна теми сайту
$("themeButton").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  $("themeButton").textContent =
    document.body.classList.contains("dark")
      ? "☀"
      : "☾";
});


// Запуск сайту
renderCategories();
renderProducts();
updateCart();
