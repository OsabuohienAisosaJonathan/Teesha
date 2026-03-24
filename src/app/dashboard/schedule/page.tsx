"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Video, Loader2 } from "lucide-react";

export default function SchedulePage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get('/sessions');
        const sorted = res.data.sort((a: any, b: any) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
        setSessions(sorted);
      } catch (error) {
        console.error("Failed to fetch schedule", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) fetchSchedule();
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
        <p className="text-muted-foreground mt-1">View and manage your upcoming classes and meetings.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : sessions.length > 0 ? (
        <div className="space-y-6">
          {sessions.map((session: any) => {
            const date = new Date(session.start_time);
            return (
              <Card key={session.id} className="overflow-hidden hover:shadow-md transition-shadow group border-l-4 border-l-primary/60 border-y-transparent border-r-transparent hover:border-l-primary">
                <CardContent className="p-0 flex flex-col sm:flex-row">
                  <div className="bg-muted/50 w-full sm:w-48 p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-border min-h-full">
                     <span className="text-sm font-semibold text-primary uppercase tracking-wider">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                     <span className="text-4xl font-bold text-foreground my-1">{date.getDate()}</span>
                     <span className="text-sm text-muted-foreground">{date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-center">
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-xl mb-1">{session.title}</h3>
                          <p className="text-primary font-medium text-sm mb-3">{session.course?.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1.5" />
                              {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(session.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div className="flex flex-center">
                               <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                 {session.status}
                               </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex shrink-0">
                           {session.meeting_link ? (
                             <Button onClick={() => window.open(session.meeting_link, '_blank')} className="shadow-md shadow-primary/20">
                               <Video className="w-4 h-4 mr-2" />
                               Join Meeting
                             </Button>
                           ) : (
                             <Button variant="outline" disabled>
                               Link Pending
                             </Button>
                           )}
                        </div>
                     </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto mt-10">
          <div className="bg-primary/10 p-4 rounded-full mb-4 text-primary">
             <CalendarIcon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Your schedule is clear</h3>
          <p className="text-muted-foreground mb-6">
            You don't have any upcoming sessions. Enjoy your free time!
          </p>
        </div>
      )}
    </div>
  );
}
