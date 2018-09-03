function ChangeSizes() {

    let d = document;
    this.carCard = d.querySelectorAll(".cars__car-card");
    this.lastCarCard = this.carCard[this.carCard.length -1];
    this.backGround = d.querySelector(".background__img");

    this.changeSize_ = () => {
        let backgroundHeight = window.outerWidth / (1366 * 427);
        let lastCarMarginBottom = window.outerHeight - backgroundHeight;
        this.lastCarCard.style.marginBottom = `${lastCarMarginBottom}px`;
    }

    this.events_ = () => {
        d.addEventListener("DOMContentLoaded", this.changeSize_);
    }

    this.init_ = () => {
        this.events_();
    }
    this.init_();
}

const sizes = new ChangeSizes();
