$(document).ready(function() {
    $("#eq1").click(function() {
        alert($("#eq1tt").html());
    }).css('cursor', 'pointer');
});

//const popcorn = $('#popcorn');
//const tooltip = $('#tooltip');




const popcorn = document.querySelector('#popcorn');
popcorn.setAttribute('aria-describedby', 'tooltip');
const tooltip = document.querySelector('#tooltip');

// Pass the button, the tooltip, and some options, and Popper will do the
// magic positioning for you:
const popperInstance = Popper.createPopper(popcorn, tooltip, {
    placement: "right",
    modifiers: [{
        name: 'offset',
        options: {
            offset: [0, 8],
        },
    }, ],
});

function show() {
    tooltip.setAttribute('data-show', '');

    // We need to tell Popper to update the tooltip position
    // after we show the tooltip, otherwise it will be incorrect
    popperInstance.update();
}

function hide() {
    tooltip.removeAttribute('data-show');
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach((event) => {
    popcorn.addEventListener(event, show);
});

hideEvents.forEach((event) => {
    popcorn.addEventListener(event, hide);
});