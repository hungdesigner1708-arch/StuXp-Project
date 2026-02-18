
import { Deal, EcosystemItem, Category, Product, EBook, Article, Competition, StudentIdea, ArtEvent } from './types';

export const COLORS = {
  primary: '#2D5BFF',
  neon: '#39FF14',
  secondary: '#FF2D55',
};

export const NAVIGATION_LINKS = [
  { label: Category.VAN_HOA, href: 'van-hoa' },
  { label: Category.SANG_TAO, href: 'sang-tao' },
  { label: Category.NGHE_THUAT, href: 'nghe-thuat' },
  { label: Category.SINH_VIEN, href: 'sinh-vien' },
  { label: Category.CHO_CU, href: 'cho-cu' },
  { label: Category.HOC_HANH, href: 'hoc-hanh' },
  { label: Category.LOI_SONG, href: 'loi-song' },
];

export const BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'TECNO', 'Casio', 'Sony', 'KFC', 'Acer', 'Logitech', 'Adobe', 'Microsoft'];

export const HERO_BANNERS = [
  {
    id: 'b1',
    title: 'KIẾN TẠO THẾ HỆ MỚI',
    subtitle: 'Vũ trụ đặc quyền dành riêng cho sinh viên Việt Nam.',
    image: 'https://images.unsplash.com/photo-1523240715632-d984bc4dd953?auto=format&fit=crop&q=80&w=1200',
    cta: 'KHÁM PHÁ NGAY',
    color: 'from-[#2D5BFF] to-[#6A82FF]'
  },
  {
    id: 'b2',
    title: 'THẾ GIỚI CÔNG NGHỆ GEN Z',
    subtitle: 'Nâng cấp trải nghiệm học tập và giải trí với những thiết bị đỉnh cao.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    cta: 'XEM DEAL HOT',
    color: 'from-[#FF2D55] to-[#FF6A88]'
  }
];

const MOCK_CONTENT = `Trong thời đại công nghệ số bùng nổ, việc nắm bắt các xu hướng mới là yếu tố tiên quyết để sinh viên bứt phá. Bài viết này sẽ đi sâu vào những chiến lược tối ưu nhất để Gen Z không chỉ thích nghi mà còn dẫn đầu trong lĩnh vực của mình.

Đầu tiên, hãy nói về tư duy sáng tạo. Sáng tạo không phải là một món quà bẩm sinh mà là một kỹ năng có thể rèn luyện thông qua quan sát và thực hành không ngừng. StuXP tin rằng mỗi cá nhân đều có một 'vũ trụ' riêng biệt đang chờ được khai phá.

Tiếp theo là việc ứng dụng AI. Thay vì lo sợ bị thay thế, hãy học cách điều khiển nó. Việc làm chủ Prompt Engineering hay các công cụ hỗ trợ như ChatGPT, Canva Pro sẽ giúp hiệu suất học tập của bạn tăng gấp 5-10 lần.

Cuối cùng, cộng đồng là chìa khóa. StuXP không chỉ là một nền tảng mua sắm hay thông tin, mà là nơi những người trẻ cùng chí hướng kết nối và tạo ra giá trị bền vững. Hãy cùng chúng tôi kiến tạo một thế hệ mới năng động và đầy bản lĩnh!`;

