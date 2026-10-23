
const themeButtons = document.querySelectorAll(".theme-btn");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

const themes = {
    blue: {
        theme: "#B9E5F8",
        hover: "#A5D9F1",
        softBg: "#F4FAFD",
        inputBg: "#EAF6FC",
        border: "#CDE5F0"
    },

    green: {
        theme: "#C6E8D3",
        hover: "#B2DCC2",
        softBg: "#F5FBF6",
        inputBg: "#EBF7EE",
        border: "#D1E8D7"
    },

    yellow: {
        theme: "#FFF0B8",
        hover: "#F8E6A0",
        softBg: "#FFFCF2",
        inputBg: "#FFF8DF",
        border: "#F0E4BC"
    }
};

themeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selectedTheme = button.dataset.theme;
        const colors = themes[selectedTheme];

        if (!colors) return;

        document.body.dataset.theme = selectedTheme;

        const root = document.documentElement;

        root.style.setProperty("--theme", colors.theme);
        root.style.setProperty("--hover", colors.hover);
        root.style.setProperty("--soft-bg", colors.softBg);
        root.style.setProperty("--input-bg", colors.inputBg);
        root.style.setProperty("--border", colors.border);
    });
});

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    message.textContent = "Login Successful!";
});
