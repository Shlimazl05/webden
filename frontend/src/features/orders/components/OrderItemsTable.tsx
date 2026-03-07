export const OrderItemsTable = ({ items }: { items: any[] }) => (
  <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <th className="px-8 py-5">Sản phẩm</th>
          <th className="px-8 py-5 text-center">Số lượng</th>
          <th className="px-8 py-5 text-right">Đơn giá</th>
          <th className="px-8 py-5 text-right">Tổng</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {items?.map((item, idx) => (
          <tr key={idx} className="hover:bg-indigo-50/20 transition-colors">
            <td className="px-8 py-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 p-1">
                  <img src={item.productId?.imageUrl || "/img/placeholder.svg"} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-slate-900 line-clamp-1">{item.productId?.productName}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase">SKU: {item.productId?.productCode || "N/A"}</p>
                </div>
              </div>
            </td>
            <td className="px-8 py-6 text-center text-slate-700 font-black text-md">
              <span className="bg-slate-100 px-3 py-1 rounded-lg">x{item.quantity}</span>
            </td>
            <td className="px-8 py-6 text-right font-bold text-slate-500 text-sm">{item.unitPrice?.toLocaleString()}đ</td>
            <td className="px-8 py-6 text-right font-black text-slate-900 text-[16px]">{(item.quantity * item.unitPrice)?.toLocaleString()}đ</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);