"use client";

import { useEffect, useMemo, useState } from "react";
import type { RegistrationSectionSettings } from "@/lib/registration-section-config";

function pad(value: number) {
  return String(Math.max(0, Math.min(99, value))).padStart(2, "0");
}

function getRemaining(targetAt: string) {
  const targetTime = Date.parse(targetAt);
  if (!Number.isFinite(targetTime)) return null;

  const totalSeconds = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

export function useCountdownValues(settings: RegistrationSectionSettings) {
  const staticValues = useMemo(
    () => ({
      days: settings.countdownDays,
      hours: settings.countdownHours,
      minutes: settings.countdownMinutes,
      seconds: settings.countdownSeconds,
    }),
    [
      settings.countdownDays,
      settings.countdownHours,
      settings.countdownMinutes,
      settings.countdownSeconds,
    ],
  );
  const [values, setValues] = useState(staticValues);

  useEffect(() => {
    if (!settings.countdownTargetAt) {
      setValues(staticValues);
      return;
    }

    const update = () => {
      setValues(getRemaining(settings.countdownTargetAt) ?? staticValues);
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [settings.countdownTargetAt, staticValues]);

  return values;
}
