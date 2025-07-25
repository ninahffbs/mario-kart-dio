const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};


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

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);
            
            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceu o confronto!`);
                console.log(`${character2.NOME} perdeu um ponto`);
                character2.PONTOS--;
            }

            if(powerResult1 < powerResult2 && character1.PONTOS > 0){
                console.log(`${character2.NOME} venceu o confronto!`);
                console.log(`${character1.NOME} perdeu um ponto`);
                character1.PONTOS--;
            }
            
            if(powerResult1 === powerResult2){
                console.log("Confronto empatado, nenhum ponto foi perdido");
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
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando! :D\n`
    );
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
//funcao auto invoke (nao precisa chamar ela fora do corpo dela)
