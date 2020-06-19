(function(){
    //Get all the a elements inside tabs class 
    var tabs = document.querySelectorAll('.tabs a')



    var displayTab = function(a, animations){

        if(animations === undefined){
            animations = true
        }

        let div = a.parentNode.parentNode.parentNode //the div parent
        let li = a.parentNode //the li parent

        if(li.classList.contains('active')){ //if the clicked li is already active do nothing
            return false
        }

        //otherwise remove active from the first element that have active class inside the parent div
        div.querySelector('.tabs .active').classList.remove('active')

        //and add active class to the clicked li
        li.classList.add('active')

        //first solution -> remove active from the current tab-content -> 
        //div.querySelector('.tab-content.active').classList.remove('active')
        
        // first solution ->add active to the target tab-content ->
       // div.querySelector(a.getAttribute('href')).classList.add('active')

        
        //second solution with fade -> active fade class to active element  -> 
        var activeTab = div.querySelector('.tab-content.active') //active tab
        var toDisplay = div.querySelector(a.getAttribute('href')) //content to display

       if(animations){
        activeTab.classList.add('fade')
        activeTab.classList.remove('in')

        //at the end of the fade  
        var transitionend = function(e){
           
            //this refers to activeTab element 

            //we remove fade and active class to the active tab
            this.classList.remove('fade')
            this.classList.remove('active')

            //we add fade and active class to the content to display
            toDisplay.classList.add('fade')
            toDisplay.classList.add('active')

            toDisplay.offsetwidth //to force the browser to rescan the page and apply class in after fade and active
           
            toDisplay.classList.add('in')

            activeTab.removeEventListener('transitionend', transitionend)
            activeTab.removeEventListener('webkitTransitionEnd', transitionend)
            activeTab.removeEventListener('oTransitionEnd', transitionend)

        }
    
        activeTab.addEventListener('transitionend', transitionend)
        activeTab.addEventListener('webkitTransitionEnd', transitionend) //for old browser
        activeTab.addEventListener('oTransitionEnd', transitionend) //for opera old

       }else{
           toDisplay.classList.add('active')
           activeTab.classList.remove('active')
       }
        
        
        //add active to the target tab-content -> second solution with fade
        //div.querySelector(a.getAttribute('href')).classList.add('active')



    }

    //on click of each element 
    for(let i = 0; i < tabs.length; i++){
        let tab = tabs[i]
        
        tab.addEventListener('click', function(e){   
            displayTab(this) //display with animations

        })
    }

    var hashchange = function(e){
        var hash = window.location.hash

        var a = document.querySelector('a[href="'+ hash +'"]')

        if(a !== null && !a.classList.contains('active')){
            displayTab(a, e !== undefined) //display animations if e is defined
        }
    }


    window.addEventListener('hashchange', hashchange)
    hashchange()

})()