"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function CookieDebugger() {
  const [cookies, setCookies] = useState<string>("");
  const [visible, setVisible] = useState(false);

  const updateCookies = () => {
    setCookies(document.cookie);
  };

  useEffect(() => {
    updateCookies();
    // Update cookies every 2 seconds
    const interval = setInterval(updateCookies, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setVisible(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        Debug Cookies
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-background border rounded-md shadow-md w-80">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Cookie Debugger</h3>
        <Button variant="ghost" size="sm" onClick={() => setVisible(false)}>
          Close
        </Button>
      </div>
      <div className="text-xs overflow-auto max-h-40 p-2 bg-muted rounded">
        {cookies ? (
          cookies.split(";").map((cookie, i) => (
            <div key={i} className="mb-1">
              {cookie.trim()}
            </div>
          ))
        ) : (
          <div>No cookies found</div>
        )}
      </div>
      <div className="mt-2 flex justify-between">
        <Button size="sm" variant="outline" onClick={updateCookies}>
          Refresh
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            document.cookie.split(";").forEach((cookie) => {
              const name = cookie.split("=")[0].trim();
              document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });
            updateCookies();
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
