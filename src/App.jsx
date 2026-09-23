import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, Check, ChevronDown, Clock3, Globe, Layout, Menu, MessageCircle,
  Palette, Printer, ShoppingCart, Sparkles, X, Zap
} from 'lucide-react';

const WA_NUMBER = '6287884294305';
const waLink = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

const services = [
  { id: 'grafis', icon: Palette, title: 'Desain Grafis', description: 'Identitas visual profesional untuk meningkatkan brand value Anda.', items: ['Logo & Branding Kit', 'Banner & Feed IG', 'Kemasan & Packaging', 'File Master Vector Complete'] },
  { id: 'percetakan', icon: Printer, title: 'Percetakan', description: 'Hasil cetak presisi tajam, bahan premium dengan QC ketat.', items: ['Brosur & Catalog Produk', 'Kartu Nama Eksklusif', 'Packaging / Dus Custom', 'Spanduk & Stiker Label'] },
  { id: 'web', icon: Layout, title: 'Web Development', description: 'Website landing page super cepat yang mudah membantu closing.', items: ['Landing Page High-Converting', 'Website Toko Online & WA', 'Domain + Hosting Gratis 1 Thn', 'Garansi Bebas Error & Loading Cepat'], featured: true },
  { id: 'sosmed', icon: MessageCircle, title: 'Social Media Mgmt', description: 'Kelola konten media sosial secara profesional tanpa ribet.', items: ['Desain Feed & Story Harian', 'Production TikTok / Reels Video', 'Riset Hashtag & Copywriting', 'Laporan Analytics Bulanan'] }
];

const calcData = {
  web: { label: 'Web Development', packages: [{ title: 'Starter Landing Page', price: 499000, features: ['1 Halaman Single Page', 'Desain Modern & Fast Load', 'Integrasi Tombol WhatsApp'] }, { title: 'Pro Store + WA Checkout', price: 799000, popular: true, features: ['3-5 Halaman Interactive', 'Kalkulator / Form Checkout', 'Domain .com Gratis 1 Thn'] }, { title: 'Enterprise Corporate', price: 1499000, features: ['Halaman Tak Terbatas', 'Custom System / Web App', 'Integrasi Payment Gateway'] }], addons: [{ id: 'speed', label: 'Speed Optimization', price: 150000 }, { id: 'copy', label: 'Jasa Copywriting Sales', price: 200000 }, { id: 'logo', label: 'Bundling Desain Logo', price: 250000 }] },
  grafis: { label: 'Desain Grafis', packages: [{ title: 'Basic Logo', price: 299000, features: ['2 Pilihan Konsep Logo', 'Revisi 3x', 'Master File Vector'] }, { title: 'Complete Branding Kit', price: 599000, popular: true, features: ['4 Konsep Logo Premium', 'Revisi Sepuasnya', 'Color Palette & Typography'] }, { title: 'Full Design Package', price: 999000, features: ['Branding Kit Complete', '10 Template Feed IG', 'Panduan Brand Book'] }], addons: [{ id: 'mockup', label: 'Mockup 3D High Res', price: 100000 }, { id: 'feed', label: 'Extra 5 Feed Content', price: 200000 }] },
  percetakan: { label: 'Percetakan', packages: [{ title: 'Paket Promo Brosur', price: 199000, features: ['Cetak Brosur A4/A5', 'Bahan Art Paper 150gr', 'Full Color 2 Sisi'] }, { title: 'Cetak Packaging / Dus', price: 499000, popular: true, features: ['Cetak Kemasan Product', 'Bahan Dupleks / Ivory', 'Potong Die Cut Custom'] }, { title: 'Bulk Printing Business', price: 1299000, features: ['Kartu Nama 10 Box', 'Brosur 1000 Lembar', 'Spanduk Banner 3 Set'] }], addons: [{ id: 'foil', label: 'Finishing Gold Foil', price: 150000 }, { id: 'sample', label: 'Sample Print Prototype', price: 100000 }] },
  sosmed: { label: 'Social Media Management', packages: [{ title: 'Basic Content Feed', price: 699000, features: ['12 Desain Feed IG/FB', 'Riset Hashtag & Copywriting', 'Report Bulanan'] }, { title: 'Pro Content + Video Reels', price: 1199000, popular: true, features: ['20 Desain Feed IG', '4 Video Reels / TikTok', 'Admin Interactive'] }, { title: 'Full Dominasi Sosmed', price: 1999000, features: ['30 Feed + 8 Video Reels', 'Strategi Campaign Ads', 'Laporan Analisis Riset'] }], addons: [{ id: 'voice', label: 'Voice Over Professional', price: 200000 }, { id: 'ads', label: 'Setup Meta / TikTok Ads', price: 300000 }] }
};

