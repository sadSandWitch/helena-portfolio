document.addEventListener("DOMContentLoaded", () => {
    const photoCards = document.querySelectorAll(".photo-card");

    // Fade-in das fotos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    setTimeout(() => {
        photoCards.forEach(card => observer.observe(card));
    }, 1200);

    // Elementos principais
    const homeButton = document.querySelector(".home-button");
    const aboutButton = document.querySelector(".about-button");
    const projectButton = document.querySelector(".project-button");
    const mainContent = document.querySelector(".main-content");
    const aboutContent = document.querySelector(".about-content");
    const projectContent = document.querySelector(".project-content");

    const fadeDuration = 600;

    // Função para esconder todas as secções
    const hideAll = (callback) => {
        [mainContent, aboutContent, projectContent].forEach(section => {
            section.classList.remove("visible");
            section.style.opacity = "0"; // fade-out suave
            setTimeout(() => (section.style.display = "none"), fadeDuration);
        });
        setTimeout(callback, fadeDuration + 50);
    };

    // Mostrar secção específica
    const showSection = (section) => {
        section.style.display = "block";
        setTimeout(() => {
            section.classList.add("visible");
            section.style.opacity = "1";
        }, 10);
    };

    // Botões → transições entre secções
    aboutButton.addEventListener("click", () => {
        hideAll(() => showSection(aboutContent));
    });

    projectButton.addEventListener("click", () => {
        hideAll(() => showSection(projectContent));
    });

    homeButton.addEventListener("click", () => {
        hideAll(() => {
            showSection(mainContent);
            photoCards.forEach(card => {
                card.classList.remove("visible");
                observer.unobserve(card);
                card.style.transitionDelay = "0s";
            });
            setTimeout(() => {
                mainContent.style.opacity = "1";
                photoCards.forEach(card => observer.observe(card));
            }, 200);
        });
    });
});