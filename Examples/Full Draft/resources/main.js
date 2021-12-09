/* #region  Colors */
var style = getComputedStyle(document.body)
const mainBgColor = style.getPropertyValue('--main-bg-color');
const darkBgColor = style.getPropertyValue('--dark-bg-color');
const lightBgColor = style.getPropertyValue('--light-bg-color');
const llightBgColor = style.getPropertyValue('--llight-bg-color');
const tooltipBgColor = style.getPropertyValue('--tooltip-bg-color');
const highlightTextColor = style.getPropertyValue('--highlight-text-color');
const offWhite = style.getPropertyValue('--off-white');
const correctColor = style.getPropertyValue('--correct-color');
const wrongColor = style.getPropertyValue('--wrong-color');
const correctTextColor = style.getPropertyValue('--correct-text-color');
const wrongTextColor = style.getPropertyValue('--wrong-text-color');
/* #endregion */

function correct_ILQ(target, txt) {
    target.html(txt.concat("&#10004"));
    target.css('color', correctTextColor);
    MathJax.typeset(target)
}

function wrong_ILQ(target, txt) {
    target.html(txt.concat("&#10060"));
    target.css('color', wrongTextColor);
    MathJax.typeset(target)
}


function correct_dragquiz(el) {
    el._tippy.enable();
    el._tippy.setContent(el.dataset.correctText ? el.dataset.correctText : "Correct!");

}

function wrong_dragquiz(el) {
    el._tippy.enable();
    el._tippy.setContent(el.dataset.wrongText ? el.dataset.wrongText : "That's not quite right.<br>Can you figure out why?");
}

/* Incomplete padding. Doesn't collapse fully, needs to also reset padding. Store in data-* */
$(".collapsible").each(function() {
    this.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = $(this).siblings('.content');
        if (content.css("maxHeight") != '0px') {
            content.css("maxHeight", 0);
        } else {
            content.css("maxHeight", content.prop('scrollHeight') + "px");
        }
    });
})

function intextTooltips(elements) {
    elements.each(function() {
        tippy(this, {
            content: this.getAttribute("data-content"),
            allowHTML: true,
            interactive: true,
            maxwidth: 350,
            theme: 'itt',
            onMount(instance) {
                MathJax.typeset($('.tippy-content'));
                /* Figure out generalized nesting
                intextTooltips($('.tippy-content', instance.reference.getAttribute("data-content")))*/
                instance.popperInstance.update();
            }
        })
    })
}
intextTooltips($(".itTooltip"))



/* #region Drag n ' Drop for page */
$(".draggable").each(function() {
        dragula([$(this).children(".top")[0], $(this).children(".left")[0], $(this).children(".right")[0]], {
            revertOnSpill: false
        }).on('drop', function(el, container) {
            if (el.getAttribute("data-answer") == container.getAttribute("data-answer")) {
                el.style.backgroundColor = correctColor;
                correct_dragquiz(el);
            } else if (container.getAttribute("data-answer") == "default") {
                el.style.backgroundColor = "";
                el._tippy.disable();
            } else {
                el.style.backgroundColor = wrongColor;
                wrong_dragquiz(el);
            }
        })
    })
    /* #endregion */


function attachSubTips() {
    $(".subtip").each(function() {
        tippy(this, {
            content: "Despite the fact that $\\alpha=|\\alpha_0|e^{-i(\\omega t-\\phi)}$, this value does not depend on $t$ since $$\\begin{align*}|\\alpha|&=\\alpha^\\ast\\alpha\\\\&=|\\alpha_0|\\cancel{e^{-i(\\omega t-\\phi)}}|\\alpha_0|\\cancel{e^{i(\\omega t-\\phi)}}\\\\&=|\\alpha_0|^2\\end{align*}$$",
            allowHTML: true,
            interactive: true,
            theme: 'itt',
            onMount(instance) {
                MathJax.typesetPromise($(".subtip").siblings("[id^=tippy-]")).then(function() { instance.popperInstance.update(); })
            }
        })
    })
}



$(".draggable-element").each(function() {
    tippy(this, {
        content: "",
        allowHTML: true,
        interactive: true,
        maxwidth: 350,
        popperOptions: {
            placement: 'auto'
        },
        onMount(instance) {
            MathJax.typesetPromise($(".tippy-content")).then(function() {
                attachSubTips();
                instance.popperInstance.update();
            });
        }

    }).disable()
})

/* #region  Step by step proofs */

var proofCounters = [];
var proofLines = [];
var proofExplanations = [];
var proofPrevButtons = [];
var proofNextButtons = [];
var proofResetButtons = [];
var proofExpandButtons = [];

$(".sbs-proof").each(function(proofIndex, proofbox) {
    proofbox.classList.add("proof" + proofIndex);
    $(".proof-navigation button", proofbox).each(function() {
        this.value = proofIndex;
        if (this.classList.contains("proof-prev-button")) {
            proofPrevButtons.push(this);
        } else if (this.classList.contains("proof-next-button")) {
            proofNextButtons.push(this);
        } else if (this.classList.contains("proof-reset-button")) {
            proofResetButtons.push(this);
        } else if (this.classList.contains("proof-expand-button")) {
            proofExpandButtons.push(this);
        }
    })

    proofExplanations.push($(".proof-explanation .step", proofbox));
    proofExplanations[proofIndex].css("display", "none");


    proofLines.push($(".proof-equations mjx-itable", proofbox).children());
    proofCounters.push(0);
    proofLines[proofIndex].each(function(stepIndex, line) {
        line.classList.add("step" + stepIndex);
        line.dataset.defaultColor = window.getComputedStyle(line).color;
        line.style.color = line.dataset.defaultColor;
        $(line).find("mjx-mstyle").each(function() {
            this.dataset.defaultColor = window.getComputedStyle(this).color;
            this.style.color = this.dataset.defaultColor;
        })
    })
    resetProof(proofIndex);
})

