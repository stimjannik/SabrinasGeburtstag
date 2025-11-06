document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("tabSelector");
    const contents = document.querySelectorAll(".tab-content");

    select.addEventListener("change", () => {
        contents.forEach(c => c.classList.remove("active"));
        document.getElementById(select.value).classList.add("active");
    });
});

const spreadsheetId = "1JmxwK3_HiOwlbO4WDTgP2FpA7l_VckW2twMnscdQiO4";
const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`;

const games = {
    1: "beerpong",
    2: "walter",
    3: "schieben",
    4: "bottleflip",
    5: "mario",
    6: "nageln",
    7: "tattoo",
    8: "quiz",
}

async function loadScores() {
    const res = await fetch(url);
    const text = await res.text();

    const data = new Map;

    const json = JSON.parse(text.substr(47).slice(0, -2));

    const rows = json.table.rows;

    for (j = 0; j < rows.length; j++) {
        if(!rows[j]["c"][0]) continue;
        const playerName = rows[j]["c"][0]["v"];
        for (let i = 1; i < rows[j]["c"].length; i++) {
            if(!rows[j]["c"][i]) continue;
            let currentScores = data.get(games[i]);
            if(!currentScores){
                currentScores = [];
            }
            currentScores.push({playerName: playerName, score: rows[j]["c"][i]["v"]})
            data.set(games[i], currentScores);
        }}

    for(const game of data.keys()){
        if(!game) continue;
        const scores = data.get(game);
        scores.sort((a, b) => b.score - a.score);
        const tbody = document.querySelector(`#${game} tbody`);
        tbody.innerHTML = "";
        for(const score of scores){
            const tr = document.createElement("tr");
                if(game == "quiz" || game == "tattoo") {
                    tr.innerHTML = `<td>${score.playerName}</td><td>???</td>`;
                } else{
                    tr.innerHTML = `<td>${score.playerName}</td><td>${score.score}</td>`;
                }
                tbody.appendChild(tr);
        }
    }
}

loadScores();