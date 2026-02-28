(() => {
    const STORAGE_KEY = "theme";
    const root = document.documentElement;
    const buttons = Array.from(document.querySelectorAll(".theme-switch [data-theme]"));
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    function setPressedState(theme) {
        buttons.forEach((btn) => {
            const isActive = btn.dataset.theme === theme;
            btn.setAttribute("aria-pressed", String(isActive));
        });
    }

    function applyTheme(theme) {
        if (theme === "system") {
            root.removeAttribute("data-theme");
        } else {
            root.setAttribute("data-theme", theme);
        }
        setPressedState(theme);
    }

    function getStoredTheme() {
        const t = localStorage.getItem(STORAGE_KEY);
        return (t === "light" || t === "dark" || t === "system") ? t : "system";
    }

    function storeTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
    }

    const initialTheme = getStoredTheme();
    applyTheme(initialTheme);

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const theme = btn.dataset.theme;
            storeTheme(theme);
            applyTheme(theme);
        });
    });

    mql.addEventListener?.("change", () => {
        const current = getStoredTheme();
        if (current === "system") applyTheme("system");
    });
})();