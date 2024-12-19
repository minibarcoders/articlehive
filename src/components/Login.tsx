import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase/client";
import { Card } from "./ui/card";

export const Login = () => {
  return (
    <Card className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Access</h2>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#7c3aed',
                brandAccent: '#6d28d9',
              },
            },
          },
        }}
        theme="light"
        providers={[]}
        redirectTo={window.location.origin + '/admin'}
      />
    </Card>
  );
};