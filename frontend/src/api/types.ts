export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId?: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Purchase = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;      // Number of items purchased
  amount: number;        // Total amount paid (price * quantity)
  purchaseTime: string;
  machineId: string;
};

export type PurchaseResponse = {
  success: boolean;
  message: string;
  remaining: number;          // Remaining stock after purchase
  quantityPurchased: number;  // Number of items purchased
  totalCost: number;          // Total cost of purchase
  warning?: string;           // Optional: low stock warning
};
