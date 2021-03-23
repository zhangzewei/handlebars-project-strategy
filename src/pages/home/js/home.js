import tipTextTemplate from '@/components/tips/tips.hbs';
import '../scss/index.scss';

const aaaDom = document.getElementById('aaa')
const timer = setTimeout(() => {
    const tipsDom = tipTextTemplate({ tipText: "hello tips" })
    aaaDom.innerHTML = tipsDom;
    clearTimeout(timer);
}, 3000)