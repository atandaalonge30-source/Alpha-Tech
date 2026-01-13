import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setRegistrations(users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#003366', margin: 0 }}>
            📊 User Registrations Dashboard
          </h1>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <p style={{ marginTop: 0, marginBottom: '20px', color: '#666', fontSize: '16px' }}>
            Total Registrations: <strong>{registrations.length}</strong>
          </p>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#999' }}>Loading registrations...</p>
          ) : registrations.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>No registrations yet</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>#</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', color: '#374151' }}>Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((user, index) => (
                    <tr key={user.id} style={{
                      borderBottom: '1px solid #e5e7eb',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
                    }}>
                      <td style={{ padding: '12px', color: '#6b7280' }}>{index + 1}</td>
                      <td style={{ padding: '12px', color: '#111827', fontWeight: '500' }}>{user.name}</td>
                      <td style={{ padding: '12px', color: '#6b7280' }}>{user.email}</td>
                      <td style={{ padding: '12px', color: '#6b7280' }}>
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
