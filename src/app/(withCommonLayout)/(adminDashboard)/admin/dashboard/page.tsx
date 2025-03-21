export default function Page() {
  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin portal</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Dashboard content would go here */}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="font-medium">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="font-medium">Categories</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="font-medium">Revenue</h3>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
