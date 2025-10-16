<script>
    // ======== FUNCIONES BASE ========
    function getUsuarios() {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) return JSON.parse(storedUsers);
        return { "admin": "12345" }; // usuario por defecto
    }

    function saveUsuarios(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // ======== CAMBIO DE VISTAS LOGIN / REGISTRO ========
    function showLogin() {
        document.getElementById("registerSection").style.display = "none";
        document.getElementById("loginSection").style.display = "block";
        document.getElementById("loginMessage").style.display = "none";
        document.getElementById("registerMessage").style.display = "none";
        document.getElementById("registerSuccess").style.display = "none";
    }

    function showRegister() {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("registerSection").style.display = "block";
        document.getElementById("loginMessage").style.display = "none";
        document.getElementById("registerMessage").style.display = "none";
        document.getElementById("registerSuccess").style.display = "none";
    }

    // ======== REGISTRO DE NUEVO USUARIO ========
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("regUsername").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const regMessage = document.getElementById("registerMessage");
        const regSuccess = document.getElementById("registerSuccess");

        let users = getUsuarios();
        regMessage.style.display = "none";
        regSuccess.style.display = "none";

        if (users.hasOwnProperty(username)) {
            regMessage.textContent = "ERROR: El usuario ya existe. Intenta iniciar sesión.";
            regMessage.style.display = "block";
            return;
        }

        if (password.length < 5) {
            regMessage.textContent = "ERROR: La contraseña debe tener al menos 5 caracteres.";
            regMessage.style.display = "block";
            return;
        }

        users[username] = password;
        saveUsuarios(users);

        regSuccess.style.display = "block";
        document.getElementById("regUsername").value = '';
        document.getElementById("regPassword").value = '';
    });

    // ======== LOGIN ========
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const errorMessage = document.getElementById("loginMessage");

        const users = getUsuarios();

        if (users.hasOwnProperty(username) && users[username] === password) {
            errorMessage.style.display = "none";
            localStorage.setItem("loggedUser", username);

            if (username.toLowerCase() === "admin") {
                localStorage.setItem("isAdminLogged", "true");
                alert("Bienvenido administrador. Redirigiendo al panel...");
                window.location.href = "admin.html";
            } else {
                localStorage.removeItem("isAdminLogged");
                alert(`¡Inicio de sesión exitoso! Bienvenido, ${username}.`);
                window.location.href = "index.html";
            }
        } else {
            errorMessage.style.display = "block";
        }
    });

    // ======== PROTECCIÓN DEL PANEL ADMIN ========
    document.addEventListener("DOMContentLoaded", () => {
        const isAdmin = localStorage.getItem("isAdminLogged");
        if (window.location.pathname.includes("admin.html") && !isAdmin) {
            alert("Debes iniciar sesión como administrador para acceder al panel.");
            window.location.href = "login.html";
        }
    });
</script>

