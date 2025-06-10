# 🛍️ eCommerce MVP Build Plan

## 🟢 Day 1 — Frontend Setup & Product Display

### 🎯 Goals:

-   Scaffold frontend
-   Connect to Supabase
-   Display product list and details

### ✅ Features:

-   [ ] React project setup with Tailwind
-   [ ] React Router with basic routes:
    -   `/` (Home/Product list)
    -   `/product/:id` (Product detail)
    -   `/cart` (Shopping cart)
    -   `/checkout` (Checkout form)
    -   `/login`, `/register` (Auth pages)
    -   `/admin` (Admin dashboard)
-   [ ] Supabase project created
-   [ ] Supabase schema: `products` table
    -   `id`, `name`, `description`, `price`, `image_url`
-   [ ] Upload product images to Supabase bucket
-   [ ] Product list UI (`ProductCard`, `ProductListPage`)
-   [ ] Product detail UI

---

## 🟡 Day 2 — Cart, Auth & Admin Dashboard

### 🎯 Goals:

-   Add authentication
-   Implement cart system
-   Enable product CRUD via admin

### ✅ Features:

-   [ ] Supabase Auth (email/password)
-   [ ] `AuthContext` to manage user state
-   [ ] `CartContext` for managing cart items
-   [ ] Cart UI:
    -   Show added products
    -   Quantity and total price
-   [ ] Admin dashboard page:
    -   Add, edit, delete products via Supabase client
    -   Access control: only logged-in users with role "admin"

---

## 🟣 Day 3 — Checkout, Payments & Deployment

### 🎯 Goals:

-   Add checkout form
-   Store delivery info in DB
-   Add payment placeholder
-   Polish & deploy

### ✅ Features:

-   [ ] Checkout form:
    -   `full_name`
    -   `phone_number`
    -   `email`
    -   `delivery_address`
-   [ ] Supabase schema: `orders` table
    -   `id`, `user_id`, `items`, `delivery_address`, `total_price`, `created_at`
-   [ ] Payment:
    -   Dummy UI for card input (can use Stripe test mode later)
    -   Record payment status (e.g., "pending", "paid")
-   [ ] Save order to Supabase on checkout
-   [ ] Loading & empty states
-   [ ] Responsive layout
-   [ ] Deploy frontend to Vercel
-   [ ] Connect Vercel to GitHub repo

---

## 💾 Database Tables (Supabase)

### `products`

| Column      | Type    |
| ----------- | ------- |
| id          | UUID    |
| name        | Text    |
| description | Text    |
| price       | Numeric |
| image_url   | Text    |

### `users` (Supabase built-in auth)

### `orders`

| Column           | Type      |
| ---------------- | --------- |
| id               | UUID      |
| user_id          | UUID      |
| items            | JSONB     |
| delivery_address | Text      |
| total_price      | Numeric   |
| payment_status   | Text      |
| created_at       | Timestamp |

---

## 🔄 Future Upgrade Plan

-   Migrate Supabase PostgreSQL schema to self-hosted DB
-   Add real payments with Stripe API
-   Make cart persistent across devices
-   Add user order history
