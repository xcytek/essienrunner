/*
	 * We need to initialize the timer variable here, so we can use it globally (in all functions).
	 * Otherwise, we wouldn't be able to stop it outside of those functions.
	 * This is a really bad coding practice, and we will show you how to avoid it in the next lesson
	 */
	var timer;
	
	
	/*******
	 * This 2 vars of mine, are if the character is jumping and if is moving to left/right or stop
	 * *///
	 
	 var is_jumping = false;
	 var moving_to = 'stop';
	 var character_position_x;
	
	/*
	 * The function to make J run right. 
	 * It gets passed two arguments: which stage of running sprite it is (starts at 1), 
	 * and the Left location attribute in pixels
	 * 
	 * This function will keep calling itself (to cycle through the animation) until one of two things happen:
	 * 1) J reaches the edge
	 * 2) The 'timer' variable is cleared
	 */
	function run_right(stage, left){
	    
		/*
		 * First, we check that J isn't at the right edge of the stage
		 * 'left + 15' will be the Left attribute after his next step
		 * The offsetWidth of the stage is its right edge, and the offsetWidth of J will be his right edge
		 * Basically, we are checking to make sure that J's right edge won't go past the stage's right edge 
		 * on the next step. If it does, then we don't do anything, and the function stops.
		 */
		if ((left + 15) < (document.getElementById('stage').offsetWidth - document.getElementById('j').offsetWidth)){
		    //Check if the character is moving to the oposite way, then stop it
		    if(!is_jumping) stop_running();
		    /*if(moving_to == 'left'){
		        moving_to = 'stop';
		        stop_running();
		        console.log(moving_to);
		    }*/
		    
			left = left + 15; // Increase his left attribute by 10px
			character_position_x = left;
			document.getElementById('j').style.left = left+"px"; // and then we move him
			$('#j').attr('data-position-x', left);
			moving();
			/*
			 * This switch statement checks which stage (1-4) the animation should be at, then moves the 
			 * background position to the correct sprite. Notice that case 2 and case 4 move to the same sprite.
			 * Each case then resets the 'timer' variable to call this function again, with the next stage
			 * and the updated Left attribute. 
			 * The '200' in the setTimeout functions is 200ms, the amount of time the browser waits before calling
			 * the function again.
			 */
			if (is_jumping) {
			    document.getElementById('j').style.backgroundPosition = "-160px 0px";
			    timer = setTimeout(function(){run_right(1, left);}, 90);
			    moving();
			}
			else{
    			switch (stage){
    				case 1:
    					document.getElementById('j').style.backgroundPosition = "-40px 0px";
    					timer = setTimeout(function(){run_right(2, left);}, 90);
    					moving();
    					break;
    				case 2:
    					document.getElementById('j').style.backgroundPosition = "-80px 0px";
    					timer = setTimeout(function(){run_right(3, left);}, 90);
    					moving();
    					break;
    				case 3:
    					document.getElementById('j').style.backgroundPosition = "-120px 0px";
    					timer = setTimeout(function(){run_right(4, left);}, 90);
    					moving();
    					break;
    				case 4:
    					document.getElementById('j').style.backgroundPosition = "-80px 0px";
    					timer = setTimeout(function(){run_right(1, left);}, 90);
    					moving();
    					break;
    			}
			}
		} else {
			/*
			 * If J reaches the edge, we simply return him to his standing sprite, and stop looping the function
			 */
			document.getElementById('j').style.backgroundPosition = "0px 0px";
			moving();
		}
	}
	
	/*
	 * This function makes J run left, and will loop until
	 * 1) J reaches the left edge of the stage
	 * 2) The 'timer' variable is cleared
	 * 
	 * See the run_right function above for more in-depth explanations of what is going on here.
	 */
	function run_left(stage, left){
	    //Check if the character is moving to the oposite way, then stop it
	    if(!is_jumping) stop_running();
		    /*if(moving_to == 'right'){
		        moving_to = 'stop';
		        stop_running();
		        console.log(moving_to);
		    }*/
		/*
		 * Checking to make sure that if we move 15px more to the left, we won't be passed the left stage edge
		 */
		if ((left - 15) > 0){
			left = left - 15;
			character_position_x = left;
			document.getElementById('j').style.left = left+"px";
			$('#j').attr('data-position-x', left);
			if (is_jumping) {
			    document.getElementById('j').style.backgroundPosition = "-160px 0px";
			    timer = setTimeout(function(){run_left(1, left);}, 90);
			    moving();
			}
			else{
    			switch (stage){
    				case 1:
    					document.getElementById('j').style.backgroundPosition = "-40px -50px";
    					timer = setTimeout(function(){run_left(2, left);}, 90);
    					moving();
    					break;
    				case 2:
    					document.getElementById('j').style.backgroundPosition = "-80px -50px";
    					timer = setTimeout(function(){run_left(3, left);}, 90);
    					moving();
    					break;
    				case 3:
    					document.getElementById('j').style.backgroundPosition = "-120px -50px";
    					timer = setTimeout(function(){run_left(4, left);}, 90);
    					moving();
    					break;
    				case 4:
    					document.getElementById('j').style.backgroundPosition = "-80px -50px";
    					timer = setTimeout(function(){run_left(1, left);}, 90);
    					moving();
    					break;
    			}
			}
		} else {
			document.getElementById('j').style.backgroundPosition = "0px -50px";
			moving();
		}
	}
	
	/*
	 * This function stops all other loops by clearing the 'timer' variable. 
	 * It also moves the background position to the standing sprite
	 */
	function stop_running(){
	    /*
	    //Validate the character is now on the ground and simulate his fall
	    var top = parseInt($('#j').attr('data-position-y'));
		if ( top <  333 ) {
		    top =  + (top * .5); //His fall will slightly accelerate
			document.getElementById('j').style.top = top+"px";
			timer = setTimeout(function(){jump(false, top);}, 60);
			$('#j').attr('data-position-y', top);
			moving();
		}
		*/
    	document.getElementById('j').style.backgroundPosition = "0px 0px";
    	moving();
    	clearTimeout(timer);
		
	}
	
	/*
	 * This is the function that causes J to jump
	 * It gets passed two arguments: 'up' is a boolean (true/false) that says J should be moving up (or down)
	 * 'top' is the Top attribute to J, in pixels.
	 * 
	 * Like the running functions, this function loops until
	 * 1) J reaches the ground again
	 * 2) The 'timer' variable is cleared (which creates some strange behavior!)
	 */
	function jump(up, top){
	    is_jumping = true;
	    $('#j').attr('data-jumping', 'true');
	    //console.log(is_jumping);
		/*
		 * We change J to his jumping sprite ...
		 */
		document.getElementById('j').style.backgroundPosition = "-160px 0px";
		/*
		 * Here, we need to decide whether he should be travelling up or down...
		 */
		if (up && (document.getElementById('j').offsetTop > 20)){
			// if he is currently moving up, and he is more than 20 pixels from the top of the stage ...
			top = top - (top * .5); // This gives us a slight arc in the jump, rather than a constant movement like running
			document.getElementById('j').style.top = top+"px"; // Change his position
			timer = setTimeout(function(){jump(up, top);}, 60); // Then call the function again
			$('#j').attr('data-position-y', top);
			moving();
		} else if (up) {
			// if he is currently moving up, but he is almost at the top of the stage and needs to come back down...
			up = false; // we switch the 'up' variable so he will be falling in the next loop
			timer = setTimeout(function(){jump(up, top);}, 60);
			$('#j').attr('data-position-y', top);
			moving();
		} else if (!up && (document.getElementById('j').offsetTop < 200)){ //115 with .1
			// if he is moving down, but is more than 5px from the ground, he will continue to fall...
			top = top + (top * .5); //His fall will slightly accelerate
			document.getElementById('j').style.top = top+"px";
			timer = setTimeout(function(){jump(up, top);}, 60);
			$('#j').attr('data-position-y', top);
			moving();
		} else {
			// If he is moving down, and he is within 5px of the ground...
			document.getElementById('j').style.top = "333px"; // Place him on the ground
			document.getElementById('j').style.backgroundPosition = "0px 0px"; // return to standing sprite
			$('#j').attr('data-position-y', '333');
			// We do not call the loop anymore since he is standing still at this point
			is_jumping = false;
			$('#j').attr('data-jumping', 'false');
			moving();
			//console.log(is_jumping);
		}
		
	}