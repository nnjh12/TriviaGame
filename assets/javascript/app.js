///// STEP.1 create the variables and question & answer lists.
// define variables
var NOfcorrectAnswer = 0
var NOfincorrectAnswer = 0
var timeRemaining = 5
var intervalId;
var currentQNumber = 1
var answerArray = []
var correctAnswer = ""
var incorrectAnswer = []

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


///// STEP2. display the question and answers
// function to display question at key:number'i'
function nextQuestion() {
    // define var numberI to use it as an object key
    var numberI = "number" + currentQNumber

    // bring question at key:number'i'
    var question = QnA[numberI].question
    console.log(question)

    // empty all div & update it in html <div id="question">
    $("#time").empty()
    $("#question").empty()
    $("#answer").empty()
    $("#question").html(question)

    // currentQNumber++
    currentQNumber++
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
    console.log(randomNumberArray)

    // using randomNumberArray, change the order of original answer array
    var mixedAnswerArray = []
    for (var j = 0; j < answerArray.length; j++) {
        var newIndex = randomNumberArray[j]
        mixedAnswerArray.push(answerArray[newIndex])
    }
    console.log("mixed answer array: " + mixedAnswerArray)

    // update it in html <div id="answer">
    for (var j = 0; j < mixedAnswerArray.length; j++) {
        var newDiv = $("<div>").text(mixedAnswerArray[j])
        newDiv.attr("data-value", mixedAnswerArray[j])
        $("#answer").append(newDiv)
    }

    // function to assign correct and incorrect answer
    correctAnswer = answerArray[0]
    for (var j = 1; j < answerArray.length; j++) {
        incorrectAnswer.push(answerArray[j])
    }
    console.log("correct answer: " + correctAnswer)
    console.log("incorrect answer: " + incorrectAnswer)
}



// combine above two function
function newQnA() {
    nextQuestion()
    mixAnswer()
}

newQnA()



///// STEP3. timer set
// function to decreased timeRemaining by 1 and display it in html
function timeDecrease() {
    timeRemaining--
    console.log("time remaing :" + timeRemaining)
    $("#time").text("Time Remaining: " + timeRemaining + " seconds")

    //if timeRemaining === 0, execute runOutTime()
    if (timeRemaining === 0) {
        runOutTime()
    }
}

// function to reset timeRemaining=30 & execute timeDecrease function every 1 second
function startTimer() {
    timeRemaining = 5
    $("#time").text("Time Remaining: " + timeRemaining + " seconds")
    intervalId = setInterval(timeDecrease, 1000)
}

// function if user runs out of time 
function runOutTime() {
    // stop timer (clear interval)
    clearInterval(intervalId)

    // NOfincorrectAnswer++
    NOfincorrectAnswer++

    // tell the player that time's up & display the correct answer
    $("#time").empty()
    $("#question").empty()
    $("#answer").empty()
    $("#answer").html("Time's up!" + "<br>" + "The correct answer is " + correctAnswer + ".")

    //show next question & start timer after a few seconds 
    setTimeout(newQnA, 1000 * 3)
    setTimeout(startTimer, 1000 * 3)
}

startTimer()

///// STEP4. if user click correct answer,
//correctAnswer++, show a screen congratulating, show next question after a few seconds

///// STEP5. if user click wrong answer
//incorrectAnswer++, display the correct answer & show next question after a few seconds.

///// STEP6. on the final screen, show the number of correct answer, incorrect answer, and restart button.