const portfolio = [
  { type: 'web', title: 'PT. Fortuna Poultry Farmindo', tag: 'Web Development', url: 'https://www.fortunapoultry.com/', image: '/assets/img/fortuna-poultry.webp' },
  { type: 'branding', title: 'Luxury Skincare Brand Kit', tag: 'Desain Grafis', image: '/assets/img/skincare-brand.jpg' },
  { type: 'print', title: 'Packaging Box Premium Food', tag: 'Percetakan Custom', image: '/assets/img/packaging-box.jpg' },
  { type: 'web', title: 'MyGold Tokenization', tag: 'Web Development', url: 'https://www.mygoldtokenization.com/', image: '/assets/img/mygold-tokenization.jpg' },
  { type: 'print', title: 'Brosur Lipat 3 Event Pameran', tag: 'Percetakan', image: '/assets/img/brochure-event.jpg' },
  { type: 'branding', title: 'Instagram Feed Fashion House', tag: 'Desain Grafis', image: '/assets/img/fashion-feed.jpg' }
];

const money = (value) => `Rp ${value.toLocaleString('id-ID')}`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState('web');
  const [packageIndex, setPackageIndex] = useState(1);
  const [addons, setAddons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState('all');
  const [faqOpen, setFaqOpen] = useState(0);
  const [seconds, setSeconds] = useState(2 * 3600 + 45 * 60 + 12);
  const [checkout, setCheckout] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const current = calcData[category];
  const selectedPackage = current.packages[packageIndex];
  const total = useMemo(() => selectedPackage.price + current.addons.filter((item) => addons.includes(item.id)).reduce((sum, item) => sum + item.price, 0), [addons, current, selectedPackage]);
  const time = `${String(Math.floor(seconds / 3600)).padStart(2, '0')} : ${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')} : ${String(seconds % 60).padStart(2, '0')}`;

  const chooseCategory = (value) => { setCategory(value); setPackageIndex(1); setAddons([]); };
  const openCheckout = () => { setCheckout({ title: `${current.label} - ${selectedPackage.title}`, total, addons: current.addons.filter((item) => addons.includes(item.id)).map((item) => item.label).join(', ') || 'Tidak ada' }); setModalOpen(true); };
  const sendHeroOrder = () => window.open(waLink(`Halo Tridesain Studio! Saya ingin konsultasi ${current.label}, paket ${selectedPackage.title}. Estimasi ${money(selectedPackage.price)}.`), '_blank');

  return <div className="site-shell">
    <div className="promo"><Sparkles size={15} /> SPECIAL PROMO DISKON 35% + FREE KONSULTASI <span className="timer"><Clock3 size={14} /> {time}</span><button onClick={() => document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth' })}>Klaim Promo Sekarang <ArrowRight size={14} /></button></div>
      <header className="site-header"><a className="brand" href="#top"><img src="/assets/img/logo.png" alt="Tridesain Studio" /></a><nav className={menuOpen ? 'nav open' : 'nav'}>{['layanan', 'kalkulator', 'portofolio', 'keunggulan', 'faq'].map((id) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{id === 'kalkulator' ? 'Hitung Biaya' : id[0].toUpperCase() + id.slice(1)}</a>)}<button className="nav-order" onClick={openCheckout}>Checkout Order</button></nav><button className="menu-button" aria-label="Buka menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header>

    <main id="top">
      <section className="hero"><div className="hero-copy"><span className="eyebrow"><Zap size={14} /> PARTNER BRANDING & DIGITAL STUDIO</span><h1>Tingkatkan penjualan dengan <em>desain dan web</em> yang bekerja lebih cepat.</h1><p>Solusi satu pintu dari desain grafis, percetakan, web development, hingga social media management untuk bisnis yang ingin tampil lebih dipercaya.</p><div className="hero-points"><span><Check /> Pengerjaan 1-3 hari</span><span><Check /> Garansi revisi</span><span><Check /> High resolution</span></div><div className="stats"><div><strong>500+</strong><span>Klien puas</span></div><div><strong>1.200+</strong><span>Projek selesai</span></div><div><strong>4.9/5</strong><span>Rating kepuasan</span></div></div></div><div className="quote-card"><span className="card-label">INSTANT ORDER</span><h2>Hitung & order cepat</h2><p>Pilih layanan dan paket. Estimasi harga langsung siap dikirim ke WhatsApp.</p><label>Layanan utama<select value={category} onChange={(event) => chooseCategory(event.target.value)}>{Object.entries(calcData).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label><label>Paket proyek<div className="mini-packages">{current.packages.map((item, index) => <button key={item.title} className={index === packageIndex ? 'selected' : ''} onClick={() => setPackageIndex(index)}>{item.title}<b>{money(item.price)}</b></button>)}</div></label><div className="price-line"><span>Estimasi promo</span><strong>{money(selectedPackage.price)}</strong></div><button className="primary-button" onClick={sendHeroOrder}><MessageCircle /> Klaim diskon & chat WA</button></div></section>

      <section id="layanan" className="section light"><SectionHeading eyebrow="SOLUSI BISNIS LENGKAP" title="Layanan unggulan Tridesain Studio" text="Kualitas visual modern dan fungsionalitas tinggi untuk meningkatkan kepercayaan calon konsumen." /><div className="service-grid">{services.map(({ id, icon: Icon, title, description, items, featured }) => <article className={featured ? 'service-card featured' : 'service-card'} key={id}>{featured && <span className="popular">PALING LARIS</span>}<div className="service-icon"><Icon /></div><h3>{title}</h3><p>{description}</p><ul>{items.map((item) => <li key={item}><Check /> {item}</li>)}</ul><button onClick={() => { chooseCategory(id); document.getElementById('kalkulator')?.scrollIntoView({ behavior: 'smooth' }); }}>Pilih layanan ini <ArrowRight size={15} /></button></article>)}</div></section>

      <section id="kalkulator" className="section calculator"><SectionHeading eyebrow="SIMULASI BIAYA LIVE" title="Pilih paket yang sesuai dengan skala bisnis Anda" text="Transparan, fleksibel, dan tanpa biaya tersembunyi." light /><div className="calc-panel"><div className="tabs">{Object.entries(calcData).map(([key, value]) => <button className={category === key ? 'active' : ''} key={key} onClick={() => chooseCategory(key)}>{value.label}</button>)}</div><div className="package-grid">{current.packages.map((item, index) => <button className={index === packageIndex ? 'package selected' : 'package'} key={item.title} onClick={() => setPackageIndex(index)}>{item.popular && <span className="popular">POPULER</span>}<h3>{item.title}</h3><strong>{money(item.price)}</strong><ul>{item.features.map((feature) => <li key={feature}><Check /> {feature}</li>)}</ul><span>{index === packageIndex ? 'Paket dipilih' : 'Pilih paket ini'}</span></button>)}</div><div className="addons"><h3>Layanan tambahan</h3><div>{current.addons.map((item) => <label key={item.id}><input type="checkbox" checked={addons.includes(item.id)} onChange={() => setAddons((values) => values.includes(item.id) ? values.filter((value) => value !== item.id) : [...values, item.id])} />{item.label} <b>+{money(item.price)}</b></label>)}</div></div><div className="calc-total"><div><span>Total estimasi investasi promo</span><strong>{money(total)}</strong></div><button className="primary-button" onClick={openCheckout}><ShoppingCart /> Checkout & pesan ke WhatsApp</button></div></div></section>

      <section id="keunggulan" className="section"><SectionHeading eyebrow="KEUNGGULAN UTAMA" title="Mengapa pebisnis memilih Tridesain?" text="Kami menggabungkan visual yang kuat dengan proses yang praktis." /><div className="advantage-grid">{[['Proses cepat', 'Timeline jelas tanpa mengurangi kualitas.', Zap], ['Desain modern', 'Visual diperbarui mengikuti tren pasar digital.', Sparkles], ['Revisi terjamin', 'Penyesuaian minor sampai hasil terasa tepat.', Check], ['Harga transparan', 'Paket dan file disampaikan secara utuh.', Globe]].map(([title, text, Icon]) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section id="portofolio" className="section light"><SectionHeading eyebrow="KARYA TERBARU" title="Portofolio & hasil project" text="Beberapa cara kami membantu brand tampil lebih berkelas." /><div className="filter-row">{['all', 'web', 'branding', 'print'].map((filter) => <button className={portfolioFilter === filter ? 'active' : ''} onClick={() => setPortfolioFilter(filter)} key={filter}>{filter === 'all' ? 'Semua karya' : filter}</button>)}</div><div className="portfolio-grid">{portfolio.filter((item) => portfolioFilter === 'all' || item.type === portfolioFilter).map((item) => <a className="portfolio-card" href={item.url} key={item.title} target="_blank" rel="noreferrer"><img src={item.image} alt={item.title} /><div><span>{item.tag}</span><h3>{item.title}</h3></div></a>)}</div></section>

      <section id="faq" className="section faq-section"><SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering diajukan" /><div className="faq-list">{[['Berapa lama proses pengerjaan?', 'Desain grafis dan landing page standar biasanya selesai 1 hingga 3 hari kerja setelah brief lengkap.'], ['Apakah ada garansi revisi?', 'Ya, semua paket menyertakan garansi revisi minor sampai hasil sesuai konsep brand Anda.'], ['Bagaimana prosedur pemesanan?', 'Pilih paket, chat WhatsApp, diskusikan brief, DP 50%, lalu kami mulai pengerjaan.'], ['Apakah file master diberikan?', 'Tentu. File resolusi tinggi dan master sesuai jenis project akan diserahkan setelah pelunasan.']].map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}>{question}<ChevronDown className={faqOpen === index ? 'rotated' : ''} /></button>{faqOpen === index && <p>{answer}</p>}</div>)}</div></section>
      <section className="closing"><span className="eyebrow">SIAP MENAIKKAN OMSET BISNIS?</span><h2>Konsultasikan proyek Anda sekarang.</h2><p>Dapatkan diskon promo 35% dan konsultasi gratis untuk strategi branding terbaik.</p><a className="primary-button" href={waLink('Halo Tridesain Studio, saya ingin konsultasi layanan branding dan web dengan diskon promo.')} target="_blank" rel="noreferrer"><MessageCircle /> Hubungi Tridesain Studio</a></section>
    </main>

    <footer><div><img src="/assets/img/logo.png" alt="Tridesain Studio" /><p>Partner terpercaya untuk desain grafis, percetakan, web development, dan social media management.</p></div><div><h3>Kontak</h3><p>WhatsApp: 0878-8429-4305</p><p>Instagram: @tridesain.studio</p><p>hello@tridesainstudio.com</p></div></footer>
    <a className="floating-wa" href={waLink('Halo Tridesain Studio, saya ingin tanya-tanya layanan.')} target="_blank" rel="noreferrer" aria-label="Chat WhatsApp"><MessageCircle /></a>

    {modalOpen && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}><div className="modal"><button className="modal-close" onClick={() => setModalOpen(false)}><X /></button><span className="eyebrow">FORM PEMESANAN INSTANT</span><h2>Checkout via WhatsApp</h2><div className="order-summary"><span>{checkout.title}</span><strong>{money(checkout.total)}</strong><small>Add-ons: {checkout.addons}</small></div><form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); window.open(waLink(`FORM CHECKOUT TRIDESAIN STUDIO\nNama: ${data.get('name')}\nWhatsApp: ${data.get('phone')}\nPaket: ${checkout.title}\nTotal: ${money(checkout.total)}\nCatatan: ${data.get('notes') || '-'}`), '_blank'); setModalOpen(false); }}><input name="name" placeholder="Nama / nama bisnis" required /><input name="phone" placeholder="Nomor WhatsApp" required /><textarea name="notes" placeholder="Catatan proyek (opsional)" rows="3" /><button className="primary-button" type="submit"><MessageCircle /> Kirim pesanan ke WhatsApp</button></form></div></div>}
  </div>;
}

function SectionHeading({ eyebrow, title, text, light = false }) { return <div className={light ? 'section-heading light-heading' : 'section-heading'}><span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>; }

export default App;
