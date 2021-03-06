
$(document).ready(function(){
	
	var av = new AccountValidator();
	var sc = new SignupController();

	var up_user = window.location.search.match(/up_user=(.*)/) ;
	if (up_user != null) {
		document.getElementById('up_user').value = up_user[1] ;
		document.getElementById('up_user_hidden').value = up_user[1] ;
	}
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
			    av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();
	
// customize the account signup form //
	
	$('#account-form h2').text('注册新用户');
	$('#account-form #sub1').text('');
	$('#account-form #sub2').text('');
	$('#account-form-btn1').html('取消');
	$('#account-form-btn2').html('确定');
	$('#account-form-btn2').addClass('btn-primary');
	
// setup the alert that displays when an account is successfully created //

	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('成功!');
	$('.modal-alert .modal-body p').html('账户创建成功.</br>点击确定以跳转到登录页面.');

});