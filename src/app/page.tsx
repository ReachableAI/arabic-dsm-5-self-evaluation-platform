export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">
          منصة التقييم الذاتي
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          مرحباً بك في منصة التقييم الذاتي المبنية على معايير DSM-5-TR
        </p>
        <div className="mt-8 p-6 bg-surface rounded-lg shadow-md">
          <p className="text-text-primary">
            هذا هو الأساس التقني للمنصة. سيتم إضافة المزيد من الميزات قريباً.
          </p>
        </div>
      </div>
    </main>
  );
}
