import './scss/style.scss';
import { ShopApp } from './components/controller/app';
import { selfReview } from './components/docs/selfReview';

const shop = new ShopApp();
shop.start();

console.log(selfReview);
