const DATA = [
	{
		question: 'Вопрос 1. Мне нравится работать с:',
		answers: [
			{
				id: '1',
				value: 'Людьми',
			},
			{
				id: '3',
				value: 'Данными и информацией',
			},
			{
				id: '2',
				value: 'Инструментами и машинами',
			},
		]	
	},
	{
		question: 'Вопрос 2. Я предпочитаю работать:',
		answers: [
			{
				id: '1',
				value: 'В команде',
			},
			{
				id: '3',
				value: 'В одиночестве',
			},
		]		
	},
	{
		question: 'Вопрос 3. Я люблю решать проблемы, анализируя:',
		answers: [
			{
				id: '1',
				value: 'Их с другими людьми',
			},
			{
				id: '3',
				value: 'Данные и информацию',
			}
		]	
	},
	{
		question: 'Вопрос 4. Я люблю заниматься:',
		answers: [
			{
				id: '4',
				value: 'Исследованиями и теорией',
			},
			{
				id: '2',
				value: 'Практическими задачами и решениями',
			}
		]	
	},
	{
		question: 'Вопрос 5. Я хорошо справляюсь с задачами, которые требуют:',
		answers: [
			{
				id: '4',
				value: 'Творческого подхода',
			},
			{
				id: '2',
				value: 'Логического и аналитического подхода',
			}
		]	
	},
	{
		question: 'Вопрос 6. Я предпочитаю работать с:',
		answers: [
			{
				id: '3',
				value: 'Информацией и фактами',
			},
			{
				id: '4',
				value: 'Идеями и концепциями',
			}
		]	
	},
	{
		question: 'Вопрос 7. Я чувствую себя комфортно в:',
		answers: [
			{
				id: '1',
				value: 'Известной и знакомой обстановке',
			},
			{
				id: '2',
				value: 'Неизвестной и переменчивой обстановке',
			}
		]	
	},
	{
		question: 'Вопрос 8. Я предпочитаю:',
		answers: [
			{
				id: '1',
				value: 'Делать работу, которая приносит пользу людям',
			},
			{
				id: '2',
				value: 'Делать работу, которая требует логического мышления и анализа',
			}
		]	
	},
	{
		question: 'Вопрос 9. Я предпочитаю:',
		answers: [
			{
				id: '1',
				value: 'Работу, которая связана с общением и контактами с людьми',
			},
			{
				id: '2',
				value: 'Работу, которая требует решения технических и практических задач',
			}
		]	
	},
	{
		question: 'Вопрос 10. Я люблю:',
		answers: [
			{
				id: '3',
				value: 'Анализировать данные и информацию',
			},
			{
				id: '4',
				value: 'Генерировать идеи и концепции',
			}
		]	
	}

];

let localResults = {};
var s = r = i = a = 0;  

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
let chartResult = document.getElementById('chart-result');
let info = document.getElementById('info');

const renderQuestions = (index) => {

	renderIndicator(index + 1);

	questions.dataset.currentStep = index;

	const renderAnswers = () => DATA[index].answers
		.map((answer)=> `
			<li>
				<label>
					<input class ="answer-input" type="radio" name=${index} value=${answer.id}>
					${answer.value}
				</label>
			</li>
		`)
		.join('');

	questions.innerHTML = `
		<div class="quiz-questions-item">
				<div class="quiz-questions-item__question">${DATA[index].question}</div>
				<ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
		</div>
	`;
};

const renderResults = () => {
	/*let content = '';

	const getAnswers = (questionIndex) => DATA[questionIndex].answers
	.map((answer) => `<li>${answer.value}</li>`)
	.join('');
	

	DATA.forEach((question, index) => {
		content += `
			<div class="quiz-results-item">
				<div class="quiz-results-item__question">${question.question}</div>
				<ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
			</div>
		`;
	})

	results.innerHTML = content;*/

	s = r = i = a = 0;
	for (var j = 0; j < Object.keys(localResults).length; j++) {	
		switch (localResults[j]) {
			case '1':
				s++;
				break;
			case '2':
				r++;
				break;
			case '3':
				i++;
				break;
			case '4':
				a++;
				break;
			default:
				break;
		}	 	
	}

	//показываем гистограмму
	chartResult.style.display = 'block';
	//показываем информацию
	info.style.display = 'block';
	anychart.onDocumentReady(function() {
	  

	  // Создание гистограммы
	  var chart = anychart.column();

	  // Создание набора данных
	  var series = chart.column([
	  	["s",s],
	  	["r",r],
	  	["i",i],
	  	["a",a],
	  ]);

		// Добавление подписей к осям
		chart.xAxis().title("Тип личности");
		chart.yAxis().title("Значение параметра");

		// Добавление подписи к графику
		chart.title("Результат теста");

		// Настройка элемента контейнера
		chart.container("chart-result");

		// Отображение гистограммы
		chart.draw();
		});
};

const renderIndicator = (currentStep) => {
	indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

//28-30 минута: запоминание ответа в localResults
quiz.addEventListener('change', (event) => {
 	if(event.target.classList.contains('answer-input')) {
			localResults[event.target.name] = event.target.value;
			btnNext.disabled = false;

			console.log(localResults); 
	}
})

quiz.addEventListener('click', (event) => {
	if(event.target.classList.contains('btn-next')) {
		const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;
		

		if (DATA.length === nextQuestionIndex) {
			//переход к результатам 
			questions.classList.add('questions--hidden');
			indicator.classList.add('indicator--hidden');
			results.classList.add('indicator--visible');
			btnNext.classList.add('btn-next--hidden');
			btnRestart.classList.add('btn-restart--visible');

			renderResults();
		} else {
			//перехрд к следующему вопросу
			renderQuestions(nextQuestionIndex);
		}

		btnNext.disabled = true;


	}

	/*Object.keys(localResults).length*/
	if(event.target.classList.contains('btn-restart')) { 
		chartResult.style.display = 'none';
		info.style.display = 'none';
		chartResult.innerHTML = "";
		localResults = {};
		results.innerHTML = '';

		questions.classList.remove('questions--hidden');
		indicator.classList.remove('indicator--hidden');
		results.classList.remove('indicator--visible');
		btnNext.classList.remove('btn-next--hidden');
		btnRestart.classList.remove('btn-restart--visible');

		renderQuestions(0);
	}

})

renderQuestions(0);
chartResult.style.display = 'none';
info.style.display = 'none';
document.body.style.zoom = 1.1;
