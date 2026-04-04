# //////////////////////// Linux/Mac //////////////////////////
curl -X POST http://localhost:6001/api/price-list \
-H "Content-Type: application/json" \
-d '{
  "category": "phoneProducts",
  "price_new": 28000,
  "price_used": 26500,
  "conditions": "",
  "groups": [
    {
      "catalog": "iPhone 15 Series",
      "variants": [
        { "name": "iPhone 15 Pro Max 256G", "price_new": 28000, "price_used": 26500, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 Pro Max----------- 512G", "price_new": 34000, "price_used": 30000, "condition": "", "storage": "512GB" },
        { "name": "iPhone 15 Pro 128G", "price_new": 23000, "price_used": 21000, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 Pro 256G", "price_new": 26000, "price_used": 23000, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 Plus 128G", "price_new": 20500, "price_used": 19500, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 Plus 256G", "price_new": 23500, "price_used": 20500, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 128G", "price_new": 18000, "price_used": 16000, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 256G", "price_new": 20500, "price_used": 18000, "condition": "", "storage": "256GB" }
      ]
    }
  ]
}'
# //////////////////////// Windows //////////////////////////
Invoke-WebRequest -Uri "http://localhost:6001/api/price-list" `
-Method POST `
-Headers @{ "Content-Type" = "application/json" } `
-Body '{
  "category": "phoneProducts",
  "price_new": 26000,
  "price_used": 22500,
  "conditions": "",
  "groups": [
    {
      "catalog": "iPhone 15 Series",
      "variants": [
        { "name": "iPhone 15 Pro Max 256G", "price_new": 26000, "price_used": 22500, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 Pro Max 512G", "price_new": 29000, "price_used": 24000, "condition": "", "storage": "512GB" },
        { "name": "iPhone 15 Pro 128G", "price_new": 20000, "price_used": 16500, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 Pro 256G", "price_new": 23000, "price_used": 18500, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 Plus 128G", "price_new": 17500, "price_used": 14500, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 Plus 256G", "price_new": 20500, "price_used": 15500, "condition": "", "storage": "256GB" },
        { "name": "iPhone 15 128G", "price_new": 14000, "price_used": 12500, "condition": "", "storage": "128GB" },
        { "name": "iPhone 15 256G", "price_new": 17000, "price_used": 13500, "condition": "", "storage": "256GB" }
      ]
    }
  ]
}'
