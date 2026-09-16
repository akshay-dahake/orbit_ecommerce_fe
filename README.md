# Orbit E-Commerce Frontend - Customer Basic Version

This version is intentionally simplified so the frontend can be tested quickly against the working backend.

## Included

- Home
- Product listing
- Product search and category filter
- Product details
- Add to cart
- Cart quantity management
- Place order
- My Orders
- Order details
- Cancel order when status is CREATED
- Product images from `imageUrl`
- No login/register/JWT/authentication
- No admin pages

## Expected backend endpoints

```text
GET    /api/products
GET    /api/products/{id}

POST   /api/orders
GET    /api/orders
GET    /api/orders/{id}
PATCH  /api/orders/{id}/cancel
```

## Order request body

The frontend sends exactly:

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

## Product response fields used

```json
{
  "id": 3,
  "name": "mouse",
  "price": 100,
  "description": "good mouse",
  "category": "electronics",
  "stockQuantity": 10,
  "imageUrl": "https://example.com/image.jpg",
  "active": true,
  "createdAt": "2026-09-14T16:33:59.166",
  "updatedAt": "2026-09-14T16:36:54.505986"
}
```

## Order response fields used

```json
{
  "id": 11,
  "orderNumber": "ORD-4E7C7618",
  "userId": null,
  "totalAmount": 100,
  "status": "CREATED",
  "items": [
    {
      "id": 7,
      "productId": 1,
      "quantity": 1,
      "price": 100,
      "subtotal": 100
    }
  ],
  "createdAt": "2026-09-15T11:32:08.459084",
  "updatedAt": "2026-09-15T11:32:08.459084"
}
```

## Run

1. Make sure backend is running on `http://localhost:8080`.
2. Open this frontend folder in terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the Vite URL shown in the terminal.

If your backend runs on another port, edit `.env`:

```text
VITE_API_BASE_URL=http://localhost:8080
```

Inventory is validated by the backend when an order is created. A separate customer inventory page is not required.
