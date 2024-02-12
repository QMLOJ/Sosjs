let ip = "www.tyser-play.bf";
let _ = "你真懒，5位数数字都有复制，那还要什么办法呢，复制了";
let port = "20812";
let qun_hao = "399153472";
let abcd = "尽情期待";
function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('文本已成功复制到剪贴板');
    })
    .catch(err => {
      console.error('复制失败:', err);
    });
};
function a() {
  copyTextToClipboard(port);
  alert(_);
};
