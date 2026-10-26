(() => {
  let A = 0;
  let B = 0;

  const $ = (id) => document.getElementById(id);

  function setClass(id, className, enabled) {
    $(id).classList.toggle(className, Boolean(enabled));
  }

  function setText(id, value) {
    $(id).textContent = String(value);
  }

  function toggleInput(which) {
    if (which === "A") A = A ? 0 : 1;
    else B = B ? 0 : 1;
    render();
  }

  function wire(id, enabled) {
    setClass(id, "active", enabled);
  }

  function render() {
    // These are the actual logic-gate operations.
    const sum = A ^ B;      // XOR: 1 if exactly one input is 1
    const carry = A & B;    // AND: 1 only if both inputs are 1

    setText("aValue", A);
    setText("bValue", B);
    setText("sumValue", sum);
    setText("carryValue", carry);
    setText("equationA", A);
    setText("equationB", B);
    setText("equationSum", sum);
    setText("equationCarry", carry);
    setText("sumFormula", sum);
    setText("carryFormula", carry);

    $("aSwitch").classList.toggle("active", A === 1);
    $("bSwitch").classList.toggle("active", B === 1);
    $("aKnob").setAttribute("cx", A ? "108" : "64");
    $("bKnob").setAttribute("cx", B ? "108" : "64");
    $("aSwitch").setAttribute("aria-pressed", String(A === 1));
    $("bSwitch").setAttribute("aria-pressed", String(B === 1));

    // Input wires are HIGH when their corresponding input is 1.
    wire("wireA1", A); wire("wireA2", A);
    wire("wireB1", B); wire("wireB2", B);
    wire("junctionA", A); wire("junctionB", B);

    // A gate is visually highlighted when its output is HIGH.
    setClass("xorGate", "active", sum);
    setClass("andGate", "active", carry);
    wire("wireSum", sum);
    wire("wireCarry", carry);

    setClass("sumLed", "on", sum);
    setClass("carryLed", "on", carry);
    setClass("sumValue", "on", sum);
    setClass("carryValue", "on", carry);
    setClass("sumFormula", "on", sum);
    setClass("carryFormula", "on", carry);

    const explanations = {
      "00": "Both inputs are LOW. XOR and AND both output 0.",
      "01": "Inputs differ, so XOR outputs 1. They are not both 1, so Carry is 0.",
      "10": "Inputs differ, so XOR outputs 1. They are not both 1, so Carry is 0.",
      "11": "Both inputs are HIGH. XOR outputs 0, while AND outputs 1 Carry."
    };
    setText("resultExplanation", explanations[`${A}${B}`]);

    document.querySelectorAll("tbody tr").forEach((row) => {
      const selected = Number(row.dataset.a) === A && Number(row.dataset.b) === B;
      row.classList.toggle("selected", selected);
      if (selected) row.setAttribute("aria-current", "true");
      else row.removeAttribute("aria-current");
    });
  }

  $("aSwitch").addEventListener("click", () => toggleInput("A"));
  $("bSwitch").addEventListener("click", () => toggleInput("B"));
  $("aSwitch").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); toggleInput("A");
    }
  });
  $("bSwitch").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); toggleInput("B");
    }
  });
  $("resetBtn").addEventListener("click", () => {
    A = 0; B = 0; render();
  });

  render();
})();
