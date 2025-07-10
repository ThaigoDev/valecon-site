document.addEventListener("DOMContentLoaded", () => {
    // Inicializa a biblioteca de animações
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- LÓGICA DO MENU MOBILE ---
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        const icon = mobileMenuButton.querySelector("i");
        if (mobileMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            const icon = mobileMenuButton.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });

    // --- LÓGICA DO SELETOR DE TEMA (DARK/LIGHT MODE) ---
    const themeToggleButton = document.getElementById("theme-toggle-icon");
    const currentTheme = localStorage.getItem("theme");
    const htmlElement = document.documentElement;

    if (currentTheme) {
        htmlElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            themeToggleButton.classList.remove("fa-moon");
            themeToggleButton.classList.add("fa-sun");
        }
    }

    themeToggleButton.addEventListener("click", () => {
        const newTheme = htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            themeToggleButton.classList.remove("fa-moon");
            themeToggleButton.classList.add("fa-sun");
        } else {
            themeToggleButton.classList.remove("fa-sun");
            themeToggleButton.classList.add("fa-moon");
        }
    });
    
    // --- LÓGICA DO CHATBOT ---
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotBody = document.getElementById("chatbot-body");
    const chatbotOptions = document.getElementById("chatbot-options");

    chatbotToggle.addEventListener("click", () => chatbotWindow.classList.toggle("hidden"));
    chatbotClose.addEventListener("click", () => chatbotWindow.classList.add("hidden"));

    const chatFlow = {
        start: { message: "Olá! Sou o assistente virtual da Valecon. Como posso ajudar?", options: { "servicos": "Quero saber sobre os serviços", "orcamento": "Gostaria de um orçamento", "contato": "Falar com um atendente", } },
        servicos: { message: "Oferecemos uma vasta gama de serviços, incluindo: Obras Civis, Infraestrutura, Projetos, Gerenciamento, Pavimentação e muito mais. Deseja mais algum detalhe?", options: { "orcamento": "Sim, quero um orçamento", "start": "Voltar ao início", } },
        orcamento: { message: "Ótimo! Para um orçamento detalhado, por favor, entre em contato conosco pelo WhatsApp ou preencha nosso formulário na seção de contato. É rápido e fácil!", link: "https://api.whatsapp.com/send?phone=553195521386&text=Ol%C3%A1,%20gostaria%20de%20fazer%20um%20or%C3%A7amento!", options: { "start": "Voltar ao início", } },
        contato: { message: "Para falar com nossa equipe, ligue para (31) 99552-1386 ou envie um e-mail para comercial@valeconengenharia.com.br.", options: { "start": "Voltar ao início", } }
    };

    function addBotMessage(text) {
        const messageEl = document.createElement("div");
        messageEl.classList.add("chat-message", "bot-message");
        messageEl.innerText = text;
        chatbotBody.appendChild(messageEl);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function showOptions(options, link = null) {
        chatbotOptions.innerHTML = "";
        for (const key in options) {
            const button = document.createElement("button");
            button.innerText = options[key];
            button.dataset.next = key;
            button.addEventListener("click", handleOptionClick);
            chatbotOptions.appendChild(button);
        }
        if(link) {
            const linkButton = document.createElement("a");
            linkButton.href = link;
            linkButton.target = "_blank";
            linkButton.innerHTML = `<button>Abrir WhatsApp</button>`;
            chatbotOptions.appendChild(linkButton);
        }
    }

    function handleOptionClick(event) {
        const nextStep = event.target.dataset.next;
        const step = chatFlow[nextStep];
        addBotMessage(step.message);
        showOptions(step.options, step.link || null);
    }
    
    function startChat() {
        chatbotBody.innerHTML = "";
        const startStep = chatFlow.start;
        addBotMessage(startStep.message);
        showOptions(startStep.options);
    }

    startChat();
    
    chatbotToggle.addEventListener("click", () => {
      if(!chatbotWindow.classList.contains('hidden')) {
          startChat();
      }
    });

    // --- NOVA LÓGICA DO CARROSSEL DE PORTFÓLIO ---
    const portfolioCarousel = document.getElementById('portfolio-carousel');
    if (portfolioCarousel) {
        new Splide(portfolioCarousel, {
            type       : 'loop',      // Cria um carrossel infinito
            perPage    : 3,           // 3 slides visíveis em telas grandes
            perMove    : 1,           // Move 1 slide por vez
            gap        : '1.5rem',    // Espaçamento entre os slides
            pagination : true,        // Habilita a paginação (bolinhas)
            arrows     : true,        // Habilita as setas de navegação
            autoplay   : true,        // Inicia a passagem automática
            interval   : 4000,        // Intervalo de 4 segundos para cada slide
            pauseOnHover: true,       // Pausa ao passar o mouse sobre o carrossel
            breakpoints: {
                992: {
                    perPage: 2, // 2 slides visíveis em tablets
                },
                768: {
                    perPage: 1, // 1 slide visível em celulares
                    gap: '1rem',
                },
            },
        }).mount();
    }
});