///// STEP.1 Create the variables and question & answer lists.
/// 1-1. define variables
var NOfcorrectAnswer = 0
var NOfincorrectAnswer = 0
var timeRemaining = 5
var intervalId;
var currentQNumber = 1
var answerArray = []
var correctAnswer = ""

/// 1-2. question & answer lists in object form
// always put the the correct answer at the first element in array.
var QnA = {
    number1: {
        question: "In which game the word \"love\" is used?",
        answer: ["Tennis", "Golf", "Football", "Baseball"]
    },
    number2: {
        question: "In basketball, how many players each team has?",
        answer: ["5", "4", "6", "7"]
    },
    number3: {
        question: "What is the oldest Tennis tournament in the world?",
        answer: ["Wimbledon", "U.S. Open", "French Open", "Australian Open"]
    },
    number4: {
        question: "In 2018, where were the Winter Olympic Games held?",
        answer: ["Pyeongchang", "Rio de Janeiro", "London", "Sochi"]
    },
    number5: {
        question: "What type of race is a Tour de France?",
        answer: ["Bicycle racing", "Animal racing", "Motor racing", "Boat racing", "Air racing"]
    }
}


///// STEP2. Game start 
/// 2-1. when user click the start button, start the game
$("#start_button").on("click", nextQnA)

/// 2-2. function to start game
function nextQnA() {
    console.log("---------")
    var numberI = "number" + currentQNumber
    var objectKey = Object.keys(QnA)

    // if numberI is valid key in object QnA,
    if (objectKey.indexOf(numberI) !== -1) {
        // remove start button
        $("#game_menu").empty()

        // start timer
        startTimer()

        // display next Q & A
        nextQuestion()
        mixAnswer()

        // answer button on click event
        clickAnswerButton()

        // increase curentQNumber by 1 to get next Q & A
        currentQNumber++
    }

    // if numberI is not valid key in object QnA (=if there is no more next question)
    else {
        finalScreen()
    }
    console.log("---------")
}

/// 2-3. display the question and answers
// function to display question at key:number'i'
function nextQuestion() {
    // define var numberI to use it as an object key
    var numberI = "number" + currentQNumber

    // bring question at key:number'i'
    var question = QnA[numberI].question
    console.log(question)

    // empty all comment div & update new question in question div
    $("#comment").empty()
    $("#question").html(question)
}

// function to mix answers at key:number'i' & display them
function mixAnswer() {
    // define var numberI to use it as an object key
    var numberI = "number" + currentQNumber

    // bring answer array at key:number'i'
    answerArray = QnA[numberI].answer
    console.log("original answer array:" + answerArray)

    // create new random number array between 0 - answerArray.length
    // it will be used as a new index when mixing original answerArray
    var randomNumberArray = []
    while (randomNumberArray.length < answerArray.length) {
        var randomNumber = Math.floor(Math.random() * answerArray.length)
        if (randomNumberArray.indexOf(randomNumber) === -1) {
            randomNumberArray.push(randomNumber)
        }
    }

    // using randomNumberArray, change the order of original answer array
    var mixedAnswerArray = []
    for (var j = 0; j < answerArray.length; j++) {
        var newIndex = randomNumberArray[j]
        mixedAnswerArray.push(answerArray[newIndex])
    }
    console.log("mixed answer array: " + mixedAnswerArray)

    // update it in html <div id="answer">
    for (var j = 0; j < mixedAnswerArray.length; j++) {
        var newDiv = $("<button>").text(mixedAnswerArray[j])
        newDiv.attr("class", "answer_button")
        newDiv.attr("data_value", mixedAnswerArray[j])
        $("#answer").append(newDiv)
    }

    // assign value of correctAnswer
    correctAnswer = answerArray[0]
    console.log("correct answer: " + correctAnswer)
}