export const ARTICLES: Record<string, Article[]> = {
  [Category.VAN_HOA]: [
    { 
      id: 'v1', 
      title: 'Triển lãm "Nét Xưa": Khám phá di sản Việt qua góc nhìn Gen Z', 
      excerpt: 'Một hành trình xuyên không gian tìm lại những giá trị văn hóa cổ truyền được tái hiện đầy sáng tạo.', 
      content: MOCK_CONTENT,
      author: 'Hoàng Minh',
      category: 'Văn hoá',
      thumbnail: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&q=80&w=800', 
      date: '15/10/2024', 
      tag: 'Sự kiện' 
    },
    { 
      id: 'v2', 
      title: 'Tại sao văn hóa uống Trà đá vỉa hè vẫn là "linh hồn" sinh viên?', 
      excerpt: 'Khám phá thói quen thú vị của các bạn trẻ Hà Nội và Sài Gòn mỗi buổi chiều tan học.', 
      content: MOCK_CONTENT,
      author: 'Linh Chi',
      category: 'Văn hoá',
      thumbnail: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=800', 
      date: '12/10/2024', 
      tag: 'Đời sống' 
    }
  ],
  [Category.LOI_SONG]: [
    { 
      id: 'ls1', 
      title: '5 App quản lý tài chính "cứu cánh" cho ví tiền cuối tháng', 
      excerpt: 'Đừng để tình trạng "mì tôm qua ngày" lặp lại. Thử ngay các công cụ này nhé.', 
      content: MOCK_CONTENT,
      author: 'Minh Tuấn',
      category: 'Lối sống',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800', 
      date: '20/10/2024', 
      tag: 'Mẹo vặt' 
    },
    { 
      id: 'ls2', 
      title: 'Xây dựng Routine chăm sóc bản thân cho sinh viên bận rộn', 
      excerpt: 'Cân bằng giữa deadline và sức khỏe tinh thần không khó như bạn nghĩ.', 
      content: MOCK_CONTENT,
      author: 'Thùy Dương',
      category: 'Lối sống',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800', 
      date: '25/10/2024', 
      tag: 'Sức khỏe' 
    }
  ],
  [Category.SANG_TAO]: [
    {
      id: 'st1',
      title: 'Prompt Engineering: Kỹ năng "vàng" trong kỷ nguyên AI',
      excerpt: 'Cách nói chuyện với AI để nhận được kết quả tốt nhất cho bài tập lớn của bạn.',
      content: MOCK_CONTENT,
      author: 'Tech Team',
      category: 'Sáng tạo',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      date: '01/11/2024',
      tag: 'Công nghệ'
    }
  ],
  [Category.HOC_HANH]: [
    {
      id: 'hh1',
      title: 'Top 10 đầu sách kinh điển mọi sinh viên Kinh tế nên đọc',
      excerpt: 'Nền tảng kiến thức vững chắc giúp bạn tiến xa hơn trên con đường sự nghiệp.',
      content: MOCK_CONTENT,
      author: 'Giảng viên X',
      category: 'Học hành',
      thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
      date: '28/10/2024',
      tag: 'Tri thức'
    }
  ]
};

export const NEWS_ITEMS: Article[] = Object.values(ARTICLES).flat().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const COMPETITIONS: Competition[] = [
  { 
    id: 'c1', 
    title: 'Marketing Challengers 2024', 
    prize: '50.000.000 VNĐ', 
    deadline: '30/11/2024', 
    status: 'Ongoing', 
    organizer: 'UEH Marketing Club', 
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
    description: 'Cuộc thi Marketing lớn nhất miền Nam dành cho sinh viên.',
    link: 'https://competition.stuxp.vn/marketing-2024'
  },
  { 
    id: 'c2', 
    title: 'StuXP Hackathon: Future City', 
    prize: '100.000.000 VNĐ', 
    deadline: '15/12/2024', 
    status: 'Upcoming', 
    organizer: 'StuXP Tech Hub', 
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    description: 'Tìm kiếm giải pháp công nghệ cho thành phố thông minh.',
    link: 'https://hackathon.stuxp.vn'
  },
  { 
    id: 'c3', 
    title: 'Design For Change 2025', 
    prize: 'Adobe Pro 1 Năm', 
    deadline: '20/01/2025', 
    status: 'Upcoming', 
    organizer: 'Arena Multimedia', 
    thumbnail: 'https://images.unsplash.com/photo-1561070791-26c11d204a3d?auto=format&fit=crop&q=80&w=600',
    description: 'Thử thách thiết kế đồ họa vì mục đích cộng đồng.',
    link: 'https://design.stuxp.vn'
  },
  { 
    id: 'c4', 
    title: 'Hùng Biện Tiếng Anh: Voice of Youth', 
    prize: 'Học bổng 100% IELTS', 
    deadline: '10/11/2024', 
    status: 'Ongoing', 
    organizer: 'VUS English', 
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600',
    description: 'Nơi khẳng định bản lĩnh và kỹ năng thuyết trình tiếng Anh.',
    link: 'https://voice.stuxp.vn'
  }
];

