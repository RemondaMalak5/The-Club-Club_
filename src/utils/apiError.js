/**
 * Safely extracts a human-readable string message from any Axios error or API response payload,
 * preventing React crashes when backend returns objects like { success, error, code, status_code }.
 */
export const extractApiErrorMessage = (
  input,
  fallback = "An unexpected error occurred"
) => {
  if (!input) return fallback;
  if (typeof input === "string") return input;

  // Unwrap Axios error if present
  const data = input?.response?.data ?? input;

  if (typeof data === "string") return data;

  const msgObj = data?.message;

  if (typeof msgObj === "string" && msgObj.trim()) {
    return msgObj;
  }

  if (msgObj && typeof msgObj === "object") {
    if (typeof msgObj.error === "string" && msgObj.error.trim()) {
      return msgObj.error;
    }
    if (typeof msgObj.message === "string" && msgObj.message.trim()) {
      return msgObj.message;
    }
    if (msgObj.error && typeof msgObj.error === "object") {
      if (typeof msgObj.error.message === "string") return msgObj.error.message;
    }
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  if (typeof data?._server_messages === "string") {
    try {
      const parsed = JSON.parse(data._server_messages);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const first =
          typeof parsed[0] === "string" ? JSON.parse(parsed[0]) : parsed[0];
        if (typeof first?.message === "string" && first.message.trim()) {
          return first.message;
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
  }

  if (typeof input?.message === "string" && !input?.response) {
    return input.message;
  }

  return fallback;
};
