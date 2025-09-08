export default function GlobalLoading() {
  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-1 bg-transparent">
      <div
        className="h-full w-[40%]"
        style={{
          animation: "route-progress 1.2s ease-in-out infinite",
          background: "#22c55e",
        }}
      />
    </div>
  );
}
