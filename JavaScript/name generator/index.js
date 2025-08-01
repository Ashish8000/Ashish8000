let adj = {
    adj1 : "Crazy",
    adj2 : "Amazing",
    adj3 : "Fire",
}
let shop = {
    adj1 : "Engine",
    adj2 : "Foods",
    adj3 : "Garments",
}
let word = {
    adj1 : "Bros",
    adj2 : "Limited",
    adj3 : "Hub",
}

function generateName() {
    let adjKeys = Object.keys(adj);
    let shopKeys = Object.keys(shop);
    let wordKeys = Object.keys(word);

    let randomAdj = adj[adjKeys[Math.floor(Math.random() * adjKeys.length)]];
    let randomShop = shop[shopKeys[Math.floor(Math.random() * shopKeys.length)]];
    let randomWord = word[wordKeys[Math.floor(Math.random() * wordKeys.length)]];

    return `${randomAdj} ${randomShop} ${randomWord}`;
}

let nam = generateName();
console.log(nam);
alert(nam);