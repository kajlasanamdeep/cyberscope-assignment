# **Cyberscope Full-Stack Assignment**

This project is a full-stack implementation built for the **Cyberscope Full-Stack Developer Assignment**.
It includes:

* **Backend (Node.js + Express)** – Acts as a proxy for CoinGecko API
* **Frontend (React + React Router)** – Displays a paginated list of coins & detailed coin information
* Fully isolated API layer
* Clean UI and reusable components (Pagination, Loader, etc.)

The system ensures the frontend **never calls CoinGecko directly**, as required.

Run Backend:

```bash
npm run dev
```

Backend starts at:

```
http://localhost:8000
```

Run frontend:

```bash
npm start
```

Frontend starts at:

```
http://localhost:3000
```

---

## 🚀 **Build Commands**

### Backend:

```bash
npm run start
```

### Frontend:

```bash
npm run build
```

---

## 📦 Deployment Notes

For deployment:

### Frontend:
* Set environment variable:

  ```
  REACT_APP_API_BASE_URL=https://your-backend-url/api
  ```

### Backend:
* Set environment variable:

  ```
  PORT=8000
  NODE_ENV=production
  ```

---

## 📝 **License**

This project is for the Cyberscope assignment only for demonstration purposes.

---
