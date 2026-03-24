"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, TrendingUp, Presentation, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ courses: 0, students: 0, sessions: 0 });
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [enrollmentsRes, sessionsRes] = await Promise.all([
          axios.get('/enrollments'),
          axios.get('/sessions')
        ]);
        
        setUpcomingSessions(sessionsRes.data.slice(0, 3));
        
        if (user?.role === 'tutor') {
           setStats({
             courses: enrollmentsRes.data.filter((e: any, i: number, self: any) => self.findIndex((t: any) => t.course_id === e.course_id) === i).length,
             students: enrollmentsRes.data.length,
             sessions: sessionsRes.data.length
           });
        } else {
           setStats({
             courses: enrollmentsRes.data.length,
             students: 0,
             sessions: sessionsRes.data.length
           });
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) fetchDashboardData();
  }, [user]);

  if (loading) {
    return <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your learning activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary">{user?.role === 'tutor' ? 'Active Courses' : 'Enrolled Classes'}</CardTitle>
            <BookOpen className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.courses}</div>
          </CardContent>
        </Card>

        {user?.role === 'tutor' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.students}</div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Sessions</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sessions}</div>
          </CardContent>
        </Card>

        {user?.role === 'student' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Learning Streak</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 Days</div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-foreground">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Sessions</h2>
            <Button variant="ghost" size="sm" className="text-primary">View Calendar</Button>
          </div>
          
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session: any) => (
                <div key={session.id} className="flex p-4 rounded-xl bg-card border border-border items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Presentation className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">{session.title}</h4>
                      <p className="text-sm text-muted-foreground">{session.course?.title} • {new Date(session.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                  </div>
                  <Button className="rounded-full shadow-md shadow-primary/20" size="sm">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Join
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl bg-card border border-dashed border-border flex flex-col items-center">
              <div className="bg-muted p-4 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">No sessions today</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">Take a break or review your assignments. You don't have any scheduled sessions.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
           <h2 className="text-xl font-semibold">Quick Actions</h2>
           <Card className="bg-primary text-primary-foreground border-transparent shadow-lg shadow-primary/20 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
             <CardContent className="p-6 relative z-10">
               <h3 className="font-bold text-lg mb-2">{user?.role === 'tutor' ? 'Create a Class' : 'Find a Tutor'}</h3>
               <p className="text-sm text-primary-foreground/80 mb-6">
                 {user?.role === 'tutor' 
                  ? 'Start sharing your knowledge with students worldwide.' 
                  : 'Browse our catalog of expert tutors and enroll in classes.'}
               </p>
               <Button className="w-full bg-white text-primary hover:bg-white/90">
                 {user?.role === 'tutor' ? 'New Course' : 'Browse Courses'}
               </Button>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
