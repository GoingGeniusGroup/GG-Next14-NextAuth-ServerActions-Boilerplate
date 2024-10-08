''
import FloatingDockDemo from "@/components/example/floating-dock-demo"
export const metadata = {
  title: 'Steam Profile Lookup',
  description: 'Look up Steam user profiles using their Steam ID',
}

export default function Example() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Steam Profile Lookup</h1>
      <FloatingDockDemo />
    </main>
  )
}