"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, User as UserIcon, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get('/messages');
        const partners = new Map();
        res.data.forEach((msg: any) => {
           if (msg.sender_id === user?.id) {
              if (msg.receiver && !partners.has(msg.receiver_id)) partners.set(msg.receiver_id, msg.receiver);
           } else {
              if (msg.sender && !partners.has(msg.sender_id)) partners.set(msg.sender_id, msg.sender);
           }
        });
        setConversations(Array.from(partners.values()) as any);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchConversations();
  }, [user]);

  useEffect(() => {
    if (activeUser) {
       axios.get(`/messages/${activeUser.id}`).then((res) => {
         setMessages(res.data);
       });
    }
  }, [activeUser]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeUser) return;
    try {
       const res = await axios.post('/messages', { receiver_id: activeUser.id, content: newMessage });
       setMessages([...messages, res.data.message] as any);
       setNewMessage("");
    } catch (error) {
       console.error("Failed to send message", error);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex bg-card border border-border rounded-xl xl:rounded-3xl overflow-hidden shadow-sm">
      <div className="w-full sm:w-80 border-r border-border flex flex-col bg-muted/20">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9 bg-background/50 border-transparent shadow-none" placeholder="Search unread..." />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : conversations.length > 0 ? (
             conversations.map((partner: any) => (
                <button
                  key={partner.id}
                  onClick={() => setActiveUser(partner)}
                  className={cn(
                    "flex items-center gap-3 w-full p-3 rounded-xl text-left transition-colors",
                    activeUser?.id === partner.id ? "bg-primary/10 text-primary" : "hover:bg-accent"
                  )}
                >
                  <div className="relative w-12 h-12 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden">
                    {partner.avatar_url ? (
                      <img src={partner.avatar_url} alt={partner.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold">{partner.name?.charAt(0) || 'U'}</span>
                    )}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-semibold truncate text-foreground">{partner.name || 'Unknown User'}</h4>
                    <p className="text-xs text-muted-foreground truncate">Click to view messages</p>
                  </div>
                </button>
             ))
          ) : (
             <div className="text-center p-4 text-sm text-muted-foreground">No conversations yet</div>
          )}
        </div>
      </div>

      {activeUser ? (
        <div className="flex-1 flex flex-col bg-background relative hidden sm:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent pointer-events-none opacity-50 dark:opacity-5" />
          
          <div className="p-4 border-b border-border flex items-center gap-4 bg-card z-10">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
              {activeUser.avatar_url ? (
                  <img src={activeUser.avatar_url} alt={activeUser.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold">{activeUser.name?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{activeUser.name || 'Unknown User'}</h3>
              <p className="text-xs text-primary capitalize">{activeUser.role || 'Guest'}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 flex flex-col">
            {messages.length === 0 ? (
               <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Say hi to {activeUser.name || 'this user'}!</div>
            ) : (
               messages.map((msg: any) => {
                 const isMine = msg.sender_id === user?.id;
                 return (
                   <div key={msg.id} className={cn("flex w-full items-end gap-2", isMine ? "justify-end" : "justify-start")}>
                     {!isMine && (
                       <div className="w-8 h-8 rounded-full bg-muted shrink-0 flex items-center justify-center overflow-hidden">
                         {activeUser.avatar_url ? <img src={activeUser.avatar_url} alt="" className="w-full h-full object-cover"/> : <UserIcon className="w-4 h-4 text-muted-foreground"/>}
                       </div>
                     )}
                     <div className={cn(
                       "relative px-4 py-2.5 max-w-[70%] rounded-2xl text-sm",
                       isMine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"
                     )}>
                       {msg.content}
                     </div>
                   </div>
                 )
               })
            )}
            <div className="h-4" />
          </div>

          <div className="p-4 bg-card border-t border-border z-10">
            <form onSubmit={sendMessage} className="flex gap-2 max-w-4xl mx-auto">
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 rounded-full px-5 bg-muted/40 border-transparent focus-visible:ring-primary/30"
              />
              <Button type="submit" size="icon" className="rounded-full shadow-md shadow-primary/20 shrink-0 bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden sm:flex flex-col items-center justify-center text-center p-8 bg-background relative z-10">
          <div className="bg-primary/5 p-6 rounded-full mb-6 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
            <MessageSquare className="w-12 h-12 text-primary relative z-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
          <p className="text-muted-foreground max-w-sm">Select a conversation from the sidebar or start a new chat with your tutor or students.</p>
        </div>
      )}
    </div>
  );
}
