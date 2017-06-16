
function HomeController()
{
// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// confirm account deletion //
	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle account deletion //
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

	function jump(url, server) {

        var form = document.createElement('form') ;
        form.id = 'proxy_form' ;
        form.name = 'proxy_form' ;

        document.body.appendChild(form) ;

        var input1 = document.createElement('input') ;
        input1.type = 'text' ;
        input1.name = 'u' ;
        input1.value = url ;

        var input2 = document.createElement('input') ;
        input2.type = 'text' ;
        input2.name = 'encodeURL' ;
        input2.value = 'on' ;

        var input3 = document.createElement('input') ;
        input3.type = 'text' ;
        input3.name = 'allowCookies' ;
        input3.value = 'on' ;

        form.appendChild(input1) ;
        form.appendChild(input2) ;
        form.appendChild(input3) ;
        form.method = "POST" ;
        form.action = server ;
        form.submit() ;

        document.body.removeChild(form) ;
    }
	

	window.addEventListener('message', function(event) {
           
        jump(event.data.url, event.data.server) ;
		console.log(event) ;

	}, false) ;

	this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			data: { id: $('#userId').val()},
			success: function(data){
	 			that.showLockedAlert('你的账户已经被删除.<br>正在跳转到首页.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/logout",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('您已经退出登录.<br>正在跳转到首页.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h4').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
}

HomeController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('成功!');
	$('.modal-alert .modal-body p').html('您的账户信息已经被更新.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
