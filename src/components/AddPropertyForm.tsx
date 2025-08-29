import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AddPropertyFormProps {
  onClose: () => void;
  onSubmit: (property: any) => void;
}

export const AddPropertyForm = ({ onClose, onSubmit }: AddPropertyFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    imageUrl: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.price || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const property = {
      id: Date.now().toString(),
      title: formData.title,
      price: parseInt(formData.price),
      location: formData.location,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      squareFootage: parseInt(formData.squareFootage) || 0,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      description: formData.description,
      initialVotes: 1,
      dealType: "warm" as const,
    };

    onSubmit(property);
    toast({
      title: "Property Added!",
      description: "Your property listing has been added successfully.",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Add New Property Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Property Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Beautiful 3-bed family home with garden"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (£) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="250000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Manchester, UK"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="3"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="squareFootage">Square Footage</Label>
                <Input
                  id="squareFootage"
                  name="squareFootage"
                  type="number"
                  value={formData.squareFootage}
                  onChange={handleInputChange}
                  placeholder="1200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/house-image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what makes this property a great deal..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Add Property
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};