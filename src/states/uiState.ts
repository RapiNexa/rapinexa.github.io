import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getConfig } from "src/lib/config";

export type Theme = "light" | "dark";

export type RootUIState = {
  theme: Theme;
};

export type UIStateMiddleware = [["zustand/persist", { theme: Theme }]];

/**
 * Single persisted UI store for the site. Only `theme` is persisted
 * (default dark); the storage key is namespaced under RapiNexa's
 * `STORAGE_KEY` config value so it never collides with other sites on the
 * same origin.
 */
export const useUiState = create<RootUIState, UIStateMiddleware>(
  persist(
    (): RootUIState => ({
      theme: "dark",
    }),
    {
      name: `${getConfig("STORAGE_KEY")}-ui`,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
