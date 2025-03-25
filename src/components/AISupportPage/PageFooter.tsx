
export const PageFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} PLANNINGJOY株式会社</p>
        <p className="mt-2">神戸・兵庫を拠点に、AI活用した経営コンサルティングを提供</p>
      </div>
    </footer>
  );
};
