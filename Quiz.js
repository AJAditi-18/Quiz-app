const Questions = [
    {
        Question: "Who is the author of the popular classic - 'Pride and Prejudice'? ",
        Options:[
            {option: "Charlotte Brontë", richtig: false},
            {option: "Jules Verne", richtig: false},
            {option: "Jane Austen", richtig: true},
            {option: "Jane Eyre", richtig: false}
        ]
    },
    {
        Question: "Which of the following is NOT an example of an epistolary?",
        Options:[
            {option: "Dracula by Bram Stroker", richtig: false},
            {option: "Crime and Punishment by Fyodor Dostoevsky", richtig: true},
            {option: "Frankenstein by Mary Shelley", richtig: false},
            {option: "Lady Susanne by Jane Austen", richtig: false}
        ]
    },
    {
        Question: "Who is the world's best selling mystery writer of all time?",
        Options:[
            {option: "Agathe Christie", richtig: true},
            {option: "Arthur Conan Doyle", richtig: false},
            {option: "Sherlock Holmes", richtig: false},
            {option: "Frieda McFadden", richtig: false}
        ]
    },
    {
        Question: "Which Hogwarts House has the motto, 'Wit beyond measure is a man's greatest treasure'?",
        Options:[
            {option: "Gryffindor", richtig: false},
            {option: "Hufflepuff", richtig: false},
            {option: "Slytherin", richtig: false},
            {option: "Ravenclaw", richtig: true}
        ]
    },
    {
        Question: "Which mythical creature is Chiron?",
        Options:[
            {option: "Gryffin", richtig: false},
            {option: "Centaur", richtig: true},
            {option: "Yeti", richtig: false},
            {option: "Werewolf", richtig: false}
        ]
    }
];
const QuestionElement = document.getElementById("Q");
const OptionElement = document.getElementById("options");
const Next = document.getElementById("next");

var currentQindex = 0;
var score = 0;

function Quiz(){
    currentQindex = 0;
    score = 0;
    Next.innerHTML = "Next";
    showQues();
}

function showQues(){
    Reset();
    let currentQuestion = Questions[currentQindex];
    let Qno= currentQindex + 1;
    QuestionElement.innerHTML = Qno + ". " + currentQuestion.Question;

    currentQuestion.Options.forEach(opt => {
        const button = document.createElement("button");
        button.innerHTML = opt.option;
        button.classList.add("btn");
        button.dataset.correct = opt.richtig;
        OptionElement.appendChild(button);
        if(opt.correct){
            button.dataset.correct = opt.richtig;
        }
        button.addEventListener("click", selectOption);
    });
}

function selectOption(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("Correct");
        score++;
    }else{
        selectedBtn.classList.add("Incorrect");
    }
    Array.from(OptionElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("Correct");
        }
        button.disabled = true;
    });
    Next.style.display = "block";
}

function DisplayScore(){
    Reset();
    if(score == Questions.length){
    QuestionElement.innerHTML = `Congratulations!!! You scored ${score} out of ${Questions.length}`;
    }
    else if(score== 0){
        QuestionElement.innerHTML = 'Boo!!!! You got ZERO answers right! How do you even manage that?!'
    }
    else if(score>0 && score<3){
        QuestionElement.innerHTML = `Your score is ${score} out of ${Questions.length}. I believe you can do better than that!`;
    }
    else{
        QuestionElement.innerHTML = `Your score is ${score} out of ${Questions.length}. Better luck next time!`;
    }
    Next.innerHTML = "Retake Quiz";
    Next.style.display = "block";
}

function MovetoNextQ(){
    currentQindex++;
    if(currentQindex<Questions.length){
        showQues();
    } else{
        DisplayScore();
    }
}
Next.addEventListener("click", ()=> {
    if(currentQindex < Questions.length){
        MovetoNextQ();
    }else{
        Quiz();
    }
    });

function Reset(){
    Next.style.display = "none";
    while(OptionElement.firstChild){
        OptionElement.removeChild(OptionElement.firstChild);
    }
}

Quiz();