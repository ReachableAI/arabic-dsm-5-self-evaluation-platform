"use client";

import * as React from "react";

export type MoodLevel = "very-low" | "low" | "moderate" | "good" | "great";

interface MoodContextValue {
  /**
   * Current mood level selected by user (session-only, not persisted)
   */
  mood: MoodLevel | null;
  /**
   * Set mood level
   */
  setMood: (mood: MoodLevel | null) => void;
  /**
   * Whether mood has been set during this session
   */
  hasMoodSet: boolean;
}

const MoodContext = React.createContext<MoodContextValue | undefined>(
  undefined
);

/**
 * MoodProvider - Session-only mood state (no persistence)
 *
 * Stores the user's optional mood check-in selection for the current session.
 * Data is NOT persisted to localStorage or any backend.
 *
 * @example
 * ```tsx
 * <MoodProvider>
 *   <App />
 * </MoodProvider>
 * ```
 */
export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMoodState] = React.useState<MoodLevel | null>(null);

  const setMood = React.useCallback((newMood: MoodLevel | null) => {
    setMoodState(newMood);
  }, []);

  const value = React.useMemo(
    () => ({
      mood,
      setMood,
      hasMoodSet: mood !== null,
    }),
    [mood, setMood]
  );

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

/**
 * useMood hook - Access mood context
 *
 * @throws {Error} If used outside MoodProvider
 *
 * @example
 * ```tsx
 * const { mood, setMood, hasMoodSet } = useMood();
 * ```
 */
export function useMood() {
  const context = React.useContext(MoodContext);
  if (context === undefined) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
}
