function generateLatexCode(isA4 = false) {
    // Lese die allgemeine Beschreibung aus dem Input-Feld
    let generalDescription = document.getElementById("generalDescription").value || "Tabelle";
    let headerInputs = document.querySelectorAll(".header-inputs .input-group");
    let tableHeaders = [];

    // Erzeuge die Header-Zeile der Tabelle mit Formelzeichen und Einheiten
    headerInputs.forEach((group) => {
        let formula = group.querySelector("input[placeholder='Formelzeichen']").value || "";
        let unit = group.querySelector("input[placeholder='Einheit']").value || "";
        let headerLabel = formula ? `\\( ${formula} \\)` : "";
        if (unit) {
            headerLabel += ` / \\SI{}{${unit}}`;
        }
        tableHeaders.push(headerLabel);
    });

    // Generiere den vollständigen LaTeX-Code mit allen nötigen Paketen und Klassen
    let latexCode = `
\\documentclass{article}
\\usepackage{booktabs} % Für \\toprule, \\midrule, \\bottomrule
\\usepackage{siunitx} % Für \\SI{}{}-Befehl
\\usepackage{float} % Für feste Platzierung der Tabelle mit [H]
\\usepackage{amsmath} % Für mathematische Symbole
\\usepackage{array} % Für Tabellenformatierung

\\begin{document}

\\begin{table}[H]
    \\centering
    \\caption{${generalDescription}}
    \\begin{tabular}{${"c".repeat(tableHeaders.length)}}
        \\toprule
        ${tableHeaders.join(" & ")} \\\\
        \\midrule
`;

    // Füge die Datenzeilen in die Tabelle ein
    let tableRows = document.querySelectorAll("#tableBody tr");
    tableRows.forEach((row) => {
        let rowData = Array.from(row.children).map(cell => cell.textContent || "");
        latexCode += `        ${rowData.join(" & ")} \\\\\n`;
    });

    // Schließe die Tabelle und das Dokument ab
    latexCode += `
        \\bottomrule
    \\end{tabular}
\\end{table}

\\end{document}
`;

    return latexCode;
}
