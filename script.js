"use strict"; //strict mode prevents certain code from being accepted without error, like assigning variable without initializing it first

let theme="light";//instead of a true false, I want to leave room for other modes like a high contrast mode ot something cool like neon, also I believe it's cleaner for understanding

function colorMode(){
     const toggleButton = document.getElementById("theme-toggle");
    if (theme==="light"){//can switch to case statement and number cycle if more added
        //this is to change variables to dark mode colors if currently light
        document.documentElement.style.setProperty('--lt-gray', '#333333');
        document.documentElement.style.setProperty('--black', '#DDD');
        document.documentElement.style.setProperty('--lt-brown', '#5C4033');
        document.documentElement.style.setProperty('--cyan', '#00008B');
        document.documentElement.style.setProperty('--red', '#FF3333');
        //I could have named them differently or had different colors assigned, but easier for me to do it this way for now
        
        toggleButton.innerHTML="🌙";
        theme="dark";
    }else if (theme==="dark"){
        //this is to change colors to light mode if currently dark mode
        document.documentElement.style.setProperty('--lt-gray', '#F8F8F8');
        document.documentElement.style.setProperty('--black', '#222222');
        document.documentElement.style.setProperty('--lt-brown', '#D2B48C');
        document.documentElement.style.setProperty('--cyan', '#00FFFF');
        document.documentElement.style.setProperty('--red', '#FF0000');
        toggleButton.innerHTML="&#x2600;&#xfe0f"; //sun symbol
        theme="light";
    }
}

function switchProductDisplay(e) {

    const productSection = document.getElementById("product-display"); //gets the section that displays the products

    const tempUl=document.getElementById("obstacle-list");//for displaying the obstacles
    if (tempUl) {
        tempUl.remove();//gets rid of obstacleList ul and all li if it exists
    }   

    switch (e.target.id) {
    case "putter-display-button": //if putter button pressed, displays the name, image, and description of putter
        document.getElementById('product-name').textContent="Urethane Putters";
        document.getElementById("product-image").src = "images/urethane-putters-mini-golf.jpg";//https://www.miniaturegolfstore.com/site/urethane-putters-mini-putt
        document.getElementById('product-description').textContent="These putters are perfect for your business or your own personal home game. These putters are made of rubber for grip, fiber-glass for the pole, and Urethane-rubber for a sturdy hit, while not damaging the course surface no matter where you play.";
        break;

    case "ball-display-button"://if the golf ball button pressed, displays the name, image, and description of the golf ball
        document.getElementById('product-name').textContent="Golf Balls";
        document.getElementById("product-image").src = "images/golf-balls.jpg";//https://thorza.com/products/thorza-colored-golf-balls
        document.getElementById('product-description').textContent="We have a variety of golf balls depending on how you want them to play. We have plastic ones that are for safety and other ones mad of a different combination of synthetic rubber and durable plastic for high performance on large to small course";
        break;

    case "obstacle-display-button"://if the obstacle button is pressed, displays the name, image, and description of golf ball, along with an unordered list of obstacles we have
        document.getElementById('product-name').textContent="Obstacles";
        document.getElementById("product-image").src = "images/obstacles3.jpg";//https://www.pinterest.com/pin/22869910583100532/
        document.getElementById('product-description').textContent="The following are different obstacles made of plastic and wood. These obstacles are built to last and with strong bounce potential. they have strong weight balancing to keep them in place and from falling over with use.";
        
        const obstacleList = document.createElement("ul");//creating ul under obstacleList name
        obstacleList.setAttribute("id", "obstacle-list");

        const obstacles = [ //creating an array of obstacles
            "<strong>Loop</strong> -     allows the ball to circle around smoothly", 
            "<strong>Tunnel</strong> -   short, long, big, and small, these can be custom made", 
            "<strong>Windmill</strong> - powered by batteries and have variable speeds",
            "<strong>pendulum</strong> - different shapes and sizes of swinging objects",
         ];
        obstacles.forEach(obstacle => { //using a for each method to loop through obstacle array to add li elements to the ul I created
            const li = document.createElement("li");
            li.innerHTML = obstacle; //allows the strong tags added to be stylized
            obstacleList.appendChild(li);
        });

        productSection.appendChild(obstacleList);//add the list to product-section on html at the bottom of its section

        break;

    default:
      console.log("Unknown button pressed");//to check if any other interaction triggers this function
  }
}


