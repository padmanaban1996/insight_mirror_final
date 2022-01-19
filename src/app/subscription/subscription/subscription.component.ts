import { Component, Input, OnInit } from '@angular/core';
import { data } from 'jquery';
import { LocalUserService } from 'src/app/core/services/local-user.service';
import { UserService } from 'src/app/core/services/user.service';
import { WindowRefService } from 'src/app/root/window-ref.service';
import { environment } from 'src/environments/environment';
import { Card } from '../model';
import { Cards } from './data';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  title = 'componentapp';
  cards = Cards
  plan: number;
  status: boolean[] = [];
  isloading: boolean = null
  rateInRs = [100, 200, 300]
  rates = [10000, 20000, 30000]

  constructor(private localUserService: LocalUserService, private userService: UserService, private winRef: WindowRefService) {
    this.plan = this.localUserService.getUser().subscriptionPlan
  }

  ngOnInit(): void {
  }
  // faCheck = faCheck
  // faTimes = faTimes
  buyNow(index: number) {
    this.userService.payForSubscription({ amount: this.rates[index] }).subscribe(data => {
      console.log("response from data", data);
      if (data) {
        this.payWithRazor(data.id, index)
      }
    })

  }

  payWithRazor(val: string, index: number) {
    const options: any = {
      key: environment.razKey,
      //get amount from ui
      amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Kthree', // company name or product name
      description: 'Subscription plan',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;
      console.log(response);
      if (response.razorpay_payment_id) {
        console.log("From Insight Mirror : Success");

      }
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
