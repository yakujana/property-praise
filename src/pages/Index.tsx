import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, Home, Users } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { AddPropertyForm } from "@/components/AddPropertyForm";
import heroImage from "@/assets/hero-house.jpg";

const mockProperties = [
  {
    id: "1",
    title: "Stunning Victorian Terrace with Modern Upgrades",
    price: 285000,
    location: "Leeds, West Yorkshire",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1450,
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    description: "Beautifully renovated Victorian terrace in prime location. New kitchen, bathroom, and energy-efficient features. Perfect for families.",
    initialVotes: 47,
    dealType: "hot" as const,
  },
  {
    id: "2", 
    title: "Modern 2-Bed Apartment with City Views",
    price: 195000,
    location: "Birmingham City Centre",
    bedrooms: 2,
    bathrooms: 1,
    squareFootage: 850,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    description: "Contemporary apartment with floor-to-ceiling windows and private balcony. Excellent transport links and amenities nearby.",
    initialVotes: 23,
    dealType: "warm" as const,
  },
  {
    id: "3",
    title: "Charming Cottage with Large Garden",
    price: 320000,
    location: "Cotswolds, Gloucestershire", 
    bedrooms: 4,
    bathrooms: 2,
    squareFootage: 1850,
    imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    description: "Picturesque stone cottage with original features and expansive gardens. Rural setting with good commuter links.",
    initialVotes: 12,
    dealType: "cold" as const,
  }
];

const Index = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortBy, setSortBy] = useState<"votes" | "price" | "recent">("votes");

  const handleAddProperty = (newProperty: any) => {
    setProperties(prev => [newProperty, ...prev]);
  };

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.initialVotes - a.initialVotes;
      case "price":
        return a.price - b.price;
      case "recent":
        return parseInt(b.id) - parseInt(a.id);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={heroImage} 
          alt="Beautiful house deal"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Property Deals
            <span className="block text-success">Community</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover amazing property deals rated by the community. Share, vote, and find your perfect home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setShowAddForm(true)} className="text-lg px-8">
              <Plus className="mr-2 h-5 w-5" />
              Add Property Deal
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <TrendingUp className="mr-2 h-5 w-5" />
              Browse Hot Deals
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Home className="h-12 w-12 mx-auto text-primary" />
              <div className="text-3xl font-bold">{properties.length}+</div>
              <div className="text-muted-foreground">Property Deals</div>
            </div>
            <div className="space-y-2">
              <Users className="h-12 w-12 mx-auto text-primary" />
              <div className="text-3xl font-bold">2.5K+</div>
              <div className="text-muted-foreground">Community Members</div>
            </div>
            <div className="space-y-2">
              <TrendingUp className="h-12 w-12 mx-auto text-primary" />
              <div className="text-3xl font-bold">15K+</div>
              <div className="text-muted-foreground">Votes Cast</div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Property Deals</h2>
              <p className="text-muted-foreground">Community-rated property deals from across the UK</p>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={sortBy === "votes" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("votes")}
              >
                Top Rated
              </Button>
              <Button
                variant={sortBy === "price" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("price")}
              >
                Price: Low to High
              </Button>
              <Button
                variant={sortBy === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("recent")}
              >
                Most Recent
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          {properties.length === 0 && (
            <div className="text-center py-16">
              <Home className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No properties yet</h3>
              <p className="text-muted-foreground mb-6">Be the first to add a property deal!</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Property
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Property Deals Community
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Help others find amazing property deals and discover great investments yourself.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => setShowAddForm(true)}
            className="text-lg px-8"
          >
            <Plus className="mr-2 h-5 w-5" />
            Share Your First Deal
          </Button>
        </div>
      </section>

      {/* Add Property Form Modal */}
      {showAddForm && (
        <AddPropertyForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddProperty}
        />
      )}
    </div>
  );
};

export default Index;