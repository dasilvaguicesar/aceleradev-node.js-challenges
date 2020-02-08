'use strict'

// Importar os dados csv do arquivo  ../data.csv
const dataConstruction = () => {
    const fs = require('fs');
    const data = fs.readFileSync('../data.csv', 'utf8')
        .split('\n')
        .map(currentValue => currentValue.split(','));
    const properties = data.shift()

    function playersConstructor(properties, attributes) {
        const constrObj = {};
        properties.forEach((currentValue, index) => constrObj[currentValue] = attributes[index]);
        return constrObj;
    }

    const players = []
    data.forEach((currentValue) => players.push(playersConstructor(properties, currentValue)));

    players.forEach((curr, index) => {
        if (curr.name === undefined) {
            players.splice(index, 1)
        }
    })
    return players;
}
/* console.log('\n');
console.log(dataConstruction()); */


//Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo? 
const q1 = () => {
    const myPlayers_1 = dataConstruction();
    let SearchNatio = myPlayers_1.map((currentValue) => {
        return currentValue.nationality;
    });
    let nationa = SearchNatio.filter((currentValue, index, arr) => arr.indexOf(currentValue) == index);
    return nationa.length;
}
/* console.log('\nq1:');
console.log(q1()); */


//Quantos clubes (coluna `club`) diferentes existem no arquivo?
const q2 = () => {
    const myPlayers_2 = dataConstruction();
    let SearchClub = myPlayers_2.map((currentValue) => {
        return currentValue.club;
    });
    let club = SearchClub.filter((currentValue, index, arr) => arr.indexOf(currentValue) == index);
    club.forEach((currentValue, index) => {
        if (currentValue === '') {
            club.splice(index, 1)
        } if (currentValue == undefined) {
            club.splice(index, 1)
        }
    })
    return club.length;
}
/* console.log('\nq2:');
console.log(q2()); */


//Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.
const q3 = () => {
    const myPlayers_3 = dataConstruction();
    const firstTwenty = myPlayers_3.splice(0, 20)
    const names = firstTwenty.map(currentValue => currentValue.full_name);
    return names
}
/* console.log('\nq3:');
console.log(q3()); */


//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
const q4 = () => {
    const myPlayers_4 = dataConstruction();

    myPlayers_4.sort((a, b) => {
        if (a.eur_wage === b.eur_wage) {
            return a.full_name - b.full_name
        }
        return b.eur_wage - a.eur_wage;
    });
    return myPlayers_4.slice(0, 10).map(curr => curr.full_name)
}
console.log('\nq4:');
console.log(q4());


//Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
const q5 = () => {
    const myPlayers_5 = dataConstruction();

    myPlayers_5.sort((a, b) => {
        if (b.age == a.age) {
            return b.eur_wage - a.eur_wage;
        }
        return b.age - a.age;

    })
    return myPlayers_5.slice(0, 10).map(curr => curr.full_name)
}
/* console.log('\nq5:');
console.log(q5()); */


//Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.
const q6 = () => {
    const myPlayers_6 = dataConstruction().reduce((object, item) => {
        if (!object[item.age]) {
            object[item.age] = 1;
        } else {
            object[item.age]++;
        }
        return object;
    }, {});
    return myPlayers_6;
}
console.log('\nq6:');
console.log(q6());

module.exports = { q1, q2, q3, q4, q5, q6 }