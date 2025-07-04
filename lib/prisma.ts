import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma = new PrismaClient().$extends(withAccelerate());

export type Image = {
  id: number;
  url: string;
  bgRemoval: boolean;
  productId?: number;
  bannerId?: number;
  product?: Product;
  banner?: Banner;
};

export type Banner = {
  id: number;
  url: string;
  imageId: number;
  image: Image;
};

export type Size = {
  id: number;
  name: string;
  priceAdjustment: number;
  categoryId: number;
  category?: Category;
  stock?: ProductStock[];
  purchases?: Purchase[];
};

export type ProductStock = {
  id: number;
  productId: number;
  sizeId: number;
  inStock: boolean;
  product?: Product;
  size?: Size;
};

export type Category = {
  id: number;
  name: string;
  sizes?: Size[];
  products?: Product[];
};

export type Product = {
  id: number;
  createdAt: Date;
  name: string;
  originalPrice: number;
  price: number;
  categoryName: string;
  category?: Category;
  images?: Image[];
  views?: View[];
  purchases?: Purchase[];
  stock?: ProductStock[];
};

export type View = {
  id: number;
  productId: number;
  userId?: number;
  identifier?: string;
  viewedAt: Date;
  count: number;
  product?: Product;
  user?: User;
};

export type Contact = {
  id: number;
  number: string;
  userId: number;
  user?: User;
  purchases?: Purchase[];
};

export type Address = {
  id: number;
  userId: number;
  flatAndBuilding: string;
  street: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
  purchases?: Purchase[];
  user?: User;
};

export type Purchase = {
  id: number;
  userId: number;
  productId: number;
  sizeId: number;
  addressId: number;
  contactId: number;
  status: "pending" | "completed" | "delivered" | "cancelled" | "failed";
  paymentMethod: "upi" | "cod";
  purchasedAt: Date;
  contact?: Contact;
  address?: Address;
  size?: Size;
  user?: User;
  product?: Product;
};

export type User = {
  id: number;
  email: string;
  isAdmin: boolean;
  views?: View[];
  purchases?: Purchase[];
  addresses?: Address[];
  contact?: Contact[];
};
