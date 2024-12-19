import { Header } from "@/components/Header";
import { AdminPanel } from "@/components/AdminPanel";
import { Login } from "@/components/Login";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8">Content Management</h1>
        {session ? <AdminPanel /> : <Login />}
      </main>
    </div>
  );
};

export default Admin;