import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "@/types/api/menuItem";

export default function SingleMenu({ item }: MenuItem) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-4/3 max-h-100 overflow-hidden border border-border">
              <Image
                src={item.imageUrls[selectedImage]}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {item.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden border transition-all duration-300 ${
                    selectedImage === index
                      ? "border-foreground"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${item.name} view ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-xs uppercase tracking-ultra-wide text-muted-foreground mb-4">
              {item.category}
            </p>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-6">
              {item.name}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              {item.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <span className="font-serif text-3xl">${item.price}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm uppercase tracking-wide text-muted-foreground">
                Quantity
              </span>
              <div className="flex items-center border border-border">
                <button
                  onClick={decreaseQuantity}
                  className="p-3 hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-3 hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button size="lg" className="flex-1">
                Buy Now
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Please inform us of any dietary requirements or allergies when
                ordering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