export const STUDENT_IDEAS: StudentIdea[] = [
  { 
    id: 'i1', 
    title: 'App kết nối gia sư sinh viên 0đ', 
    author: 'Linh Trần', 
    votes: 1240, 
    tags: ['EdTech', 'Community'], 
    excerpt: 'Nền tảng giúp sinh viên trao đổi kiến thức chéo nhau thay vì trả phí bằng tiền.',
    isProtected: true 
  },
  { 
    id: 'i2', 
    title: 'Hệ thống tái chế rác thải KTX', 
    author: 'Minh Quân', 
    votes: 890, 
    tags: ['GreenTech', 'Social'], 
    excerpt: 'Tối ưu hóa quy trình phân loại rác tại nguồn và tích điểm đổi quà cho sinh viên.',
    isProtected: true 
  },
  { 
    id: 'i3', 
    title: 'Smart Wardrobe: Thuê đồ thời trang', 
    author: 'An Nhiên', 
    votes: 2150, 
    tags: ['Fashion', 'E-commerce'], 
    excerpt: 'Giải pháp thời trang bền vững giúp Gen Z mặc đẹp mỗi ngày mà không tốn kém.',
    isProtected: true 
  },
  { 
    id: 'i4', 
    title: 'AI Study Buddy: Trợ lý học tập', 
    author: 'Đức Huy', 
    votes: 1560, 
    tags: ['AI', 'Education'], 
    excerpt: 'Tự động hóa việc ghi chú và tóm tắt bài giảng bằng trí tuệ nhân tạo.',
    isProtected: false 
  }
];

export const ART_EVENTS: ArtEvent[] = [
  { 
    id: 'e1', 
    title: 'Lululola Concert: Hoàng Dũng', 
    date: '20/11/2024', 
    location: 'Đà Lạt', 
    price: 850000, 
    type: 'Concert', 
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
    description: 'Đêm nhạc trữ tình giữa lòng thành phố ngàn hoa.'
  },
  { 
    id: 'e2', 
    title: 'Triển lãm "Ký ức Sài Gòn"', 
    date: '15/11/2024', 
    location: 'Bảo tàng Mỹ thuật', 
    price: 'Free', 
    type: 'Exhibition', 
    thumbnail: 'https://images.unsplash.com/photo-1518998053574-53f1f0d57d5a?auto=format&fit=crop&q=80&w=600',
    description: 'Tái hiện không gian văn hóa Sài Gòn xưa qua những hiện vật quý giá.'
  },
  { 
    id: 'e3', 
    title: 'Workshop: Vẽ tranh Acrylic', 
    date: '01/12/2024', 
    location: 'StuXP Hub HCM', 
    price: 350000, 
    type: 'Workshop', 
    thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600',
    description: 'Trải nghiệm hội họa và thư giãn sau những giờ học căng thẳng.'
  }
];

