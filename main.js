const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {

        scroller.setAttribute("data-animated", true);


        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

const initSlider = () => {
    const slideButton = document.querySelectorAll(".slide-buttons");
    const testimonial = document.querySelector(".testimonials");
    const maxScrollLeft = testimonial.scrollWidth - testimonial.clientWidth - 160;

    slideButton.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-card" ? -1 : 1;
            const scrollAmount = testimonial.clientWidth * direction;
            testimonial.scrollBy({ left: scrollAmount, behavior: "smooth" });
        })
    })

    const handleSlideButtons = () => {
        slideButton[0].style.display = testimonial.scrollLeft <= 160 ? "none" : "block";
        slideButton[1].style.display = testimonial.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    testimonial.addEventListener("scroll", () => {
        handleSlideButtons();
    })
}

window.addEventListener("load", initSlider);