function randomNumberGame(){

    let userNumber = document.getElementById("guess-input");//gets user's input to userNumber

    let min=1;
    let max=10;
    let randomNumber = Math.floor(Math.random()*(max-min+1)+min);// gets a random number from 1 to 10 and assigns to randomNumber

    document.getElementById("guess-result").style.visibility = "visible"; //shows the result text box
    document.getElementById("display-user-number").textContent = `Your Number: ${userNumber.value}`;
    document.getElementById("display-random-number").textContent = `Random Number: ${randomNumber}`;
    if(randomNumber==userNumber.value){//checks if the user input matches the random number
        document.getElementById("guess-result").textContent = "Good Job! You Win!"; // the numbers match and displays the result, and changes colors for oval
        document.documentElement.style.setProperty('--win-lose1', '#fffc3a');
        document.documentElement.style.setProperty('--win-lose2', '#8c8f00');

    }else if(1 <= userNumber.value && userNumber.value <= 10){
        document.getElementById("guess-result").textContent = "You Lose! Try again";// the numbers don't match and displays the result, and changes colors for oval
        document.documentElement.style.setProperty('--win-lose1', '#f19292');
        document.documentElement.style.setProperty('--win-lose2', '#aa4949');

    }else{
        document.getElementById("guess-result").textContent = "Needs a number from 1 to 10";// anything except 1 through 10 placed in text box, and changes colors for oval
        document.documentElement.style.setProperty('--win-lose1', '#AAA');
        document.documentElement.style.setProperty('--win-lose2', '#DDD');
        //can add check for decimals
    }
}



    

//#region Form element scripts 
// #region regex for forms
const firstNameRegex = /^[a-zA-Z]{3,}$/;  //3 or more of letters only, starting and ending with it
const lastNameRegex = /^[a-z]{3,}$/i;     //3 or more of letters only, starting and ending with it
const phoneRegex = /^\d{3} ?\d{3} ?\d{4}$|^\d{3} ?-? ?\d{3} ?-? ?\d{4}$|^\( ?\d{3} ?\) ?\d{3} ?-? ?\d{4}$/; //first part may have been redundant, added ? to a lot based on my own usage
                    //##########       or      ###-###-####        or        (###)###-####
                    //### ### #####             ### - ### - ####   or       ( ### ) ### - ####
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
               // any input @ any input  .  any input,  needs a . and a @ in that order and only one at, needs input at each section
const commentsRegex = /^.{26,}$/s;  //checks for more than 25 characters
// #endregion 
document.querySelector("input[type='email']").type = "text";//stops the email popup that appears befor my check

const contactForm = document.getElementById('contact-form'); //grabbing the overall contact form by id to contactForm

// #region pre-submit checks and element assigning
const firstNameInput = document.getElementById('first-name'); //gets first name input element
const firstNameError = document.getElementById('first-name-error'); //gets element under first name input for giving feedback

firstNameInput.addEventListener('blur', () => {  //click away from the first name input box
    if(!firstNameRegex.test(firstNameInput.value.trim())){   //checks if first name passes first name regex, trim removes trailing and leading spaces
        firstNameError.textContent = "please enter a valid first name";
    }else{
        firstNameError.textContent ="✔️";
    }
});


const lastNameInput = document.getElementById('last-name');  //gets last name input element
const lastNameError = document.getElementById('last-name-error');  //gets element under last name input for giving feedback

lastNameInput.addEventListener('blur', () => {  //click away from the last name input box
    if(!lastNameRegex.test(lastNameInput.value.trim())){  //checks if last name passes last name regex, trim removes trailing and leading spaces
        lastNameError.textContent = "please enter a valid last name";
    }else{
        lastNameError.textContent = "✔️"; //gives the check that the input will be accepted upon submit
    }
});


const phoneInput = document.getElementById('phone');    //gets phone number input element
const phoneError = document.getElementById('phone-error');  //gets element under phone number input for giving feedback

