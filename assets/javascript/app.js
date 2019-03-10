///// STEP.1 Create the variables and question & answer lists.
// define variables
var correctAnswer = 0
var incorrectAnswer = 0
var timeRemaining = 30
var listNumber = 0


// question & answer lists in object form
// Always put the the correct answer at the first element in array.
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


///// STEP2. Time Remaining
// timeRemaing is decreased by 1 every 1 second

///// STEP3. Show the question and answers
// function to display question at key:number'i'
function nextQuestion(i) {
    // define var numberI to use it as an object key
    var numberI = "number" + i

    // bring question at key:number'i'
    var question = QnA[numberI].question
    console.log(question)

    // update it in html <div id="question">
    $("#question").html(question)
}

// function to mix answers at key:number'i' & display them
function mixAnswer(i) {
    // define var numberI to use it as an object key
    var numberI = "number" + i

    // bring answer array at key:number'i'
    var answerArray = QnA[numberI].answer
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
    console.log(randomNumberArray)

    // using randomNumberArray, change the order of original answer array
    var mixedAnswerArray = []
    for (var j = 0; j < answerArray.length; j++) {
        var newIndex = randomNumberArray[j]
        mixedAnswerArray.push(answerArray[newIndex])
    }
    console.log("mixed answer array: " + mixedAnswerArray)

    // update it in html <div id="answer">
    for (var j = 0; j< mixedAnswerArray.length; j++) {
        var newDiv = $("<div>").text(mixedAnswerArray[j])
        newDiv.attr("data-value",mixedAnswerArray[j])
        $("#answer").append(newDiv)
    }
}

// combine above two function
function newQnA (i) {
    nextQuestion(i)
    mixAnswer(i)
}

newQnA(5)

///// STEP4. if uswer runs out of time -> incorrectAnswer++, tell the player that time's up & display the correct answer, show next question after a few seconds.
///// STEP4. if user click correct answer -> correctAnswer++, show a screen congratulating, show next question after a few seconds
///// STEP5. if user click wrong answer, incorrectAnswer++, display the correct answer & show next question after a few seconds.
///// STEP6. on the final screen, show the number of correct answer, incorrect answer, and restart button.
