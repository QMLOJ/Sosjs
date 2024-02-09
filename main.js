// 定义全局变量 res
let res;

// URL 缩短函数
function shorturl() {
  // 检查输入框是否为空
  if (document.querySelector("#text").value == "") {
    alert("URL不能为空！");
    return;
  }

  // 禁用缩短按钮，并显示加载状态
  document.getElementById("searchbtn").disabled = true;
  document.getElementById("searchbtn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>请稍候...';

  // 发送 POST 请求
  fetch(window.location.pathname, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: document.querySelector("#text").value })
  }).then(function (response) {
    return response.json();
  })
    .then(function (myJson) {
      res = myJson;
      // 恢复缩短按钮状态和文本
      document.getElementById("searchbtn").disabled = false;
      document.getElementById("searchbtn").innerHTML = ' 缩短';
      // 如果返回的 key 不为空，显示缩短后的 URL，并弹出结果弹窗
      if (res.key !== "")
        document.getElementById("result").innerHTML = window.location.host + res.key;
      $('#exampleModal').modal('show');
    }).catch(function (err) {
      // 异常处理
      alert("未知错误，请重试！");
      console.log(err);
      // 恢复缩短按钮状态和文本
      document.getElementById("searchbtn").disabled = false;
      document.getElementById("searchbtn").innerHTML = ' 缩短';
    });
}

// 复制 URL 函数
function copyurl(id, attr) {
  let target = null;

  if (attr) {
    // 创建临时元素
    target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    if (id) {
      let curNode = document.querySelector('#' + id);
      target.innerText = curNode[attr];
    } else {
      target.innerText = attr;
    }
    document.body.appendChild(target);
  } else {
    target = document.querySelector('#' + id);
  }

  try {
    // 复制操作
    let range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    console.log('复制成功');
  } catch (e) {
    console.log('复制失败');
  }

  if (attr) {
    // 移除临时元素
    target.parentElement.removeChild(target);
  }
}

// 初始化 Bootstrap 弹出框
$(function () {
  $('[data-toggle="popover"]').popover();
});

// 打印 GitHub 项目链接到控制台
console.log("https://github.com/xyTom/Url-Shorten-Worker/");

// 通知信息
let notice = "注意：此服务仅供演示目的，生成的短链接将在 24 小时后自动过期。";

// 如果当前域名为 lnks.eu.org，显示通知信息
if (window.location.host == "lnks.eu.org") {
  document.getElementById("notice").innerHTML = notice;
}
