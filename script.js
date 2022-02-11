let maligne;
let ObjTableau = document.querySelector("#monTableau");
let btn = document.getElementById('btn');
btn.addEventListener('click', verify);
let count = 0;
let value = 0;


// remplir le tableau HTML
for (let x = 0; x < 9; x++) {
    maligne = "<tr>"
    for (let y = 0; y < 9; y++) {
        maligne += "<td class='col" + y + "' id=" + count + "><input type='text' maxlength='1'> </td>"
        count++;
    }
    maligne += "</tr>"
    ObjTableau.innerHTML += maligne
}

function verify() {
    count = 0;
    let image = new Array(9);
    for (let i = 0; i < 9; i++) {
        image[i] = [];
    }
    for (let x = 0; x < 9; x++) {
        let lines = ObjTableau.childNodes[x].childNodes;
        for (const elmt of lines) {
            elmt.style.backgroundColor = "white";
        }
    }

    for (let x = 0; x < 9; x++) {
        let lines = ObjTableau.childNodes[x].childNodes;
        for (let y = 0; y < 9; y++) {
            if (lines[y].firstChild.value == '') {
                value = "0";
            } else {
                value = parseInt(lines[y].firstChild.value);
            }
            image[x].push(value);
        }
    }

    let carre1 = [];
    let carre2 = [];
    let carre3 = [];
    let carre4 = [];
    let carre5 = [];
    let carre6 = [];
    let carre7 = [];
    let carre8 = [];
    let carre9 = [];
    let image2 = [];
    let id = [];


    //VERIFIER LIGNE ET COLONNES
    for (let x = 0; x < 9; x++) {
        for (let i = 0; i < 9; i++) {
            for (let j = i + 1; j < 9; j++) {
                if ((image[x][i] == image[x][j]) && image[x][i] != 0) {
                    id.push(x * 9 + i, x * 9 + j);
                    let line = ObjTableau.childNodes[x].childNodes;
                    for (const elmt of line) {
                        elmt.style.backgroundColor = "orange";
                    }
                }
                if ((image[i][x] == image[j][x]) && image[i][x] != 0) {
                    id.push(i * 9 + x, j * 9 + x);
                    let block = "col" + (x);
                    let column = document.getElementsByClassName(block);
                    for (const elmt of column) {
                        elmt.style.backgroundColor = "orange";
                    }
                }
            }
            // CREATION SOUS TABLEAU CARRE
            if (x < 3 && i < 3) {
                carre1.push(image[x][i], count);
            } else if (x < 3 && (i > 2 && i < 6)) {
                carre2.push(image[x][i], count);
            } else if (x < 3 && (i > 5 && i < 9)) {
                carre3.push(image[x][i], count);
            } else if ((x > 2 && x < 6) && (i < 3)) {
                carre4.push(image[x][i], count);
            } else if ((x > 2 && x < 6) && (i > 2 && i < 6)) {
                carre5.push(image[x][i], count);
            } else if ((x > 2 && x < 6) && (i > 5 && i < 9)) {
                carre6.push(image[x][i], count);
            } else if ((x > 5 && x < 9) && i < 3) {
                carre7.push(image[x][i], count);
            } else if ((x > 5 && x < 9) && (i > 2 && i < 6)) {
                carre8.push(image[x][i], count);
            } else if ((x > 5 && x < 9) && (i > 5 && i < 9)) {
                carre9.push(image[x][i], count);
            }
            count++;
        }

    }
    // CREATION TABLEAU 2D CARRE
    image2.push(carre1);
    image2.push(carre2);
    image2.push(carre3);
    image2.push(carre4);
    image2.push(carre5);
    image2.push(carre6);
    image2.push(carre7);
    image2.push(carre8);
    image2.push(carre9);

    // VERIFICATION DES CARRES
    for (let x = 0; x < 9; x++) {
        for (let i = 0; i < 18; i += 2) {
            for (let j = i + 2; j < 18; j += 2) {
                if ((image2[x][i] == image2[x][j]) && image2[x][i] != 0) {
                    id.push(image2[x][i + 1], image2[x][j + 1]);
                    colorSquare(x);
                }
            }
        }
    }
    for (const elmt of id) {
        let block = document.getElementById(elmt);
        block.style.backgroundColor = "red";
    }
}

function colorSquare(x) {
    if (x == 0 || x == 3 || x == 6) {
        for (let i = 0; i < 3; i++) {
            ObjTableau.childNodes[x].childNodes[i].style.backgroundColor = "orange";
            ObjTableau.childNodes[x + 1].childNodes[i].style.backgroundColor = "orange";
            ObjTableau.childNodes[x + 2].childNodes[i].style.backgroundColor = "orange";
        }
    }
    if (x == 1 || x == 4 || x == 7) {
        for (let i = 3; i < 6; i++) {
            ObjTableau.childNodes[x - 1].childNodes[i].style.backgroundColor = "orange";
            ObjTableau.childNodes[x].childNodes[i].style.backgroundColor = "orange";
            ObjTableau.childNodes[x + 1].childNodes[i].style.backgroundColor = "orange";
        }
    }
    if (x == 2 || x == 5 || x == 8) {
        for (let i = 6; i < 9; i++) {
            ObjTableau.childNodes[x - 2].childNodes[i].style.backgroundColor = "orange";
            ObjTableau.childNodes[x - 1].childNodes[i].style.backgroundColor = "orange";
            ObjTableau.childNodes[x].childNodes[i].style.backgroundColor = "orange";
        }
    }
}