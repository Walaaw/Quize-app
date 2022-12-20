export class Quize{
    constructor(apiResult){
        this.resbonse=apiResult;
        this.score=0;
        this.totalQuestions=this.resbonse.length
        this.currentQuestion=0
        this.nextButten=document.getElementById("nextBtn");
        this.nextButten.addEventListener("click",this.getNext.bind(this))
        this.getshow();
    }
    getshow(){
        this.question=this.resbonse[this.currentQuestion].question
        console.log( this.question);
        this.answer=[this.resbonse[this.currentQuestion].correct_answer,...this.resbonse[this.currentQuestion].incorrect_answers];
        console.log(this.answer);
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(this.answer);
        document.querySelector(".totalQestion").innerHTML= this.totalQuestions;
        document.querySelector(".currentQuestion").innerHTML= this.currentQuestion +1;
        document.querySelector(".qeustionText").innerHTML=this.question;
        let temp='';
        for (let i = 0; i <  this.answer.length; i++) {
            temp+= `
            <div class=" form-check">
            <input class=" form-check-input" type="radio" name="answer" id="answer" value=${this.answer[i]}>
            ${this.answer[i]}
            <label for="answer" class=" form-check-label">
            </label>
            </div>
            `
        }
        document.querySelector(".answer").innerHTML=temp;
    }
    getNext(){
        let answerChosen= [...document.getElementsByName("answer")].filter(ele=>ele.checked)
        if(answerChosen.length==1){
            $("#alert").fadeOut(300);
            this.checkAnswer();
            this.currentQuestion++;
            if( this.currentQuestion<this.resbonse.length){
                this.getshow();
            }
            else{
                $("#quize").fadeOut(300,()=>{
                    $("#finish").fadeIn(300);
                    this.getFinish();
                })
            }
        }
        else{
          $("#alert").fadeIn(300)
        }
       
    }
    checkAnswer(){
       let answerChosen= [...document.getElementsByName("answer")].filter(ele=>ele.checked)[0].value;
       if(answerChosen===this.resbonse[this.currentQuestion].correct_answer){
        this.score++;
       $("#correct").fadeIn(300,()=>{
        $("#correct").fadeOut(300);
       });
       }
       else{
        $("#incorrect").fadeIn(300,()=>{
            $("#incorrect").fadeOut(300);
        });
       }
    }
    getFinish() {
        document.getElementById("score").innerHTML=this.score;
        document.getElementById("tryAgainBtn").addEventListener("click",function(){
            $("#finish").fadeOut(300,()=>{
                $("#setting").fadeIn(300);
            })
        })
    }
    
}