phoneInput.addEventListener('blur', () => {  //click away from the phone input box
    if(!phoneRegex.test(phoneInput.value.trim())){ //checks if phone passes phone regex, trim removes trailing and leading spaces
        phoneError.textContent = "please enter a valid phone number";
    }
    else{
        phoneError.textContent ="✔️"; //gives the check that the input will be accepted upon submit
    }
});

const emailInput = document.getElementById('email');  //gets email address input element
const emailError = document.getElementById('email-error');  //gets element under the email address input for giving feedback

emailInput.addEventListener('blur', () => {  //click away from the email input box

    if(!emailRegex.test(emailInput.value.trim())){ //checks if email passes email regex, trim removes trailing and leading spaces
        emailError.textContent = "please enter a valid email address";
    }
    else{
        emailError.textContent ="✔️"; //gives the check that the input will be accepted upon submit
    } 
});


const commentsInput = document.getElementById('comments');  //gets comment section input element
const commentsError = document.getElementById('comments-error');  //gets element under the comment section for giving feedback

commentsInput.addEventListener('blur', () => {  //click away from the comment input box
  if(!commentsRegex.test(commentsInput.value.trim())){ //checks if comments passes comment regex, trim removes trailing and leading spaces
    commentsError.textContent = "please tell us more";
  }
  else{
    commentsError.textContent ="✔️"; //gives the check that the input will be accepted upon submit
  }
});



const preferredContact = document.getElementById("pref-contact");    //gets contact method selection element
const preferredError = document.getElementById("pref-contact-error");    //gets element under the contact method selection for giving feedback
//preferredContact.addEventListener('click', radioPressed);       
//preferredContact.addEventListener('mouseup', radioPressed);      //these worked too to event the change together, but change is better for what I wanted 
preferredContact.addEventListener('change', radioPressed); //activated whenever radio element is selected, even when first selected

function radioPressed() { //method for changing which element is marked as required to user
    [emailInput, phoneInput].forEach(inputChoice => inputChoice.classList.remove("error-input")); //removes the red box if element is selected
    preferredError.textContent = ""; //removes the user feedback
    try{//if nothing is selected there is no value that can be extracted, and wanted a try catch block in here to show I can and not using a finally block because not sure use, but finally block always runs no matter what
        switch (document.querySelector("#pref-contact input[name='contact-pref']:checked").value) {//gets the selected bubble element
            case "phone": //checks if "phone" is selected
            document.querySelector("label[for='email'] span").textContent = ""; //removes required mark from email
            document.querySelector("label[for='phone'] span").textContent = " *"; //gives required mark to phone
            emailError.textContent="";//removes the issue reported on phone if phone selected first time
            break;

            case "email"://checks if email is selected
            document.querySelector("label[for='email'] span").textContent = " *"; //gives required mark to email
            document.querySelector("label[for='phone'] span").textContent = ""; //removes required mark from phone
            phoneError.textContent=""; //removes the issue reported on phone if email selected first time
            break;
        }
    } catch(error){
        console.log("no form radio selected yet");//check if function runs without the selection having been made
    }

}

//#endregion

const users = []; //creating an empty array for storing users
function clearErrorClassOnClick(e){
    e.target.classList.remove("error-input");//removes the error-input class on any input element clicked because red box is unappealing and assuming you clicked on it to fix the error. 
}


