const spreadsheetId = "1JmxwK3_HiOwlbO4WDTgP2FpA7l_VckW2twMnscdQiO4";
const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`;

async function loadScores() {
    const res = await fetch(url);
    const text = await res.text();

    // Google packt JSON in ein JS-Wrapper -> wir schneiden den überflüssigen Teil raus
    const json = JSON.parse(text.substr(47).slice(0, -2));

    // Rows extrahieren
    const rows = json.table.rows;

    const tbody = document.querySelector("#scoreboard tbody");
    tbody.innerHTML = "";

    rows.forEach(row => {
        const name = row.c[0] ? row.c[0].v : "";
        const score = row.c[1] ? row.c[1].v : "";
        const progress = row.c[2] ? row.c[2].v : "";
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${name}</td><td>${score}</td><td>${progress == null ? 0 : progress}/3</td>`;
        tbody.appendChild(tr);
    });
}

loadScores();