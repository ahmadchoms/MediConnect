import { Card, CardContent } from "@/components/ui/card";

export default function CardDashboard({
  title,
  data,
  description,
  icon: Icon,
}) {
  return (
    <Card className="flex justify-center">
      <CardContent>
        <div className="text-sm font-medium text-gray-500 pb-1">{title}</div>
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-blue-600" />
          <div className="text-2xl font-bold text-blue-600">{data}</div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
