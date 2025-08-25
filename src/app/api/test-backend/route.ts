import { NextResponse } from 'next/server';

export async function GET() {
  const ports = [5000, 3000, 8000, 4000, 5001]; // Common backend ports
  const endpoints = ['/client/test', '/client/health']; // Test endpoints
  
  for (const port of ports) {
    for (const endpoint of endpoints) {
      try {
        console.log(`Testing ${endpoint} on port ${port}...`);
        
        const response = await fetch(`http://localhost:${port}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(`${endpoint} on port ${port} response status:`, response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`Backend found on port ${port} at ${endpoint}:`, data);
          return NextResponse.json({ 
            success: true, 
            data,
            port,
            endpoint,
            message: `Backend is running on port ${port} at ${endpoint}`
          });
        } else {
          const errorText = await response.text();
          console.log(`${endpoint} on port ${port} error response:`, errorText);
        }
      } catch (error) {
        console.log(`${endpoint} on port ${port} connection failed:`, error);
        continue;
      }
    }
  }

  return NextResponse.json({ 
    success: false, 
    message: 'Backend server not found on any common ports or endpoints',
    suggestion: 'Please check if the backend is running with npm run start:dev and MongoDB is accessible'
  });
}
