var cont=0;
//crear mazo
function createDeck(){
    var deck=[];
    for (var i = 0 ; i < values.length; i++) {
        for(var x = 0; x < suits.length; x++) {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
    return deck;
}

function createPlayers(name){
    var hand = [];
    var player = { Name: name, Points: 0, Hand: hand };
    players.push(player);
        
    return player
}

function createPlayersUI(i, name){
    //document.getElementById('players').innerHTML = '';
    //for(var i = 0; i < players.length; i++)
    //{
        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('div');

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = name;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    //}
}

function shuffle(){
    // for 1000 turns
    // reapartir dos cartas al azar
    for (var i = 0; i < 1000; i++){
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var temp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = temp;
    }
}

function dealHands(players){
    // entregar dos cartas a cada jugador presente
    for(var i = 0; i < 2; i++){
        for (var x = 0; x < players.length; x++){
            var card = players[x].Hand.pop();
            makeCard(card, x);
            updatePoints();
        }
    }
    updateDeck();
}

function makeCard(card, player){
    var hand = document.getElementById('hand_' + player);
    console.log(card)
    hand.appendChild(getCard(card));
}

// retorna los puntos de un jugador
function getPoints(player){
    var points = 0;
    for(var i = 0; i < players[player].Hand.length; i++){
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

function getCard(card){
    var el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = card.Suit + ' ' + card.Value;
    console.log(el)
    return el;
}

function updatePoints(){
    for (var i = 0 ; i < players.length; i++){
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

function hitMe(){
    // dar una nueva carta del mazo al jugador actual
    var card = deck.pop();
    players[currentPlayer].Hand.push(card);
    makeCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    // verificar si los puntos del jugador actual son mayores a 21
    check();
}

function stand(){
    // mover al siguiente jugador
    if (currentPlayer != players.length-1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    }
    else {
        endGame();
    }
}

function endGame(){
    var winner = [];
    var score = 0;
    for(var i = 0; i < players.length; i++){
        if (players[i].Points > score && players[i].Points < 22){
            winner = i;
        }

        score = this.players[i].Points;
    }
    for (var i=0; i<this.players.length; i++){
        if (this.players[i].Points == score){
            winner.push(this.player[i]);
        }
    }
    console.log(winner)
    document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].Name;
}

function check(){
    if (players[currentPlayer].Points > 21){
        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].Name + ' Went over 21';
    }
}

function updateDeck(){
    document.getElementById('deckcount').innerHTML = deck.length;
}

/*this.getCardImage = function() {
    var suitName, CardName;
    var sourceRoot="img/";

    switch(suit) {
        case 1:
            suitName="hearts";
            break;
        case 2:
             suitName = "diamonds";
             break;
        case 3:
             suitName = "spades";
             break;
        case 4:
             suitName = "clubs";
             break;
        default:
            suitName = "Error";
    }; 

    switch(number) {
        case 1:
             cardName = "ace";
             break;
        case 11:
            cardName="jack";
            break;
        case 12:
             cardName = "queen";
             break;
        case 13:
             cardName = "king";
             break;
        default:
            cardName = number;
    }; 

    return (sourceRoot + cardName + '_of_' + suitName + '.png');

}*/

function start(name){
    // entrega dos cartas a cada jugador
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(1, name);
    createPlayersUI(cont-1, name);
    console.log(players.length);
    dealHands();            
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

window.addEventListener('load', function(){
    createDeck();
    shuffle();
});
