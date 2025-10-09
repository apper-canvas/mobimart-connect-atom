const Loading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-100">
          <div className="aspect-square bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded w-1/3" />
            <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
            <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded w-16" />
              <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded w-16" />
            </div>
            <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded w-24" />
            <div className="h-10 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;