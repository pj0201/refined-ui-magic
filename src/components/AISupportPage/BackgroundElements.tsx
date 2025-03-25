
export const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <img 
        src="/lovable-uploads/48c4d18a-f636-4c33-8562-63034fb88968.png" 
        alt="" 
        className="absolute top-20 right-10 w-64 h-64 object-contain"
      />
      <img 
        src="/lovable-uploads/215b3cb0-0a3f-4bb3-bdca-bedabb486622.png" 
        alt="" 
        className="absolute bottom-40 left-10 w-48 h-48 object-contain"
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur-3xl opacity-10"></div>
    </div>
  );
};
