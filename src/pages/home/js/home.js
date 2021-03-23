import '../scss/index.scss';
import tipTextTemplate from '@/components/tips/tips.hbs';

const aaaDom = document.getElementById('aaa')
const timer = setTimeout(() => {
    const tipsDom = tipTextTemplate({ tipText: "hello tips" })
    aaaDom.innerHTML = tipsDom;
    clearTimeout(timer);
}, 3000)