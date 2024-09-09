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
  new CreateHref("Profile", "profile", true),
  new CreateHref("Manage Product", "manage-product", true),
  new CreateHref("Order Managege", "order-manage", true),
] as const;

export const ProductCategory = {
  Shirt: "Shirt",
  Pant: "Pant",
  TShirt: "T-Shirt",
  Short: "Short",
} as const;

export const SortItems = {
  None: "None",
  Asc: "Asc",
  Dec: "Dec",
} as const;
