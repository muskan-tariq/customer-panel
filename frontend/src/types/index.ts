export interface Product {
    id: number;
    name: string;
    price: string;
    originalPrice: string;
    discount: string;
    reviews?: number;
    image: string;
    tag?: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    image: string;
    count: string;
  }
  
  export interface Testimonial {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    product: string;
  }