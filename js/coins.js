var coins = [];

function create_coin(id){
    
    var position_x = Math.floor(Math.random() * (parseInt($('#stage').width()) - 100));
    var position_y = Math.floor(Math.random() * 300) + 50;
    
    var coin = '<div class="coin" data-coin-id="' + id + '" data-position-x="' + position_x + '" data-position-y="' + position_y + '"';
    coin += ' style="left: ' + position_x + 'px; top: ' + position_y + 'px;" ></div>';
    
    $('#stage').append(coin);
    //console.log('Coin created: ' + coin);
}

function moving(){
    //determinate if the character is moving to check if he is near of a coin
    for (var i=0; i<5; i++){
        coin_width_interval(i);
        //console.log('Coin-left: ' + coin);
    }
}

function coin_width_interval(coin_id){
    //Check for height interval
    if (coin_height_interval(coin_id)){
        //Declare the bounds
        var j_left = parseInt($('#j').attr('data-position-x'));
        var j_width = parseInt($('#j').width());
        var j_total = parseInt(j_left) + parseInt(j_width);
        var b_left =  parseInt($('div[data-coin-id="' + coin_id + '"]').attr('data-position-x'));
        var b_width = 40;
        var b_total = parseInt(b_left) + b_width;
        //Check for width interval
        if ( ( j_left < b_left ) && ( j_total >= b_left && j_total <= b_total ) ){
            grab_coin(coin_id);
        }
        else if ( ( j_left > b_left ) && ( j_left >= b_left && j_left <= b_total ) ){
            grab_coin(coin_id);
        }
    }
}

function coin_height_interval(id){
    
    var j_top = parseInt($('#j').attr('data-position-y'));
    var j_height = parseInt($('#j').height());
    var j_total = j_top + j_height;
    var b_top = parseInt($('div[data-coin-id="' + id + '"]').attr('data-position-y'));
    var b_height = 40;
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

function grab_coin(id){
    $('div[data-coin-id="' + id + '"]').remove();
    coins.push(id);
    //console.log('Coin ' + id + ' grabbed');
    if (coins.length >= 5){
        $('#message').html('<h1>You Win</h1>').fadeIn();
        stop_bullet();
        kill_character();
        $('#title').css('color', '#47a447');
    }
}