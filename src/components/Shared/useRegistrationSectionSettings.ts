"use client";

import { useEffect, useState } from "react";
import {
  defaultRegistrationSectionSettings,
  normalizeRegistrationSectionSettings,
  type RegistrationSectionSettings,
} from "@/lib/registration-section-config";

export function useRegistrationSectionSettings() {
  const [settings, setSettings] = useState<RegistrationSectionSettings>(
    defaultRegistrationSectionSettings,
  );

  useEffect(() => {
    let mounted = true;

    fetch("/api/home-sections/registration")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;
        setSettings(normalizeRegistrationSectionSettings(data.settings));
      })
      .catch(() => {
        if (!mounted) return;
        setSettings(defaultRegistrationSectionSettings);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return settings;
}