function valOnSubmit(e){ //submit button was pressed on the form

    e.preventDefault();//prevent usual/default action on submit
    let isValid = true; //initialization of the check boolean
    

    //remove all error class from inputs before running checks
    firstNameInput.classList.remove("error-input");
    lastNameInput.classList.remove("error-input");
    phoneInput.classList.remove("error-input");
    emailInput.classList.remove("error-input");
    preferredContact.classList.remove("error-input");
    commentsInput.classList.remove("error-input");

    /*quick checks option
    isValid = firstNameRegex.test(firstNameInput.value.trim())? isValid : false;
    isValid = lastNameRegex.test(lastNameInput.value.trim())? isValid : false;
    */

    //use trim on values to prevent the leading and trailing spaces from impacting checks
    if (!firstNameRegex.test(firstNameInput.value.trim())){ //checks first name against regex
        firstNameInput.classList.add("error-input");//adds red outline/styles through adding class
        isValid = false; //failed the check

        let errorMessage = ""; //making sure error message is initialized and assigned string data type to add specific issues that need fixing

        if (/[^\w]/.test(firstNameInput.value.trim())){  //checks for non word characters
            errorMessage+="No Special Characters, ";
        }
        if (/[0-9]/.test(firstNameInput.value.trim())){ //checks for numbers
            errorMessage+="No numbers, ";
        }
        if(firstNameInput.value.trim().length < 3){  //checks for less than 3 characters
            errorMessage+="Needs more than 2 characters";
        }
        firstNameError.textContent = errorMessage; //makes the span bellow the first name input box display all the issues noticed in the input
    }

    if (!lastNameRegex.test(lastNameInput.value.trim())){  // checks last name against regex
        lastNameInput.classList.add("error-input");  //adds red outline/styles through adding class
        isValid = false;  //failed the check

        let errorMessage = "";  //making sure error message is initialized and assigned string data type to add specific issues that need fixing

        if (/[^\w]/.test(lastNameInput.value.trim())){  //checks for non word characters
            errorMessage+="No Special Characters, ";
        }
        if (/[0-9]/.test(lastNameInput.value.trim())){ //checks for numbers
            errorMessage+="No numbers, ";
        }
        if(lastNameInput.value.trim().length < 3){  //checks for less than 3 characters
            errorMessage+="Needs more than 2 characters";
        }
        lastNameError.textContent = errorMessage; //makes the span bellow the last name input box display all the issues noticed in the input
    }
    
    
    const choice = contactForm["contact-pref"]; //getting current radio choice, assigned undefined if none chosen
    let choiceMessage = "";  //for the final message if all valid


    //the user will only be required to properly input the preferred contact method and we will not bother checking the other input beyond the realtime checks while entering in info
    if(choice.value){ //checking if a choice was made or not on radio menu
        if(choice.value=="phone"){ //checks if the choice was phone
            isValid = phoneRegex.test(phoneInput.value.trim())? isValid : false; //keeps previous valid or invalid value if regex check is true, otherwise assigns false
            phoneInput.classList.toggle("error-input", !phoneRegex.test(phoneInput.value.trim())); // toggles the error-input class to be there or not if the phone input passes the check

            let digitsOnly = phoneInput.value.replace(/\D/g, ""); // remove any non-digit characters, /D finds all non digits     g replaces all instances     , ""  replaces them with empty string, returning just a string of numbers
            let errorMessage = "";    //making sure error message is initialized and assigned string data type to add specific issues that need fixing
            
            if(/[^0-9()\-\s]/.test(phoneInput.value.trim())){     /// testing if it has only the allowed characters
                errorMessage += "Only allowed () - and numbers, ";
            }
            if (digitsOnly.length < 10) { //checking if less than 10 digits
                errorMessage += "Your number is too short";
            } else if (digitsOnly.length > 10) { //checking if mort than 10 digits
                errorMessage += "Your number is too long";
            }
            if (errorMessage=="" && !phoneRegex.test(phoneInput.value.trim())){    //general for other issues, if it still fails and other checks passed (empty error message), then tells user different format options
                errorMessage += "Improper format, use ### ### #### or just the 10 numbers";
            }

            emailError.textContent = "";
            phoneError.textContent = errorMessage;   //makes the span bellow the phone number input box display all the issues noticed in the input
            choiceMessage="phone number";  //for the variable on the final message

        }else if(choice.value=="email"){   //checks if the choice was email
            isValid = emailRegex.test(emailInput.value.trim())? isValid : false;  //keeps previous valid or invalid value if regex check is true, otherwise assigns false
            emailInput.classList.toggle("error-input", !emailRegex.test(emailInput.value.trim())); // toggles the error-input class to be there or not if the email input passes the check

            let errorMessage = "";  //making sure error message is initialized and assigned string data type to add specific issues that need fixing

            if(/[\s]/.test(emailInput.value.trim())){ //checks for any space characters in the middle of the email
                errorMessage+="No spaces in email, ";
            }
            if(!emailInput.value.includes("@")){ //checks to see if there is an @
                errorMessage+="Needs to include an @, ";
            }else if(!/^[^@]+@/.test(emailInput.value.trim())){ //checks for non space character before the @
                errorMessage+= "Needs text before @, ";
            }

            if(emailInput.value.includes("@")  &&  !/@[^@]+/.test(emailInput.value.trim())){ //checks for text after the @
                errorMessage+= "Needs text after the @, ";
            }else if(emailInput.value.includes("@\.")){  //checks for text between the @ and the dot.
                errorMessage+= "Needs text between the @ and the dot. ";
            }

            if(/.*@.*@/.test(emailInput.value.trim())){ //checks if there are multiple @
                 errorMessage+= "only one @ allowed, ";
            }

            if(!/@.*\./.test(emailInput.value)){  //checks for a dot.
                errorMessage+="Needs to include a dot. after @, ";
            }else if(!/\.[^\.]+/.test(emailInput.value.trim())){  //checks for text after a dot.
                errorMessage+="Needs text after dot. ";
            }

            
            phoneError.textContent = "";
            emailError.textContent = errorMessage;  //makes the span bellow the email address input box display all the issues noticed in the input
            choiceMessage="email address";  //for the variable on the final message

        }

        
    }else{
        isValid=false;  //false due to no radio selected
        preferredContact.classList.add("error-input");  //marks it as needing to be clicked and selection made
        preferredError.textContent = "please select a contact method that you prefer";  //instructs user
    }

    if(commentsRegex.test(commentsInput.value.trim())){
        if(commentsInput.value.trim().length > 10000){ //not in initial check, but wanted to ensure no too large messages and prevent spam of text here
            isValid=false;
            commentsInput.classList.add("error-input");  //marks as needing to be fixed
            commentsError.textContent = "Comments should be less than 10,000 characters, feel free to send multiple, but more can be discussed after initial comment"; //trying to let users down gently
        }
    }else if(commentsInput.value == ""){//checks if users entered anything at all
        isValid = false;  
        commentsInput.classList.add("error-input");
        commentsError.textContent = "please leave a comment about your interest or problem";
    }else{  //something there but not enough
        isValid = false;
        commentsInput.classList.add("error-input");
        commentsError.textContent = "please give more details";
    }

    if(isValid){ //passes all checks

        const newUser = { //creating an object for customer
            firstName:      document.getElementById("first-name").value.trim(),
            lastName:       document.getElementById("last-name").value.trim(),
            email:          document.getElementById("email").value.trim(),
            phone:          document.getElementById("phone").value.trim(),
            prefContact:    document.querySelector("#pref-contact input[name='contact-pref']:checked").value,
            comments:       document.getElementById("comments").value.trim(),
            timestamp:      new Date() //for tracking
        };

        users.push(newUser); //adds the new user to the array


        const formattedDate = `${newUser.timestamp.toLocaleString('default', { month: 'long' })} ${newUser.timestamp.getDate()}, ${newUser.timestamp.getFullYear()}`
        document.getElementById("form-result").textContent = (`Hello ${newUser.firstName + " " + newUser.lastName}, we have received your message on ${formattedDate} and will reach out to you at your ${choiceMessage} soon!`); //message to user
        contactForm.reset();     //resets all text fields
        document.querySelectorAll("#contact-form span.input-error").forEach(span => span.textContent = ""); //removes all the individual box feedback







    }else{
        document.getElementById("form-result").textContent = (`Not all fields were filled out correctly`); //saying to user they need to check the feedback
    }

    
}
//#endregion


//#region main function event listeners
document.getElementById("theme-toggle").addEventListener("click", colorMode); //light, dark mode

["putter-display-button", "ball-display-button", "obstacle-display-button"] //each button on the product display to loop through
    .forEach(id => {
        document.getElementById(id).addEventListener("click", switchProductDisplay); //sends the specific button pressed as an argument to the function "switchProductDisplay"
    });

document.getElementById("guess-submit").addEventListener("click", randomNumberGame); //guess the number game submission

document.getElementById('contact-form').addEventListener("submit",valOnSubmit); //contact form submission

["first-name", "last-name", "phone", "email", "pref-contact", "comments"] //all form section input boxes ids
    .forEach(id => {
        document.getElementById(id).addEventListener("click", clearErrorClassOnClick); //any input boxes on the form that are clicked will clear the red box
    });

//#endregion
