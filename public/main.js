function correct_ILQ(target, txt) {
    target.html(txt + " &#10004");
    target.css('color', 'green');
    MathJax.typeset(target)
}

function wrong_ILQ(target, txt) {
    target.html(txt + " &#10060");
    target.css('color', 'red');
    MathJax.typeset(target)
}


$(document).ready(function() {
    $("#popcorn").click(function() {
        alert($("#eq1tt").html());
    }).css('cursor', 'pointer');
});


tippy('#popcorn', {
    content: '<p style="width:250px">Hi, I\'m $\\left(n^2+n\\right)$! Thanks for hovering me 😄<br>I can\'t currently speak in MathJaxese but will hopefully learn soon!</p>',
    allowHTML: true,
    maxwidth: 350,
    onMount() {
        MathJax.typeset($('.tippy-content'));
    }
});
tippy("#inlinequiz1", {
    content: '<input type="radio" name="fav_color" value="in-line quizzes" onclick=correct_ILQ($(inlinequiz1),this.value)> in-line quizzes<br> <input type = "radio" name = "fav_color" value = "step-by-step proofs" onclick=wrong_ILQ($(inlinequiz1),this.value)> step-by-step proofs<br><input type = "radio" name = "fav_color" value = "e-mail updates" onclick=wrong_ILQ($(inlinequiz1),this.value)> e-mail updates',
    allowHTML: true,
    interactive: true
})

tippy("#inlinequiz2", {
    content: '<input type="radio" name="ket" value="$\\ket{&#8635}$" onclick=wrong_ILQ($(inlinequiz2),this.value)> $\\ket{&#8635}$<br> <input type = "radio" name = "ket" value = "$\\ket{-}$" onclick=wrong_ILQ($(inlinequiz2),this.value)> $\\ket{-}$ <br><input type = "radio" name = "ket" value = "$\\ket{+}$" onclick=correct_ILQ($(inlinequiz2),this.value)> $\\ket{+}$',
    allowHTML: true,
    interactive: true,
    onMount() {
        MathJax.typeset($('.tippy-content'));
    }
})

$(".pauliX").each(function() {
    tippy(this, {
        content: '<p style="width:250px;">$\\sigma_x$ is the Pauli X operator, and it is given by $\\sigma_x=\\begin{pmatrix}0&1\\\\1&0 \\end{pmatrix}$</p>',
        allowHTML: true,
        interactive: true,
        popperOptions: { modifiers: [{ name: 'flip', enabled: false }] },
        placement: "bottom",
        theme: 'reference',
        onMount() {
            MathJax.typeset($('.tippy-content'));
            /*MathJax.typesetPromise($('.tippy-content')).then(function() {
                instance.setProps({
                    placement: "top"
                });
                instance.popperInstance.update();
            })*/
        }
    })
})

var coll = document.getElementsByClassName("collapsible");
var i;

$(".collapsible").each(function() {
    this.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
})