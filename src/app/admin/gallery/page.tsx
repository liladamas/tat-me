"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";

export default function AdminGallery() {
  const [tattoos, setTattoos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTattoos(data);
        setIsLoading(false);
      });
  }, []);

  const handleSaveTattoo = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLInputElement).value;
    const price = (form.elements.namedItem("price") as HTMLInputElement).value;
    const imagePath = (form.elements.namedItem("imagePath") as HTMLInputElement).value;

    if (!title || !category || !price || !imagePath) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, price, imagePath }),
    });

    if (res.ok) {
      const newTattoo = await res.json();
      setTattoos([newTattoo, ...tattoos]);
      form.reset();
      alert("Tattoo added!");
    } else {
      alert("Failed to add tattoo.");
    }
  };

  const handleDeleteTattoo = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    setTattoos(tattoos.filter(t => t.id !== id));
  };

  if (isLoading) return <div className="text-center py-32 text-brand-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-black p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-black dark:text-brand-white">Gallery Manager</h1>
          <button onClick={() => router.push("/admin/bookings")} className="text-brand-burgundy font-bold">Back to Bookings</button>
        </div>

        {/* Add Tattoo Form */}
        <div className="bg-gray-50 dark:bg-brand-charcoal p-8 rounded-sm border border-gray-200 dark:border-brand-black mb-12">
          <h2 className="text-2xl font-serif font-bold text-brand-black dark:text-brand-white mb-6">Add New Tattoo</h2>
          <form onSubmit={handleSaveTattoo} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Title *</label>
                <input name="title" required type="text" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Category *</label>
                <input name="category" required type="text" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Price (USD) *</label>
                <input name="price" required type="number" min="1" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Upload Image *</label>
                <div className="flex items-center gap-4">
                  <UploadButton<OurFileRouter, "videoUploader">
                    endpoint="videoUploader" // Reusing the video uploader for images for now
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        (document.getElementsByName("imagePath")[0] as HTMLInputElement).value = res[0].url;
                        alert("Image uploaded!");
                      }
                    }}
                    onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
                    appearance={{ button: "bg-brand-black text-white px-4 py-2 rounded-sm text-xs font-bold" }}
                  />
                  <input name="imagePath" type="text" readOnly placeholder="Upload required" className="w-full bg-gray-100 dark:bg-brand-charcoal border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white text-xs" />
                </div>
              </div>
            </div>
            <button type="submit" className="bg-brand-burgundy text-brand-white font-bold uppercase tracking-wider py-3 px-8 rounded-sm hover:bg-brand-burgundy/80 transition-colors">
              Add Tattoo to Gallery
            </button>
          </form>
        </div>

        {/* Existing Tattoos */}
        <h2 className="text-2xl font-serif font-bold text-brand-black dark:text-brand-white mb-6">Current Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tattoos.map((tattoo) => (
            <div key={tattoo.id} className="bg-gray-50 dark:bg-brand-charcoal border border-gray-200 dark:border-brand-black rounded-sm overflow-hidden">
              <div className="relative aspect-[4/5] bg-gray-200 dark:bg-black">
                <Image src={tattoo.imagePath} alt={tattoo.title} fill className="object-cover" />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-brand-black dark:text-brand-white font-bold">{tattoo.title}</p>
                  <p className="text-gray-500 text-xs">{tattoo.category} — ${tattoo.basePrice}</p>
                </div>
                <button onClick={() => handleDeleteTattoo(tattoo.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
              </div>
            </div>
          ))}
          {tattoos.length === 0 && <p className="text-gray-500 col-span-3 text-center">No tattoos added yet. Use the form above.</p>}
        </div>
      </div>
    </div>
  );
}