
//BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description,value){
       this.id = id;
       this.description = description;
       this.value = value;
    };

    var Income = function(id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
     };

     var data = {
        allItems:{
            exp:[],
            in:[]
        },
        totals:{
            exp:0,
            inc:0
        }
     };
      
     return{
         addItem: function(type,des,val){
            var newItem;
            //[1,2,3,4,5], next ID = 6
            //[1,2,4,6,8], next ID = 9
            //ID = last ID + 1
            //Create new ID
            if(data.allItems[type].length>0){
            ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            }else{
               ID = 0; 
            }
            //Create new Item based on 'inc' or 'exp' type
            if(type === 'exp'){
               newItem = new Expense(ID,des, val);
            }else if(type === 'inc'){
               newItem = new Income(ID,des,val);               
            }
            //Push it into our data structure
            data.allItems[type].push(newItem);

            //Return the new Element
            return newItem;
        },

        testing: function(){
            console.log(data);
        }


     };


})();

//UI CONTROLLER
var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription:'.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    };
     return {
         getinput: function(){
             return {
             type: document.querySelector(DOMstrings.inputType).value,//will be either inc or exp
             description: document.querySelector(DOMstrings.inputDescription).value,
             value: document.querySelector(DOMstrings.inputValue).value
             };
        },

        addListItem: function(obj,type){
           //Create HTML string  with placeholder text
             var html; newHtml;

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer.container;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
           //Replace the placeholder text with some actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
           //Insert the Html into 
           document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },


        getDOMstrings: function(){
            return DOMstrings;
        }
     }

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl,UICtrl){
     
      var setupEvenListeners = function(){
        var DOM = UICtrl.getDOMstrings();  
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress', function(e){
           if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
           }
        });
    }
      
      var ctrlAddItem = function(){
         var input, newItem; 
        //1. Get the filed input data
        var input = UICtrl.getinput();
       
        //2.Add the Item to the budget controller
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value)
        //3.Add the Item to the UI
        UICtrl.addListItem(newItem, input.type);
        //4.Calculate the Budget

        //5.Display the budget on the UI 


      }

       return{
           init: function(){
               console.log('Application has started.');
               setupEvenListeners();
           }
       }


})(budgetController, UIController);

controller.init();

