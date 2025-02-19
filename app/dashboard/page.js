"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function DashboardPage() {
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard Settings</h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="url">Website URL</Label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL"
                />
                <Button variant="outline" size="icon" onClick={handleCopyUrl}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Label>Logo</Label>
            <div className="mt-2 flex items-center gap-4">
              {logo ? (
                <Image
                  src={logo}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-[100px] h-[100px] bg-muted rounded-lg flex items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <Input
                type="file"
                className="hidden"
                id="logo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setLogo(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("logo")?.click()}
              >
                Choose Logo
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description"
              rows={4}
            />
          </div>

          <Button className="w-full" size="lg">
            Update Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
