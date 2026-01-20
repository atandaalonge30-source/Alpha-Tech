import React, { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../src/firebase';
import { LogOut, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStudents] = useState(300);

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

        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Total Registrations Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: '5px solid #003366'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ padding: '12px', backgroundColor: '#003366', borderRadius: '8px', color: 'white' }}>
                <Users size={24} />
              </div>
              <div>
                <p style={{ margin: 0, color: '#666', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Platform Users
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#003366' }}>
                  {registrations.length}+
                </p>
              </div>
            </div>
          </div>

          {/* Alpha Tech Students Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: '5px solid #FFCC00'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ padding: '12px', backgroundColor: '#FFCC00', borderRadius: '8px', color: '#003366' }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <p style={{ margin: 0, color: '#666', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Total Trained Students
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#FFCC00' }}>
                  300+
                </p>
              </div>
            </div>
          </div>

          {/* Success Rate Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderLeft: '5px solid #10b981'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ padding: '12px', backgroundColor: '#10b981', borderRadius: '8px', color: 'white' }}>
                <CheckCircle size={24} />
              </div>
              <div>
                <p style={{ margin: 0, color: '#666', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Success Rate
                </p>
                <p style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
                  95%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <p style={{ marginTop: 0, marginBottom: '20px', color: '#666', fontSize: '16px' }}>
            <strong>New Platform Registrations: {registrations.length}</strong>
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
