import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma = new PrismaClient().$extends(withAccelerate());

export type Image = {
  id: number;
  url: string;
  bgRemoval: boolean;
  productId: number | null;
  bannerId: number | null;
};

export type Product = {
  id: number;
  createdAt: Date;
  name: string;
  originalPrice: number;
  price: number;
  category: string;
  images: Image[] | null;
  views: View[] | null;
};

export type View = {
  id: number;
  productId: number;
  userId: number | null;
  identifier: string | null;
  viewedAt: Date;
  count: number;
  product?: Product;
  user?: User;
};

export type User = {
  id: number;
  email: string;
  isAdmin: boolean;
  views?: View[];
  purchases?: Purchase[];
};

export type Purchase = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  purchasedAt: Date;
  user?: User;
  product?: Product;
};
