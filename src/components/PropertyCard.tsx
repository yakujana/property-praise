import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, MapPin, Bed, Bath, Square } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  imageUrl: string;
  description: string;
  initialVotes: number;
  dealType: "hot" | "warm" | "cold";
}

export const PropertyCard = ({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  squareFootage,
  imageUrl,
  description,
  initialVotes,
  dealType,
}: PropertyCardProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // Remove vote
      setVotes(votes + (type === "up" ? -1 : 1));
      setUserVote(null);
    } else {
      // Add or change vote
      const adjustment = userVote 
        ? (type === "up" ? 2 : -2) // Changing from opposite vote
        : (type === "up" ? 1 : -1); // First vote
      setVotes(votes + adjustment);
      setUserVote(type);
    }
  };

  const formatPrice = (price: number) => {
    return `£${price.toLocaleString()}`;
  };

  const getDealBadgeVariant = (type: string) => {
    switch (type) {
      case "hot": return "default";
      case "warm": return "secondary";
      case "cold": return "outline";
      default: return "secondary";
    }
  };

  const getDealText = (type: string) => {
    switch (type) {
      case "hot": return "🔥 Hot Deal";
      case "warm": return "👍 Good Deal";
      case "cold": return "❄️ Cold Deal";
      default: return "Deal";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <Badge 
          className="absolute top-3 left-3"
          variant={getDealBadgeVariant(dealType)}
        >
          {getDealText(dealType)}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-1">{title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
            <div className="text-2xl font-bold text-primary">
              {formatPrice(price)}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <Button
              variant={userVote === "up" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote("up")}
              className="h-8 w-8 p-0"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-sm min-w-[2rem] text-center">
              {votes}
            </span>
            <Button
              variant={userVote === "down" ? "destructive" : "outline"}
              size="sm"
              onClick={() => handleVote("down")}
              className="h-8 w-8 p-0"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {bedrooms} bed
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {bathrooms} bath
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            {squareFootage.toLocaleString()} sqft
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};