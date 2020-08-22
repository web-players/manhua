		var imgNum = 0;
		fileList = [];
		var curFile;
		$(".upload_img_wrap .upload_img").bind("click", function(ev) {
			var index = ev.currentTarget.dataset.id;
			var that = this;
			if(index == 1) {
				$("#file1").click();
				$("#file1").unbind().change(function(e) { 
					var index = e.currentTarget.dataset.id;
					if($('#file').val() == '') {
						return false;
					}
					curFile = this.files;
					fileList = fileList.concat(Array.from(curFile));
					$(that).hide();
					var filePath = $(this).val();
					changeImg(e, filePath, index);
					imgNum++;
					if(imgNum<3){
						$(".upload_img").eq(1).show();
					}
					$(".upload_img_length").html(imgNum);
				});
			} else if(index == 2) {
				$("#file2").click();
				$("#file2").unbind().change(function(e) {
					var index = e.currentTarget.dataset.id;
					if($('#file').val() == '') {
						return false;
					}
					curFile = this.files;
					fileList = fileList.concat(Array.from(curFile));					
					$(that).hide();
					var filePath = $(this).val();
					changeImg(e, filePath, index);
					imgNum++;
					if(imgNum<3){
						$(".upload_img").eq(2).show();
					}
					$(".upload_img_length").html(imgNum);
				})
			} else if(index == 3) {
				$("#file3").click();
				$("#file3").unbind().change(function(e) {
					var index = e.currentTarget.dataset.id;
					if($('#file').val() == '') {
						return false;
					}
					curFile = this.files;
					fileList = fileList.concat(Array.from(curFile));					
					var filePath = $(this).val();
					changeImg(e, filePath, index);
					$(that).hide();
					imgNum++;
					$(".upload_img_length").html(imgNum);
				})
			}
		})

		function changeImg(e, filePath, index) {
			fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
			if(!fileFormat.match(/.png|.jpg|.jpeg|.gif/)) {
				alert('文件格式必须为：png/jpg/jpeg/gif');
				return;
			}
			var reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onloadend = function() {    
				var dataURL = reader.result;
				$("#imgBox").html($("#imgBox").html() + '<div class="imgContainer" data-index=' + index + '><img   src=' + dataURL + ' onclick="imgDisplay(this)"></div>');
				$("#img"+index).html(dataURL);
			};
		}

		function imgDisplay(obj) {
			var src = $(obj).attr("src");
			var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 20000;display: flex;justify-content: center;    align-items: center;"><img src=' + src + ' style="margin-top: 100px;width: 96%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: #000;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
			$('body').append(imgHtml);
		}
		
		function closePicture(obj) {
			$(obj).parent("div").remove();
		}


/*
 * 发表评论
*/
function addCom() {
	contact = $.trim($("#contact").val()); //联系人
	content = $.trim($("#content").val()); // 反馈的内容
	if(content==''){
        dialog.alert({
		    title: '错误提示',
            msg:'<b style="color:red;">反馈内容不能为空喔</b>',
            buttons:['知道了'],
        });	
		return;
	}
	if(fileList.length > 3){
        dialog.alert({
		    title: '错误提示',
            msg:'<b style="color:red;">最多允许上传3张图片</b>',
            buttons:['知道了'],
        });	
		return;		
    } else {
		appCenter.showLoadingToast('提交中...');
		var formData = new FormData();
        for (var i = 0, len = fileList.length; i < len; i++) {
            formData.append('upfile[]', fileList[i]);
        }
        formData.append('contact', contact);
		formData.append('content', content);
        $.ajax({
            url: '/home/api/feedbackadd',
            type: 'post',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
				window.toast.hide();
                if (data.code == 0) {
                    appCenter.showSuccToast('反馈成功');
					setTimeout(function(){ location.reload(); }, 1000);				
                } else {
                    dialog.alert({
		                title: '错误提示',
                        msg:'<b style="color:red;">'+data.msg+'</b>',
                        buttons:['知道了'],
                    });
                }
            }
        });	
	    return;	
	}
}
