(function() {
    const validPassword = "mtt31415";
    const password = prompt("Ingresa la contraseña para acceder al informe:");

    if (password === null || password.trim() !== validPassword) {
        document.documentElement.innerHTML = `
            <head>
                <meta charset='UTF-8'>
                <title>Acceso denegado</title>
                <style>
                    body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                        font-family: sans-serif;
                        background: white;
                        color: #002C5F;
                    }
                </style>
            </head>
            <body><h1>Acceso denegado</h1></body>
        `;
    } else {
        document.documentElement.classList.add("autorizado");
    }
})();
