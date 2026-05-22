'use client';

import { useMemo, useState } from "react";

import {
  Flame,
  History,
  LogOut,
  Search,
  ShoppingBag,
  Star,
  UserIcon,
  Clock,
  Truck,
  X,
} from "lucide-react";

import Image from "next/image";

// IMPORTS
import { productsList } from "./data/productsList";
import { categoriesList } from "./data/categoriesList";
import { ordersList } from "./data/ordersList";

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  quantity: number;
  new?: boolean;
  popular?: boolean;
};

export default function Home() {

  const [openOrders, setOpenOrders] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [openCart, setOpenCart] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  // FILTRO
  const filteredProducts = useMemo(() => {

    return productsList.filter((product: any) => {

      const matchesCategory =
        activeCategory === "all"
          ? true
          : product.category === activeCategory;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;

    });

  }, [activeCategory, search]);

  // ADICIONAR AO CARRINHO
  const addToCart = (product: any) => {

    setCart((prev) => {

      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      // SE JÁ EXISTE
      if (existingItem) {

        return prev.map((item) =>

          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item

        );

      }

      // NOVO ITEM
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];

    });

  };

  // AUMENTAR
  const increaseQuantity = (id: number) => {

    setCart((prev) =>

      prev.map((item) =>

        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item

      )

    );

  };

  // DIMINUIR
  const decreaseQuantity = (id: number) => {

    setCart((prev) =>

      prev
        .map((item) =>

          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item

        )

        .filter((item) => item.quantity > 0)

    );

  };

  // TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // TOTAL ITENS
  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (

    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[700px] z-0 opacity-30">

        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop"
          alt="Background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/70 to-[#0a0a0a]" />

      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">

        <div className="flex items-center justify-between px-16 py-5">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="bg-orange-500 p-2 rounded-2xl">

              <Flame
                size={26}
                className="text-white"
                fill="white"
              />

            </div>

            <h1 className="text-2xl font-black">
              SnapBite
            </h1>

          </div>

          {/* NAV */}
          <nav className="flex items-center gap-6 ml-auto mr-9">

            <button
              onClick={() => setOpenOrders(!openOrders)}
              className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition"
            >

              <History size={18} />
              Meus Pedidos

            </button>

            <button className="flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition">

              <UserIcon size={18} />
              Andriele

            </button>

          </nav>

          {/* AÇÕES */}
          <div className="flex items-center gap-4">

            {/* CARRINHO */}
            <button
              onClick={() => setOpenCart(!openCart)}
              className="bg-orange-500 hover:bg-orange-400 transition px-6 py-3 rounded-2xl flex items-center gap-2 relative shadow-lg shadow-orange-500/30"
            >

              <ShoppingBag size={18} />

              <span className="font-semibold">
                Carrinho
              </span>

              {totalItems > 0 && (

                <div className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">

                  {totalItems}

                </div>

              )}

            </button>

            {/* LOGOUT */}
            <button className="text-zinc-400 hover:text-red-500 transition">

              <LogOut size={20} />

            </button>

          </div>

        </div>

      </header>

      {/* MEUS PEDIDOS */}
      {openOrders && (

        <div className="fixed top-0 right-0 h-screen w-[420px] bg-zinc-950 border-l border-zinc-800 z-[100] p-8 overflow-y-auto">

          {/* TOPO */}
          <div className="flex items-center justify-between mb-10">

            <h2 className="text-3xl font-black">
              Meus Pedidos
            </h2>

            <button
              onClick={() => setOpenOrders(false)}
              className="text-zinc-500 hover:text-white transition"
            >
              <X />
            </button>

          </div>

          {/* LISTA */}
          <div className="flex flex-col gap-10">

            {ordersList.map((order) => (

              <div
                key={order.id}
                className="border-b border-zinc-800 pb-8"
              >

                {/* ID */}
                <h3 className="text-orange-500 font-bold mb-4">
                  {order.id}
                </h3>

                {/* ITENS */}
                <div className="flex flex-col gap-3">

                  {order.items.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >

                      <span className="text-zinc-300">
                        {item.quantity}x {item.name}
                      </span>

                      <span className="text-zinc-500">
                        R$ {(item.price * item.quantity)
                          .toFixed(2)
                          .replace(".", ",")}
                      </span>

                    </div>

                  ))}

                </div>

                {/* DATA */}
                <p className="text-zinc-600 text-xs mt-5">

                  {new Date(order.createdAt).toLocaleDateString("pt-BR")}

                </p>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* CARRINHO */}
      {openCart && (

        <div className="fixed top-0 right-0 h-screen w-[380px] bg-zinc-950 border-l border-zinc-800 z-[100] p-6 overflow-y-auto">

          {/* TOPO */}
          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-black">
              Seu Carrinho
            </h2>

            <button onClick={() => setOpenCart(false)}>

              <X />

            </button>

          </div>

          {/* ITENS */}
          <div className="flex flex-col gap-4">

            {cart.length === 0 && (

              <p className="text-zinc-500">
                Seu carrinho está vazio.
              </p>

            )}

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-zinc-900 p-4 rounded-2xl flex gap-4"
              >

                {/* IMG */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />

                </div>

                {/* INFO */}
                <div className="flex-1">

                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  <p className="text-orange-500 font-semibold">

                    R$ {(item.price * item.quantity)
                      .toFixed(2)
                      .replace(".", ",")}

                  </p>

                  {/* CONTADOR */}
                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-400 transition"
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* TOTAL */}
          <div className="mt-10 border-t border-zinc-800 pt-6">

            <div className="flex items-center justify-between mb-5">

              <span className="text-zinc-400">
                Total
              </span>

              <span className="text-2xl font-black text-orange-500">

                R$ {total.toFixed(2).replace(".", ",")}

              </span>

            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-400 transition py-4 rounded-2xl font-bold">

              Finalizar Pedido

            </button>

          </div>

        </div>

      )}

      {/* MAIN */}
      <main className="pt-40 px-10 pb-20 relative z-10 max-w-7xl mx-auto">

        {/* HERO */}
        <div>

          <h1 className="text-2xl font-black uppercase text-orange-500 mb-2">
            SnapBite Delivery
          </h1>

          <p className="text-5xl font-bold mb-8">
            Eai, bora pedir?
          </p>

        </div>

        {/* INFOS */}
        <div className="flex items-center gap-5 mb-8">

          <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full">

            <Clock
              size={16}
              className="text-orange-500"
            />

            <span className="text-sm font-bold">
              30-45 min
            </span>

          </div>

          <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full">

            <Truck
              size={16}
              className="text-orange-500"
            />

            <span className="text-xs uppercase">
              Entrega grátis
            </span>

          </div>

        </div>

        {/* PESQUISA */}
        <div className="relative mb-10 max-w-2xl">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="O que você quer comer hoje?"
            className="w-full bg-zinc-900 border border-orange-500 py-4 pl-12 pr-4 rounded-2xl outline-none shadow-lg shadow-orange-500/20"
          />

        </div>

        {/* CATEGORIAS */}
        <div className="flex gap-3 mb-12 overflow-x-auto">

          {categoriesList.map((cat: any) => (

            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-2xl transition whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-orange-500 text-white"
                  : "bg-zinc-900 text-zinc-400"
              }`}
            >

              {cat.icon} {cat.label}

            </button>

          ))}

        </div>

        {/* TITULO */}
        <h2 className="text-3xl font-black mb-6">
          Populares
        </h2>

        {/* PRODUTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredProducts.map((item: any) => (

            <div
              key={item.id}
              className="bg-zinc-900 p-5 border-2 border-neutral-800 hover:border-orange-500 rounded-3xl transition"
            >

              {/* IMAGEM */}
              <div className="relative h-48 w-full mb-5 rounded-2xl overflow-hidden group cursor-pointer">

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* TAGS */}
                <div className="absolute top-3 left-3 flex gap-2 z-10">

                  {item.new && (

                    <span className="bg-green-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">

                      Novidade

                    </span>

                  )}

                  {item.popular && (

                    <span className="bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">

                      Mais Pedidos

                    </span>

                  )}

                </div>

                {/* RATING */}
                <div className="absolute bottom-3 right-3 bg-black/90 px-3 py-2 rounded-full flex items-center gap-1 text-orange-400 text-sm shadow-lg">

                  <Star
                    size={14}
                    fill="currentColor"
                  />

                  <span className="font-bold">
                    {item.rating}
                  </span>

                </div>

              </div>

              {/* INFO */}
              <h3 className="text-xl font-bold mb-1">

                {item.name}

              </h3>

              <p className="text-zinc-500 text-sm mb-4">

                {item.description}

              </p>

              {/* PREÇO */}
              <div className="flex items-center justify-between">

                <span className="text-2xl font-bold text-orange-500">

                  R$ {item.price.toFixed(2).replace(".", ",")}

                </span>

                <button
                  onClick={() => addToCart(item)}
                  className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-400 transition text-2xl font-bold flex items-center justify-center"
                >
                  +
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>

  );

}