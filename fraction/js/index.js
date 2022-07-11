const fracs = document.querySelectorAll("div.frac");
// const mixed = fracs.querySelectorAll(".mixed");
// const fomul = fracs.querySelectorAll(".fomul");
// const impro = fracs.querySelectorAll(".impro");
// const A = fracs.querySelectorAll(".A");
// const B = fracs.querySelectorAll(".B");
// const AB = fracs.querySelectorAll(".AB");

const FOCUSOUT = "focusout"

// fracs.forEach((elem) => {
//     elem.querySelector("numer").max = parseInt(elem.querySelector("denom").value)
// });

function vibrate(elem) {
    // const elem = event.target;
    elem.classList.add("vibrate");
    setTimeout(() => {
        elem.classList.remove("vibrate");
    }, 200);
}

document.querySelector("button.reset").addEventListener("click", () => {
    document.querySelectorAll("input").forEach((elem) => {
        elem.value = "";
    });
});