$(function(){
  // 获取屏幕高度
  var pageheight = $(window).height();
  console.log(pageheight);
  $("#EventTabS").css("height",pageheight+"px")
  // 点击新建页面的 被分配人，跳转到被分配人页面
  $("#JumpOwer").click(function(){
    $(".newQuote").css("display","none");
    $('#owerEvent').css("display","block")
  })
  // 点击取消，返回新建页面
  $("#eventCancel").click(function(){
    $('#owerEvent').css("display","none");
    $('.newQuote').css("display","block")
  })
  // 点击新增费用项新增按钮
  $(".addCost").click(function(){
    console.log("获取新增按钮框值",$(".addType").val())
    var addtype=$(".addType").val();
    if(addtype=="search"){
      $(".addCostItem").append(`<li class="newEventConLi">
      <label>查找</label>
      <input type="text" value=" " readonly>
      <div class="JumpNagnifier"></div>
    </li>
    <li class="newEventConLi">
      <label>查找备注</label>
      <input type="text" value=" ">
    </li>`)
    }else if(addtype=="select"){
      $(".addCostItem").append(`<li class="newEventConLi">
        <label>下拉</label>
        <!-- <input type="text">-->
        <select name=""  class="eventType">
          <option value="">下拉A</option>
          <option value="">下拉B</option>
          <option value="">下拉C</option>
          <option value="">下拉D</option>
          <option value="">下拉E</option>
        </select>
        <div class="SelectDateIcon"></div>
      </li>
      <li class="newEventConLi">
        <label>下拉备注</label>
        <input type="text" /> 
      </li>`)
    }else if(addtype=="num"){
      $(".addCostItem").append(`<li class="newEventConLi">
        <label>数字</label>
        <input type="text" oninput = "value=value.replace(/[^\d]/g,'')" /> 
      </li>
      <li class="newEventConLi">
        <label>数字备注</label>
        <input type="text" /> 
      </li>`)
    }
  })
})