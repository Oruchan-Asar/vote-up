import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            VoteUp
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-muted-foreground">
            Your Community-Driven Content Ranking Platform
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Link
              href="/register"
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Get Started
            </Link>
            <Link
              href="/explore"
              className="rounded-full border border-foreground/20 px-6 py-3 font-semibold hover:bg-foreground/5 transition"
            >
              Explore Topics
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Voting System */}
          <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
            <CardHeader>
              <div className="text-2xl mb-4">↑↓</div>
              <CardTitle>Advanced Voting System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Upvote and downvote content with real-time score tracking and
                user reputation system.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
            <CardHeader>
              <div className="text-2xl mb-4">💬</div>
              <CardTitle>Interactive Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Engage in rich discussions with nested comment threads and
                real-time updates.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Topics */}
          <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
            <CardHeader>
              <div className="text-2xl mb-4">📝</div>
              <CardTitle>Topic Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create, categorize, and discover topics that matter to you.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Search */}
          <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
            <CardHeader>
              <div className="text-2xl mb-4">🔍</div>
              <CardTitle>Smart Search</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Find exactly what you&apos;re looking for with full-text search
                and advanced filtering.
              </CardDescription>
            </CardContent>
          </Card>

          {/* User Features */}
          <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
            <CardHeader>
              <div className="text-2xl mb-4">👤</div>
              <CardTitle>User Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build your reputation, earn badges, and manage your content
                seamlessly.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Real-time */}
          <Card className="bg-background/50 backdrop-blur-sm border-foreground/10">
            <CardHeader>
              <div className="text-2xl mb-4">⚡</div>
              <CardTitle>Real-time Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Experience instant updates to votes, comments, and
                notifications.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
