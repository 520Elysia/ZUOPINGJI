document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    // 为所有输入框添加动画效果
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('active');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('active');
            }
        });
    });

    // 表单验证函数
    function validateForm(e) {
        e.preventDefault();
        let isValid = true;

        // 验证姓名
        const name = document.getElementById('name');
        if (name.value.length < 2) {
            showError(name, '姓名至少需要2个字符');
            isValid = false;
        } else {
            clearError(name);
        }

        // 验证邮箱
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, '请输入有效的邮箱地址');
            isValid = false;
        } else {
            clearError(email);
        }

        // 验证电话
        const phone = document.getElementById('phone');
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone.value)) {
            showError(phone, '请输入有效的手机号码');
            isValid = false;
        } else {
            clearError(phone);
        }

        // 验证留言
        const message = document.getElementById('message');
        if (message.value.length < 10) {
            showError(message, '留言至少需要10个字符');
            isValid = false;
        } else {
            clearError(message);
        }

        if (isValid) {
            // 这里可以添加表单提交逻辑
            alert('表单提交成功！');
            form.reset();
        }
    }

    // 显示错误信息
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        formGroup.classList.add('error');
        errorDisplay.textContent = message;
        formGroup.classList.add('shake');
        setTimeout(() => {
            formGroup.classList.remove('shake');
        }, 500);
    }

    // 清除错误信息
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        errorDisplay.textContent = '';
    }

    form.addEventListener('submit', validateForm);
}); 