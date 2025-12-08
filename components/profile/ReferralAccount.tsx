"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { updateUserAPi } from "@/api-endpoints/authendication";
import { useVendor } from "@/context/VendorContext";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // or your preferred toast library
import { Copy } from "lucide-react";
import axios from "axios";
import { baseUrl } from "@/api-endpoints/ApiUrls";

export default function ReferralAccount() {
    const { user }: any = useUser();

    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const queryClient = useQueryClient();
    const { vendorId } = useVendor();

    useEffect(() => {
        if (user) {

            setReferralCode(user?.data?.referral_code || null);
        }
    }, [user]);

    ;


    // ✅ Generate Referral Code
    const handleGenerateReferral = async () => {
        try {
            const payload = {
                user_id: user?.data?.id,
                vendor_id: vendorId,
                updated_by: "user"
            }
            const response = await axios.post(`${baseUrl}/generate-user-referral-code/`, payload);
            toast.success("Referral code generated successfully!");
            queryClient.invalidateQueries(["gerUserData"] as InvalidateQueryFilters);

        } catch (error) {
            console.error("Error generating referral code:", error);
            toast.error("Failed to generate referral code.");
        }
    };

    // ✅ Copy to Clipboard
    const handleCopy = async () => {
        if (referralCode) {
            await navigator.clipboard.writeText(referralCode);
            setCopySuccess(true);
            toast.success("Referral code copied!");
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Referral Information</CardTitle>
                </CardHeader>

                <CardContent>


                    {/* ✅ Referral Code Section */}
                    <div className="mt-8 space-y-3">

                        {referralCode ? (
                            <div className="flex items-center gap-3">
                                <Input value={referralCode} readOnly />
                                <Button
                                    variant="outline"
                                    onClick={handleCopy}
                                    className="flex items-center gap-2"
                                >
                                    <Copy size={18} />
                                    {copySuccess ? "Copied!" : "Copy"}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={handleGenerateReferral}
                                className="bg-[#a8822d] hover:bg-[#7f5f20]"
                            >
                                Generate Referral Code
                            </Button>
                        )}
                    </div>
                </CardContent>


            </Card>
        </div>
    );
}
