"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function AboutPage() {
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([{ name: "", progress: 50 }]);

  const addSkill = () => {
    setSkills([...skills, { name: "", progress: 50 }]);
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const updateSkill = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">About Page Settings</h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="about">About Yourself</Label>
            <Textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write about yourself"
              rows={6}
            />
          </div>

          <div className="space-y-4">
            <Label>Skills</Label>
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-[0.4]">
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    placeholder="Enter a skill"
                  />
                </div>
                <div className="flex-[0.5] flex items-center gap-2">
                  <Slider
                    value={[skill.progress]}
                    onValueChange={(value) =>
                      updateSkill(index, "progress", value[0])
                    }
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-12">
                    {skill.progress}%
                  </span>
                </div>
                <div className="flex-[0.1] flex justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeSkill(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addSkill} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>

          <Button className="w-full" size="lg">
            Update About
          </Button>
        </div>
      </Card>
    </div>
  );
}
