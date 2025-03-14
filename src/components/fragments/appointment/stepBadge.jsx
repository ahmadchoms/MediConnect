export default function StepBadge({ step, many }) {
  return (
    <span
      className={`w-7 p-1 text-center rounded-full ${
        step >= many ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
    >
      {many}
    </span>
  );
}
