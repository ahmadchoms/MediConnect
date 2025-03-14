import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ status }) => {
    const statusConfig = {
        confirmed: {
            bg: "bg-green-100",
            text: "text-green-800",
            hover: "hover:bg-green-200",
            label: "Sudah Dikonfirmasi Dokter"
        },
        waiting: {
            bg: "bg-yellow-100",
            text: "text-yellow-800",
            hover: "hover:bg-yellow-200",
            label: "Menunggu Dokter"
        },
        completed: {
            bg: "bg-blue-100",
            text: "text-blue-800",
            hover: "hover:bg-blue-200",
            label: "Sudah Dilaksanakan"
        },
        canceled: {
            bg: "bg-red-100",
            text: "text-red-800",
            hover: "hover:bg-red-200",
            label: "Dibatalkan"
        }
    };

    const config = statusConfig[status];
    if (!config) return null;

    return (
        <Badge className={`${config.bg} ${config.text} ${config.hover}`}>
            {config.label}
        </Badge>
    );
};

export default StatusBadge;