"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Loader2 } from "lucide-react";

export default function ClassesPage() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        if (user?.role === 'tutor') {
           const res = await axios.get('/courses');
           setClasses(res.data);
        } else {
           const res = await axios.get('/enrollments');
           setClasses(res.data.map((e: any) => e.course).filter(Boolean));
        }
      } catch (error) {
        console.error("Failed to fetch classes", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) fetchClasses();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Classes</h1>
          <p className="text-muted-foreground mt-1">Manage and view your educational courses.</p>
        </div>
        
        {user?.role === 'tutor' && (
          <Button className="shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5 mr-2" />
            Create New Class
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls: any) => (
            <Card key={cls.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-transparent hover:border-primary/20">
              <div className="h-40 bg-muted relative overflow-hidden">
                 {cls.cover_image_url ? (
                   <img src={cls.cover_image_url} alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                   <div className="w-full h-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-3xl group-hover:scale-105 transition-transform duration-500">
                     {cls.title?.charAt(0) || 'C'}
                   </div>
                 )}
                 <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-foreground shadow-sm">
                   {cls.subject || 'General'}
                 </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{cls.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                  {cls.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center text-sm text-muted-foreground font-medium">
                    <span className="text-primary font-bold">${cls.price_per_session}</span>
                    <span className="ml-1">/ session</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                    View <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto mt-10">
          <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
             <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">No classes found</h3>
          <p className="text-muted-foreground mb-6">
            {user?.role === 'tutor' 
              ? "You haven't created any classes yet. Share your knowledge with the world!" 
              : "You are not enrolled in any classes yet. Browse our catalog to get started."}
          </p>
          <Button>
            {user?.role === 'tutor' ? "Create First Class" : "Browse Catalog"}
          </Button>
        </div>
      )}
    </div>
  );
}
