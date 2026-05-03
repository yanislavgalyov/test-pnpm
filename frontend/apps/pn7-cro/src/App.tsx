import Button from '@pn7/shared/components/ui/Button';

export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">pn7 CRO</h1>
      <p className="text-text-secondary">Shared workspace wired up.</p>
      <Button onClick={() => alert('Hello from @pn7/shared')}>Click me</Button>
    </main>
  );
}
