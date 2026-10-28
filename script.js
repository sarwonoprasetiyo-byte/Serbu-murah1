/*
  SERBU MURAH — DAFTAR PRODUK
  Ubah contoh produk di bawah ini dengan barang milik Anda.

  image: URL gambar langsung (https://...) atau nama file gambar di folder images/
  video: URL video langsung (opsional), atau kosongkan dengan ""
  price: harga angka tanpa titik, contoh 45000
  affiliateUrl: tempel tautan Shopee Affiliate milik Anda
*/

const products = [
  {
    name: "Jas hujan",
    description: "menemani saat hujan untuk kegiatan sehari-hari.",
    price: 81000,
    image: "https://placehold.co/700x560/e8efdf/285b3b?text=Foto+Jam+Tangan",
    video: "",
    affiliateUrl: "https://s.shopee.co.id/40hHzrAl9l",
    label: "PILIHAN HEMAT",
    emoji: "✓"
  },
  {
    name: "Helm Pria / Wanita",
    description: "Pilihan perlengkapan berkendara.",
    price: 125000,
    image: "https://placehold.co/700x560/f6e8d4/85521b?text=Foto+Helm",
    video: "",
    affiliateUrl: "https://shopee.co.id/",
    label: "FAVORIT",
    emoji: "🪖"
  },
  {
    name: "Aksesori HP",
    description: "Aksesori praktis untuk penggunaan harian.",
    price: 25000,
    image: "https://placehold.co/700x560/e4eaf6/314b7d?text=Foto+Aksesori+HP",
    video: "",
    affiliateUrl: "https://shopee.co.id/",
    label: "HARGA HEMAT",
    emoji: "📱"
  }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const productCount = document.getElementById("productCount");

function rupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function productCard(product) {
  const media = product.video
    ? `<video controls preload="metadata" poster="${escapeHtml(product.image)}">
         <source src="${escapeHtml(product.video)}" type="video/mp4">
         Browser Anda tidak mendukung video.
       </video>`
    : `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy"
         onerror="this.style.display='none'; this.nextElementSibling.hidden=false;">
       <div class="media-placeholder" hidden><div><span class="placeholder-emoji">${escapeHtml(product.emoji || "🛍️")}</span><span class="placeholder-caption">Tambahkan foto produk</span></div></div>`;

  return `
    <article class="product-card">
      <div class="product-media">
        ${media}
        <span class="media-label">${escapeHtml(product.label || "PRODUK PILIHAN")}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <p class="product-description">${escapeHtml(product.description || "")}</p>
        <p class="product-price">${rupiah(Number(product.price) || 0)}</p>
        <a class="buy-button" href="${escapeHtml(product.affiliateUrl)}"
           target="_blank" rel="noopener noreferrer sponsored">
          Beli di Shopee <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>`;
}

function renderProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(product =>
    `${product.name} ${product.description || ""}`.toLowerCase().includes(keyword)
  );

  productGrid.innerHTML = filtered.map(productCard).join("");
  emptyState.hidden = filtered.length > 0;
  productCount.textContent = `${filtered.length} produk`;
}

searchInput.addEventListener("input", renderProducts);
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
