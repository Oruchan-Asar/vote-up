"use client";

import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface Topic {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
}

export default function Topic({ params }: { params: Promise<{ id: string }> }) {
  const [topic, setTopic] = useState<Topic>();
  const [comments, setComments] = useState<Comment[]>([]);
  const form = useForm({
    defaultValues: {
      message: "",
      badges: "",
    },
  });

  useEffect(() => {
    async function fetchTopicAndComments() {
      const { id } = await params;
      const response = await fetch(`/api/topics/${id}`);
      if (!response.ok) {
        notFound();
      }
      const data = await response.json();
      setTopic(data);
      // Fetch comments
      const commentsRes = await fetch(`/api/topics/${id}/comments`);
      if (commentsRes.ok) {
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      }
    }
    fetchTopicAndComments();
  }, [params]);

  async function refetchComments() {
    if (!topic) return;
    const commentsRes = await fetch(`/api/topics/${topic.id}/comments`);
    if (commentsRes.ok) {
      const commentsData = await commentsRes.json();
      setComments(commentsData);
    }
  }

  function onSubmit(values: { message: string; badges: string }) {
    if (!topic) return;
    fetch(`/api/topics/${topic.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: values.message }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to submit comment");
        }
        toast({
          title: "Success",
          description: "Comment submitted successfully!",
          variant: "default",
        });
        form.reset();
        await refetchComments();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
        console.error(err);
      });
  }

  if (!topic) {
    return (
      <div className="max-w-screen-lg mx-auto my-8 p-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto my-8 p-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {topic.title}
      </h1>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-gray-600">
          Posted by {topic.author.name || "Anonymous"}
        </span>
        <span className="text-gray-400">
          • {new Date(topic.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="prose max-w-none">
        <p className="leading-7 [&:not(:first-child)]:mt-6">{topic.content}</p>
      </div>

      <Separator className="my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here"
                    {...field}
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  Your message will be displayed below.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="badges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badges</FormLabel>
                <FormControl>
                  <Input placeholder="Add some badges" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>

      <Separator className="my-4" />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-6">
            {comments.map((comment) => (
              <li key={comment.id} className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">
                    {comment.author.name || "Anonymous"}
                  </span>
                  <span className="text-gray-400 text-xs">
                    • {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-base">{comment.content}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