export const SECOND_HAND_PRODUCTS: Product[] = [
  { id: 'sh1', name: 'Giáo trình Kinh tế vi mô (Mới 95%)', price: 45000, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400', category: Category.CHO_CU, subCategory: 'Sách', tag: 'SECOND-HAND', sponsor: 'User_Minh' },
  { id: 'sh2', name: 'Chuột Logitech G304 LightSpeed', price: 450000, image: 'https://images.unsplash.com/photo-1527814050087-37a3c71cc33c?auto=format&fit=crop&q=80&w=400', category: Category.CHO_CU, subCategory: 'Phụ kiện', tag: 'SECOND-HAND', sponsor: 'User_An' },
  { id: 'sh3', name: 'Bàn phím cơ AKKO 3084', price: 950000, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400', category: Category.CHO_CU, subCategory: 'Phụ kiện', tag: 'SECOND-HAND', sponsor: 'User_Linh' },
  { id: 'sh4', name: 'Áo Hoodie Local Brand (Size L)', price: 200000, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400', category: Category.CHO_CU, subCategory: 'Thời trang', tag: 'SECOND-HAND', sponsor: 'User_Mai' },
  { id: 'sh5', name: 'Máy tính Casio fx-580VN X', price: 350000, image: 'https://images.unsplash.com/photo-1543644574-19750f5feb8b?auto=format&fit=crop&q=80&w=400', category: Category.CHO_CU, subCategory: 'Đồ điện tử', tag: 'SECOND-HAND', sponsor: 'User_Tu' },
  { id: 'sh6', name: 'Tai nghe Sony WH-1000XM4', price: 3800000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', category: Category.CHO_CU, subCategory: 'Đồ điện tử', tag: 'SECOND-HAND', sponsor: 'User_Long' }
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'iPhone 17 Pro 256GB Chính Hãng', price: 33290000, originalPrice: 34990000, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800', category: Category.SINH_VIEN, sponsor: 'Apple' },
  { id: 'p2', name: 'MacBook Air M3 13 inch 2024', price: 27990000, originalPrice: 29990000, image: 'https://images.unsplash.com/photo-1517336714460-457228377e7e?auto=format&fit=crop&q=80&w=800', category: Category.SINH_VIEN, sponsor: 'Apple' },
  { id: 'p3', name: 'iPad Pro M4 11 inch Wi-Fi', price: 28490000, originalPrice: 28990000, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800', category: Category.SINH_VIEN, sponsor: 'Apple' },
  { id: 'p4', name: 'Samsung Galaxy S24 Ultra', price: 26990000, originalPrice: 29990000, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800', category: Category.SINH_VIEN, sponsor: 'Samsung' }
];

export const HOT_DEALS: Deal[] = [
  { id: '1', brand: 'KFC', brandLogo: 'https://upload.wikimedia.org/wikipedia/sco/d/d3/KFC_logo.svg', title: 'Giảm 30% Combo Gà', description: 'Ưu đãi dành riêng cho thẻ sinh viên.', code: 'STUXPKFC30', affiliateLink: 'https://kfc.com.vn', color: 'bg-red-50' },
  { id: '2', brand: 'Casio', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Casio_logo.svg/1280px-Casio_logo.svg.png', title: 'Voucher 500k G-Shock', description: 'Nâng cấp phong cách cùng StuXP Perks.', code: 'CASIOSTUXP', affiliateLink: 'https://casio.com', color: 'bg-blue-50' },
  { id: '3', brand: 'Acer', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/1200px-Acer_2011.svg.png', title: 'Giảm 2Tr Laptop Gaming', description: 'Cực phẩm Acer Predator dành cho sinh viên.', code: 'ACERSTUXP', affiliateLink: 'https://acer.com.vn', color: 'bg-emerald-50' }
];

export const EBOOKS: EBook[] = [
  { id: 'eb1', title: 'Mastering AI for Students', author: 'StuXP Tech Team', price: 49000, cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800', description: 'Hướng dẫn chi tiết cách ứng dụng Prompt Engineering.', downloadUrl: 'https://cloud.stuxp.vn/ebooks/ai-mastering.pdf' },
  { id: 'eb2', title: 'Freelance 101 cho Sinh Viên', author: 'Minh Tuấn', price: 79000, cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800', description: 'Lộ trình thực tế để bắt đầu kiếm tiền từ kỹ năng viết lách.', downloadUrl: 'https://cloud.stuxp.vn/ebooks/freelance-101.pdf' },
  { id: 'eb3', title: 'Kỹ năng Quản trị Thời gian Gen Z', author: 'Linh Chi', price: 35000, cover: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=800', description: 'Cân bằng giữa học tập và đời sống cá nhân.', downloadUrl: 'https://cloud.stuxp.vn/ebooks/time-mgmt.pdf' }
];

export const ECOSYSTEM: EcosystemItem[] = [
  { id: '1', title: Category.VAN_HOA, icon: '🎭', description: 'Sự kiện & Cộng đồng', bgColor: 'bg-white', gridSpan: '' },
  { id: '2', title: Category.SANG_TAO, icon: '🎨', description: 'Ý tưởng đột phá', bgColor: 'bg-white', gridSpan: '' },
  { id: '3', title: Category.NGHE_THUAT, icon: '🎸', description: 'Âm nhạc & Art', bgColor: 'bg-white', gridSpan: '' },
  { id: '4', title: Category.SINH_VIEN, icon: '🎓', description: 'Cuộc thi & Học bổng', bgColor: 'bg-white', gridSpan: '' },
  { id: '5', title: Category.CHO_CU, icon: '♻️', description: 'Mua bán đồ cũ', bgColor: 'bg-white', gridSpan: '' },
  { id: '6', title: Category.HOC_HANH, icon: '📚', description: 'Tài liệu & Ebook', bgColor: 'bg-white', gridSpan: '' },
  { id: '7', title: Category.LOI_SONG, icon: '🌿', description: 'Lifestyle & Health', bgColor: 'bg-white', gridSpan: '' }
];
