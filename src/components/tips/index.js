import tipTextTemplate from './tips.hbs';
import './index.scss';

const tipName = 'tip demo';

export default function (dom) {
  const timer = setTimeout(() => {
    const tipsDom = tipTextTemplate({ tipText: tipName })
      dom.innerHTML = tipsDom;
      clearTimeout(timer);
  }, 3000)
}