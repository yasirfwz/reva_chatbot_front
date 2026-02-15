import ChatWidget from "@/components/chat/chat-widget";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      {/* 1. Page Header Skeleton */}
      <header className="max-w-4xl mx-auto mb-12">
        <div className="h-8 w-48 bg-slate-200 rounded-md animate-pulse mb-4" />
        <div className="h-4 w-full max-w-md bg-slate-200 rounded-md animate-pulse" />
      </header>

      {/* 2. Scrollable Content Area */}
      <section className="max-w-4xl mx-auto space-y-8">
        {/* Generating 8 skeleton sections to force scrolling */}
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </section>

      {/* 3. Footer Skeleton */}
      <footer className="max-w-4xl mx-auto mt-12 pb-24 border-t pt-8">
        <div className="h-4 w-32 bg-slate-200 rounded-md animate-pulse" />
      </footer>

      {/* The Star of the Show */}
      <ChatWidget />
    </main>
  );
}

// A reusable Skeleton component for the layout
function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-200 rounded-md animate-pulse" />
          <div className="h-3 w-20 bg-slate-100 rounded-md animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-100 rounded-md animate-pulse" />
        <div className="h-4 w-full bg-slate-100 rounded-md animate-pulse" />
        <div className="h-4 w-2/3 bg-slate-100 rounded-md animate-pulse" />
      </div>
    </div>
  );
}
