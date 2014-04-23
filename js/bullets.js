var bullet_timer;
var character_alive;
var bullet_speed = 1;
var bullet_step = 4;

function launch_bullet(side){
    character_alive = $('#j').attr('data-alive');
    if ((side + bullet_step) < (document.getElementById('stage').offsetWidth - document.getElementById('bullet').offsetWidth)){
        side += bullet_step;
        document.getElementById('bullet').style.left = side+"px";
        bullet_timer = setTimeout(function(){launch_bullet(side);}, bullet_speed);
        this_position = side;
        character_position_x = parseInt($('#j').attr('data-position-x'));
        //$('#j').attr('data-position-x', this_position);
        if (character_alive) check_width_interval(this_position, character_position_x);
    }
    else{
        var random_position;
        var random_speed;
        bullet_timer = setTimeout(function(){launch_bullet(1);}, bullet_speed);
        var pos_y = Math.floor(Math.random() * 270) + 50;
        
        document.getElementById('bullet').style.top = pos_y+"px"; //reset with random height;
        $('#bullet').attr('data-position-y', pos_y);
    }
}

function stop_bullet(){
		clearTimeout(bullet_timer);
		console.log('Bullet stoped');
}


function check_width_interval(bullet_x, character_x){
    //Check for height interval
    if (check_height_interval()){
        //Declare the bounds
        var j_left = character_x;
        var j_width = parseInt($('#j').width());
        var j_total = parseInt(j_left) + parseInt(j_width);
        var b_left = bullet_x;
        var b_width = parseInt($('#bullet').width());
        var b_total = parseInt(b_left) + parseInt(b_width);
        //Check for width interval
        if ( ( j_left < b_left ) && ( j_total >= b_left && j_total <= b_total ) ){
            kill_character();
            //console.log('kill 1');
        }
        else if ( ( j_left > b_left ) && ( j_left >= b_left && j_left <= b_total ) ){
            kill_character();
            //console.log('kill 2');
        }
    }
}

function check_height_interval(){
    
    var j_top = parseInt($('#j').attr('data-position-y'));
    var j_height = parseInt($('#j').height());
    var j_total = j_top + j_height;
    var b_top = parseInt($('#bullet').attr('data-position-y'));
    var b_height = parseInt($('#bullet').height());
    var b_total = b_top + b_height;
    //console.log('j_top: ' + j_top + ' j_height: ' + j_height + ' b_top: ' + b_top + ' b_total: ' + b_total);
    if( ( j_top < b_top) && ( j_total >= b_top && j_total <= b_total ) ){
            return true;
    }
    else if( ( j_top > b_top) && ( j_top >= b_top && j_top <= b_total ) ){
        return true;
    }
    
    return false; 
}

function kill_character(){
    stop_running();
    $('#j').attr('data-alive', 'false');
    $('#j').attr('data-jumping', 'false');
    $('#j').fadeOut();
    $('#title').css('color', 'red');
    $('#reset-character').show();
}