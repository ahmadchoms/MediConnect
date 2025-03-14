import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const SuccessMessage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <Card className="max-w-md mx-auto">
      <CardContent className="pt-6 pb-8 px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CircleCheck className="h-10 w-10 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Reservasi Berhasil!
        </h2>
        <p className="text-gray-600 mb-6">
          Terima kasih telah melakukan reservasi. Detail janji telah dikirim ke
          email Anda.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/doctors">
            <Button variant="outline" className="w-full">
              Lihat Jadwal Dokter
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full">Kembali ke Beranda</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
