import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  ReceiptText,
  User,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const GARMENT_TYPES = [
  { name: "Shirt", price: 10 },
  { name: "Pants", price: 15 },
  { name: "Saree", price: 20 },
];

interface OrderFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([{ type: "Shirt", quantity: 1 }]);
  const [loading, setLoading] = useState(false);

  const totalPrice = useMemo(() => {
    return items.reduce((sum: number, item: any) => {
      const type = GARMENT_TYPES.find((t) => t.name === item.type);
      return sum + (type?.price || 0) * item.quantity;
    }, 0);
  }, [items]);

  const addItem = () => setItems([...items, { type: "Shirt", quantity: 1 }]);

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      await onSubmit({ customerName, phone, items });
      setCustomerName("");
      setPhone("");
      setItems([{ type: "Shirt", quantity: 1 }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-full bg-white border border-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mr-3">
            <ShoppingBag size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">New Order</h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase font-medium">
            Total Est.
          </p>
          <p className="text-xl font-black text-blue-600">${totalPrice}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
        {/* Customer Section */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Customer Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-12 pr-3 h-11 rounded-lg border border-transparent bg-gray-50 focus:bg-white focus:border-blue-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full pl-12 pr-3 h-11 rounded-lg border border-transparent bg-gray-50 focus:bg-white focus:border-blue-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Order Items
            </label>
            <button
              type="button"
              onClick={addItem}
              className="text-xs text-blue-600 font-bold flex items-center hover:bg-blue-50 px-2 py-1 rounded"
            >
              <Plus size={14} className="mr-1" /> Add Item
            </button>
          </div>

          <div className="space-y-3 max-h-75 overflow-auto pr-2">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center bg-gray-50 p-3 rounded-xl border border-gray-100"
                >
                  <div className="flex-1 grid grid-cols-5 gap-3">
                    <div className="col-span-3">
                      <select
                        value={item.type}
                        onChange={(e) =>
                          updateItem(index, "type", e.target.value)
                        }
                        className="w-full bg-white border rounded-lg px-3 py-2 text-sm"
                      >
                        {GARMENT_TYPES.map((t) => (
                          <option key={t.name} value={t.name}>
                            {t.name} (${t.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="w-full bg-white border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className={`ml-3 p-2 text-gray-300 hover:text-red-500 ${
                      items.length === 1 && "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-50">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <ReceiptText size={18} className="mr-2" />
                Generate Order
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
