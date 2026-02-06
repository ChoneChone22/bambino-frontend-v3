"use client";

import { User } from "@/components/UserContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import Image from "next/image";

interface ProfileSectionProps {
  user: User;
  isEditing: boolean;
  formData: { name: string; email: string; profileImageUrl: string | null };
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
  onFormChange: (field: string, value: string) => void;
}

export default function ProfileSection({
  user,
  isEditing,
  formData,
  isSaving,
  onEdit,
  onCancel,
  onSave,
  onFormChange,
}: ProfileSectionProps) {
  const memberId = user.memberId ?? "";
  const memberQrCodeUrl = user.memberQrCodeUrl ?? "";
  const points =
    typeof user.points === "number" && !Number.isNaN(user.points)
      ? user.points
      : null;
  console.log("points", points);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold heading">Profile Information</h2>

          {!isEditing && (
            <Button
              onClick={onEdit}
              variant="ghost"
              className="flex items-center gap-2 heading"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium sub_heading mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-0 py-3 sub_heading secondary_background card border-b primary_border placeholder:heading focus:outline-none focus:primary_border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => onFormChange("name", e.target.value)}
                className="w-full px-0 py-3 heading bg-transparent border-b primary_border placeholder:heading focus:outline-none focus:primary_border transition-colors"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={onSave}
                disabled={isSaving}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button onClick={onCancel} variant="secondary">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Basic profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                <p className="font-medium text-foreground">{user.name}</p>
              </div>
            </div>
            {/* Membership (view-only) */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold heading mb-4">Membership</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  {memberId && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Member ID
                      </p>
                      <p className="font-medium text-foreground">{memberId}</p>
                    </div>
                  )}

                  {points !== null && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Points
                      </p>
                      <p className="font-medium text-foreground">{points}</p>
                    </div>
                  )}
                </div>

                {memberQrCodeUrl && (
                  <div className="md:justify-self-end">
                    <p className="text-sm text-muted-foreground mb-2">
                      Member QR Code
                    </p>

                    <div className="relative w-44 h-44 rounded-xl border border-border bg-white overflow-hidden">
                      <Image
                        src={memberQrCodeUrl}
                        alt="Member QR code"
                        fill
                        className="object-contain"
                        sizes="176px"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            )
          </div>
        )}
      </Card>
    </div>
  );
}
