'use strict';



const worksOfArt = {
    paintings: [
        {
            name: 'Mona Lisa',
            author: 'Leonardo da Vinci',
        },
        {
            name: 'The Starry Night',
            author: 'Vincent van Gogh',
        },
        {
            name: 'The Last Supper',
            author: 'Leonardo da Vinci',
        },
        {
            name: 'The Birth of Venus',
            author: 'Sandro Botticelli'
        }
    ],
    songs: [
        {
            name: 'Перемен',
            author: 'Кино'
        },
        {
            name: 'этой музе нужны мученики',
            author: 'Pyrokinesis'
        },
        {
            name: 'Future Nostalgia',
            author: 'Dua Lipa'
        },
        {
            name: 'Morgenstern',
            author: 'Rammstein'
        }
    ],
    movies: [
        {
            name: 'Léon: The Professional',
            author: 'Luc Besson'
        },
        {
            name: 'Baby Driver',
            author: 'Edgar Wright'
        },
        {
            name: 'Sherlock Holmes',
            author: 'Guy Ritchie'
        },
        {
            name: 'Arthur and the Minimoys',
            author: 'Luc Besson'
        },
        {
            name: 'Live aus Berlin',
            author: 'Rammstein'
        }
    ]
};



const kindsOfWorksOfArt = Object.keys(worksOfArt);
console.log(kindsOfWorksOfArt);



console.log(Object.values);
const allTheWorksOfArt = Object.values(worksOfArt).reduce(
    (acc, listOfWorksOfArt, index) => {
        console.log(`#${index + 1}:`, listOfWorksOfArt);
        return [...acc, ...listOfWorksOfArt];
    },
    []
);



const getAllWorks = name => {
    console.log(Object.entries);
    return Object.entries(worksOfArt)
        .reduce(
            (acc, [kind, list]) => {
                const listWithKindSpecified = list.map(item => Object.assign(
                    item, 
                    {
                        kind: kind.slice(0, kind.length - 1) // to get rid of 's'
                    }
                ));
                
                return [...acc, ...listWithKindSpecified];
            },
            []
        )
        .filter(workOfArt => workOfArt.author === name);
}

console.log(getAllWorks('Dua Lipa'));
console.log(getAllWorks('Luc Besson'));
console.log(getAllWorks('Rammstein'));
