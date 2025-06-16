import React from "react";
import { PatternDisplay } from "@/components/common";
import { SmallLoader } from "@/utils.tsx";

export const ContactField = ({
  label,
  icon,
  isLoading,
  show,
  value,
  fallback,
  onReveal,
}: {
  label: string;
  icon: React.ReactNode;
  isLoading: boolean;
  show: boolean;
  value: Array<string>;
  fallback: string;
  onReveal: () => void;
}) => ({
  label,
  value: show ? (
    value.length > 0 ? (
      value
    ) : (
      fallback
    )
  ) : isLoading ? (
    <SmallLoader />
  ) : (
    <PatternDisplay handleShow={onReveal} />
  ),
  icon,
  isBadge: show && !!value && value.length > 0,
});
