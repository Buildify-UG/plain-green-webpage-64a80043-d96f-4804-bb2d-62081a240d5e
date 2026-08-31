
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Users</h1>
        
        {loading ? (
          <p className="text-foreground">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-foreground">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="text-left p-3 text-foreground font-semibold">Name</th>
                  <th className="text-left p-3 text-foreground font-semibold">Email</th>
                  <th className="text-left p-3 text-foreground font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-foreground border-opacity-30 hover:bg-black hover:bg-opacity-10">
                    <td className="p-3 text-foreground">{user.name}</td>
                    <td className="p-3 text-foreground">{user.email}</td>
                    <td className="p-3 text-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
