"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addProduct } from "../../data/productsList";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModalAdicionarProduto({
  open,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [category, setCategory] =
    useState("burgers");

  if (!open) return null;

  function handleAddProduct() {
    if (!name || !description || !price) {
      return alert(
        "Preencha os campos obrigatórios"
      );
    }

    addProduct({
  name,
  category,
  description,
  image,
  price: Number(price),
  badge: "",
  available: true,
  tag: "",
  rating: 5,
});

    // limpar campos
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setCategory("burgers");

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center p-6">
      <div className="bg-[#1E1D1D] border border-[#2D2B2B] rounded-[35px] w-full max-w-[700px] p-8">
        {/* topo */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-white">
            Adicionar Produto
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X />
          </button>
        </div>

        {/* form */}
        <div className="grid gap-4">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Nome do produto"
            className="bg-[#222121] border border-[#2D2B2B] rounded-2xl p-4 outline-none"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Descrição"
            className="bg-[#222121] border border-[#2D2B2B] rounded-2xl p-4 outline-none min-h-[120px]"
          />

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="Preço"
            className="bg-[#222121] border border-[#2D2B2B] rounded-2xl p-4 outline-none"
          />

          <input
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            placeholder="URL da imagem"
            className="bg-[#222121] border border-[#2D2B2B] rounded-2xl p-4 outline-none"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="bg-[#222121] border border-[#2D2B2B] rounded-2xl p-4 outline-none"
          >
            <option value="burgers">
              Burgers
            </option>

            <option value="pizzas">
              Pizzas
            </option>

            <option value="hotdogs">
              Hotdogs
            </option>

            <option value="drinks">
              Drinks
            </option>
          </select>

          <button
            onClick={handleAddProduct}
            className="bg-orange-500 hover:opacity-90 transition rounded-2xl py-4 font-bold mt-3"
          >
            Salvar Produto
          </button>
        </div>
      </div>
    </div>
  );
}