/* #region  Animate color https://stackoverflow.com/questions/11292649/javascript-color-animation*/
// linear interpolation between two values a and b
// u controls amount of a/b and is in range [0.0,1.0]
function lerp(a, b, u) {
    return (1 - u) * a + u * b;
};

function colorFade(element, start, end, duration) {

    var interval = 10;
    var steps = duration / interval;
    var step_u = 1.0 / steps;
    var u = 0.0;

    var theInterval = setInterval(function() {
        if (u >= 1.0) {
            clearInterval(theInterval);
            setTimeout(function() { element.style.color = 'rgb(' + end.r + ',' + end.g + ',' + end.b + ')' }, 50)
        }
        var r = parseInt(lerp(start.r, end.r, u));
        var g = parseInt(lerp(start.g, end.g, u));
        var b = parseInt(lerp(start.b, end.b, u));
        var colorname = 'rgb(' + r + ',' + g + ',' + b + ')';
        element.style.color = colorname;
        u += step_u;
    }, interval);
};
/* #endregion */

function rgbStringToDict(rgbString) {
    let rgbList = rgbString.replace(/[^\d,]/g, '').split(',');
    return { r: rgbList[0], g: rgbList[1], b: rgbList[2] }
}

function renderProofStep(index, transitiontime) {
    proofLines[index].each(function(stepIndex, line) {
        if (stepIndex == proofCounters[index] || stepIndex == proofCounters[index] + 1) {
            var startColor = rgbStringToDict(window.getComputedStyle(line).color);
            var endColor = rgbStringToDict(line.dataset.defaultColor);

            colorFade(line, startColor, endColor, transitiontime);

            $(line).find("mjx-mstyle").each(function() {
                if (this.style.color == "rgb(154, 129, 165)") {
                    colorFade(this, startColor, rgbStringToDict(this.dataset.defaultColor), transitiontime);
                }
            });
            $(line).find(".tooltip").each(function() {
                this._tippy.enable()
            });
        } else {
            let endColor = rgbStringToDict("rgb(154,129,165)");
            if (line.style.color != "rgb(154,129,165)") {
                let startColor = rgbStringToDict(line.style.color);
                colorFade(line, startColor, endColor, transitiontime);
            }
            /* Grey out non-focused lines, but store colourstyling
            in data-default-color attribute*/
            $(line).find("mjx-mstyle").each(function() {
                if (this.style.color != "rgb(154,129,165)") {
                    colorFade(this, rgbStringToDict(this.style.color), endColor, transitiontime);
                }
            })
            $(line).find(".tooltip").each(function() {
                this._tippy.disable()
            });
        }

    })
}

function renderProofFull(index) {
    proofLines[index].each(function(idx, line) {
        colorFade(line, rgbStringToDict(line.style.color), rgbStringToDict(line.dataset.defaultColor), 500);
        $(line).find("mjx-mstyle").each(function() {
            if (this.style.color == "rgb(154,129,165)") {
                colorFade(this, rgbStringToDict(this.style.color), rgbStringToDict(this.dataset.defaultColor), 500);
            }
        });
        $(line).find(".tooltip").each(function() {
            this._tippy.enable()
        });
    })
    proofExplanations[index].each(function() {
        this.style.display = "";

    })

}

function renderProofExplanation(index) {
    proofExplanations[index].each(function(stepIndex, explanation) {
        if (stepIndex == proofCounters[index] + 1) {
            explanation.style.display = "";
        } else {
            explanation.style.display = "none";
        }
    })
}

function nextProofStep(index) {
    proofCounters[index]++;

    proofPrevButtons[index].disabled = false;
    if (proofCounters[index] == proofLines[index].length - 2) {
        proofNextButtons[index].disabled = true;
    }
    renderProofStep(index, 150);
    renderProofExplanation(index);
}

function prevProofStep(index) {
    proofCounters[index]--;

    proofNextButtons[index].disabled = false;
    if (proofCounters[index] == -1) {
        proofPrevButtons[index].disabled = true;
    }
    renderProofStep(index, 150);
    renderProofExplanation(index);
}

function resetProof(index) {
    proofPrevButtons[index].disabled = true;
    proofNextButtons[index].disabled = false;
    proofCounters[index] = -1;
    renderProofStep(index, 250);
    renderProofExplanation(index);
}

function expandProof(index) {
    proofPrevButtons[index].disabled = true;
    proofNextButtons[index].disabled = true;
    renderProofFull(index);
}
/* #endregion */



/* #region End of paragraph quiz */
/* Setup 
var proofCounters = [];
var proofLines = [];
var proofExplanations = [];
var proofPrevButtons = [];
var proofNextButtons = [];
var proofResetButtons = [];
var proofExpandButtons = [];
$(".big-quiz").each(function(quizIndex, quizBox) {
    quizBox.classList.add("quiz" + quizIndex);
    $(".question", quizBox).each(function(questionIndex, questionForm) {
        questionForm.classList.add("question" + questionIndex);
        $("input", questionForm).each(function(optionIndex, inputEl) {
            inputEl.name = "q" + quizIndex + "q" + questionIndex
        })
    })
})

function quizAnswer(form) {
    $("input", form).each(function() {
        if (this.checked == true) {
            if (this.value == "true") {
                alert("Correct")
                $(this).next("label").css('color', correctTextColor)

            } else {
                alert("Wrong")
                $(this).next("label").css('color', wrongTextColor)
            }
        } else {
            alert("Default")
            $(this).next("label").css('color', "")
        }
    })
} */
/* #endregion */