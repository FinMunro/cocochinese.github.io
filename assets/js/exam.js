let id = pageId();
let questionIndexCookieKey = id + "word";

// Public functions
function startExam(words) {
	if(words.length == 0) {
		return;
	}
	// words = ["kip", "ei"];

	console.log('words', words);

	let $answer = $("#answer");
	$("#exam").submit(function( event ) {
		event.preventDefault();
		let currentQuestion = getCurrentQuestion(words);
		let answer = $answer.val().replace(/\s/g, '');;
		console.log(answer, currentQuestion);
		
		if(answer == currentQuestion) {
			onSuccessAnswer(words);
			setQuestion(words);

			$answer.addClass('success');
			setTimeout(function() {
				$answer.removeClass('success');
			}, 300);

			if(isCompleted(words)) {
				onCompleted();
			}

		} else {
			$answer.addClass('error');
			setTimeout(function() {
				$answer.removeClass('error');
			}, 300);
		}
	});

	if(isCompleted(words)) {
		onCompleted()
	} else {
		setQuestion(words);
	}

	$("#restart").click(onReset);
}

function isCompleted(words) {
	let questionIndex = getCurrentQuestionIndex();
	return questionIndex >= words.length;
}

function onReset() {
	setCookie(questionIndexCookieKey, 0, 1);
	location.reload();
}

function onCompleted() {
	let $exam = $("#exam");
	$("#exam-success").css("display", "block");
	$exam.css("display", "none");
}

function onSuccessAnswer(words) {
	if(isCompleted(words)) {
		console.log("is completed");
		return;
	}
	let questionIndex = getCurrentQuestionIndex();
	console.log('onSuccessAnswer', 'questionIndex', questionIndex)
	questionIndex++;
	setCookie(questionIndexCookieKey, questionIndex, 1);
}

function getCurrentQuestionIndex() {
	let cookieString = getCookie(questionIndexCookieKey);
	console.log('cookieString', cookieString);
	let questionIndex = parseInt(cookieString);
	if(isNaN(questionIndex)) {
		questionIndex = 0;
	}
	console.log('questionIndex', questionIndex);
	return questionIndex;
}

function getCurrentQuestion(words) {
	let questionIndex = getCurrentQuestionIndex();
	setCookie(questionIndexCookieKey, questionIndex, 1);
	if(!words[questionIndex]) {
		return null;
	}
	return words[questionIndex].replace(/\s/g, '');
}

function setQuestion(words) {
	let question = getCurrentQuestion(words);
	console.log('setQuestion', question);
	let $exam = $("#exam");
	let $question = $("#question");
	$question.text(question);
	$exam.css("display", "block");
}

//Returns page identifier
function pageId() {
	return window.location.href.split("").reduce(function(a, b) {
	    a = ((a << 5) - a) + b.charCodeAt(0);
	    return a & a;
	}, 0);
}

function setCookie(name,value,days) {
	console.log('setcookie', name, value);
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}