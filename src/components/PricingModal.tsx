"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IVehicle } from "@/models/vehicle.model";
import { ImagePlus } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa6";

type PropsType = {
  open: boolean;
  onClose: () => void;
  data: IVehicle | null;
};

export default function PriceModal({ open, onClose, data }: PropsType) {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>(null);
  const [baseFare, setBaseFare] = useState("");
  const [pricePerKM, setPricePerKM] = useState("");
  const [waitingCharge, setWaitingCharge] = useState("");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Pricing and Vehicle Image</h2>
            </div>

            <div className="p-6 space-y-6">
              <label
                htmlFor="imageLabel"
                className="relative h-44 border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer"
              >
                {!preview ? (
                  <ImagePlus size={28} />
                ) : (
                  <img
                    src={preview}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  id="imageLabel"
                  hidden
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setImage(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </label>

              <div>
                <p className="text-sm font-semibold mb-1">Base Fare</p>
                <div className="flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
                  <FaRupeeSign size={18} />
                  <input
                    type="text"
                    placeholder="baseFare"
                    value={baseFare}
                    onChange={(e) => setBaseFare(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Price per KM</p>
                <div className="flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
                  <FaRupeeSign size={18} />
                  <input
                    type="text"
                    placeholder="price per KM"
                    value={pricePerKM}
                    onChange={(e) => setPricePerKM(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Waiting Charge</p>
                <div className="flex items-center gap-2 border rounded-xl px-4 py-3 bg-white">
                  <FaRupeeSign size={18} />
                  <input
                    type="text"
                    placeholder="Waiting Charge"
                    value={baseFare}
                    onChange={(e) => setWaitingCharge(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3">
              <button className="flex-1 border rounded-xl py-2" onClick={onClose}>Cancel</button>
              <button className="flex-1 bg-black text-white rounded-xl py-2">Save</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
