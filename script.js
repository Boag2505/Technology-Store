/* Chức năng cho nút quay lại đầu trang */
// Lấy element của nút bằng ID
const backToTopBtn = document.getElementById("backToTopBtn");

// Bắt sự kiện cuộn trang
window.onscroll = function() {
  toggleButton();
};

function toggleButton() {
  // Nếu cuộn xuống quá 300px từ đầu trang thì hiện nút, ngược lại thì ẩn
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// Hàm cuộn lên đầu trang
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Đây là chìa khóa để trang cuộn lên từ từ chứ không bị giật cục
  });
}
