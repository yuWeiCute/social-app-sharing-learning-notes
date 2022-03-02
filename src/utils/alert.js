
export const alert = function(msg){
	var maskBg = '#0000002b';						//蒙版展示色
	var zIndex = 990;							//修改弹出层z-index,应为最顶层,避免被覆盖
	var desColor = '#1f0000'						//提示信息字体颜色
	var buttonVal = '';							//确定按钮名称
	var btnColor = 'grey';							//确定按钮字体颜色
	var style = `
			<style class="mask-style">
		    	@keyframes animate{
		    		from {
		    			top : -20px;
		    		}
		    		to {
		    			top : 0px;
		    		}
		    	}
			
				.alertMask{
					
					animation: animate 0.5s ease ;
					overflow: hidden;
					position: fixed;	/*生成绝对定位的元素，相对于浏览器窗口进行定位*/
					display: flex;
					display: webkit-flex;
					flex-direction: row;
					align-items: baseline;
					justify-content: center;
					width: 100%;
					top: 0;
					left: 0;
				}
				.alertContainer{


					width: 90%;
					box-sizing: border-box;
					background:#fff;
					margin: 10px;
					border-radius: 5px;
					color: `+desColor+`;
					overflow: hidden;
					display: flex;
					flex-direction: row-reverse;		
					align-items: center;
					position: relative	
					z-index: `+zIndex+`;
					box-shadow: 0px 0px 7px `+maskBg+`;
				}
				.alertDes{
					width: 100%;
					padding: 8px 10px;
					text-align: center;
					letter-spacing: 1px;
					font-size: 14px;
					color: `+desColor+`;
					text-overflow:ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.alertConfirmParent{
					margin:0px 10px 7px 1px;
				}
				.alertConfirmBtn::before {
					-webkit-transform: rotate(
				45deg);
					-moz-transform: rotate(45deg);
					-ms-transform: rotate(45deg);
					-o-transform: rotate(45deg);
					transform: rotate(
				45deg);
				}
				.alertConfirmBtn::after {
					-webkit-transform: rotate(
						-45deg);
							-moz-transform: rotate(-45deg);
							-ms-transform: rotate(-45deg);
							-o-transform: rotate(-45deg);
							transform: rotate(
						-45deg);
				}
				.alertConfirmBtn::before, .alertConfirmBtn::after {
					content: '';
					display:block;
					height: 2px;
					width: 15px;
					margin-top: -1.5px;
					background: `+btnColor+`;
				}
			</style>
		`;
	
	var head = document.getElementsByTagName('head')[0];
	head.innerHTML += style		//头部加入样式,注意不可使用document.write()写入文件,否则出错
	
	const body = document.getElementsByTagName('body')[0];
		
	var alertMask = document.createElement('div');
	var alertContainer = document.createElement('div');
	var alertDes = document.createElement('span');
	var alertConfirmParent = document.createElement('span');
	var alertConfirmBtn = document.createElement('button');	
	
	body.append(alertMask);
	alertMask.classList.add('alertMask');
	
	alertMask.append(alertContainer);
	alertContainer.classList.add('alertContainer');

	alertContainer.append(alertConfirmParent);
	alertConfirmParent.classList.add('alertConfirmParent');

	alertConfirmParent.append(alertConfirmBtn);
	alertConfirmBtn.classList.add('alertConfirmBtn');
	alertConfirmBtn.innerText = buttonVal;		

	alertContainer.append(alertDes);
	alertDes.classList.add('alertDes');


	
	//加载提示信息	
	alertDes.innerHTML = msg;
	//关闭当前alert弹窗
	function close(){
		body.removeChild(alertMask);
		maskStyle = head.getElementsByClassName('mask-style')[0];
		head.removeChild(maskStyle);	//移除生成的css样式
	}
	const timer = (function(){close()},6000);
	function alertBtnClick(){
		close()
		clearTimeout(timer)
	}
	alertConfirmBtn.addEventListener("click", alertBtnClick);
	
}