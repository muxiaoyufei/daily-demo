(function($){
	$.fn.initList = function(opts){
		opts = $.extend({}, opts);

		var selectTitle = $(this);
		selectTitle.draggable({
			handle:'.list-title',
			opacity: 0.5,
			helper: 'clone'
		}); // 添加拖拽事件

		/**
		 * 单击列表单击: 改变样式
		 */
		var itemClickHandler = function(){
			if($(this).hasClass('selected-item')){
				$(this).removeClass('selected-item');
			} else{
				$(this).addClass('selected-item');
			}
		}

		/**
		 * 左边列表项移至右边
		 */
		var leftMoveRight = function(){
			selectTitle.find('.list-body .right-box').append($(this).removeClass('selected-item'));
			initItemEvent();
		}

		/**
		 * 右边列表项移至左边
		 */
		var rightMoveLeft = function(){
      if($(this).hasClass('Fruits')){
        selectTitle.find('.list-body #Fruits').append($(this).removeClass('selected-item'));
      }else if($(this).hasClass('region')){
        selectTitle.find('.list-body #region').append($(this).removeClass('selected-item'));
      }else if($(this).hasClass('Musical')){
        selectTitle.find('.list-body #Musical').append($(this).removeClass('selected-item'));
      }
			initItemEvent();
		}

		/**
		 * 初始化列表项选择事件
		 */
		function initItemEvent(){
      // 左边列表项单击、双击事件
      // 水果
			selectTitle.find('.list-body #Fruits').find('.item').unbind('click');
			selectTitle.find('.list-body #Fruits').find('.item').unbind('dblclick');
			selectTitle.find('.list-body #Fruits').find('.item').each(function(){
				$(this).on("click", itemClickHandler);
				if(!!opts.openDblClick){
					$(this).on('dblclick', leftMoveRight);	
				}
      });
      // 地址
      selectTitle.find('.list-body #Musical').find('.item').unbind('click');
			selectTitle.find('.list-body #Musical').find('.item').unbind('dblclick');
			selectTitle.find('.list-body #Musical').find('.item').each(function(){
				$(this).on("click", itemClickHandler);
				if(!!opts.openDblClick){
					$(this).on('dblclick', leftMoveRight);	
				}
      });
      // 音乐
      selectTitle.find('.list-body #region').find('.item').unbind('click');
			selectTitle.find('.list-body #region').find('.item').unbind('dblclick');
			selectTitle.find('.list-body #region').find('.item').each(function(){
				$(this).on("click", itemClickHandler);
				if(!!opts.openDblClick){
					$(this).on('dblclick', leftMoveRight);	
				}
			});

			// 右边列表项单击、双击事件
			selectTitle.find('.list-body .right-box').find('.item').unbind('click');
			selectTitle.find('.list-body .right-box').find('.item').unbind('dblclick');
			selectTitle.find('.list-body .right-box').find('.item').each(function(){
				$(this).on('click', itemClickHandler);
				if(!!opts.openDblClick){
					$(this).on('dblclick', rightMoveLeft);
        }
			});
		}

		/**
		 * 获取选择的值
		 * @return json数组
		 */
		function getSelectedValue(){
			var rightBox = selectTitle.find('.list-body .right-box');
			var itemValues = [];
			var itemValue;

			rightBox.find('.item').each(function(){
				itemValue = {};
				itemValue[$(this).attr('data-id')] = $(this).text();
				itemValues.push(itemValue);
			});

			for(var i = 0; i < itemValues.length; i++){
				console.log(itemValues[i]);
			}

			return itemValues;
		}

		/**
		 * 初始化添加、移除、获取值按钮事件
		 */
		function initBtnEvent(){
			var btnBox = selectTitle.find('.list-body .center-box');
			var leftBox_Fruits = selectTitle.find('.list-body #Fruits');
      var leftBox_region = selectTitle.find('.list-body #region');
			var leftBox_Musical = selectTitle.find('.list-body #Musical');
			var rightBox = selectTitle.find('.list-body .right-box');

			// 添加一项
			btnBox.find('.add-one').on('click', function(){
				rightBox.append(leftBox.find('.selected-item').removeClass('selected-item'));
			});
			// 添加所有项
			btnBox.find('.add-all').on('click', function(){
				rightBox.append(leftBox.find('.item').removeClass('selected-item'));
			});
			// 移除一项
			btnBox.find('.remove-one').on('click', function(){
				leftBox_Fruits.append(rightBox.find('.selected-item').removeClass('selected-item'));
				leftBox_region.append(rightBox.find('.selected-item').removeClass('selected-item'));
				leftBox_Musical.append(rightBox.find('.selected-item').removeClass('selected-item'));
			});
			// 移除所有项
			btnBox.find('.remove-all').on('click', function(){
				leftBox_Fruits.append(rightBox.find('.item').removeClass('selected-item'));
				leftBox_region.append(rightBox.find('.item').removeClass('selected-item'));
				leftBox_Musical.append(rightBox.find('.item').removeClass('selected-item'));
			});

			selectTitle.find('.list-footer').find('.selected-val').on('click',getSelectedValue);
		}

		initItemEvent();
    initBtnEvent();
    // 鼠标按下事件
   
		if(!!opts.openDrag){
       // 下面盒子拖到上面盒子
      for(var a=0; a<$(".left-box").length; a++){
        var TugId = $(".left-box")[a].id
        $('#'+TugId).sortable({
          placeholder: 'item-placeholder',
          connectWith: '.right-box',
          revert: true,
        }).droppable({
          accept: '.item',
          hoverClass: 'item-box-hover',
          drop: function(event, ui){
            setTimeout(function(){
              ui.draggable.removeClass('selected-item');
            }, 500);
          }
        }).disableSelection();
      }
      // 从上面盒子拖拽的方法
      function TugDown (TugId) { 
        $('.right-box').sortable({
          placeholder: 'item-placeholder',
          connectWith: TugId,
          revert: true,
        }).droppable({
          accept: '.item',
          hoverClass: 'item-box-hover',
          drop: function(event, ui){
            setTimeout(function(){
              ui.draggable.removeClass('selected-item');
            }, 500);
          },
        }).disableSelection();
       }
      // 从上面盒子拖到下面盒子
      $(".Fruits").mousedown(function(){
        if($(".Fruits").parent().attr("id") == "right-box"){
          TugDown('#Fruits')
        }
      })
      $(".region").mousedown(function(){
        if($(".region").parent().attr("id") == "right-box"){
          TugDown('#region')
        }
      })

      $(".Musical").mousedown(function(){
        if($(".Musical").parent().attr("id") == "right-box"){
          TugDown('#Musical')
        }
      })
      $('.right-box').sortable({
				placeholder: 'item-placeholder',
				connectWith: '.left-box',
        revert: true,
			}).droppable({
				accept: '.item',
				hoverClass: 'item-box-hover',
				drop: function(event, ui){
					setTimeout(function(){
            ui.draggable.removeClass('selected-item');
          }, 500);
        },
			}).disableSelection();
    }
	}
})($)
