export interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
  inStock: boolean
}

export interface CartItem extends Product {
  quantity: number
}
