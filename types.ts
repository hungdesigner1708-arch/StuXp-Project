
export interface Deal {
  id: string;
  brand: string;
  brandLogo: string;
  title: string;
  description: string;
  code: string;
  affiliateLink: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  subCategory?: string;
  tag?: 'HOT' | 'NEW' | 'TRENDING' | 'SECOND-HAND';
  sponsor: string;
}

export interface EBook {
  id: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  description: string;
  downloadUrl?: string;
}

export interface EcosystemItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  bgColor: string;
  gridSpan: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  thumbnail: string;
  date: string;
  tag: string;
  author?: string;
  category?: string;
}

export interface Competition {
  id: string;
  title: string;
  prize: string;
  deadline: string;
  status: 'Ongoing' | 'Upcoming';
  thumbnail: string;
  organizer: string;
  description?: string;
  link?: string;
}

export interface StudentIdea {
  id: string;
  title: string;
  author: string;
  votes: number;
  tags: string[];
  excerpt: string;
  isProtected?: boolean;
}

export interface ArtEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number | 'Free';
  thumbnail: string;
  type: 'Concert' | 'Exhibition' | 'Workshop';
  description?: string;
}

export enum Category {
  VAN_HOA = "Văn hoá",
  SANG_TAO = "Sáng tạo",
  NGHE_THUAT = "Nghệ thuật",
  SINH_VIEN = "Sinh viên",
  CHO_CU = "Chợ cũ",
  HOC_HANH = "Học hành",
  LOI_SONG = "Lối sống"
}
