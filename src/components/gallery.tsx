"use client";

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type GalleryImage = {
  src: string;
  alt: string;
  hint: string;
};

const galleryImages: GalleryImage[] = [
  { src: "https://hpschampa.in/assets/uploads/photo/97d4774758ed3b8994166e4593ffab7f.jpeg", alt: "School event", hint: "school event" },
  { src: "https://hpschampa.in/assets/uploads/photo/cfe7672c47899fa866e01c717cf13fc9.jpeg", alt: "School event", hint: "school event" },
  { src: "https://placehold.co/600x400.png", alt: "Matki Phod event", hint: "matki phod" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg cursor-pointer group relative"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              data-ai-hint={image.hint}
              className="h-full w-full object-cover aspect-square transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              data-ai-hint={selectedImage.hint}
              className="w-full h-auto object-contain rounded-lg"
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
