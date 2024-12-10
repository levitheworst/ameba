class TotalRounds {
    rounds = Array();
    winner() {
        var x = 0;
        this.rounds.forEach(round => {
            if(round.winner() == 'a') {
                x++;
            }
        });
        if(x > 5) {
            return 'a';
        }
        if(x === 5) {
            return 'draw';
        }
        return 'b';
    }
    heads() {
        var x = 0;
        this.rounds.forEach(round => {
            x += round.heads();
        });
        return x;
    }
    tails() {
        var x = 0;
        this.rounds.forEach(round => {
            x += round.tails();
        });
        return x;
    }
}
class Round {
    num;
    generations = Array();
    constructor(num) {
        this.num = num;
    }
    winner() {
        if(this.generations.length < 6) {
            return 'b';
        }
        if(this.generations[5].alive() > 0) {
            return 'a';
        }
        return 'b';
    }
    heads() {
        var x = 0;
        this.generations.forEach(e => {
            x += e.heads;
        });
        return x;
    }
    tails() {
        var x = 0;
        this.generations.forEach(e => {
            x += e.tails;
        });
        return x;
    }
}
class Generation {
    num; // 0-5
    slots = Array();
    constructor(num) {
        this.num = num;
    }
    heads = 0;
    tails = 0;
    alive() {
        var x = 0;
        this.slots.forEach(e => {
            if(e === true) {
                x++
            }
        });
        return x;
    }
    dead() {
        var x = 0;
        this.slots.forEach(e => {
            if(e === false) {
                x++;
            }
        });
        return x;
    }
}
const main_game = new TotalRounds();
function game() {
    for(let round = 0; round < 10; round++) {
        const newRound = new Round(round);
        for(let gen = 0; gen < 6; gen++) {
            if(gen === 0) {
                newRound.generations[0] = new Generation(0);
                newRound.generations[0].slots.push(true);
                continue;
            }
            const pastGeneration = newRound.generations[gen - 1];
            const newGeneration = new Generation(gen);
            if(pastGeneration.alive() === 0) {
                newGeneration.slots = pastGeneration.slots.concat();
            };
            const aliveSlot = Array();
            const deadSlot = Array();
            for(let i = 0; i < newRound.generations[gen - 1].alive(); i++) {
                if(Math.random() * 100 > 50) {
                    newGeneration.tails++;
                    aliveSlot.push(true, true);
                }
                else {
                    newGeneration.heads++;
                    deadSlot.push(false);
                }
            }
            newGeneration.slots = aliveSlot.concat(deadSlot);
            newRound.generations[gen] = newGeneration;
        }
        main_game.rounds.push(newRound);
    }
}
game();
console.log('-----');
console.log();
console.log('GAME!');
console.log();
console.log('Winner: ' + main_game.winner());
console.log('Heads: ' + main_game.heads());
console.log('Tails: ' + main_game.tails());
console.log();
for(let r = 0; r < 10; r++) {
    var round = main_game.rounds[r];
    console.log('-----');
    console.log();
    console.log(`Round ${r} | Winner: ${round.winner()} | Heads: ${round.heads()} | Tails: ${round.tails()}`);
    console.log();
    for(let g = 0; g < 6; g++) {
        var gen = round.generations[g];
        console.log(`Gen ${g} | ${gen.slots} | Heads: ${gen.heads} | Tails: ${gen.tails} | ${gen.alive()} Alive | ${gen.dead()} Dead`);
    }
    console.log();
}
console.log();
console.log('-----');
