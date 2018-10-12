    const stars = document.querySelector('.stars');
    const star = `<li><i class="fa fa-star"></i></li>`;
    function rating() {
        if (moves <= 8) {
            stars.innerHTML = star + star +star;
        } else if (moves < 15){
            stars.innerHTML = star + star;
        } else {
            stars.innerHTML = star ;
        }
    }

    const timerContainers = document.querySelector('.timer');
        let liveTimer, totalSeconds = 0;    
    function timer(){
        liveTimer = setInterval(function(){
            //total secons by one
            totalSeconds++;
            //update time
            timerContainers.innerHTML = totalSeconds;
        }, 1000)
    }
    function stopTimer() {
        clearInterval(liveTimer);
    }

    //list of cards
    const icons = [ 'fa fa-music', 'fa fa-space-shuttle', 'fa fa-terminal', 'fa fa-code', 'fa fa-headphones', 'fa fa-bug', 'fa fa-magic', 'fa fa-rocket', 'fa fa-music', 'fa fa-space-shuttle', 'fa fa-terminal', 'fa fa-code', 'fa fa-headphones', 'fa fa-bug', 'fa fa-magic', 'fa fa-rocket'];

    // to call list class in html 
    const cardContainer = document.querySelector('.deck');
    //array to save click
    let open = [];
    let matched = [];
    
    //function to intalise game
    function init(){
        const cards = shuffle(icons);
        // create cards with dom 
        for (let i = 0; i < cards.length; i++) {
            const card = document.createElement('li');
                card.classList.add('card');
                card.innerHTML = `<i class="${cards[i]}"></i>`;
                cardContainer.appendChild(card);
                click(card);
            }
    }

    // click event
    function click(card) {
        card.addEventListener("click", function() {
            
            //if open cards
            const currentCard = this;
            const previousCard = open[0];

            if (open.length === 1) {
                
                card.classList.add("open", "show", "disable");
                open.push(this);
                //compare my tow cards
                compare(currentCard, previousCard);
            //we don't have open
            } else {
                currentCard.classList.add("open", "show", "disable");
                open.push(this);
            } 
        });
    }

    //to compare cards 
    function compare(currentCard, previousCard){ 

        if (currentCard.innerHTML === previousCard.innerHTML) {
            //matched
            currentCard.classList.add("match");
            previousCard.classList.add("match");

            matched.push(currentCard, previousCard);
            open = [];

            //if game is over 
            gameEnded();
        } else {
            setTimeout(function(){
                currentCard.classList.remove("open", "show", "disable");
                previousCard.classList.remove("open", "show", "disable"); 
            }, 300);
            open = [];
        }
        //add new move 
        addMove();
    }

    //when all card matching
    function gameEnded(){
        if(matched.length === icons.length){
         alert("Good job " + name + "thanks about your time.");
        }
    }
    
    //add move
    const movesContainer = document.querySelector(".moves");
    let moves = 0;
    function addMove(){
        moves++;
        movesContainer.innerHTML = moves;
        //set rating 
        rating();
        //set timer
        timer();
    }

    //restart buuton
    const restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", function(){
        //delete all cards
        cardContainer.innerHTML = "";
        //call init to new cards
        init();
        //reset any variables
        resetVal();
    });
    function resetVal(){
        matched = [];
        moves = 0;
        open = [];
        movesContainer.innerHTML = moves;
        stars.innerHTML = star;
        totalSeconds = 0;
        timerContainers.innerHTML = totalSeconds;
        stopTimer();
        firstClick = true;
    }

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
    }

//to start game 
init();
var name = prompt("whats your name?");
