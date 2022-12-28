$.Core = function() {
};

$.Core.prototype = (function() {
    var uploadImageActionEndPoint = '/upload-image';
	var interval;
	var setting = {};
	return {
		init: function(options) {
			if (typeof options === "undefined" || options.length < 1) {
				return false;
			}
			setting = $.extend({}, setting, options);
			//todo: upload image
            this.makeEventUploadImage();
            this.makeEventUploadAndCopyLinkImage();
			this.makeEventCancelImage();
			// todo: tinymce
			this.makeEventTinyMceInit();
            // todo: option order
            //Slide 
            this.makeEventAddSlideImage();
            this.makeEventCancelSlideImage();
            this.makeEventRemoveSlideImage();
            this.makeEventUploadSlideImage();
		},
        makeActionPost: function (form, postUrl, redirectUrl = null) {
            form.submit(function ( event ) {
                event.preventDefault();
                $.ajax({
                    url: postUrl,
                    type: 'POST',
                    data: form.serialize(),
                    success: function ( response ) {
                        if ( response.code === "SUCCESS" ) {
                            if (redirectUrl) {
                                return  location.href = redirectUrl; 
                            }
                            alert('SUCCESS');
                        }
                    }
                });
            });
        },
        makeEventTinyMceInit: function () {
           tinymce.init({
                selector: '.tinymce-editor',
                menubar: false,
                height: 500,
                branding: false,
                elementpath: false,
                force_br_newlines : true,
                force_p_newlines : false,
                forced_root_block : '',
                remove_script_host: false,
                relative_urls : false,
                file_picker_callback: function(callback, value, meta) {
                    if (meta.filetype === 'image') {
                        $('#upload-image-blog').trigger('click');
                        $('#upload-image-blog').change(function() {
                            var formUpload = document.getElementById('upload-image-description');
                            var formData = new FormData( formUpload );
                            $.ajax({
                                url: uploadImageActionEndPoint, //Server script to process data
                                type: 'POST',
                                data: formData,
                                beforeSend: function(){
                                    $('#loadding').addClass('show');
                                    $('#loadding').show();
                                    $('#loadding').css('background', 'rgba(0,0,0,0.7)');
                                    $('body').addClass('modal-open');
                                },
                                success: function( response ) {
                                    $('#loadding').removeClass('show');
                                    $('#loadding').hide();
                                    $('body').removeClass('modal-open');
                                    if(response.code === "SUCCESS") {
                                        let link = response.data.domain + "/uploads/"+response.data.filename;
                                        console.log(link);
                                        callback( link, {alt: ''});
                                    }
                                },
                                error: function(response) {
                                },
                                cache: false,
                                contentType: false,
                                processData: false
                            });
                        });
                    }
                },
                plugins: [
                    "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
                    "table contextmenu directionality emoticons paste textcolor code"
                ],
                toolbar1: "undo redo | bold italic underline sizeselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | styleselect",
                toolbar2: "| link unlink anchor | image media | forecolor backcolor  | print preview code ",
                fontsize_formats: "7pt 8pt 10pt 12pt 13pt 14pt 18pt 24pt 36pt 72pt",
                init_instance_callback: function ( editor ) {
                    editor.on('MouseOut', function (e) {
                        tinyMCE.triggerSave();
                    });
                }
            });
        },
        makeEventUploadImage: function () {
            $('.image-upload-button').click(function(){
                input_image_for_many_copy = $( this ).parent().parent().parent().parent().parent();
                $('.input-upload-image').click();
                return false;
            });
        },
        makeEventUploadAndCopyLinkImage: function () {
            $('.input-upload-image').change(function() {
                var formUpload = document.getElementById('upload-image-form');
                var formData = new FormData( formUpload );
                $.ajax({
                    url: uploadImageActionEndPoint, //Server script to process data
                    type: 'POST',
                    data: formData,
                    beforeSend: function(){
                        $('#loadding').addClass('show');
                        $('#loadding').show();
                        $('#loadding').css('background', 'rgba(0,0,0,0.7)');
                        $('body').addClass('modal-open');
                    },
                    success: function( response ) {
                        $('#loadding').removeClass('show');
                        $('#loadding').hide();
                        $('body').removeClass('modal-open');
                        if(response.code === "SUCCESS") {
							var link_image = "/uploads/" + response.data.filename;

                            input_image_for_many_copy.find('.prev_img').attr("src", link_image);
                            input_image_for_many_copy.find('.input-image-copy').val(response.data.filename);
                            input_image_for_many_copy.find('.input-image-copy').text($('.input-upload-image')[0].files[0].name);
                        }
                    },
                    error: function(response) {

                        if(response.code === 'LIMIT_FILE_SIZE') {
                            alert("Please choose a photo that's at least 350 pixels wide.");
                        }
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            });
        },
		makeEventCancelImage: function () {
			$('.cancel-image-button').click(function () {
				$( this ).parents('.upload-featured').find('.input-image-copy').val('');
                $( this ).parents('.upload-featured').find('.prev_img').attr("src", "#");
			});
        },
        
		setCookie: function(cname, cvalue, exdays) {
			var expires = "";
			if (exdays !== 0) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays));
				expires = "expires=" + d.toUTCString();
			}
			document.cookie = cname + "=" + cvalue + "; " + expires + '; path=/';
		},
		getCookie: function(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) === ' ')
					c = c.substring(1);
				if (c.indexOf(name) === 0)
					return c.substring(name.length, c.length);
			}
			return "";
        },
        
        makeEventAddSlideImage: function () {

			$('.btn-add-slide-image').click(function (e) {
                e.preventDefault();
                var template = $('.add-slide-image-template').html();
                var rendered = ejs.render(template, { index: index });
                $('.tab-slide-images-body').append(rendered);
                index++;
        	});
		},

		makeEventRemoveSlideImage: function () {
			 $("body").delegate('.remove-slide-image', 'click', function () {
                $( this ).parents('.image').remove();
            });
		},

		makeEventCancelSlideImage: function () {
			 $("body").delegate('.cancel-image-button', 'click', function () {
                $( this ).parents('.image').find('.input-image-copy').val('');
				$( this ).parents('.image').find('.show-image-copy').attr("src", "/assets/images/default.png");
            });
        },
        makeEventUploadSlideImage: function () {
            $("body").delegate('.image-upload-button', 'click', function () {
               input_image_for_many_copy = $( this ).parents('.image');
               $('.input-upload-image').click();
               return false;
           });
       },
        
    };
}(jQuery));