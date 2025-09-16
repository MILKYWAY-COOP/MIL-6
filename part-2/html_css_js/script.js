document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("nameInput");
  const submitBtn = document.getElementById("submitBtn");
  const nameTableBody = document.getElementById("nameTableBody");

  let names = [];

  submitBtn.addEventListener("click", addNames);
  nameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addNames();
    }
  });

  function addNames() {
    const inputValue = nameInput.value.trim();
    if (inputValue === "") {
      alert("Please enter at least one name.");
      return;
    }

    const newNames = inputValue
      .split(",")
      .map((name) => ({
        name: name.trim(),
        charCount: name.trim().length,
      }))
      .filter((item) => item.name !== "");
    names = names.concat(newNames);
    nameInput.value = "";
    renderTable();
  }

  function renderTable() {
    nameTableBody.innerHTML = "";
    names.forEach((item, index) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;

      const charCountCell = document.createElement("td");
      charCountCell.textContent = item.charCount;

      row.appendChild(nameCell);
      row.appendChild(charCountCell);

      nameTableBody.appendChild(row);
    });
  }
});
