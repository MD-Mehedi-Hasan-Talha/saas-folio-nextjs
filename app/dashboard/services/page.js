"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const SAMPLE_SERVICES = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    title: "Web Development",
    description:
      "Building modern, responsive websites using the latest technologies and best practices. Focus on performance, accessibility, and user experience.",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&q=80",
    title: "UI/UX Design",
    description:
      "Creating beautiful and intuitive user interfaces with a focus on user experience. Using modern design tools and following the latest trends.",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80",
    title: "Mobile Development",
    description:
      "Developing cross-platform mobile applications using React Native and Flutter. Creating native-like experiences for both iOS and Android.",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    title: "Digital Marketing",
    description:
      "Implementing effective digital marketing strategies to help businesses grow their online presence and reach their target audience.",
  },
];

export default function ServicesPage() {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [services] = useState(SAMPLE_SERVICES);

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Create New Service</h2>

        <div className="space-y-6">
          <div>
            <Label>Thumbnail</Label>
            <div className="mt-2 flex items-center gap-4">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="Thumbnail"
                  width={200}
                  height={120}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-[200px] h-[120px] bg-muted rounded-lg flex items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <Input
                type="file"
                className="hidden"
                id="thumbnail"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setThumbnail(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("thumbnail")?.click()}
              >
                Choose Thumbnail
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter service title"
            />
          </div>

          <div>
            <Label htmlFor="description">Service Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter service description"
              rows={4}
            />
          </div>

          <Button className="w-full" size="lg">
            Create Service
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <Image
              src={service.thumbnail}
              alt={service.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description.slice(0, 100)}...
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{service.title}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <Image
                      src={service.thumbnail}
                      alt={service.title}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
