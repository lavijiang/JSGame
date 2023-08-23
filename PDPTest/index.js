const questions = [
    { text: '1.你做事是一个值得信赖的人吗？', score: 0 },
    { text: '2.你个性温和吗？', score: 0 },
    { text: '3.你有活力吗？', score: 0 },
    { text: '4.你善解人意吗？', score: 0 },
    { text: '5.你独立吗？', score: 0 },
    { text: '6.你受人爱戴吗？', score: 0 },
    { text: '7.做事认真且正直吗？', score: 0 },
    { text: '8.你富有同情心吗？', score: 0 },
    { text: '9.你有说服力吗？', score: 0 },
    { text: '10.你大胆吗？', score: 0 },
    { text: '11.你精确吗？', score: 0 },
    { text: '12.你适应能力强吗？', score: 0 },
    { text: '13.你组织能力好吗？', score: 0 },
    { text: '14.你是否积极主动？', score: 0 },
    { text: '15.你害羞吗？', score: 0 },
    { text: '16.你强势吗？', score: 0 },
    { text: '17.你镇定吗？', score: 0 },
    { text: '18.你勇于学习吗？', score: 0 },
    { text: '19.你反应快吗？', score: 0 },
    { text: '20.你外向吗？', score: 0 },
    { text: '21.你注意细节吗？', score: 0 },
    { text: '22.你爱说话吗？', score: 0 },
    { text: '23.你的协调能力好吗？', score: 0 },
    { text: '24.你勤劳吗？', score: 0 },
    { text: '25.你慷慨吗？', score: 0 },
    { text: '26.你小心翼翼吗？', score: 0 },
    { text: '27.你令人愉快吗？', score: 0 },
    { text: '28.你传统吗？', score: 0 },
    { text: '29.你亲切吗？', score: 0 },
    { text: '30.你工作足够有效率吗？', score: 0 },
];

const answers = [
    { score: 0, text: '老虎型 (支配型Dominance) “老虎”企图心强烈，喜欢冒险，个性积极，竞争力强，凡事喜欢掌控全局发号施令，不喜欢维持现状，但行动力强，目标一经确立便会全力以赴。它的缺点是在 决策上较易流于专断，不易妥协，故较容易与人发生争执摩擦。如果下属中有“老虎”要给予他更多的责任，他会觉得自己有价值，布置工作时注意结果导向，如果 上司是老虎则要在他面前展示自信果断的一面，同时避免在公众场合与他唱反调。 个性特点：有自信，够权威，决断力高，竞争性强，胸怀大志，喜欢评估。 企图心强烈，喜欢冒险，个性积极，竞争力强，有对抗性。 优点：善于控制局面并能果断地作出决定的能力；用这一类型工作方式的人成就非凡。 缺点：当感到压力时，这类人就会太重视迅速的完成工作，就容易忽视细节，他们可能不顾自己和别人的情感。由于他们要求过高，加之好胜的天性，有时会成为工作狂。' },
    { score: 0, text: '孔雀型(表达型Extroversion) “孔雀”热情洋溢，好交朋友，口才流畅，重视形象，擅于人际关系的建立，富同情心，最适合人际导向的工作。缺点是容易过于乐观，往往无法估计细节，在执行力 度上需要高专业的技术精英来配合。对孔雀要以鼓励为主给他表现机会保持他的工作激情，但也要注意他的情绪化和防止细节失误。孙中山、克林顿、里根、戈尔巴 乔夫都是这一类型的人，美国是孔雀型人最多的国家。 个性特点：很热心，够乐观，口才流畅，好交朋友，风度翩翩，诚恳热心。热情洋溢、好交朋友、口才流畅、个性乐观、表现欲强。 优点：此类型的人生性活泼。能够使人兴奋，他们高效地工作，善于建立同盟或搞好关系来实现目标。他们很适合需要当众表现、引人注目、态度公开的工作。 缺点：因其跳跃性的思考模式，常无法顾及细节以及对事情的完成执着度' },
    { score: 0, text: '考拉' },
    { score: 0, text: '猫头鹰' },
    { score: 0, text: '变色龙' }
];

let currentQuestionIndex = 0;

const questionText = document.getElementById('questionText');
const nextButton = document.getElementById('nextButton');
const scoreForm = document.getElementById('scoreForm');
const scoreList = document.getElementById('scoreList');

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.text;
        questionText.appendChild(document.createElement('br'));
        questionText.appendChild(document.createElement('br'));
        questionText.appendChild(document.createTextNode('请选择：'));
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            if (input.checked) {
                questions[currentQuestionIndex].score = parseInt(input.value);
                console.log(currentQuestionIndex);
                console.log(questions[currentQuestionIndex].score);
            }
            // input.addEventListener('click', event => {
            //     questions[currentQuestionIndex].score = parseInt(event.target.value);
            //     console.log(currentQuestionIndex);
            //     console.log(questions[currentQuestionIndex].score);
            // });
        });
        nextButton.style.display = 'block';
        scoreForm.style.display = 'none';
        questionText.style.display = 'block';
    } else {
        showScores();
    }
}

function showScores() {
    nextButton.style.display = 'none';
    scoreForm.style.display = 'block';
    questionText.style.display = 'none';

    var tigerScore = questions[4].score + questions[9].score + questions[13].score + questions[17].score + questions[23].score + questions[29].score;
    var peacockScore = questions[2].score + questions[5].score + questions[12].score + questions[19].score + questions[21].score + questions[28].score;
    var kaolaScore = questions[1].score + questions[7].score + questions[14].score + questions[16].score + questions[24].score + questions[27].score;
    var maotouyinScore = questions[0].score + questions[6].score + questions[10].score + questions[15].score + questions[20].score + questions[25].score;
    var bianselongScore = questions[3].score + questions[8].score + questions[11].score + questions[18].score + questions[22].score + questions[26].score;

    answers[0].score = tigerScore;
    answers[1].score = peacockScore;
    answers[2].score = kaolaScore;
    answers[3].score = maotouyinScore;
    answers[4].score = bianselongScore;

    const numbers = [tigerScore, peacockScore, kaolaScore, maotouyinScore, bianselongScore];

    numbers.sort(function (x, y) {
        return x - y;
    });

    answers.forEach((answer, index) => {
        console.log(answer.text + ' ' + answer.score);
    });

    var res = "恭喜你，你是一个面面俱到近似完美性格的人。"
    if (numbers[4] > numbers[3]) {
        answers.forEach((answer, index) => {
            if (answer.score == numbers[4]) {
                res = answer.text;
                return;
            }
        });
    } else if (numbers[3] > numbers[2]) {
        res = "你是以下两种动物的综合："
        answers.forEach((answer, index) => {
            if (answer.score == numbers[4]) {
                res += answer.text;
            }
        });
    }

    scoreList.innerHTML = '';
    const scoreItem = document.createElement('li');
    scoreItem.textContent = res;
    scoreList.appendChild(scoreItem);
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

showQuestion();