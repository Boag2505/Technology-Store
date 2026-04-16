/* Chức năng cho nút danh mục */
document.addEventListener("DOMContentLoaded", function () {
    const productSection = document.getElementById('khu-vuc-san-pham');

    // ---------------------------------------------------------
    // TÍNH NĂNG 1: Tự động cuộn & mở tab khi từ trang khác chuyển về
    // ---------------------------------------------------------
    const currentHash = window.location.hash; // Đọc URL xem có chữ #tab-phone... không
    
    if (currentHash && currentHash.startsWith('#tab-')) {
        const targetTabButton = document.querySelector(currentHash);
        
        if (targetTabButton && productSection) {
            // Mở tab
            const bsTab = new bootstrap.Tab(targetTabButton);
            bsTab.show();
            
            // Cuộn xuống (Dùng setTimeout để đợi trình duyệt load xong giao diện rồi mới cuộn)
            setTimeout(() => {
                productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150); 
        }
    }

    // ---------------------------------------------------------
    // TÍNH NĂNG 2: Bấm link khi đang ở sẵn trên trang chủ (index.html)
    // ---------------------------------------------------------
    // Tìm các link có chứa chữ #tab-
    const categoryLinks = document.querySelectorAll('.dropdown-menu a[href*="#tab-"]');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Lấy ID mục tiêu bằng cách phân tích href
            const url = new URL(this.href);
            const targetId = url.hash; // Lấy ra phần #tab-phone

            // Kiểm tra xem trình duyệt có đang ở trang index.html không
            const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

            if (isHomePage) {
                e.preventDefault(); // Ngăn trình duyệt load lại trang nếu đang ở trang chủ
                
                const targetTabButton = document.querySelector(targetId);
                if (targetTabButton && productSection) {
                    // Mở tab
                    const bsTab = new bootstrap.Tab(targetTabButton);
                    bsTab.show();
                    
                    // Cuộn mượt
                    productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // (Tùy chọn) Cập nhật URL trên thanh địa chỉ cho chuẩn
                    history.pushState(null, null, targetId);
                }
            }
            // Nếu KHÔNG ở trang chủ, để nguyên cho trình duyệt tự chuyển hướng sang trang index.html
        });
    });
});

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
