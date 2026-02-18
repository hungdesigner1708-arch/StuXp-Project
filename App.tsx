
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Copy, ExternalLink, Sparkles, 
  Send, Users, ChevronRight, 
  Search, ShoppingCart, Star, Check, Zap, 
  BookOpen, Heart, ArrowRight, Tag, ArrowLeft,
  ShieldCheck, Truck, Newspaper, TrendingUp, ChevronLeft, Calendar, Trophy, Plus, ThumbsUp, MapPin, Clock, Share2,
  Palette, Clapperboard, MonitorPlay, Bot, Download, Filter, CreditCard, Mail, Layout, Edit, Trash2, GripVertical,
  HelpCircle, ShieldAlert, Lock
} from 'lucide-react';
import { NAVIGATION_LINKS, ECOSYSTEM, PRODUCTS, EBOOKS, HOT_DEALS, HERO_BANNERS, BRANDS, NEWS_ITEMS, ARTICLES, SECOND_HAND_PRODUCTS, COMPETITIONS, STUDENT_IDEAS, ART_EVENTS } from './constants';
import { Deal, Category, Product, EBook, Article, Competition, StudentIdea, ArtEvent } from './types';

type Page = 'home' | 'product-detail' | 'ebook-detail' | 'category-detail' | 'blog-detail' | 'competition-detail' | 'admin' | 'project-detail';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);
  const [activeShopTab, setActiveShopTab] = useState('ĐIỆN THOẠI');
  
  // States for sub-page interactions
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isEbookPaid, setIsEbookPaid] = useState(false);
  const [marketplaceFilter, setMarketplaceFilter] = useState('Tất cả');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Anti-copy protection for project-detail page
  useEffect(() => {
    if (currentPage === 'project-detail') {
      const preventDefault = (e: Event) => e.preventDefault();
      document.addEventListener('contextmenu', preventDefault);
      document.addEventListener('selectstart', preventDefault);
      document.addEventListener('copy', preventDefault);
      
      return () => {
        document.removeEventListener('contextmenu', preventDefault);
        document.removeEventListener('selectstart', preventDefault);
        document.removeEventListener('copy', preventDefault);
      };
    }
  }, [currentPage]);

  const navigateTo = (page: Page, id: string | null = null, category: Category | null = null) => {
    setCurrentPage(page);
    setActiveId(id);
    setActiveCategory(category);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProduct = PRODUCTS.find(p => p.id === activeId);
  const activeEBook = EBOOKS.find(e => e.id === activeId);
  const activeArticle = Object.values(ARTICLES).flat().find(a => a.id === activeId);
  const activeCompetition = COMPETITIONS.find(c => c.id === activeId);
  const activeProject = STUDENT_IDEAS.find(i => i.id === activeId);

  // --- Components ---

  const Header = () => (
    <header className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 container mx-auto px-4 md:px-6`}>
      <div className={`mx-auto transition-all duration-500 rounded-[24px] ${scrolled || currentPage !== 'home' ? 'glass-header py-3 px-6 shadow-xl border border-white/50' : 'bg-transparent py-4 px-2'}`}>
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-2 group">
              <div className="w-11 h-11 bg-[#2D5BFF] rounded-2xl flex items-center justify-center text-white font-black text-2xl italic shadow-blue-500/40 shadow-lg group-hover:rotate-12 transition-transform">S</div>
              <span className="text-2xl font-black tracking-tighter text-[#2D5BFF] font-heading">StuXP</span>
            </button>
            <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {NAVIGATION_LINKS.map((link) => (
                <button 
                  key={link.label} 
                  onClick={() => navigateTo('category-detail', null, link.label as Category)}
                  className={`px-4 py-2 text-sm font-bold transition-all rounded-xl hover:bg-white hover:shadow-sm whitespace-nowrap ${activeCategory === link.label ? 'text-[#2D5BFF] bg-white shadow-sm' : 'text-slate-700 hover:text-[#2D5BFF]'}`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => navigateTo('admin')}
                className="px-4 py-2 text-sm font-black text-slate-400 hover:text-slate-900 border-l border-slate-200 ml-4 flex items-center gap-2"
              >
                <Layout size={16} /> Admin
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center justify-center w-10 h-10 text-slate-600 hover:bg-white rounded-full transition-all"><Search size={20} /></button>
            <button className="relative p-2.5 text-slate-600 hover:bg-white rounded-xl transition-all"><ShoppingCart size={22} /><span className="absolute top-1 right-1 w-4 h-4 bg-[#FF2D55] text-white text-[10px] font-black rounded-full flex items-center justify-center">3</span></button>
            <button className="lg:hidden p-2 text-slate-600 hover:bg-white rounded-xl transition-all" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </nav>
      </div>
    </header>
  );

  const ProjectDetailView = () => {
    if (!activeProject) return null;
    return (
      <div className="pt-32 pb-24 min-h-screen select-none">
        <div className="container mx-auto px-4 md:px-6">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-400 font-bold mb-12 hover:text-[#FF2D55] transition-all">
            <ArrowLeft size={20} /> Creative Hub
          </button>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl p-12 space-y-10 relative overflow-hidden">
              {/* Protected Badge Overlay */}
              <div className="absolute top-12 right-12 flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-[0_10px_30px_rgba(45,91,255,0.4)] animate-bounce">
                <ShieldCheck size={24} />
                <span className="text-[11px] font-black uppercase tracking-widest">StuXP Protected</span>
              </div>

              <div className="space-y-6">
                <div className="flex gap-2">
                  {activeProject.tags.map(t => (
                    <span key={t} className="px-4 py-1.5 bg-red-50 text-[#FF2D55] rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100">{t}</span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-950 font-heading leading-tight tracking-tighter uppercase">
                  {activeProject.title}
                </h1>
                <div className="flex items-center gap-6 py-8 border-y border-slate-50">
                   <div className="w-16 h-16 bg-[#FF2D55] rounded-2xl flex items-center justify-center text-white font-black italic text-2xl">
                     {activeProject.author.charAt(0)}
                   </div>
                   <div>
                     <p className="text-slate-900 font-black text-lg">{activeProject.author}</p>
                     <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">StuXP Innovator</p>
                   </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 italic text-xl text-slate-600 leading-relaxed relative">
                  <span className="text-8xl text-slate-200 absolute -top-4 -left-2 opacity-50 font-serif">"</span>
                  <p className="relative z-10">{activeProject.excerpt}</p>
                </div>

                <div className="prose prose-xl max-w-none text-slate-700 space-y-8 font-medium leading-relaxed">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Chi tiết dự án</h3>
                   <p>Đây là một giải pháp đột phá được thiết kế nhằm tối ưu hóa trải nghiệm của cộng đồng sinh viên. Ý tưởng tập trung vào việc tận dụng công nghệ AI và mô hình kinh tế chia sẻ để tạo ra giá trị thực cho người dùng cuối.</p>
                   <p>Dự án hiện đang trong giai đoạn kêu gọi đầu tư và đấu nối với các đối tác chiến lược của StuXP. Mọi thông tin chi tiết về cơ chế vận hành, thuật toán và mô hình kinh doanh đã được mã hóa và bảo mật tại hệ thống StuXP Cloud.</p>
                </div>
              </div>

              <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                   <button className="flex items-center gap-3 px-8 py-4 bg-slate-50 text-slate-400 hover:text-[#FF2D55] rounded-2xl transition-all font-black uppercase text-xs tracking-widest">
                     <ThumbsUp size={20} /> {activeProject.votes} Upvotes
                   </button>
                   <button className="flex items-center gap-3 px-8 py-4 bg-slate-50 text-slate-400 hover:text-blue-500 rounded-2xl transition-all font-black uppercase text-xs tracking-widest">
                     <Share2 size={20} /> Share
                   </button>
                </div>
                <button className="px-12 py-6 bg-slate-950 text-white font-black rounded-3xl hover:bg-[#FF2D55] transition-all uppercase tracking-widest text-xs shadow-2xl flex items-center gap-3">
                   <Bot size={20} /> Thảo luận với tác giả
                </button>
              </div>

              <div className="mt-12 bg-blue-50/50 p-8 rounded-[40px] border border-blue-100 flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <Lock size={28} />
                </div>
                <p className="text-xs text-blue-800 font-bold leading-relaxed uppercase tracking-wide">
                  Nội dung này đã được StuXP xác thực quyền sở hữu trí tuệ. <br /> Hành vi sao chép trái phép sẽ bị truy cứu theo chính sách bảo hộ của StuXP.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const IdeaFormModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="bg-[#FF2D55] p-10 text-white relative">
          <button onClick={() => setShowIdeaModal(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-all"><X size={32} /></button>
          <h2 className="text-3xl font-black uppercase tracking-tight">Đề xuất ý tưởng</h2>
          <p className="text-white/80 font-bold mt-2">Đồng hành cùng StuXP Creative Space</p>
        </div>
        <form className="p-10 space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Đã gửi ý tưởng!'); setShowIdeaModal(false); }}>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Tiêu đề ý tưởng</label>
            <input required type="text" placeholder="Tên dự án hoặc ý tưởng của bạn" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#FF2D55] outline-none font-bold" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Ngành hàng</label>
              <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold">
                <option>EdTech</option>
                <option>FinTech</option>
                <option>F&B</option>
                <option>Sustainability</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Tác giả</label>
              <input required type="text" placeholder="Họ tên của bạn" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#FF2D55] outline-none font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Mô tả chi tiết</label>
            <textarea rows={4} placeholder="Hãy cho chúng tôi biết ý tưởng của bạn có gì đặc biệt..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-[#FF2D55] outline-none font-bold resize-none"></textarea>
          </div>
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-4">
            <ShieldCheck className="text-blue-500 shrink-0" size={24} />
            <p className="text-xs text-blue-800 font-bold leading-relaxed">
              <span className="uppercase block mb-1">Cơ chế bảo mật StuXP:</span>
              Ý tưởng của bạn sẽ được StuXP đăng ký bảo hộ quyền tác giả tạm thời và bảo vệ thông tin trước khi đấu nối với các đối tác đầu tư.
            </p>
          </div>
          <button type="submit" className="w-full py-5 bg-[#FF2D55] text-white font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-all uppercase tracking-widest text-sm">Gửi đề xuất ngay</button>
        </form>
      </div>
    </div>
  );

  const PaymentModal = ({ title, price, onSuccess }: { title: string, price: number | string, onSuccess: () => void }) => {
    const [voucher, setVoucher] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePay = () => {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);
        onSuccess();
      }, 2000);
    };

    if (paymentSuccess) {
      return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="bg-white rounded-[56px] p-16 text-center space-y-8 max-w-md animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-[#39FF14] text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(57,255,20,0.5)]"><Check size={48} /></div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Thanh toán thành công!</h2>
            <p className="text-slate-500 font-bold leading-relaxed">Thông tin chi tiết và vé/file đã được gửi về email của bạn để verify với Ban tổ chức.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setPaymentSuccess(false); setShowPaymentModal(false); }} className="w-full py-5 bg-slate-950 text-white font-black rounded-2xl uppercase tracking-widest text-xs">Hoàn tất</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl">
          <div className="p-10 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-2xl font-black uppercase">Thanh toán</h3>
            <button onClick={() => setShowPaymentModal(false)}><X /></button>
          </div>
          <div className="p-10 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sản phẩm</p>
                <p className="text-xl font-black text-slate-900">{title}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tổng cộng</p>
                <p className="text-2xl font-black text-[#2D5BFF]">{typeof price === 'number' ? `${price.toLocaleString()}đ` : price}</p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mã giảm giá / Voucher</label>
              <div className="flex gap-2">
                <input type="text" value={voucher} onChange={e => setVoucher(e.target.value)} placeholder="STUXP10" className="flex-grow bg-slate-50 border-2 border-slate-100 rounded-xl px-6 py-4 font-bold outline-none focus:border-blue-500" />
                <button className="px-6 bg-slate-100 text-slate-900 font-black rounded-xl text-xs">ÁP DỤNG</button>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Thông tin người nhận</label>
              <input type="email" placeholder="email-cua-ban@gmail.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-6 py-4 font-bold outline-none focus:border-blue-500" />
            </div>
            <button 
              onClick={handlePay} 
              disabled={isProcessing}
              className="w-full py-6 bg-[#2D5BFF] text-white font-black rounded-[24px] shadow-2xl flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-50"
            >
              {isProcessing ? <Bot className="animate-spin" /> : <CreditCard />} {isProcessing ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN THANH TOÁN'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AdminDashboard = () => {
    const [widgets, setWidgets] = useState([
      { id: '1', name: 'Banner Hero', type: 'Slider', status: 'Active' },
      { id: '2', name: 'Hot Deals Grid', type: 'Voucher', status: 'Active' },
      { id: '3', name: 'Ecosystem 7 Universes', type: 'Grid', status: 'Active' },
      { id: '4', name: 'Marketplace View', type: 'Shop', status: 'Active' },
    ]);

    return (
      <div className="pt-32 pb-24 min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <h1 className="text-5xl font-black uppercase font-heading tracking-tighter">StuXP <span className="text-[#2D5BFF]">Dashboard</span></h1>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white border-2 border-slate-200 rounded-2xl font-black text-xs uppercase flex items-center gap-2"><Plus size={16} /> Thêm Widget</button>
              <button className="px-8 py-4 bg-[#2D5BFF] text-white rounded-2xl font-black text-xs uppercase shadow-xl">Đăng bài viết mới</button>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-10">
            <aside className="lg:col-span-1 space-y-4">
               <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quản lý chính</h4>
                  <nav className="flex flex-col gap-2">
                    {['Widgets', 'Sản phẩm', 'Bài viết', 'Ý tưởng', 'Giao dịch', 'Cấu hình SEO'].map(item => (
                      <button key={item} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${item === 'Widgets' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>{item}</button>
                    ))}
                  </nav>
               </div>
            </aside>
            <main className="lg:col-span-3 space-y-8">
               <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black uppercase">Trình kéo thả Widget</h3>
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100">Live Preview</span>
                  </div>
                  <div className="space-y-4">
                    {widgets.map(w => (
                      <div key={w.id} className="group flex items-center justify-between p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl hover:border-blue-400 hover:bg-white transition-all cursor-move">
                        <div className="flex items-center gap-6">
                           <GripVertical className="text-slate-300 group-hover:text-blue-400" />
                           <div>
                             <p className="font-black text-slate-900">{w.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{w.type}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="p-3 bg-white text-slate-400 hover:text-blue-500 rounded-xl shadow-sm"><Edit size={16} /></button>
                          <button className="p-3 bg-white text-slate-400 hover:text-red-500 rounded-xl shadow-sm"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { label: 'Doanh thu tháng', value: '45.2M', icon: <TrendingUp className="text-blue-500" /> },
                   { label: 'Ý tưởng mới', value: '12', icon: <Sparkles className="text-amber-500" /> },
                   { label: 'Thanh toán chờ', value: '08', icon: <CreditCard className="text-[#FF2D55]" /> }
                 ].map(stat => (
                   <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between">
                     <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p><p className="text-3xl font-black">{stat.value}</p></div>
                     <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">{stat.icon}</div>
                   </div>
                 ))}
               </div>
            </main>
          </div>
        </div>
      </div>
    );
  };

  const CategoryDetailView = () => {
    if (!activeCategory) return null;

    // --- universe-specific renderers ---

    const renderLifestyle = () => (
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {ARTICLES[Category.LOI_SONG]?.map(article => (
            <div key={article.id} onClick={() => navigateTo('blog-detail', article.id)} className="bg-white rounded-[48px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all group cursor-pointer">
              <img src={article.thumbnail} className="w-full aspect-video object-cover" />
              <div className="p-10 space-y-6">
                 <div className="flex items-center gap-4 text-xs font-black uppercase text-[#2D5BFF] tracking-widest"><Calendar size={14} /> {article.date}</div>
                 <h2 className="text-3xl font-black leading-tight group-hover:text-[#2D5BFF] transition-colors">{article.title}</h2>
                 <p className="text-slate-500 text-lg">{article.excerpt}</p>
                 <div className="pt-6 border-t border-slate-50 flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest">Đọc bài viết <ArrowRight size={16} /></div>
              </div>
            </div>
          ))}
        </div>
        <aside className="lg:col-span-4 space-y-10">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest mb-8 border-l-4 border-blue-500 pl-4">Chủ đề lối sống</h3>
             <nav className="flex flex-col gap-4">
               {['Sức khỏe Gen Z', 'Quản lý tài chính', 'Mẹo vặt KTX', 'Thời trang bền vững', 'Tâm lý học đường'].map(topic => (
                 <button key={topic} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 font-bold text-slate-600 transition-all">
                   {topic} <ChevronRight size={16} />
                 </button>
               ))}
             </nav>
          </div>
          <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden">
             <Bot className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32" />
             <h3 className="text-xl font-black uppercase leading-tight">Gợi ý bài viết cho bạn</h3>
             <div className="space-y-6">
                {NEWS_ITEMS.slice(0, 3).map(item => (
                  <button key={item.id} onClick={() => navigateTo('blog-detail', item.id)} className="flex gap-4 group text-left">
                    <img src={item.thumbnail} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <p className="text-sm font-bold group-hover:text-blue-400 transition-colors line-clamp-2">{item.title}</p>
                  </button>
                ))}
             </div>
          </div>
        </aside>
      </div>
    );

    const renderCreative = () => (
      <div className="space-y-16">
        <div className="bg-[#FF2D55] p-12 rounded-[56px] text-white flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Creative Hub <br />& Idea Showcase</h2>
              <p className="text-white/80 font-medium max-w-lg">Cộng đồng hỗ trợ và bảo hộ quyền tác giả cho các ý tưởng đột phá của sinh viên.</p>
           </div>
           <button onClick={() => setShowIdeaModal(true)} className="px-10 py-5 bg-[#39FF14] text-slate-950 font-black rounded-2xl uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
             <Plus size={20} /> Đề xuất ý tưởng
           </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {STUDENT_IDEAS.map(idea => (
            <div key={idea.id} onClick={() => navigateTo('project-detail', idea.id)} className="bg-white p-10 rounded-[48px] border-2 border-slate-50 hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-8">
                 <div className="flex gap-2">{idea.tags.map(t => <span key={t} className="px-3 py-1 bg-red-50 text-[#FF2D55] rounded-lg text-[10px] font-black uppercase">{t}</span>)}</div>
                 {idea.isProtected && <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase bg-blue-50 px-3 py-1 rounded-lg border border-blue-100"><ShieldCheck size={14} /> Đã được bảo hộ</div>}
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-[#FF2D55] transition-colors">{idea.title}</h3>
              <p className="text-slate-500 font-medium italic">"{idea.excerpt}"</p>
              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                <span className="font-black text-xs uppercase text-slate-400">Tác giả: {idea.author}</span>
                <button className="flex items-center gap-2 text-[#FF2D55] font-black"><ThumbsUp size={18} /> {idea.votes}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    const renderArt = () => (
      <div className="space-y-12">
        <div className="flex justify-between items-end mb-12">
           <h2 className="text-5xl font-black uppercase tracking-tighter">Art & Concert <br /><span className="text-[#2D5BFF]">Tickets</span></h2>
           <button className="text-blue-500 font-black uppercase text-xs tracking-widest flex items-center gap-2 underline underline-offset-4">Cách thức nhận vé <HelpCircle size={16} /></button>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {ART_EVENTS.map(event => (
            <div key={event.id} className="bg-white rounded-[56px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col lg:flex-row group">
              <div className="lg:w-1/3 overflow-hidden"><img src={event.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
              <div className="lg:w-2/3 p-10 flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black leading-tight group-hover:text-[#2D5BFF] transition-colors">{event.title}</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-3 text-slate-500 font-bold text-sm uppercase tracking-tight"><Calendar size={18} /> {event.date}</p>
                    <p className="flex items-center gap-3 text-slate-500 font-bold text-sm uppercase tracking-tight"><MapPin size={18} /> {event.location}</p>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-3xl font-black text-slate-900">{typeof event.price === 'number' ? `${event.price.toLocaleString()}đ` : event.price}</span>
                  <button onClick={() => setShowPaymentModal(true)} className="px-10 py-5 bg-[#2D5BFF] text-white font-black rounded-3xl uppercase tracking-widest text-xs hover:bg-slate-950 transition-all shadow-xl">Đặt vé</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showPaymentModal && <PaymentModal title="Vé Concert: Hoàng Dũng" price={850000} onSuccess={() => {}} />}
      </div>
    );

    const renderMarketplace = () => (
      <div className="grid lg:grid-cols-4 gap-12 items-start">
        <aside className="lg:col-span-1 space-y-8 bg-white p-8 rounded-[40px] border border-slate-100 sticky top-32">
           <div className="space-y-6">
             <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Bộ lọc ngành hàng</h4>
             <div className="flex flex-col gap-3">
               {['Tất cả', 'Sách', 'Phụ kiện', 'Đồ điện tử', 'Thời trang'].map(cat => (
                 <button 
                  key={cat} 
                  onClick={() => setMarketplaceFilter(cat)}
                  className={`text-left px-5 py-3 rounded-2xl font-bold transition-all ${marketplaceFilter === cat ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>
           <div className="space-y-6">
             <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Giá sản phẩm</h4>
             <input type="range" className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" />
             <div className="flex justify-between text-xs font-black text-slate-400"><span>0đ</span><span>2,000,000đ</span></div>
           </div>
        </aside>
        <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
           {SECOND_HAND_PRODUCTS.filter(p => marketplaceFilter === 'Tất cả' || p.subCategory === marketplaceFilter).map(product => (
             <div key={product.id} className="bg-white rounded-[32px] p-6 border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer shadow-sm">
                <div className="relative rounded-2xl overflow-hidden aspect-square mb-6">
                   <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4 px-3 py-1 bg-[#39FF14] text-slate-950 text-[10px] font-black rounded-lg">Đồ cũ</div>
                </div>
                <div className="space-y-3 flex-grow">
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{product.subCategory}</p>
                   <h3 className="font-bold text-slate-900 group-hover:text-emerald-500 transition-colors line-clamp-2">{product.name}</h3>
                   <p className="text-2xl font-black text-emerald-600 pt-2">{product.price.toLocaleString()}đ</p>
                </div>
                <div className="pt-6 border-t border-slate-50 mt-6 flex items-center justify-between">
                   <div className="flex items-center gap-2"><Users size={14} className="text-slate-300" /> <span className="text-[10px] font-bold text-slate-400">{product.sponsor}</span></div>
                   <button className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><ShoppingCart size={16} /></button>
                </div>
             </div>
           ))}
        </div>
      </div>
    );

    const renderStudent = () => (
      <div className="space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
           <h2 className="text-5xl font-black uppercase tracking-tighter">Sinh viên <span className="text-[#2D5BFF]">Universe</span></h2>
           <p className="text-slate-500 font-bold text-xl">Tổng hợp các cuộc thi, học bổng và cơ hội nghề nghiệp tiêu chuẩn cho thế hệ rực rỡ.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {COMPETITIONS.map(comp => (
            <div key={comp.id} onClick={() => navigateTo('competition-detail', comp.id)} className="bg-white rounded-[40px] p-8 border border-slate-100 hover:shadow-2xl transition-all group cursor-pointer flex flex-col">
              <div className="relative aspect-video rounded-[30px] overflow-hidden mb-8">
                <img src={comp.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className={`absolute top-6 left-6 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${comp.status === 'Ongoing' ? 'bg-[#39FF14] text-slate-950' : 'bg-blue-500 text-white'}`}>{comp.status}</div>
              </div>
              <div className="space-y-4 flex-grow">
                 <div className="flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-widest"><Trophy size={16} /> Giải thưởng: {comp.prize}</div>
                 <h3 className="text-2xl font-black leading-tight group-hover:text-[#2D5BFF] transition-colors">{comp.title}</h3>
                 <p className="text-slate-500 font-medium line-clamp-2">{comp.description}</p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between text-slate-400 font-black text-[10px] uppercase tracking-widest">
                <span>By: {comp.organizer}</span>
                <span className="flex items-center gap-2"><Clock size={14} /> DL: {comp.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    const renderElearning = () => (
      <div className="space-y-16">
        <div className="bg-slate-900 p-16 rounded-[72px] text-white flex flex-col md:flex-row items-center gap-20">
           <div className="lg:w-2/3 space-y-8">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none font-heading">Digital <br /><span className="text-blue-500">Library</span></h2>
              <p className="text-slate-400 text-2xl font-medium leading-relaxed">Nâng tầm kiến thức học thuật với hệ thống tài liệu và Ebook được StuXP đấu nối độc quyền.</p>
           </div>
           <div className="lg:w-1/3 w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] text-center space-y-6">
              <BookOpen size={48} className="mx-auto text-blue-500" />
              <p className="text-xl font-black uppercase tracking-tight">KHO EBOOK CAO CẤP</p>
              <p className="text-slate-400 text-sm font-medium">Sở hữu tài liệu chuyên sâu chỉ với vài lần chạm.</p>
           </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
           {EBOOKS.map(ebook => (
             <div key={ebook.id} onClick={() => navigateTo('ebook-detail', ebook.id)} className="bg-white rounded-[40px] p-8 border border-slate-100 hover:shadow-2xl transition-all cursor-pointer group">
                <div className="relative aspect-[3/4] rounded-[30px] overflow-hidden mb-8 shadow-2xl">
                   <img src={ebook.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl uppercase text-[10px] tracking-widest">Xem chi tiết</button>
                   </div>
                </div>
                <h3 className="text-xl font-black mb-2 leading-tight group-hover:text-blue-500 transition-colors">{ebook.title}</h3>
                <div className="flex items-center justify-between">
                   <span className="text-2xl font-black text-blue-600">{ebook.price.toLocaleString()}đ</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ebook.author}</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    );

    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-slate-400 font-bold mb-12 hover:text-slate-900 transition-all">
            <ArrowLeft size={20} /> Trang chủ
          </button>
          
          {activeCategory === Category.VAN_HOA || activeCategory === Category.LOI_SONG ? renderLifestyle() : null}
          {activeCategory === Category.SANG_TAO ? renderCreative() : null}
          {activeCategory === Category.NGHE_THUAT ? renderArt() : null}
          {activeCategory === Category.CHO_CU ? renderMarketplace() : null}
          {activeCategory === Category.SINH_VIEN ? renderStudent() : null}
          {activeCategory === Category.HOC_HANH ? renderElearning() : null}
        </div>
      </div>
    );
  };

  const CompetitionDetailView = () => (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-400 font-bold mb-12"><ArrowLeft size={20} /> Quay lại</button>
        <div className="max-w-4xl mx-auto space-y-12">
           <img src={activeCompetition?.thumbnail} className="w-full aspect-video object-cover rounded-[56px] shadow-2xl border-8 border-white" />
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="px-6 py-2 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-blue-100">{activeCompetition?.status}</span>
                 <span className="text-slate-400 font-black uppercase text-xs tracking-widest flex items-center gap-2"><Trophy size={16} /> {activeCompetition?.prize}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight font-heading">{activeCompetition?.title}</h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">{activeCompetition?.description}</p>
           </div>
           <div className="p-12 bg-white rounded-[56px] border border-slate-100 shadow-xl space-y-8">
              <h3 className="text-2xl font-black uppercase">Thông tin chi tiết</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đơn vị tổ chức</p><p className="font-bold text-slate-900">{activeCompetition?.organizer}</p></div>
                <div className="space-y-2"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hạn chót đăng ký</p><p className="font-bold text-slate-900">{activeCompetition?.deadline}</p></div>
                <div className="space-y-2"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Địa điểm</p><p className="font-bold text-slate-900">Toàn quốc / Hybrid</p></div>
              </div>
              <a href={activeCompetition?.link} target="_blank" rel="noopener noreferrer" className="w-full py-6 bg-slate-950 text-white font-black rounded-[32px] flex items-center justify-center gap-4 hover:bg-[#2D5BFF] transition-all uppercase tracking-widest text-sm shadow-2xl">Đăng ký tham gia ngay <ExternalLink size={20} /></a>
           </div>
        </div>
      </div>
    </div>
  );

  const EBookDetailView = () => (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-400 font-bold mb-12"><ArrowLeft size={20} /> Quay lại</button>
        <div className="grid lg:grid-cols-12 gap-20 items-start">
           <div className="lg:col-span-5"><img src={activeEBook?.cover} className="w-full aspect-[3/4] object-cover rounded-[48px] shadow-3xl border-8 border-white" /></div>
           <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <p className="text-[#2D5BFF] font-black uppercase tracking-[0.3em] text-xs">{activeEBook?.author}</p>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase font-heading">{activeEBook?.title}</h1>
                <p className="text-2xl text-slate-500 font-medium leading-relaxed italic">"{activeEBook?.description}"</p>
              </div>
              
              <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl space-y-8">
                 <div className="flex justify-between items-center">
                    <span className="text-4xl font-black text-slate-900">{activeEBook?.price.toLocaleString()}đ</span>
                    <span className="text-emerald-500 font-black uppercase text-xs tracking-widest flex items-center gap-2"><Check size={16} /> Luôn khả dụng</span>
                 </div>
                 {!isEbookPaid ? (
                   <button onClick={() => setShowPaymentModal(true)} className="w-full py-6 bg-[#2D5BFF] text-white font-black rounded-[32px] uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all">Mua Ebook ngay</button>
                 ) : (
                   <a href={activeEBook?.downloadUrl} className="w-full py-6 bg-emerald-500 text-white font-black rounded-[32px] uppercase tracking-widest text-sm shadow-2xl flex items-center justify-center gap-4 animate-in slide-in-from-bottom duration-500"><Download size={20} /> Tải xuống file (PDF)</a>
                 )}
                 <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest"><Mail size={16} /> Hỗ trợ nhận file qua email 24/7</div>
              </div>
           </div>
        </div>
      </div>
      {showPaymentModal && <PaymentModal title={activeEBook?.title || ''} price={activeEBook?.price || 0} onSuccess={() => setIsEbookPaid(true)} />}
    </div>
  );

  const BlogDetailView = () => {
    if (!activeArticle) return null;
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-400 font-bold mb-12"><ArrowLeft size={20} /> Quay lại</button>
          <div className="max-w-4xl mx-auto space-y-12">
             <div className="space-y-6">
                <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest">{activeArticle.tag}</span>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight font-heading">{activeArticle.title}</h1>
                <div className="flex items-center gap-6 py-8 border-y border-slate-100">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black italic">S</div>
                  <div><p className="font-black text-slate-900">{activeArticle.author || 'StuXP Editor'}</p><p className="text-xs font-bold text-slate-400">{activeArticle.date} • 5 phút đọc</p></div>
                </div>
             </div>
             <img src={activeArticle.thumbnail} className="w-full h-auto rounded-[56px] shadow-2xl" />
             <div className="prose prose-xl max-w-none text-slate-700 font-medium leading-relaxed space-y-8">
               {activeArticle.content?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
             </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Component to display product details when a user clicks on a product.
   */
  const ProductDetailView = () => {
    if (!activeProduct) return null;
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-400 font-bold mb-12"><ArrowLeft size={20} /> Quay lại</button>
          <div className="grid lg:grid-cols-12 gap-20 items-start">
             <div className="lg:col-span-6"><img src={activeProduct.image} className="w-full aspect-square object-cover rounded-[56px] shadow-3xl border-8 border-white" /></div>
             <div className="lg:col-span-6 space-y-12">
                <div className="space-y-6">
                  <p className="text-[#2D5BFF] font-black uppercase tracking-[0.3em] text-xs">Sponsor: {activeProduct.sponsor}</p>
                  <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase font-heading">{activeProduct.name}</h1>
                  <div className="flex items-center gap-6">
                    <span className="text-5xl font-black text-slate-950">{activeProduct.price.toLocaleString()}đ</span>
                    {activeProduct.originalPrice && <span className="text-2xl text-slate-400 line-through font-bold">{activeProduct.originalPrice.toLocaleString()}đ</span>}
                  </div>
                </div>
                
                <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl space-y-8">
                   <div className="grid grid-cols-2 gap-8">
                      <div className="flex items-center gap-4"><Truck className="text-blue-500" /> <span className="font-bold text-sm">Giao hàng 2h</span></div>
                      <div className="flex items-center gap-4"><ShieldCheck className="text-blue-500" /> <span className="font-bold text-sm">Bảo hành 12th</span></div>
                   </div>
                   <button onClick={() => alert('Đã thêm vào giỏ hàng!')} className="w-full py-6 bg-[#2D5BFF] text-white font-black rounded-[32px] uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4"><ShoppingCart /> THÊM VÀO GIỎ HÀNG</button>
                   <button onClick={() => setShowPaymentModal(true)} className="w-full py-6 bg-slate-950 text-white font-black rounded-[32px] uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all">MUA NGAY</button>
                </div>
             </div>
          </div>
        </div>
        {showPaymentModal && <PaymentModal title={activeProduct.name} price={activeProduct.price} onSuccess={() => {}} />}
      </div>
    );
  };

  /**
   * Section for the homepage showing the ecosystem item grid.
   */
  const EcosystemGrid = () => (
    <section className="py-24 container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {ECOSYSTEM.map((item) => (
          <button 
            key={item.id} 
            onClick={() => navigateTo('category-detail', null, item.title as Category)}
            className="flex flex-col items-center gap-6 p-8 bg-white rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all group"
          >
            <span className="text-4xl group-hover:scale-125 transition-transform">{item.icon}</span>
            <div className="text-center">
              <p className="font-black text-xs uppercase tracking-widest text-slate-900">{item.title}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );

  /**
   * Component for managing product categories and displaying products in tabs on the homepage.
   */
  const MarketplaceTabs = () => {
    const tabs = ['ĐIỆN THOẠI', 'LAPTOP', 'PHỤ KIỆN', 'SÁCH'];
    return (
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase font-heading">SHOP <span className="text-[#2D5BFF]">SINH VIÊN</span></h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {tabs.map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveShopTab(tab)}
                  className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeShopTab === tab ? 'bg-slate-950 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {PRODUCTS.map(product => (
              <div key={product.id} onClick={() => navigateTo('product-detail', product.id)} className="bg-white rounded-[40px] p-8 border border-slate-100 hover:shadow-2xl transition-all group cursor-pointer flex flex-col">
                <div className="relative aspect-square rounded-[30px] overflow-hidden mb-8">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Sponsor: {product.sponsor}</div>
                </div>
                <div className="space-y-4 flex-grow">
                   <h3 className="text-xl font-black leading-tight group-hover:text-[#2D5BFF] transition-colors">{product.name}</h3>
                   <div className="flex items-center gap-4">
                     <span className="text-2xl font-black text-slate-950">{product.price.toLocaleString()}đ</span>
                     {product.originalPrice && <span className="text-sm text-slate-400 line-through font-bold">{product.originalPrice.toLocaleString()}đ</span>}
                   </div>
                </div>
                <button className="mt-8 w-full py-4 bg-slate-50 text-slate-900 font-black rounded-2xl group-hover:bg-[#2D5BFF] group-hover:text-white transition-all uppercase text-[10px] tracking-widest">Xem chi tiết</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  /**
   * Section that displays the latest trending news/articles on the homepage.
   */
  const HotNewsSection = () => (
    <section className="py-24 container mx-auto px-4 md:px-6">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase font-heading">TIN TỨC <span className="text-[#FF2D55]">NỔI BẬT</span></h2>
        <button className="text-[#FF2D55] font-black uppercase text-xs tracking-widest flex items-center gap-2 underline underline-offset-4">XEM TẤT CẢ <ArrowRight size={16} /></button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {NEWS_ITEMS.slice(0, 3).map(article => (
          <div key={article.id} onClick={() => navigateTo('blog-detail', article.id)} className="group cursor-pointer space-y-8">
            <div className="aspect-[16/10] rounded-[48px] overflow-hidden border border-slate-100">
              <img src={article.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
            </div>
            <div className="space-y-4 px-4">
              <div className="flex items-center gap-4 text-[10px] font-black uppercase text-[#FF2D55] tracking-[0.2em]">{article.tag} • {article.date}</div>
              <h3 className="text-2xl font-black leading-tight group-hover:underline underline-offset-8">{article.title}</h3>
              <p className="text-slate-500 font-medium line-clamp-2">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const AIPerks = () => {
    const premiumPlatforms = [
      { name: 'ChatGPT Plus', icon: <Bot className="text-emerald-400" size={24} />, tag: 'AI Assist' },
      { name: 'Canva Pro', icon: <Palette className="text-blue-400" size={24} />, tag: 'Design' },
      { name: 'Capcut Pro', icon: <Clapperboard className="text-white" size={24} />, tag: 'Editor' },
      { name: 'Midjourney', icon: <Sparkles className="text-orange-400" size={24} />, tag: 'Generative' },
    ];

    return (
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden rounded-[60px] mx-4 md:mx-10 my-10">
        <div className="container mx-auto px-10 relative z-10 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-7xl font-black font-heading tracking-tighter leading-none uppercase">
              VŨ TRỤ ĐẶC QUYỀN <span className="text-[#39FF14]">PREMIUM</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              StuXP đồng hành cùng Gen Z bứt phá. Nhận ngay quyền truy cập các nền tảng hỗ trợ học tập và sáng tạo đỉnh cao hoàn toàn miễn phí.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {premiumPlatforms.map((p, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[32px] flex flex-col items-center gap-4 hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">{p.icon}</div>
                <div className="text-center"><p className="text-xs font-black uppercase tracking-tight">{p.name}</p><p className="text-[10px] text-white/40 font-bold uppercase">{p.tag}</p></div>
              </div>
            ))}
          </div>
          <div className="max-w-xl mx-auto space-y-6 pt-4">
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); alert('Claim thành công!'); }}>
              <input type="email" placeholder="Nhập email sinh viên của bạn (@edu.vn)" className="flex-grow bg-slate-900 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#39FF14] font-bold text-slate-100 text-sm" />
              <button className="px-10 py-5 bg-[#39FF14] text-slate-950 font-black rounded-2xl hover:scale-105 transition-all uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(57,255,20,0.3)] whitespace-nowrap">CLAIM ALL PERKS</button>
            </form>
          </div>
        </div>
      </section>
    );
  };

  const Footer = () => (
    <footer className="bg-slate-950 pt-32 pb-16 text-white rounded-t-[80px] mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
          <div className="lg:col-span-2 space-y-12">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-5 group"><div className="w-16 h-16 bg-[#2D5BFF] rounded-[24px] flex items-center justify-center text-white font-black text-4xl italic shadow-2xl">S</div><span className="text-5xl font-black tracking-tighter text-white font-heading">StuXP</span></button>
            <p className="text-slate-400 font-bold leading-relaxed text-xl italic max-w-sm">"Kiến tạo tương lai rực rỡ cùng hệ sinh thái đa nhiệm số 1 cho sinh viên Việt Nam."</p>
          </div>
          <div><h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-12">VŨ TRỤ STUXP</h4><ul className="space-y-6">{NAVIGATION_LINKS.map(link => (<li key={link.label}><button onClick={() => navigateTo('category-detail', null, link.label as Category)} className="text-slate-300 hover:text-white font-black transition-all text-[11px] uppercase tracking-[0.2em]">{link.label}</button></li>))}</ul></div>
          <div><h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-12">HỖ TRỢ & PHÁP LÝ</h4><ul className="space-y-6">{['Cơ chế bảo mật', 'Chính sách đổi trả', 'Điều khoản sử dụng', 'Liên hệ hợp tác'].map(item => (<li key={item}><a href="#" className="text-slate-300 hover:text-white font-black transition-all text-[11px] uppercase tracking-[0.2em]">{item}</a></li>))}</ul></div>
          <div><div className="bg-gradient-to-br from-[#2D5BFF] to-indigo-700 p-10 rounded-[48px] text-white shadow-3xl space-y-6"><p className="font-black text-2xl leading-none">Stu-Buddy AI</p><p className="text-blue-100 font-medium text-xs leading-relaxed">Trợ lý săn deal và học tập 24/7 dành riêng cho bạn.</p><button className="w-full py-4 bg-white text-[#2D5BFF] font-black rounded-2xl uppercase text-[10px] tracking-[0.3em] hover:bg-[#39FF14] hover:text-slate-900 transition-all">CHAT NGAY</button></div></div>
        </div>
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
          <p>© 2024 STUXP ECOSYSTEM. ALL RIGHTS RESERVED.</p>
          <p>DESIGNED & OPERATED BY STUXP TEAM</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="transition-all duration-500">
        {currentPage === 'home' && (
          <>
            <section className="relative h-[80vh] md:h-[90vh] overflow-hidden pt-20">
               {HERO_BANNERS.map((banner, idx) => (
                 <div key={banner.id} className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${idx === currentBannerIdx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                   <div className="absolute inset-0 bg-black/40 z-10"></div>
                   <img src={banner.image} className="w-full h-full object-cover" alt={banner.title} />
                   <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
                     <div className="max-w-4xl space-y-8">
                       <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter font-heading uppercase drop-shadow-2xl">{banner.title}</h1>
                       <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-bold">{banner.subtitle}</p>
                       <button className={`px-12 py-6 bg-white text-slate-900 font-black rounded-[24px] shadow-2xl uppercase tracking-widest text-sm`}>{banner.cta}</button>
                     </div>
                   </div>
                 </div>
               ))}
            </section>
            <EcosystemGrid />
            <MarketplaceTabs />
            <HotNewsSection />
            <section className="py-24 bg-white border-y border-slate-100">
              <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase font-heading">HOT DEALS <span className="text-[#2D5BFF]">SINH VIÊN</span></h2>
                  <button className="px-10 py-5 bg-white text-[#2D5BFF] font-black rounded-3xl border-2 border-blue-100 uppercase text-xs tracking-widest shadow-xl">TẤT CẢ ƯU ĐÃI</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {HOT_DEALS.map(deal => (
                    <div key={deal.id} className={`${deal.color} border-2 border-slate-100 rounded-[40px] p-8 h-full hover:shadow-2xl transition-all group relative overflow-hidden`}>
                      <div className="flex justify-between items-center mb-8 relative z-10">
                        <img src={deal.brandLogo} alt={deal.brand} className="w-14 h-14 object-contain bg-white rounded-2xl p-2 shadow-sm" />
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{deal.brand}</span>
                      </div>
                      <h3 className="text-2xl font-black mb-2 relative z-10">{deal.title}</h3>
                      <p className="text-slate-500 text-sm mb-8 leading-relaxed relative z-10">{deal.description}</p>
                      <div className="voucher-notch bg-white/60 rounded-3xl p-6 border border-slate-100 space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-900 tracking-wider">{deal.code}</span>
                          <button onClick={() => {navigator.clipboard.writeText(deal.code); alert('Đã copy!');}} className="p-2.5 rounded-xl bg-[#2D5BFF] text-white"><Copy size={18} /></button>
                        </div>
                        <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-slate-950 text-white font-black rounded-2xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest">CLAIM VOUCHER <ExternalLink size={16} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="py-24 bg-blue-600 text-white rounded-[72px] mx-4 md:mx-10 my-16 overflow-hidden relative">
              <div className="container mx-auto px-12 relative z-10 flex flex-col lg:flex-row items-center gap-20">
                <div className="space-y-10 lg:w-1/2">
                  <h2 className="text-6xl md:text-9xl font-black font-heading tracking-tighter leading-none">THƯ VIỆN <br /> <span className="text-[#39FF14]">TỦ SÁCH SỐ</span></h2>
                  <p className="text-blue-100 text-2xl font-medium max-w-xl leading-relaxed">Nâng tầm kiến thức với kho Ebook độc quyền dành cho thế hệ Gen Z.</p>
                  <button onClick={() => navigateTo('category-detail', null, Category.HOC_HANH)} className="px-12 py-6 bg-white text-blue-600 font-black rounded-[32px] flex items-center gap-4 hover:bg-[#39FF14] hover:text-slate-900 transition-all uppercase tracking-widest text-sm">KHÁM PHÁ TỦ SÁCH <ArrowRight size={20} /></button>
                </div>
                <div className="lg:w-1/2 flex gap-10 overflow-x-auto no-scrollbar pb-12 pt-12">
                  {EBOOKS.map(ebook => (
                    <div key={ebook.id} onClick={() => navigateTo('ebook-detail', ebook.id)} className="flex-shrink-0 w-[300px] bg-white/10 backdrop-blur-2xl rounded-[64px] p-10 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                      <img src={ebook.cover} className="w-full h-[380px] object-cover rounded-[48px] border-4 border-white/10 mb-8" />
                      <h4 className="font-black text-2xl mb-4 group-hover:text-[#39FF14] transition-colors">{ebook.title}</h4>
                      <span className="font-black text-2xl text-[#39FF14]">{ebook.price.toLocaleString()}đ</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <AIPerks />
          </>
        )}
        {currentPage === 'category-detail' && <CategoryDetailView />}
        {currentPage === 'product-detail' && <ProductDetailView />}
        {currentPage === 'project-detail' && <ProjectDetailView />}
        {currentPage === 'ebook-detail' && <EBookDetailView />}
        {currentPage === 'blog-detail' && <BlogDetailView />}
        {currentPage === 'competition-detail' && <CompetitionDetailView />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>
      <Footer />
      {showIdeaModal && <IdeaFormModal />}
      <div className="fixed bottom-12 right-12 z-40">
        <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="w-16 h-16 bg-[#2D5BFF] text-white rounded-[24px] shadow-2xl flex items-center justify-center border-4 border-white hover:scale-110 transition-all"><ChevronLeft size={32} className="rotate-90" /></button>
      </div>
    </div>
  );
};

export default App;
