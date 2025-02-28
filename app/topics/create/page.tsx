"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateTopicPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Implement API call to create topic
    // For now, just redirect back to home page
    router.push("/");
  };

  return (
    <div className="mx-auto px-4 py-8 h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Topic</CardTitle>
            <CardDescription>
              Fill in the details below to create your topic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Topic Title
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter topic title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter topic description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="passcode" className="text-sm font-medium">
                  Passcode
                </label>
                <Input
                  id="passcode"
                  type="text"
                  placeholder="Enter a passcode for others to join"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Share this passcode with others so they can join your topic
                </p>
              </div>

              <div className="flex gap-4">
                <Link href="/" className="w-full">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!title || !description || !passcode}
                >
                  Create Topic
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
