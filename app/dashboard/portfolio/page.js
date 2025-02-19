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

const SAMPLE_PROJECTS = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80",
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js and Stripe, featuring a modern design and seamless checkout experience.",
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&q=80",
    title: "Social Media Dashboard",
    description:
      "A comprehensive social media dashboard that helps businesses manage their online presence across multiple platforms.",
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, built using React and Firebase.",
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    title: "Portfolio Website",
    description:
      "A modern portfolio website template built with Next.js and Tailwind CSS, featuring smooth animations and responsive design.",
  },
];

export default function PortfolioPage() {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects] = useState(SAMPLE_PROJECTS);

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

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
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
            />
          </div>

          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows={4}
            />
          </div>

          <Button className="w-full" size="lg">
            Add Project
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {project.description.slice(0, 100)}...
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
                    <DialogTitle>{project.title}</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-muted-foreground">
                      {project.description}
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
