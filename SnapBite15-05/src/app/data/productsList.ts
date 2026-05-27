import { Product } from "../types/Product";

export let productsList: Product[] = [
  {
    id: "h1",
    name: "Classic Smash",
    category: "burgers",
    description:
      "Dois smash patties, queijo americano, alface, tomate, picles e molho especial.",
    price: 32.9,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    badge: "Mais Pedido",
    available: true,
    tag: "Mais Pedido",
    rating: 4.8,
  },

  {
    id: "h2",
    name: "Bacon Inferno",
    category: "burgers",
    description:
      "Blend 180g, bacon crocante, cheddar e maionese defumada.",
    price: 42.9,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400",
    badge: "Novo",
    available: true,
    tag: "",
    rating: 3.8,
  },

  {
    id: "p1",
    name: "Pepperoni Supreme",
    category: "pizzas",
    description:
      "Molho artesanal, mussarela premium e pepperoni.",
    price: 54.9,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
    badge: "Favorito",
    available: true,
    tag: "Barato",
    rating: 4.5,
  },

  {
    id: "b1",
    name: "Refrigerante Lata",
    category: "drinks",
    description:
      "Coca-Cola, Pepsi, Sprite ou Guaraná.",
    price: 7.9,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
    badge: "",
    available: true,
    tag: "",
    rating: 4.5,
  },
];

export function addProduct(
  product: Omit<Product, "id">
) {
  const newProduct: Product = {
    ...product,
    id: crypto.randomUUID(),
  };

  productsList.push(newProduct);

  return newProduct;
}