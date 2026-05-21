export default function RoomSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-24 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}