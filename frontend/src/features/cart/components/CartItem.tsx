


// D:\webden\frontend\src\features\cart\components\CartItem.tsx
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ICartDetail } from '../cart.types';

export const CartItem = ({ item, onUpdateQuantity, onRemove, onToggleSelect }: any) => {
  const { product, quantity, unitPrice, selected, _id } = item;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      onUpdateQuantity(_id, 0); // Truyền 0 để Hook biết là đang xóa trắng
      return;
    }

    // Nếu người dùng xóa trống ô input, tạm thời truyền vào 0 
    // (Hook useCart của chúng ta sẽ tự động Math.max(1, 0) để đưa về 1)
    const newQty = parseInt(value);
    if (newQty > 0) {
      onUpdateQuantity(_id, newQty);
    }

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 3. Chặn phím "-", "e", "+", "." và ","
    if (["-", "e", "E", "+", ".", ","].includes(e.key)) {
      e.preventDefault();
    }
    // Chặn nhập số 0 nếu ô input đang trống (không cho số 0 đứng đầu)
    if (e.key === "0" && (e.currentTarget.value === "" || e.currentTarget.value === "0")) {
      e.preventDefault();
    }
  };

  return (
    <div className="ui-card flex items-center gap-6 group hover:border-[var(--color-primary)] transition-all">
      {/* 1. Thêm cursor-pointer vào checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggleSelect(_id)}
        className="w-5 h-5 rounded-md border-slate-300 accent-[var(--color-primary)] cursor-pointer"
      />

      <div className="relative w-24 h-24 flex-shrink-0 bg-[var(--bg-light)] rounded-2xl overflow-hidden">
        <Image src={product.imageUrl || '/placeholder.png'} alt={product.productName} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="ui-product-name mb-2">{product.productName}</h3>
        <div className="flex gap-4">
          {product.specifications?.power && <span className="ui-label !text-slate-400">CS: {product.specifications.power}</span>}
          {product.specifications?.size && <span className="ui-label !text-slate-400">KT: {product.specifications.size}</span>}
        </div>
      </div>

      <div className="flex items-center bg-[var(--bg-light)] rounded-full p-1 border border-slate-100">
        {/* 2. Thêm cursor-pointer và disabled:cursor-not-allowed cho nút trừ */}
        <button
          onClick={() => onUpdateQuantity(_id, quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>

        <input
          type="number"
          value={quantity === 0 ? "" : quantity} // Nếu là 0 (đang xóa) thì hiển thị ô trống
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-10 bg-transparent text-center ui-value focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min="1"
        />

        {/* 3. Thêm cursor-pointer cho nút cộng */}
        <button
          onClick={() => onUpdateQuantity(_id, quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-all cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="flex flex-col items-end w-40">
        <span className="ui-price !text-[var(--color-primary)]">
          {(unitPrice * quantity).toLocaleString()}<span className="text-xs ml-0.5">đ</span>
        </span>
        <span className="ui-currency !text-[11px] opacity-50">
          Đơn giá: {unitPrice.toLocaleString()}đ
        </span>
      </div>

      {/* 4. Thêm cursor-pointer cho nút xóa */}
      <button
        onClick={() => onRemove(_id)}
        className="p-2 text-slate-300 hover:text-[var(--color-danger)] transition-colors cursor-pointer"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
