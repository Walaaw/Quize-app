import { Quize } from "./quize.js";
export class Setting{
    constructor(){
       this.noOfQuestionElement=document.getElementById("number");
       this.defecultyElemet=document.getElementsByName("difficulty-check");
       this.categoryElement=document.getElementById("category");
       this.startButton=document.getElementById("start-btn");
       this.startButton.addEventListener("click",this.getSatrt.bind(this))
    }
   async getSatrt(){
        let noOfQuestion= this.noOfQuestionElement.value;
        let category= this.categoryElement.value;
        let  defeculty=[... this.defecultyElemet].filter(element=>element.checked)[0].value
        let api=`https://opentdb.com/api.php?amount=${noOfQuestion}&category=${category}&difficulty=${defeculty}&type=multiple`
        let apiResbonse= await this.fechApi(api);
        let apiResult=apiResbonse.results;
        if(noOfQuestion.length>0){
            $("#setting").fadeOut(500,function(){
                $("#quize").fadeIn(500);
            })
        }
        let newQuize= new Quize(apiResult);
       
    }
     async fechApi(api){
        let resbonse= await fetch(api);
        let result= await resbonse.json();
        return result;
    }

}