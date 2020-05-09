import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

declare var SqPaymentForm : any;
var amount = 1;
var oid;

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})

export class PaymentModalPage implements OnInit, AfterViewInit {

  @Input() nombre: string;
  paymentForm; //this is our payment form object
  payme: number = 0;
  
  constructor( private modalCtrl: ModalController,
               public cartService: CartService,
               private ordersService: OrdersService) { }

  ngOnInit() {
    
    this.paymentForm = new SqPaymentForm({
      
      // Initialize the payment form elements
      applicationId: "sandbox-sq0idb-BOG3kBaSsrnAK6QNO9-UOg",
      inputClass: 'sq-input',
      autoBuild: false,

      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a0a0a0',
          backgroundColor: '#f4f5f8',
      }],

      // Initialize the credit card placeholders
      cardNumber: {
          elementId: 'sq-card-number',
          placeholder: 'Card Number'
      },
      cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV'
      },
      expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY'
      },
      postalCode: {
          elementId: 'sq-postal-code',
          placeholder: 'Postal'
      },
      payment: {
        amount: 1,
      },
      // paymentAmount:{
      //   elementId: 'payment-amount',
      //   placeholder: 'amount'
      // },
      
      // SqPaymentForm callback functions
      callbacks: {
          /*
          * callback function: cardNonceResponseReceived
          * Triggered when: SqPaymentForm completes a card nonce request
          */
          cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
              // Log errors from nonce generation to the browser developer console.
              console.error('Encountered errors:');
              errors.forEach(function (error) {
                  console.error('  ' + error.message);
              });
              console.log('Encountered errors, check browser developer console for more details');
              return;
          }
            
            //console.log(`The generated nonce is:\n${nonce}`);
            console.log(amount);
             fetch('http://localhost:4000/api/sqPay/process-payment', {

              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nonce: nonce,
                payamount: amount,
                order: oid
              })
            })

            
            .catch(err => {
              alert('Network error: ' + err);
            })
            .then(response => {
              if (!response['ok']) {
                return 'error'
              }
              return response
            })

            .then(data => {
              console.log('hola desde aqui');
              console.log(data);
              //alert('Payment complete successfully!\nCheck browser developer console for more details');
            })
            .catch(err => {
              console.error(err);
              //alert('Payment failed to complete!\nCheck browser developer console for more details');
            });
            }
           }
    });

    this.paymentForm.build();
  }

  salirSinPagar(){
    this.modalCtrl.dismiss();
  }

  pagar(){
    
  }

  
  async onGetCardNonce(event) {
    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();
    
    //Set the amount to pay
    amount = this.cartService.payment;
    
    //Send the order to the server
    oid = await this.cartService.checkout('CreditCard');

    // Request a nonce from the SqPaymentForm object
    this.paymentForm.requestCardNonce();

    // Reset the cart
    this.cartService.clearCart();

    this.modalCtrl.dismiss({nombre: 'paolin'});
  }

  ngAfterViewInit(){}
}