///// STEP3. Timer set
/// 3-1. function to reset timeRemaining=30 & execute timeDecrease function every 1 second
function startTimer() {
    timeRemaining = 5
    $("#time").text("Time Remaining: " + timeRemaining + " seconds")
    intervalId = setInterval(timeDecrease, 1000)
}

/// 3-2. function to decreased timeRemaining by 1 and display it in html
function timeDecrease() {
    timeRemaining--
    $("#time").text("Time Remaining: " + timeRemaining + " seconds")

    //if timeRemaining === 0, execute runOutTime()
    if (timeRemaining === 0) {
        runOutTime()
    }
}

/// 3-3.function if user runs out of time 
function runOutTime() {
    // stop timer (clear interval)
    clearInterval(intervalId)

    // NOfincorrectAnswer++
    NOfincorrectAnswer++
    console.log("NOfincorrectAnswer :" + NOfincorrectAnswer)

    // tell the player that time's up & display the correct answer
    $("#time").empty()
    $("#question").empty()
    $("#answer").empty()
    $("#comment").html("Time's up!" + "<br>" + "The correct answer is " + correctAnswer + ".")

    // show next question & start timer after a few seconds 
    setTimeout(nextQnA, 1000 * 3)
}


///// STEP4. Answer button click event
/// 4-1. when user clicked one of the answers, run checkAnswer function
function clickAnswerButton() {
    $(".answer_button").on("click", checkAnswer)
}

/// 4-2. check if the answer is correct or not and run relevant function
function checkAnswer() {
    var buttonValue = $(this).attr("data_value")

    if (buttonValue === correctAnswer) {
        selectCorrectAnswer()
    }

    else {
        selectIncorrectAnswer()
    }
}

/// 4-3. if user select correct answer,
function selectCorrectAnswer() {
    // stop timer (clear interval)
    clearInterval(intervalId)

    // NofcorrectAnswer++
    NOfcorrectAnswer++
    console.log("NOfCorrectAnswer :" + NOfcorrectAnswer)

    // show a screen congratulating
    $("#time").empty()
    $("#question").empty()
    $("#answer").empty()
    $("#comment").html("Congratulation!" + "<br>" + "You selected correct answer!")

    // show next question after a few seconds
    setTimeout(nextQnA, 1000 * 3)
}

/// 4-4. if user select incorrect answer,
function selectIncorrectAnswer() {
    // stop timer (clear interval)
    clearInterval(intervalId)

    // NOfincorrectAnswer++
    NOfincorrectAnswer++
    console.log("NOfincorrectAnswer :" + NOfincorrectAnswer)

    // tell the player that time's up & display the correct answer
    $("#time").empty()
    $("#question").empty()
    $("#answer").empty()
    $("#comment").html("You picked wrong answer." + "<br>" + "The correct answer is " + correctAnswer + ".")

    // show next question & start timer after a few seconds 
    setTimeout(nextQnA, 1000 * 3)
}


///// STEP5. on the final screen, show the number of correct answer, incorrect answer, and restart button.
/// 5-1. function to display final screen
function finalScreen() {
    // empty all div
    $("#time").empty()
    $("#question").empty()
    $("#answer").empty()
    $("#comment").empty()

    // create nwe div & append them in #comment div
    var newDiv1 = $("<div>").text("Number of correct Answer: " + NOfcorrectAnswer)
    var newDiv2 = $("<div>").text("Number of incorrect Answer: " + NOfincorrectAnswer)
    var newDiv3 = $("<button>").text("Restart").attr("id", "restart_button")

    $("#comment").append(newDiv1, newDiv2, newDiv3)
}

/// 5-2. when user click the restart button, start the new game
// because restart button is dynamically added button, so use $(document) 
$(document).on("click", "#restart_button", newGame)

/// 5-3. new game function (in order to restart, reset var)
function newGame() {
    NOfcorrectAnswer = 0
    NOfincorrectAnswer = 0
    currentQNumber = 1
    nextQnA()
}

