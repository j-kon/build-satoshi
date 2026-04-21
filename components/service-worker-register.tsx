"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (process.env.NODE_ENV !== "production" || isLocal) {
      void navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
        .then(() => caches.keys())
        .then((keys) => Promise.all(keys.filter((key) => key.startsWith("build-satoshi-")).map((key) => caches.delete(key))));
      return;
    }

    void navigator.serviceWorker.register("/sw.js");
  }, []);

  return null;
}
