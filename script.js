let isTyping = false;
const typingSpeed = 45; 


const questions = [
  {
    text: "I need help with something.\n\nI’m trying to plan the perfect Valentine’s Day.",
    choices: ["Okay, I’ll help"],
    background: "img/1st_image.png"
  },
  {
    text: "Let me make sure I’m picturing you right.\nWhat feels most like you?",
    choices: [
      "Calm and thoughtful",
      "Loud and playful",
      "Soft but strong",
      "A mix of everything"
    ],
    background: "img/2nd_image.png"
  },
  {
    text: "On a tired day, what do you crave more?",
    choices: [
      "Quiet company",
      "A long conversation",
      "Laughing it off",
      "Being understood without talking",
      "Drinks / snacks while watching yt/movies",
      "Sleeping",
      "Playing games"
    ],
    background: "img/3rdMassive stones at side.png"
  },
  {
    text: "When someone cares about you, what makes it feel real?",
    choices: [
      "They remember small details",
      "They spend time with you",
      "They say it out loud",
      "They show up when it counts",
      "They make me feel seen when I feel alone"
    ],
    background: "img/4thStatue.png"
  },
  {
    text: "Whats your primary love language?",
    choices: [
      "Acts of service",
      "Quality time",
      "Receiving gifts",
      "Physical touch",
      "Words of affirmation"
    ],
    background: "img/5thruins.png"
  },
  {
    text: "What’s a simple thing that always makes your heart feel light?",
    choices: [
      "Laughing together",
      "Watching the sunset",
      "A kind message",
      "Just being there for you",
      "Head pats",
      "Having someone to ramble to and listen to me",
      "Someone protecting me",
      "A hug"
    ],
    background: "img/6thBentTree.png"
  },
  {
    text: "If your perfect day had a color, which would it be?",
    choices: [
      "Soft pink",
      "Warm gold",
      "Deep purple",
      "Cool blue"
    ],
    background: "img/7thwaterfalls.png"
  },
  {
    text: "If you could go out and adventure, which experience would you like to experience?",
    choices: [
      "Stargazing at night",
      "Camping in the woods",
      "Sailing out to the sea",
      "Mountain climbing",
      "Exploring waterfalls",
      "Hot air balloon"
    ],
    background: "img/8thpath with even stones.png"
  },
  {
    text: "Which of these makes you truly feel seen?",
    choices: [
      "Listening",
      "Actions",
      "Shared silences",
      "Remembering the little things",
      "All of the above"
    ],
    background: "img/9th_image.png"
  },
  {
    text: "How would you like someone to interact with you so you feel truly seen and understood?",
    choices: [
      "Listening carefully, even in silence",
      "Remembering small details about me",
      "Giving space but still being present",
      "Showing care through thoughtful actions",
      "All of the above"
    ],
    background: "img/10seaofcloud and mountain top.png"
  },
  {
  text: "We’ve wandered together through this forest, shared little moments, and discovered pieces of what makes you, you.",
  choices: [
    "..."
  ],
  background: "img/10seaofcloud and mountain top.png"
},
  {
  text: "Each choice you made paints a picture I can’t stop thinking about.\n\n\nEvery answer you gave helped me understand you.",
  choices: [
    "..."
  ],
  background: "img/10seaofcloud and mountain top.png"
},
{
  text: "So…\nWill you be my Valentine?",
  choices: [
    "Yes",
    "No",
  ],
  background: "img/10seaofcloud and mountain top.png"
}

];



function changeBackground(imagePath) {
  document.body.style.backgroundImage = `url("${imagePath}")`;
}


let currentQuestion = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const contentEl = document.getElementById("content");

function showQuestion() {
  const question = questions[currentQuestion];

  changeBackground(question.background);

  questionEl.innerText = "";
  choicesEl.innerHTML = "";
  isTyping = true;

  typeText(questionEl, question.text, () => {
    isTyping = false;
    showChoices(question.choices);
  });
}

function typeText(element, text, callback) {
  let index = 0;
  element.innerText = "";

  function type() {
    if (index < text.length) {
      element.innerText += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    } else {
      if (callback) callback();
    }
  }

  type();
}

function showChoices(choices) {
  choicesEl.innerHTML = ""; // clear previous choices
  choicesEl.style.position = "relative";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;

    // LAST QUESTION SPECIAL CASE
    if (currentQuestion === questions.length - 1) {
      if (choice.toLowerCase() === "yes") {
        btn.onclick = () => {
      contentEl.classList.add("fade-out");

      setTimeout(() => {
        questionEl.innerText = "";
        choicesEl.innerHTML = "";

        changeBackground("img/Final_Img.jpg");

        const loveMsg = document.createElement("div");
        loveMsg.style.fontSize = "14px";
        loveMsg.style.color = "#ffc6d3";
        loveMsg.style.whiteSpace = "pre-wrap";
        loveMsg.style.lineHeight = "25px";
        loveMsg.style.letterSpacing = "4px";
        loveMsg.style.textAlign = "center";
        loveMsg.style.display = "flex";
        loveMsg.style.flexDirection = "column";
        loveMsg.style.justifyContent = "center";
        loveMsg.style.alignItems = "center";
        loveMsg.style.minHeight = "200px";
        contentEl.appendChild(loveMsg);

        const finalText = "YIPPIE!\nTo be honest...I didn't like you because you were this or that, it's simply because I choose you...\nEveryday, every second, every moment I can't stop thinking about you\nThank you [Name]";

        // Type it into loveMsg
        typeText(loveMsg, finalText);

        contentEl.classList.remove("fade-out");
      }, 600);
    };

      } else if (choice.toLowerCase() === "no") {
        // make No button move and fade away
        btn.style.position = "fixed";
        btn.style.left = "50%";
        btn.style.top = "50%";
        btn.style.transform = "translate(-50%, -50%)";
        btn.style.transition = "left 0.1s ease, top 0.1s ease, opacity 0.5s ease";

        const escapeHandler = (e) => {
          const rect = btn.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width/2);
          const dy = e.clientY - (rect.top + rect.height/2);
          const distance = Math.sqrt(dx*dx + dy*dy);
          const safeDistance = 100;

          if (distance < safeDistance) {
            let newX = rect.left + (-dx/2);
            let newY = rect.top + (-dy/2);
            newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
            newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));
            btn.style.left = newX + 'px';
            btn.style.top = newY + 'px';
          }
        };

        document.addEventListener('mousemove', escapeHandler);

        btn.onclick = () => {
          btn.style.opacity = 0;
          setTimeout(() => btn.remove(), 500);
          document.removeEventListener('mousemove', escapeHandler);
        };
      }
    } else {
      // regular buttons for non-last questions
      btn.onclick = () => {
        if (!isTyping) nextQuestion();
      };
    }

    choicesEl.appendChild(btn);
  });
}



function nextQuestion() {
  contentEl.classList.add("fade-out");

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
      contentEl.classList.remove("fade-out");
    }
  }, 600);
}

showQuestion();
