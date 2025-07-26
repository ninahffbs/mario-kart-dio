const players = [
    {
        NOME: "Mario",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0,
    },
    {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
    },
    {
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    },
    {
        NOME: "Peach",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0,
    },
    {
        NOME: "Yoshi",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 4,
        PODER: 3,
        PONTOS: 0,
    },
    {
        NOME: "Donkey Kong",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    }
]

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function selectPlayer(playerNumber) {
    console.log(`\n--- Selecionar Jogador ${playerNumber} ---`);
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.NOME}`);
    });
    let chosenPlayerIndex;
    while (true) {
        const input = await askQuestion(`Escolha o Jogador ${playerNumber} pelo número: `);
        chosenPlayerIndex = parseInt(input) - 1;

        if (chosenPlayerIndex >= 0 && chosenPlayerIndex < players.length) {
            return { ...players[chosenPlayerIndex], PONTOS: 0 };
        } else {
            console.log("Escolha inválida. Por favor, digite um número da lista.");
        }
    }
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock(){
    let random = Math.random();
    let result;
    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
}

async function randomConfront(){
    let random = Math.random();
    let result;
    if(random < 0.5){
        result = "casco";
    }
    else{
        result = "bomba";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult+attribute}`);
}

async function playRaceEngine(character1, character2){
    for(let i = 1; i <= 5; i++){
        console.log(`🏁 Rodada ${i}`)
        let diceResult1 = await rollDice();

        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }
        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character1.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }
        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            let confrontType = await randomConfront();

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!`);
            console.log(`O tipo de confronto é ${confrontType}!`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);
            
            if(confrontType === "casco"){
                if(powerResult1 > powerResult2){
                    console.log(`${character1.NOME} venceu o confronto!`);
                    if(character2.PONTOS > 0){
                        console.log(`${character2.NOME} perdeu um ponto`);
                        character2.PONTOS--;
                    }
                    else{
                        console.log(`${character2.NOME} não tem pontos o suficiente para perder!`);
                    }
                }
                else{
                    console.log(`${character2.NOME} venceu o confronto!`);
                    if(character1.PONTOS > 0){
                        console.log(`${character1.NOME} perdeu um ponto`);
                        character1.PONTOS--;
                    }
                    else{
                        console.log(`${character1.NOME} não tem pontos o suficiente para perder!`);
                    }
                }
            }

            if(confrontType === "bomba"){
                if(powerResult1 > powerResult2){
                    console.log(`${character1.NOME} venceu o confronto!`);
                    if(character2.PONTOS > 1){
                        console.log(`${character2.NOME} perdeu dois pontos`);
                        character2.PONTOS = character2.PONTOS - 2;
                    }
                    else{
                        console.log(`${character2.NOME} não tem pontos o suficiente para perder!`);
                    }
                }
                else{
                    console.log(`${character2.NOME} venceu o confronto!`);
                    if(character1.PONTOS > 1){
                        console.log(`${character1.NOME} perdeu dois pontos`);
                        character1.PONTOS = character1.PONTOS - 2;
                    }
                    else{
                        console.log(`${character1.NOME} não tem pontos o suficiente para perder!`);
                    }
                }
            }
        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }
        else if(totalTestSkill1 < totalTestSkill2){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }
    }
}

async function declareWinner(character1, character2){
    console.log("Resultado final:");
    console.log(`Pontos do ${character1.NOME}: ${character1.PONTOS}`);
    console.log(`Pontos do ${character2.NOME}: ${character2.PONTOS}`);
    if(character1.PONTOS > character2.PONTOS){
        console.log(`${character1.NOME} é o vencedor!`);
    }
    else if(character2.PONTOS > character1.PONTOS){
        console.log(`${character2.NOME} é o vencedor!`);
    }
    else{
        console.log(`Houve um empate! Não temos um vencedor da corrida.`);
    }
}

(async function main(){
    const player1 = await selectPlayer(1);
    const player2 = await selectPlayer(2);
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando! :D\n`
    );
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
    rl.close();
})();

/*confroto
sortear aleatoriamente se é um casco(-1 ponto) ou um bomba(-2 pontos)
quem vence o confronto ganha um turbo (+ 1ponto) aleatoriamente*/
