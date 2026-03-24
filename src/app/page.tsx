"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navigation */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">TEESHA</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link href="/register">
              <Button className="shadow-md shadow-primary/20 rounded-full px-6">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative py-20 lg:py-32 overflow-hidden flex-1 flex flex-col justify-center">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-48 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                The Next Generation of Learning
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground tracking-tight mb-8 leading-[1.1]">
                Master any subject with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand-400">Expert Tutors</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Join thousands of students and educators on TEESHA. Experience seamless scheduling, interactive classes, and transformative learning.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-base h-14 px-8 rounded-full shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                    Find a Tutor <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full text-base h-14 px-8 rounded-full border-border hover:bg-accent transition-all hover:scale-105">
                    Become a Tutor
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">1-on-1 Sessions</h3>
                <p className="text-muted-foreground">Personalized attention from verified experts tailored to your unique learning style and pace.</p>
              </div>
              
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Diverse Subjects</h3>
                <p className="text-muted-foreground">From advanced mathematics to languages and arts, find the perfect course for your goals.</p>
              </div>
              
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Seamless Tracking</h3>
                <p className="text-muted-foreground">Integrated calendars, assignments, and messaging tools to keep you focused on succeeding.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card text-center relative z-20">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} TEESHA Tutor Platform. Engineered for excellence.
        </p>
      </footer>
    </div>
  );
}
