
function kiwiCalculate(income, age, contribution, fund ){
    
    var annual_member_contribution = income * contribution; 
    var annual_employer_contribution = income *0.03 * (1-getEmployerContributionTaxRate(income)); 

    var rate_of_return = fund; 
    var tax_rate = getPIR(income); 
    var admin_fee = 30; // Assumption : Admin fee is fixed as 30NZD/yr
    var management_fee = 0.02; // Assumption: Management fee is fixed as 2%/yr

    var annual_government_contribution=0; 
    if(age>=18 && age<=64){
        annual_government_contribution = Math.min(annual_member_contribution/2, 521); 
    }

    var start_balance =0; 
    var return_calc_balance, computed_return, end_balance; 
    var resultString; 

    for(i=1; i<=50; i++){
        return_calc_balance = start_balance + (annual_member_contribution + annual_employer_contribution+ annual_government_contribution)/2; 
        
        computed_return = return_calc_balance * (rate_of_return * (1 -tax_rate) - management_fee); 

        end_balance = start_balance + annual_member_contribution + annual_government_contribution + computed_return + annual_employer_contribution - admin_fee; 

        end_balView = Number(end_balance.toFixed(2)).toLocaleString();

        if(i === 1){
            //document.getElementById('calcuate_results1').innerHTML="Value after one year is $"+end_balance; 
            resultString="Value after 1 year $"+end_balView; 
        }else if(i === 15){
            //document.getElementById('calcuate_results2').innerHTML="Value after 15 years is $"+end_balance; 
            resultString= resultString+"<br> Value after 15 years $"+end_balView; 
        }else if(i === 30){
            //document.getElementById('calcuate_results3').innerHTML="Value after 30 years is $"+end_balance; 
            resultString = resultString + "<br> Value after 30 years $" + end_balView; 
        }else if(i === 50){
            //document.getElementById('calcuate_results4').innerHTML="Value after 50 years is $"+end_balance; 
            resultString = resultString + "<br> Value after 50 years $" + end_balView;
        }

        start_balance=end_balance; 
        end_balance=0; 
    }

    return resultString;
}

function validateFields(){

    var submitOk=true; 

    if(isNaN(income) || income<0 || income>3000000){
        alert("The Expected Income must be a currency"); 
        submitOk=false; 
    }

    if(submitOk==false){
         return false; 
    }else{
        return true; 
    }   

}

function getEmployerContributionTaxRate(income){
    if (income < 16801) {
      return 0.105;
    } else if (income < 57601) {
      return 0.175;
    } else if (income < 84001) {
      return 0.300;
    } else {
      return 0.330;
    }
}

function getPIR(income){
    if(income <14001){
        return 0.105;
      } else if (income < 57601) {
        return 0.175;
      } else if (income < 84001) {
        return 0.300;
      } else {
        return 0.330;
      }
}