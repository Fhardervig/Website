/* Tooltips for page */
tippy("#ilqKet1", {
    content: '<input type="radio" name="ket1" id="ket11" onclick=wrong_ILQ($("#ilqKet1"),"real")> <label for="ket11"> real</label><br>   <input type = "radio" name="ket1" id = "ket12" onclick=correct_ILQ($("#ilqKet1"),"complex")> <label for="ket12">complex</label>',
    allowHTML: true,
    interactive: true,
    theme: "ILQ",
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})

tippy("#ilqKet2", {
    content: '<input type="radio" name="ket2" id="ket21" onclick=correct_ILQ($("#ilqKet2"),"probability&nbspamplitude")> <label for="ket21">probability amplitude</label><br>   <input type = "radio" name="ket2" id = "ket22" onclick=wrong_ILQ($("#ilqKet2"),"probability")> <label for="ket22">probability</label>',
    allowHTML: true,
    interactive: true,
    theme: "ILQ",
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})

tippy("#ilqInPP1", {
    content: '<input type="radio" name="inPP1" id="inPP11" value="$\\braket{\\psi|\\phi}\\ket{\\psi}$" onclick=wrong_ILQ($("#ilqInPP1"),this.value)> <label for="inPP11">$\\braket{\\psi|\\phi}\\ket{\\psi}$</label><br>   <input type = "radio" name="inPP1" id = "inPP12" value="$\\bra{\\psi}\\braket{\\phi|\\psi}$" onclick=wrong_ILQ($("#ilqInPP1"),this.value)> <label for="inPP12">$\\bra{\\psi}\\braket{\\phi|\\psi}$</label><br><input type = "radio" name="inPP1" id = "inPP13" value="$\\bra{\\phi}\\braket{\\psi|\\phi}$" onclick=wrong_ILQ($("#ilqInPP1"),this.value)> <label for="inPP13">$\\bra{\\phi}\\braket{\\psi|\\phi}$</label><br><input type = "radio" name="inPP1" id = "inPP14" value="$\\braket{\\phi|\\psi}\\ket{\\phi}$"onclick=correct_ILQ($("#ilqInPP1"),this.value)> <label for="inPP14">$\\braket{\\phi|\\psi}\\ket{\\phi}$</label>',
    allowHTML: true,
    interactive: true,
    theme: "ILQ",
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})

tippy("#ilqInP1", {
    content: '<input type="radio" name="inP1" id="inP11" onclick=wrong_ILQ($("#ilqInP1"),"scalars")> <label for="inP11">scalars</label><br>   <input type = "radio" name="inP1" id = "inP12" onclick=correct_ILQ($("#ilqInP1"),"vectors")> <label for="inP12">vectors</label><br><input type = "radio" name="inP1" id = "inP13" onclick=wrong_ILQ($("#ilqInP1"),"matrices")> <label for="inP13">matrices</label>',
    allowHTML: true,
    interactive: true,
    theme: "ILQ",
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})

tippy("#ilqInP2", {
    content: '<input type="radio" name="inP2" id="inP21" onclick=correct_ILQ($("#ilqInP2"),"scalar")> <label for="inP21">scalar</label><br>   <input type = "radio" name="inP2" id = "inP22" onclick=wrong_ILQ($("#ilqInP2"),"vector")> <label for="inP22">vector</label><br><input type = "radio" name="inP2" id = "inP23" onclick=wrong_ILQ($("#ilqInP2"),"matrix")> <label for="inP23">matrix</label>',
    allowHTML: true,
    interactive: true,
    theme: "ILQ",
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})

tippy("#ilqInP3", {
    content: '<input type="radio" name="inP3" id="inP31" onclick=wrong_ILQ($("#ilqInP3"),"tensor")> <label for="inP31">tensor</label><br>   <input type = "radio" name="inP3" id = "inP32" onclick=wrong_ILQ($("#ilqInP3"),"Dirac")> <label for="inP32">Dirac</label><br><input type = "radio" name="inP3" id = "inP33" onclick=correct_ILQ($("#ilqInP3"),"Kronecker")> <label for="inP33">Kronecker</label>',
    allowHTML: true,
    interactive: true,
    theme: "ILQ",
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})

tippy("#sumNormSqrd", {
    content: 'Remember that $|\\alpha|=\\sqrt{\\alpha^\\ast\\alpha}$',
    allowHTML: true,
    interactive: true,
    theme: 'itt',
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})
tippy("#dagger", {
    content: '<span style="minwidth: 300px">The dagger signifies the adjoint introduced earlier, i.e. $X^\\dagger={X^T}^\\ast$</span>',
    allowHTML: true,
    interactive: true,
    theme: 'itt',
    maxwidth: 350,
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})

tippy("#numvec", {
    content: 'Remember that $\\ket{\\uparrow}=\\begin{pmatrix}1\\\\0\\end{pmatrix}$ and $\\bra{\\uparrow}=\\begin{pmatrix}1\&0\\end{pmatrix}$',
    allowHTML: true,
    interactive: true,
    theme: 'itt',
    onMount(instance) {
        MathJax.typeset($('.tippy-content'));
        instance.popperInstance.update();
    }
})

/* #region  Tooltip all Pauli X's */
$(".pauliX").each(function() {
        tippy(this, {
            content: "<p style = 'width:250px;'> $\\sigma_x$ is the Pauli X operator, and it is given by $\\sigma_x = \\begin{pmatrix}0 & 1\\\\ 1 & 0\\end {pmatrix}$ </p>",
            allowHTML: true,
            /*interactive: true,
            popperOptions: { modifiers: [{ name: 'flip', enabled: false }] },
            placement: "bottom",*/
            /*theme: 'reference',*/
            maxwidth: 350,
            onMount(instance) {
                MathJax.typeset($('.tippy-content'));
                instance.popperInstance.update();
            }
        })
    })
    /* #endregion */