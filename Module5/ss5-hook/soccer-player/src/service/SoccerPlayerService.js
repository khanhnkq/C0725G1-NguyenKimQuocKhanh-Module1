let soccerPlayer = [
    {
        id: 1,
        code: "PL-001",
        name: "Lionel Messi",
        birthDate: "1987-06-24",
        transferValue: 50000000,
        position: "RW"
    },
    {
        id: 2,
        code: "PL-002",
        name: "Cristiano Ronaldo",
        birthDate: "1985-02-05",
        transferValue: 30000000,
        position: "ST"
    },
    {
        id: 3,
        code: "PL-003",
        name: "Kylian Mbappé",
        birthDate: "1998-12-20",
        transferValue: 180000000,
        position: "LW"
    },
    {
        id: 4,
        code: "PL-004",
        name: "Kevin De Bruyne",
        birthDate: "1991-06-28",
        transferValue: 90000000,
        position: "CM"
    },
    {
        id: 5,
        code: "PL-005",
        name: "Virgil van Dijk",
        birthDate: "1991-07-08",
        transferValue: 60000000,
        position: "CB"
    }
];

export const add = (soccerPlayer1) => {
    soccerPlayer.push(soccerPlayer1);
}

export const remove = (id) => {
    soccerPlayer = soccerPlayer.filter(soccer => soccer.id !== id);
}
export const findAll = () => {
    return soccerPlayer;
}
export const findById = (id) => {
    for (let i = 0; i < soccerPlayer.length; i++) {
        if (soccerPlayer[i].id === id) {
            return soccerPlayer[i];
        }
    }
}
