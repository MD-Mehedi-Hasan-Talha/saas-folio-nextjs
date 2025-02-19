"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [profileImage, setProfileImage] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    github: "",
    linkedin: "",
  });

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Home Page Settings</h2>

        <div className="space-y-6">
          <div>
            <Label>Profile Image</Label>
            <div className="mt-2 flex items-center gap-4">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-[120px] h-[120px] bg-muted rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <Input
                type="file"
                className="hidden"
                id="profile"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfileImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("profile")?.click()}
              >
                Choose Profile Image
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="introduction">Introduction</Label>
            <Textarea
              id="introduction"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="Write a brief introduction about yourself"
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Links</h3>

            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-blue-600" />
                <Input
                  placeholder="Facebook URL"
                  value={socialLinks.facebook}
                  onChange={(e) =>
                    setSocialLinks((prev) => ({
                      ...prev,
                      facebook: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-600" />
                <Input
                  placeholder="Instagram URL"
                  value={socialLinks.instagram}
                  onChange={(e) =>
                    setSocialLinks((prev) => ({
                      ...prev,
                      instagram: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Twitter className="h-5 w-5 text-blue-400" />
                <Input
                  placeholder="Twitter URL"
                  value={socialLinks.twitter}
                  onChange={(e) =>
                    setSocialLinks((prev) => ({
                      ...prev,
                      twitter: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                <Input
                  placeholder="GitHub URL"
                  value={socialLinks.github}
                  onChange={(e) =>
                    setSocialLinks((prev) => ({
                      ...prev,
                      github: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-blue-700" />
                <Input
                  placeholder="LinkedIn URL"
                  value={socialLinks.linkedin}
                  onChange={(e) =>
                    setSocialLinks((prev) => ({
                      ...prev,
                      linkedin: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Update Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
