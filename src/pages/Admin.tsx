import { Header } from "@/components/Header";
import { AdminPanel } from "@/components/AdminPanel";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8">Content Management</h1>
        <AdminPanel />
      </main>
    </div>
  );
};

export default Admin;