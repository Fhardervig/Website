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
    target.html(txt + " &#10004");
    target.css('color', correctTextColor);
    MathJax.typeset(target)
}

function wrong_ILQ(target, txt) {
    target.html(txt + " &#10060");
    target.css('color', wrongTextColor);
    MathJax.typeset(target)
}

function correct_dragquiz(el) {
    el._tippy.enable();
    el._tippy.setContent(correct_drag_content(el.id));
}

function wrong_dragquiz(el) {
    el._tippy.enable();
    el._tippy.setContent(wrong_drag_content(el.id));
}

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

$(".draggable-element").each(function() {
    tippy(this, {
        content: '',
        allowHTML: true,
        maxwidth: 350,
        popperOptions: {
            placement: 'auto'
        },
        onMount(instance) {
            MathJax.typeset($(".tippy-content"));
            instance.popperInstance.update()
        }

    }).disable()
})


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
                if (this.style.color == "rgb(211, 211, 211)") {
                    colorFade(this, startColor, rgbStringToDict(this.dataset.defaultColor), transitiontime);
                }
            });
            $(line).find(".tooltip").each(function() {
                this._tippy.enable()
            });
        } else {
            let endColor = rgbStringToDict("rgb(211,211,211)");
            if (line.style.color != "rgb(211, 211, 211)") {
                let startColor = rgbStringToDict(line.style.color);
                colorFade(line, startColor, endColor, transitiontime);
            }
            /* Grey out non-focused lines, but store colourstyling
            in data-default-color attribute*/
            $(line).find("mjx-mstyle").each(function() {
                if (this.style.color != "rgb(211, 211, 211)") {
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
            if (this.style.color == "rgb(211, 211, 211)") {
                colorFade(this, rgbStringToDict(this.style.color), rgbStringToDict(this.dataset.defaultColor), 500);
            }
        });
        $(line).find(".tooltip").each(function() {
            this._tippy.enable()
        });
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