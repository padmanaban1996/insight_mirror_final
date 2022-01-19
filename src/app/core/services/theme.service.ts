import { Injectable } from "@angular/core";

export const darkTheme = {
    "primary-color": "#455363",
    "background-color": "#1f2935",
    "text-color": "#fff",
    "button-color": "#196dff"
};
export const lightTheme = {
    "primary-color": "#fff",
    "background-color": "#e5e5e5",
    "text-color": "#2d2d2d",
    "button-color": "#196dff"
};
@Injectable({ providedIn: "root" })
export class ThemeService {
    toggleDark() {
        this.setTheme(darkTheme);
    }

    toggleLight() {
        this.setTheme(lightTheme);
    }
    togglePrimary(accent) {
        let theme = {
            "primary-color": accent,
            "text-color": "#fff",
        };
        this.setTheme(theme);
    }
    toggleBackground(accent) {
        let theme = {
            "background-color": accent,
            "text-color": "#fff",
        };
        this.setTheme(theme);
    }


    private setTheme(theme: {}) {
        Object.keys(theme).forEach(k =>
            document.documentElement.style.setProperty(`--${k}`, theme[k])
        );
    }
}
