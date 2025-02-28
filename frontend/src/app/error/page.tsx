"use client";

import { Button, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";

type ErrorType = "auth_failed" | "invalid_state" | "default";

export default function ErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  const messages: Record<ErrorType, string> = {
    auth_failed: "Failed to authenticate with Spotify",
    invalid_state: "Security validation failed",
    default: "Something went wrong",
  };

  // Type guard to validate error type
  const getErrorMessage = (): ErrorType => {
    if (error === "auth_failed" || error === "invalid_state") {
      return error;
    }
    return "default";
  };

  return (
    <div className="error-container">
      <Text size="xl" c="red">
        {messages[getErrorMessage()]}
      </Text>
      <Button variant="outline" onClick={() => (window.location.href = "/")}>
        Return Home
      </Button>
    </div>
  );
}
