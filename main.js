$(document).ready(function(){ //ready methos used for fuction avaliablity/

	$('.one-time').slick({  
  dots: true, //used for that slide show purpose,slick is a jquery plugin
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
});



	cat();
	brand();
	product();
	function cat(){
		$.ajax({ //ajax is about loading data in the background &display it on the webpage
			url: "action.php", //it will load action.php page
			method: "POST", // submits data to be preprocessed to be specified resource
			data: {category:1}, //setting the category to 1(because it is alredy loaded in the db)
			success: function(data){  //this is a function and itruns when the request succeds
				$('#get_cat').html(data); //it is set content methods and it will match and display the data
			}
		})
	}

	function brand(){
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {brand:1},
			success: function(data){
				$('#get_brand').html(data);
			}
		})
	}

	function product(){
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {getProduct:1},
			success: function(data){
				$('#get_product').html(data);
			}
		})
	}

	$("body").delegate(".category","click",function(event){ //body selects the element by the tag name,delegate attaches event handlers for specified elements
		event.preventDefault(); //this stops the default action of an element from happening,means as we already set the category,so it won't redirect ino other pge
		var cid=$(this).attr('cid'); //it returns attributes
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {get_selected_Category:1, cat_id:cid},
			success: function(data){
				$('#get_product').html(data);
			}
		})
	})

	$("body").delegate(".brand","click",function(event){
		event.preventDefault();
		var bid=$(this).attr('bid');
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {get_selected_brand:1, brand_id:bid},
			success: function(data){
				$('#get_product').html(data);
			}
		})
	})

	$('#search_btn').click(function(){
		var keyword=$('#search').val();
		console.log(keyword);
		if(keyword!=""){
			$.ajax({
			url: "action.php",
			method: "POST",
			data: {search:1, keyword:keyword},
			success: function(data){
				$('#get_product').html(data);
			}
		})
	}
	});

	$('#signup_btn').click(function(e){
		e.preventDefault();
		$.ajax({
			url: "register.php",
			method: "POST",
			data: $("form").serialize(),
			success: function(data){
				$("#err_msg").html(data);
				$("form").trigger("reset");
			}
		})
	})

	$("#login").click(function(event){
		event.preventDefault();
		var email=$('#email').val();
		var pwd=$('#password').val();
		console.log(pwd);
		$.ajax({
			url: "login.php",
			method: "POST",
			data: {userLogin:1,email:email, pwd:pwd},
			success: function(data){
				if(data=="true"){
					window.location.href="profile.php"; //for redirecting
				}
			}
		})
	})

	cart_count();

	function cart_count(){
		$.ajax({
			url: 'action.php',
			method: 'POST',
			data: {cartcount:1},
			success: function(data){
				$('.badge').html(data); 
				$('.badge').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
			}
		})
	}

	$('body').delegate('.product','click',function(){
		var product_id = $(this).attr('pid');
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {addToProduct:1,proId:product_id},
			success: function(data){
				$('#cartmsg').html(data);
				cart_count();
				$('body').animate({scrollTop:0},500);
			}
		})
	})

	$('#carticon').click(function(){
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {cartmenu:1},
			success: function(data){
				$('#cartmenu').html(data);

			}
		})
	})
	cart_checkout();
	function cart_checkout()
	{
		$.ajax({
			url: 'action.php',
			method: 'POST',
			data: {cart_checkout:1},
			success: function(data){
				$('#cartdetail').html(data);
			}
		})
	}

	$("body").delegate(".qty","keyup",function(){
		var pid = $(this).attr("pid");
		var qty = $("#qty-"+pid).val();
		var price = $("#price-"+pid).val();
		var total = qty * price;
		$("#amt-"+pid).val(total);
	})

	$('body').delegate('.remove','click',function(e){
		e.preventDefault();
		var pid=$(this).attr('remove_id');
		$.ajax({
			url: 'action.php',
			method: 'POST',
			data: {removeFromCart:1,pid:pid},
			success: function(data){
				$('#cart_msg').html(data);
				cart_checkout();
			}
		})
	})

	$('body').delegate('.update','click',function(e){
		e.preventDefault();
		var pid=$(this).attr('update_id');
		var qty=$('#qty-'+pid).val();
		var price=$('#price-'+pid).val();
		var total=$('#amt-'+pid).val();
		$.ajax({
			url: 'action.php',
			method: 'POST',
			data: {updateProduct:1, updateId:pid, qty:qty, price:price, total:total},
			success: function(data){
				$('#cart_msg').html(data);
				cart_checkout();
			}
		})
	})



	window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
	}, 4000);

	page();
	function page(){
		$.ajax({
			url: 'action.php',
			method: 'POST',
			data: {page:1},
			success: function(data){
				$('#pageno').html(data);
			}
		})
	}
		
	$('body').delegate('.page','click',function(e){
		e.preventDefault();
		var pno=$(this).attr('page');
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {getProduct:1, setPage:1, pageNumber:pno},
			success: function(data){
				$('#get_product').html(data);
				$('body').animate({scrollTop:0},500);
			}
		})
	})

	$('#checkout_btn').click(function(){
		$.ajax({
			url: 'action.php',
			method: 'POST',
			data: {payment_checkout:1},
			success: function(){
				window.location.href = "payment_success.php";
			}
		})
	})

	$('body').delegate('.quicklook','click',function(event){
		event.preventDefault();
		var pid=$(this).attr('pid');
		$.ajax({
			url: 'action.php',
			method: 'POST',
			data: {product_detail:1,pid:pid},
			success: function(data){
				//console.log(data);
				$('#dynamic_content').html(data);
				$('#prod_detail').modal('show');
			}
		})
	})

	$('body').delegate('#price_sort','click',function(e){
		e.preventDefault();
		$(this).css('color','red');
		$('#pop_sort').css('color','black');
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {getProduct:1,price_sorted:1},
			success: function(data){
				$('#get_product').html(data);
			}
		})
	})


	$('body').delegate('.imageproduct','click',function(e){
		e.preventDefault();
		var pid=$(this).attr('pid');
		$.ajax({
			url: 'action.php',
			method: 'POST',
			data: {product_detail:1,pid:pid},
			success: function(data){
				//console.log(data);
				$('#dynamic_content').html(data);
				$('#prod_detail').modal('show');
			}
		})
	})

	$('body').delegate('#pop_sort','click',function(e){
		e.preventDefault();
		$(this).css('color','red');
		$('#price_sort').css('color','black');
		$.ajax({
			url: "action.php",
			method: "POST",
			data: {getProduct:1,pop_sorted:1},
			success: function(data){
				$('#get_product').html(data);
			}
		})
	})
	
})