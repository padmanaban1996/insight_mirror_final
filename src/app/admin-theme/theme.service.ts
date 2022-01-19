import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {
    hideDiv = true;
    darkTheme = {
        "background-color": "#000000",
        "text-color": "#fff",
        "button-color": "#808080",
        "firstl-card-color": "#202225",
        "secondl-card-color": "#36393F",

        "input-color": "#000000"
    };
    lightTheme = {
        "background-color": "#e5e5e5",
        "text-color": "#000000",
        "button-color": "#196dff",
        "firstl-card-color": "#fff",
        "secondl-card-color": "#fff",
        "input-color": "#fff"
    };
    tokenkey = 'theme'
    //sends current theme to login component
    // optimize -> v2. check condition and call setTheme from login component
    gettheme(): boolean {
        const theme = localStorage.getItem(this.tokenkey);
        if (theme == null) {

            this.setTheme(false);
            return false
        }
        if (JSON.parse(theme)["background-color"] == "#000000") {
            this.setTheme(true);
            return true;
        }
        this.setTheme(false);
        return false;
    }

    toggleDark() {
        this.setTheme(true);

    }
    toggleLight() {
        this.setTheme(false);
    }

    setTheme(themestatus) {
        let theme: {}
        if (themestatus == true) {
            theme = this.darkTheme;
            localStorage.setItem(this.tokenkey, JSON.stringify(theme));

        }
        else {
            theme = this.lightTheme
            localStorage.setItem(this.tokenkey, JSON.stringify(theme));
        }
        Object.keys(theme).forEach(k =>
            document.documentElement.style.setProperty(`--${k}`, theme[k])
        );
    }
}
