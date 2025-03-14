"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/validation/contact";
import { FormInput, FormTextArea } from "../auth/inputForm";
import { useFormRegister } from "@/hooks/useAuthForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ContactFormSection() {
    const {
        register,
        handleSubmit,
        errors,
        error,
        isLoading,
        onSubmit,
    } = useFormRegister(contactSchema, {
        name: "",
        email: "",
        message: "",
    });

    const handleContact = (data) => {
        onSubmit(
            data,
            "/api/contact",
            "Send message successful",
            "/contact"
        );
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Formulir Kontak</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Silakan isi formulir di bawah ini untuk menghubungi kami. Kami akan segera merespons pesan Anda.
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="p-8">
                        <form onSubmit={handleSubmit(handleContact)} className="space-y-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <FormInput
                                id="name"
                                label="Nama Lengkap"
                                type="text"
                                placeholder="Masukan Nama Lengkap"
                                register={register}
                                errors={errors}
                            />

                            <FormInput
                                id="email"
                                label="Email"
                                type="email"
                                placeholder="Masukan Email"
                                register={register}
                                errors={errors}
                            />

                            <FormTextArea
                                id="message"
                                label="Pesan"
                                placeholder="Masukan Pesan"
                                register={register}
                                errors={errors}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Processing..." : "Submit"}
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}