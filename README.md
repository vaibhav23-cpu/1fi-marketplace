# 1Fi Marketplace

A full-stack marketplace feature built as part of the 1Fi SDE Intern Assignment.

The project extends the existing 1Fi Shop experience by adding a new **1Fi Marketplace** tab where users can browse products, open unique product detail pages, select variants, choose EMI plans, and proceed with their selected EMI option.

---

## Features

- 1Fi-style mobile-first Shop interface
- Top Brands tab
- Nearby Stores tab
- 1Fi Marketplace tab
- Product data loaded from backend API
- PostgreSQL database integration
- Unique product URLs using product slugs
- Product search
- Product image, name, description, and pricing
- Multiple product variants
- Multiple EMI plans
- Dynamic EMI calculation based on selected variant
- EMI plan selection
- Proceed confirmation flow
- Loading states
- Error handling
- Empty search state
- Responsive mobile-first layout
- CSS Modules for scoped component styling
- Environment-variable based API configuration

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS Modules
- Lucide React

### Backend

- Node.js
- Express.js
- PostgreSQL
- `pg`
- `dotenv`
- `cors`

---

## Project Structure

```text
1fi_assignment/
├── 1fi-marketplace/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BottomNav.jsx
│   │   │   ├── BottomNav.module.css
│   │   │   ├── BrandCard.jsx
│   │   │   ├── BrandCard.module.css
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── HeroBanner.module.css
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SearchBar.module.css
│   │   │   ├── ShopTabs.jsx
│   │   │   └── ShopTabs.module.css
│   │   ├── pages/
│   │   │   ├── Shop.jsx
│   │   │   ├── Shop.module.css
│   │   │   ├── ProductDetails.jsx
│   │   │   └── ProductDetails.module.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── sql/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── README.md