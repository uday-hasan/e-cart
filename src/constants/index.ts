export enum FormFieldType {
  TEXT = "text",
  SELECT = "select",
  NUMBER = "number",
  TEXTAREA = "textarea",
  UPLOAD = "upload",
  SKELETON = "skeleton",
}

class Create {
  title: string;
  href: string;

  constructor(title: string, href: string) {
    this.title = title;
    this.href = href;
  }
}

class CreateHref extends Create {
  isAdmin: boolean;
  constructor(title: string, href: string, isAdmin: boolean) {
    super(title, href);
    this.isAdmin = isAdmin;
    this.href = `/dashboard/${isAdmin ? "admin" : "user"}/${href}`;
  }
}
export const navigationItems = [
  new Create("Home", "/"),
  new Create("Products", "/products"),
  new Create("Support", "support"),
] as const;

export const adminNavigationItems = [
  new CreateHref("Manage Product", "manage-product", true),
  new CreateHref("Order Managege", "order-manage", true),
  new CreateHref("Cart", "cart", false),
  new CreateHref("Order Status", "order-status", false),
] as const;

export const ProductCategory = {
  Shirt: { title: "Shirt", path: "/assets/images/category/shirt.jpg" },
  Pant: { title: "Pant", path: "/assets/images/category/pant.jpg" },
  TShirt: { title: "T-Shirt", path: "/assets/images/category/t_shirt.jpg" },
  Watch: { title: "Watch", path: "/assets/images/category/watch.jpg" },
} as const;

export const SortItems = {
  Default: 0,
  Asc: 1,
  Dec: -1,
} as const;

export const DeliveryStatus = {
  Pending: "Pending",
  Received: "Received",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Canceled: "Cancel",
};
